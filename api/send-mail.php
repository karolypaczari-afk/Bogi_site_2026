<?php
/**
 * bogihorvath.com — SMTP mailer endpoint
 * Receives POST JSON from the contact/consultation forms,
 * sends via Hostinger SMTP (port 465, SSL), returns JSON.
 *
 * Credentials live in smtp-config.php (gitignored).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

// ── Method + origin guard ─────────────────────────────────────────────────────
$method  = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$origin  = $_SERVER['HTTP_ORIGIN']   ?? '';
$referer = $_SERVER['HTTP_REFERER']  ?? '';

if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Origin: https://bogihorvath.com');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$allowed = ['https://bogihorvath.com', 'https://www.bogihorvath.com'];
$validOrigin = false;
foreach ($allowed as $a) {
    if (str_starts_with($origin, $a) || str_starts_with($referer, $a)) {
        $validOrigin = true;
        break;
    }
}
if (!$validOrigin) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden']);
    exit;
}

// ── Load SMTP config ──────────────────────────────────────────────────────────
$cfgFile = __DIR__ . '/smtp-config.php';
if (!file_exists($cfgFile)) {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'SMTP not configured on server']);
    exit;
}
/** @var array $cfg */
$cfg = require $cfgFile;

// ── Parse request body ────────────────────────────────────────────────────────
$raw  = (string)(file_get_contents('php://input') ?: '');
$data = $raw ? (json_decode($raw, true) ?: []) : $_POST;
if (!is_array($data)) $data = [];

// Honeypot
if (!empty($data['botcheck'])) {
    echo json_encode(['success' => true]);
    exit;
}

// ── Sanitise + validate ───────────────────────────────────────────────────────
function s(mixed $v, int $max = 5000): string
{
    $s = substr(trim((string)$v), 0, $max);
    return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
}

$name    = s($data['name']    ?? '');
$email   = s($data['email']   ?? '', 200);
$message = s($data['message'] ?? '');
$subject = s($data['subject'] ?? 'New message from bogihorvath.com', 200);
$source  = s($data['source']  ?? 'unknown', 50);

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing or invalid fields']);
    exit;
}

// ── Rate limit (IP-based, 5 / 10 min) ────────────────────────────────────────
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir  = __DIR__ . '/rate';
@mkdir($rateDir, 0700, true);
$rateFile = $rateDir . '/' . hash('sha256', $ip) . '.smtp.txt';
$window   = 600;
$limit    = 5;
$now      = time();
$stamps   = [];
if (is_file($rateFile)) {
    foreach (explode("\n", (string)file_get_contents($rateFile)) as $ln) {
        $ln = trim($ln);
        if ($ln !== '' && ctype_digit($ln) && ((int)$ln) > ($now - $window)) {
            $stamps[] = (int)$ln;
        }
    }
}
if (count($stamps) >= $limit) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Try again later.']);
    exit;
}
$stamps[] = $now;
@file_put_contents($rateFile, implode("\n", $stamps));

// ── Build plain-text email body ───────────────────────────────────────────────
$divider = str_repeat('-', 48);
$body  = "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Source:  {$source}\n";
$body .= "{$divider}\n\n";
$body .= wordwrap($message, 76, "\n", false);
$body .= "\n\n{$divider}\n";
$body .= "Sent via bogihorvath.com";

// ── SMTP helpers ──────────────────────────────────────────────────────────────
function smtp_readline($conn): string
{
    return (string)(fgets($conn, 1024) ?: '');
}

function smtp_read_response($conn): string
{
    // Reads until we get a line whose 4th char is ' ' (end of multi-line response)
    $last = '';
    do {
        $last = smtp_readline($conn);
    } while ($last !== '' && strlen($last) >= 4 && $last[3] === '-');
    return $last;
}

function smtp_code(string $line): int
{
    return (int)substr($line, 0, 3);
}

function smtp_write($conn, string $cmd): void
{
    fwrite($conn, $cmd . "\r\n");
}

// ── Send via SMTP (port 465, implicit SSL) ────────────────────────────────────
function smtp_send(array $cfg, string $senderEmail, string $senderName, string $subject, string $body): array
{
    $ctx = stream_context_create(['ssl' => [
        'verify_peer'       => true,
        'verify_peer_name'  => true,
        'allow_self_signed' => false,
    ]]);

    $conn = @stream_socket_client(
        "ssl://{$cfg['host']}:{$cfg['port']}",
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT,
        $ctx
    );
    if (!$conn) {
        return ['success' => false, 'message' => "Cannot connect to SMTP: {$errstr} ({$errno})"];
    }
    stream_set_timeout($conn, 15);

    // 220 greeting
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 220) {
        fclose($conn);
        return ['success' => false, 'message' => "Bad greeting: {$line}"];
    }

    // EHLO
    smtp_write($conn, "EHLO bogihorvath.com");
    $line = smtp_read_response($conn);
    if (smtp_code($line) !== 250) {
        fclose($conn);
        return ['success' => false, 'message' => "EHLO failed: {$line}"];
    }

    // AUTH LOGIN
    smtp_write($conn, "AUTH LOGIN");
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 334) {
        fclose($conn);
        return ['success' => false, 'message' => "AUTH not accepted: {$line}"];
    }
    smtp_write($conn, base64_encode($cfg['username']));
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 334) {
        fclose($conn);
        return ['success' => false, 'message' => "Username rejected: {$line}"];
    }
    smtp_write($conn, base64_encode($cfg['password']));
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 235) {
        fclose($conn);
        return ['success' => false, 'message' => 'Authentication failed — check smtp-config.php'];
    }

    // MAIL FROM
    smtp_write($conn, "MAIL FROM:<{$cfg['from']}>");
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 250) {
        fclose($conn);
        return ['success' => false, 'message' => "MAIL FROM rejected: {$line}"];
    }

    // RCPT TO — primary inbox
    smtp_write($conn, "RCPT TO:<{$cfg['to']}>");
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 250) {
        fclose($conn);
        return ['success' => false, 'message' => "RCPT TO rejected: {$line}"];
    }

    // RCPT TO — CC list (non-fatal per address)
    foreach (($cfg['cc'] ?? []) as $cc) {
        smtp_write($conn, "RCPT TO:<{$cc}>");
        smtp_readline($conn);
    }

    // DATA
    smtp_write($conn, "DATA");
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 354) {
        fclose($conn);
        return ['success' => false, 'message' => "DATA refused: {$line}"];
    }

    // Headers
    $date    = date('r');
    $msgId   = '<' . uniqid('bh', true) . '@bogihorvath.com>';
    $subEnc  = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $ccStr   = !empty($cfg['cc']) ? implode(', ', $cfg['cc']) : '';
    $bodyB64 = chunk_split(base64_encode($body), 76, "\r\n");

    $msg  = "From: {$cfg['from_name']} <{$cfg['from']}>\r\n";
    $msg .= "To: <{$cfg['to']}>\r\n";
    if ($ccStr) $msg .= "Cc: {$ccStr}\r\n";
    $msg .= "Reply-To: {$senderName} <{$senderEmail}>\r\n";
    $msg .= "Subject: {$subEnc}\r\n";
    $msg .= "Date: {$date}\r\n";
    $msg .= "Message-ID: {$msgId}\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $msg .= "Content-Transfer-Encoding: base64\r\n";
    $msg .= "\r\n";
    $msg .= $bodyB64;

    // Write message with dot-stuffing
    foreach (explode("\r\n", $msg) as $ln) {
        fwrite($conn, (str_starts_with($ln, '.') ? '.' . $ln : $ln) . "\r\n");
    }

    // End of data
    smtp_write($conn, ".");
    $line = smtp_readline($conn);
    if (smtp_code($line) !== 250) {
        fclose($conn);
        return ['success' => false, 'message' => "Message rejected after DATA: {$line}"];
    }

    smtp_write($conn, "QUIT");
    fclose($conn);

    return ['success' => true, 'message' => 'Message sent.'];
}

// ── Execute & respond ─────────────────────────────────────────────────────────
$result = smtp_send($cfg, $email, $name, $subject, $body);

if (!$result['success']) {
    error_log("[send-mail.php] SMTP error for {$email}: {$result['message']}");
    http_response_code(500);
}

echo json_encode($result);
