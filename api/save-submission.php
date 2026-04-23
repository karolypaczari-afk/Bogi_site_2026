<?php
/**
 * bogihorvath.com — Form submission server-side failover
 * Receives POST JSON (or form-encoded), appends a JSONL line to
 * /api/submissions/YYYY-MM.jsonl. Returns JSON { ok: true } on success.
 *
 * Purpose: if Web3Forms email delivery ever fails, we still have
 * every submission recorded on the server.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';

// Same-origin: accept only POST, referred from bogihorvath.com
if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Origin: https://bogihorvath.com');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$allowedOrigins = ['https://bogihorvath.com', 'https://www.bogihorvath.com'];
$referredFromSite = false;
foreach ($allowedOrigins as $allowed) {
    if (str_starts_with($origin, $allowed) || str_starts_with($referer, $allowed)) {
        $referredFromSite = true;
        break;
    }
}
if (!$referredFromSite) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'forbidden_origin']);
    exit;
}

// Parse incoming payload
$raw = file_get_contents('php://input');
$payload = [];
if ($raw !== '' && $raw !== false) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $payload = $decoded;
    }
}
if (!$payload && !empty($_POST)) {
    $payload = $_POST;
}

// Honeypot check
if (!empty($payload['botcheck'])) {
    echo json_encode(['ok' => true, 'note' => 'ignored']);
    exit;
}
unset($payload['botcheck']);

// Required field minima
$name = trim((string)($payload['name'] ?? ''));
$email = trim((string)($payload['email'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));
if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_payload']);
    exit;
}

// Rate-limit: simple IP-based; max 10 submissions / 10 min
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = __DIR__ . '/rate';
@mkdir($rateDir, 0700, true);
$rateFile = $rateDir . '/' . hash('sha256', $ip) . '.txt';
$window = 600;
$limit = 10;
$now = time();
$timestamps = [];
if (is_file($rateFile)) {
    $rawRate = file_get_contents($rateFile);
    foreach (explode("\n", $rawRate ?: '') as $line) {
        $line = trim($line);
        if ($line !== '' && ctype_digit($line) && ((int)$line) > ($now - $window)) {
            $timestamps[] = (int)$line;
        }
    }
}
if (count($timestamps) >= $limit) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'rate_limited']);
    exit;
}
$timestamps[] = $now;
@file_put_contents($rateFile, implode("\n", $timestamps));

// Sanitize + compose record
function sanitize($v) {
    if (is_array($v)) return array_map('sanitize', $v);
    $s = (string)$v;
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    return substr($s, 0, 5000);
}
$record = [
    'ts' => gmdate('Y-m-d\TH:i:s\Z'),
    'ip_hash' => hash('sha256', $ip),
    'user_agent' => substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500),
    'referer' => substr($referer, 0, 500),
    'source' => sanitize($payload['source'] ?? 'unknown'),
    'name' => sanitize($name),
    'email' => sanitize($email),
    'message' => sanitize($message),
    'extra' => sanitize(array_diff_key(
        $payload,
        array_flip(['name', 'email', 'message', 'source', 'access_key', 'cc', 'from_name', 'subject', 'replyto'])
    )),
];

// Append JSONL
$logDir = __DIR__ . '/submissions';
@mkdir($logDir, 0700, true);
$logFile = $logDir . '/' . gmdate('Y-m') . '.jsonl';
$line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";

$fp = @fopen($logFile, 'a');
if (!$fp) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'log_open_failed']);
    exit;
}
@flock($fp, LOCK_EX);
@fwrite($fp, $line);
@flock($fp, LOCK_UN);
@fclose($fp);
@chmod($logFile, 0600);

echo json_encode(['ok' => true, 'id' => substr(hash('sha256', $record['ts'] . $email), 0, 12)]);
