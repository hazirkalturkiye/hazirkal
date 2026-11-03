# Hazırkal

**İnternetsiz ilk yardım ve afet rehberi.** Ücretsiz, açık kaynak, hesap istemez, veri toplamaz.

Deprem, sel, yangın ya da yolda kalınan bir gece: Hazırkal ilk yardım adımlarını, ekibini, buluşma noktalarını ve önemli belgelerini telefonunda, internet olmadan hazır tutar.

- Site: https://hazirkal.com
- Web uygulaması (iPhone ve Android): https://uygulama.hazirkal.com
- Kaynak kod: https://github.com/hazirkalturkiye/hazirkal
- Durum: **beta**. İlk yardım içeriği doktor kontrolünden geçiyor.

## Neler var

- 24 konuda adım adım, çizimli ilk yardım (T.C. Sağlık Bakanlığı İlk Yardım Uygulamaları Beceri Rehberi esas; rehberin sustuğu yerde ERC 2021). Sesli KPR koçu.
- En az üç kişilik ekip, roller, kan grupları, hazır SMS mesajları (internet değil, telefon hattı yeter).
- Buluşma noktaları; haritalar açık kaynaklı ve internetsiz çalışan [Organic Maps](https://organicmaps.app) ile açılır.
- Şifreli belge kasası (AES-GCM 256, PBKDF2-SHA256 600.000 tur; anahtar yalnızca bellekte).
- 81 il: yılanlar, akrepler, deniz canlıları, iklim ve deprem bilgisi seçilen ile göre gelir.
- Pusula, fener, Mors/SOS, su arıtma ve erzak hesabı, pil rehberi.

Resmî uygulamaların (AFAD Acil, HAYAT 112 Acil, Türk Kızılay) yerini tutmaz, onları tamamlar.

## Gizlilik ve güvenlik

- Uygulama hiçbir sunucuya istek göndermez. Sayfaya gömülü CSP `connect-src 'none'` ile arka plan bağlantılarını tarayıcı düzeyinde engeller.
- Her şey telefonda kalır (localStorage, IndexedDB). Hesap, analiz, reklam, takip kodu yok.
- Hazırlanan Android dosyasında (APK) `INTERNET` izni olmayacak.
- Güvenlik açığı bildirimi: [SECURITY.md](SECURITY.md).

Kendin test et: telefonu uçak moduna al ve uygulamayı aç; ya da tarayıcının geliştirici araçlarında ağ sekmesine bak.

## Depo düzeni

| Klasör | İçerik |
|---|---|
| `uygulama/src` | Uygulamanın kaynağı (HTML, CSS, JavaScript, veri, görseller, sesler) |
| `uygulama/build.py` | Derleyici: tek dosya HTML ve web uygulaması (PWA) klasörü üretir |
| `uygulama/vendor` | pdf.js 3.11.174 (Apache-2.0), belge kasasında PDF göstermek için |
| `site` | hazirkal.com (statik site; yalnızca katkı formu PHP) |
| `yayin/uygulama` | Derlenmiş web uygulaması (uygulama.hazirkal.com) |
| `.cpanel.yml` | GoDaddy cPanel Git dağıtımı (site → ~/hazirkal.com, uygulama → ~/uygulama.hazirkal.com) |

## Derleme

```sh
cd uygulama
python3 build.py          # dist/hazirkal/ (PWA) ve dist/hazirkal.html (tek dosya)
```

Python 3 yeterli; ek paket gerekmez. Derleme her sürümde içeriğin hash'iyle yeni bir önbellek adı üretir; kurulu uygulamalar internete bağlanınca güncellemeyi sorar.

## Katkı

Bu uygulama bitmiş bir iş değil, bir başlangıç. Kodlama bilgimiz olmadan, yapay zekâ ile birlikte yazdık; bu yüzden her göz, her öneri değerli. Yanlış bilgi, eksik il bilgisi, çeviri, hata ya da güvenlik bulgusu: [CONTRIBUTING.md](CONTRIBUTING.md).

## Lisans

- Kod: [GPL-3.0](LICENSE). Türetilen sürümler de açık kaynak ve aynı lisansla dağıtılmalıdır.
- Metinler ve çizimler: [CC BY-SA 4.0](LICENSE-ICERIK-CC-BY-SA-4.0.txt).
- Fotoğraflar: Wikimedia Commons, her birinin kendi serbest lisansıyla (uygulamada Fotoğraf atıfları sayfası).
- Yazı tipleri (site): Archivo ve Public Sans, SIL Open Font License 1.1.
- pdf.js: Apache-2.0.

Hazırkal, Ankara'daki [Katsu](https://www.katsuankara.com) salonunun ücretsiz bir projesidir. Bilgilendirme amaçlıdır; ilk yardım eğitiminin ve resmî kurumların uyarılarının yerini tutmaz. Acil durumda 112'yi ara.
