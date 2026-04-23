<?php
/**
 * bogihorvath.com — Tracking failover log
 *
 * Receives tracking events via navigator.sendBeacon (JSON body) and appends
 * a JSONL line to /api/events/YYYY-MM-DD.jsonl. Same-origin only.
 *
 * Purpose: site tracking has 3 parallel channels (GTM dataLayer, GA4 gtag,
 * this server log). If ad blockers or consent denial takes out the
 * client-side channels, every conversion still lands here.
 *
 * Reading the logs: `tail -f api/events/$(date +%Y-%m-%d).jsonl`
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// sendBeacon sends POST with Content-Type: text/plain or application/json — no CORS preflight
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

// Same-origin check — allow bogihorvath.com only
$origin  = $_SERVER['HTTP_ORIGIN']  ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$allowedOrigins = ['https://bogihorvath.com', 'https://www.bogihorvath.com'];
$ok = false;
foreach ($allowedOrigins as $a) {
    if (str_starts_with($origin, $a) || str_starts_with($referer, $a)) { $ok = true; break; }
}
if (!$ok) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'forbidden_origin']);
    exit;
}

// Parse body (sendBeacon sends raw JSON)
$raw = file_get_contents('php://input');
$payload = [];
if ($raw !== '' && $raw !== false) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) $payload = $decoded;
}
if (!$payload) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'empty_payload']);
    exit;
}

// Rate-limit per IP: 300 events / minute (generous; blocks obvious abuse only)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = __DIR__ . '/rate';
@mkdir($rateDir, 0700, true);
$rateFile = $rateDir . '/ev_' . hash('sha256', $ip) . '.txt';
$window = 60;
$limit  = 300;
$now = time();
$timestamps = [];
if (is_file($rateFile)) {
    foreach (explode("\n", (string)@file_get_contents($rateFile)) as $line) {
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

// Sanitize
function san($v) {
    if (is_array($v)) return array_map('san', $v);
    if (is_bool($v) || is_int($v) || is_float($v)) return $v;
    $s = (string)$v;
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    return substr($s, 0, 2000);
}

$event = san($payload['event'] ?? '');
if ($event === '' || !preg_match('/^[a-zA-Z0-9_]{1,64}$/', (string)$event)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_event']);
    exit;
}

$record = [
    'ts'          => gmdate('Y-m-d\TH:i:s.u\Z'),
    'event'       => $event,
    'session'     => san($payload['session'] ?? ''),
    'client'      => san($payload['client'] ?? ''),
    'page_path'   => san($payload['page_path'] ?? ''),
    'page_title'  => san($payload['page_title'] ?? ''),
    'referrer'    => san($payload['referrer'] ?? ''),
    'cta_location'=> san($payload['cta_location'] ?? ''),
    'consent'     => san($payload['consent_state'] ?? ''),
    'params'      => san($payload['params'] ?? []),
    'ua'          => substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 400),
    'ip_hash'     => hash('sha256', $ip),
];

$logDir = __DIR__ . '/events';
@mkdir($logDir, 0700, true);
$logFile = $logDir . '/' . gmdate('Y-m-d') . '.jsonl';
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

echo json_encode(['ok' => true]);
