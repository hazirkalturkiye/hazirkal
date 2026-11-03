<?php
/*
 * Hazırkal katkı formu.
 * Mesajı tek bir sabit adrese e-postayla iletir. Veritabanı yok, IP ya da tarayıcı bilgisi kaydedilmez.
 * Sel gibi gelen spam'e karşı yalnızca toplam mesaj sayısı sayılır (kişi bazında değil).
 */
declare(strict_types=1);
ini_set('display_errors', '0');
function al(string $k): string { $v = $_POST[$k] ?? ''; return is_string($v) ? $v : ''; }

$ALICI    = 'hazirkalturkiye@gmail.com';   // mesajların gideceği adres
$GONDEREN = 'form@hazirkal.com';     // alan adındaki bir adres olmalı (GoDaddy bunu ister)
$SINIR    = 30;                      // 10 dakikada en fazla bu kadar mesaj (herkes için toplam)

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");
header('Cache-Control: no-store');

function git(string $yol): void {
    header('Location: ' . $yol, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    git('/#katki');
}

// Çok büyük istekleri reddet
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) {
    git('/gonderilemedi.html');
}

// Bot kapanı: insanlar bu alanı görmez, botlar doldurur
if (trim(al('web')) !== '') {
    git('/tesekkurler.html');
}

$konular = [
    'duzeltme' => 'Düzeltme önerisi',
    'hata'     => 'Uygulama hatası',
    'ozellik'  => 'Yeni özellik isteği',
    'bolge'    => 'İl / bölge bilgisi',
    'ceviri'   => 'Çeviri',
    'guvenlik' => 'GÜVENLİK AÇIĞI',
    'kurum'    => 'Okul, işyeri, kurum',
    'diger'    => 'Diğer',
];
$konu = al('konu');
if (!array_key_exists($konu, $konular)) {
    $konu = 'diger';
}

// Metni temizle: kontrol karakterlerini at (satır sonu ve sekme kalır)
function temizle(string $s, int $enfazla): string {
    $s = str_replace(["\r\n", "\r"], "\n", $s);
    $s = preg_replace('/[^\P{C}\n\t]/u', '', $s) ?? '';
    $s = trim($s);
    if (function_exists('mb_substr')) {
        return mb_substr($s, 0, $enfazla, 'UTF-8');
    }
    return substr($s, 0, $enfazla);
}

$mesaj = temizle(al('mesaj'), 4000);
if ($mesaj === '' || preg_match('//u', $mesaj) !== 1) {
    git('/gonderilemedi.html');
}

$eposta = trim(al('eposta'));
if ($eposta !== '' && (strlen($eposta) > 200 || preg_match('/[\r\n]/', $eposta) || strpbrk($eposta, '"[]') !== false || !filter_var($eposta, FILTER_VALIDATE_EMAIL))) {
    $eposta = '';
}
$paylas = (($_POST['paylas'] ?? '') === 'evet') ? 'Evet' : 'Hayır';

// Toplam mesaj sınırı (kişisel veri tutmadan): public_html dışındaki bir dosyada yalnızca zaman damgaları
$dizin = dirname(__DIR__) . '/hazirkal-veri';   // public_html dışında, yalnızca bu hesaba ait
if (!is_dir($dizin)) { @mkdir($dizin, 0700); }
$dosya = $dizin . '/form-sayac';
$simdi = time();
$fp = @fopen($dosya, 'c+');
if ($fp === false || !flock($fp, LOCK_EX)) {
    git('/gonderilemedi.html');   // sayaç açılamazsa form kapalı kalır (sınırsız gönderime izin verme)
}
$icerik = stream_get_contents($fp) ?: '';
$zamanlar = array_filter(array_map('intval', explode(',', $icerik)), function ($t) use ($simdi) {
    return $t > $simdi - 600 && $t <= $simdi;
});
if (count($zamanlar) >= $SINIR) {
    flock($fp, LOCK_UN);
    fclose($fp);
    git('/gonderilemedi.html');
}
$zamanlar[] = $simdi;
ftruncate($fp, 0);
rewind($fp);
fwrite($fp, implode(',', $zamanlar));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

$baslik = '=?UTF-8?B?' . base64_encode('[Hazırkal] ' . $konular[$konu]) . '?=';
$govde  = "Konu: " . $konular[$konu] . "\n"
        . "Herkese açık listede paylaşılabilir: " . $paylas . "\n"
        . "Cevap adresi: " . ($eposta !== '' ? $eposta : '(yok)') . "\n"
        . "Tarih: " . gmdate('Y-m-d H:i') . " UTC\n\n"
        . $mesaj . "\n";

$govde = chunk_split(base64_encode($govde));
$basliklar = [
    'From: Hazirkal Form <' . $GONDEREN . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    'X-Mailer: hazirkal-form',
];
if ($eposta !== '') {
    $basliklar[] = 'Reply-To: ' . $eposta;
}

$tamam = @mail($ALICI, $baslik, $govde, implode("\r\n", $basliklar), '-f' . $GONDEREN);
if (!$tamam) {
    $tamam = @mail($ALICI, $baslik, $govde, implode("\r\n", $basliklar));
}

git($tamam ? '/tesekkurler.html' : '/gonderilemedi.html');
