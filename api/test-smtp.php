<?php
/**
 * SMTP connection test — run once from browser or CLI, then delete.
 * URL: https://bogihorvath.com/api/test-smtp.php?key=bogi2026test
 *
 * Returns JSON with each SMTP step and its result.
 * DELETE this file after testing.
 */

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

// Simple key guard so it can't be triggered by strangers
if (($_GET['key'] ?? '') !== 'bogi2026test') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']); exit;
}

$cfgFile = __DIR__ . '/smtp-config.php';
if (!file_exists($cfgFile)) {
    echo json_encode(['error' => 'smtp-config.php not found on server']); exit;
}
$cfg = require $cfgFile;

$steps = [];
$ok    = true;

function step(array &$steps, string $label, string $result, bool &$ok, bool $pass = true): void
{
    $steps[] = ['step' => $label, 'result' => trim($result), 'pass' => $pass];
    if (!$pass) $ok = false;
}

// Connect
$ctx  = stream_context_create(['ssl' => [
    'verify_peer'      => true,
    'verify_peer_name' => true,
]]);
$conn = @stream_socket_client(
    "ssl://{$cfg['host']}:{$cfg['port']}",
    $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx
);
if (!$conn) {
    echo json_encode(['ok' => false, 'steps' => [['step' => 'connect', 'result' => "FAIL: {$errstr} ({$errno})", 'pass' => false]]]);
    exit;
}
stream_set_timeout($conn, 15);

$rd  = fn() => (string)(fgets($conn, 1024) ?: '');
$rml = function() use ($conn, $rd): string { $l = ''; do { $l = $rd(); } while (strlen($l) >= 4 && $l[3] === '-'); return $l; };
$wr  = fn(string $c) => fwrite($conn, $c . "\r\n");
$cod = fn(string $l): int => (int)substr($l, 0, 3);

$line = $rd();
step($steps, 'connect + greeting', $line, $ok, $cod($line) === 220);

$wr("EHLO bogihorvath.com");
$line = $rml();
step($steps, 'EHLO', $line, $ok, $cod($line) === 250);

$wr("AUTH LOGIN");
$line = $rd();
step($steps, 'AUTH LOGIN', $line, $ok, $cod($line) === 334);

$wr(base64_encode($cfg['username']));
$line = $rd();
step($steps, 'Username', $line, $ok, $cod($line) === 334);

$wr(base64_encode($cfg['password']));
$line = $rd();
step($steps, 'Password / Auth result', $line, $ok, $cod($line) === 235);

if ($cod($line) === 235) {
    // Try sending a real test email to the inbox
    $wr("MAIL FROM:<{$cfg['from']}>");
    $line = $rd();
    step($steps, 'MAIL FROM', $line, $ok, $cod($line) === 250);

    $wr("RCPT TO:<{$cfg['to']}>");
    $line = $rd();
    step($steps, 'RCPT TO', $line, $ok, $cod($line) === 250);

    $wr("DATA");
    $line = $rd();
    step($steps, 'DATA', $line, $ok, $cod($line) === 354);

    $date    = date('r');
    $subject = '=?UTF-8?B?' . base64_encode('SMTP Test — bogihorvath.com') . '?=';
    $bodyB64 = chunk_split(base64_encode("This is an automated SMTP test sent from bogihorvath.com/api/test-smtp.php.\n\nIf you received this, the SMTP mailer is working correctly.\n\nTimestamp: {$date}"), 76, "\r\n");

    fwrite($conn, "From: {$cfg['from_name']} <{$cfg['from']}>\r\n");
    fwrite($conn, "To: <{$cfg['to']}>\r\n");
    fwrite($conn, "Subject: {$subject}\r\n");
    fwrite($conn, "Date: {$date}\r\n");
    fwrite($conn, "MIME-Version: 1.0\r\n");
    fwrite($conn, "Content-Type: text/plain; charset=UTF-8\r\n");
    fwrite($conn, "Content-Transfer-Encoding: base64\r\n");
    fwrite($conn, "\r\n");
    fwrite($conn, $bodyB64);
    fwrite($conn, ".\r\n");
    $line = $rd();
    step($steps, 'Message accepted', $line, $ok, $cod($line) === 250);
}

$wr("QUIT");
fclose($conn);

echo json_encode(['ok' => $ok, 'steps' => $steps], JSON_PRETTY_PRINT);
