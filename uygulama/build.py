#!/usr/bin/env python3
"""Hazırkal derleyici: tek dosya HTML + kurulabilir web uygulaması (PWA) klasörü üretir.

Kullanım:
  python3 build.py                      # Hazırkal (halka açık sürüm)
  python3 build.py kisisel ../kisisel   # Kişisel sürüm: kaynak + özel klasördeki yamalar ve ek dosyalar

Özel klasör (depoya girmez): yamalar.json  [{"dosya","genel","kisisel"}, ...]  ve  ekler/*.js
"""
import os, re, sys, json, shutil, zipfile, hashlib, base64

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
DIST = os.path.join(ROOT, "dist")
PDFDIR = os.path.join(ROOT, "vendor", "pdfjs-3.11.174") + os.sep  # pdfjs-dist 3.11.174 legacy build (Apache-2.0)

VARIANT = sys.argv[1] if len(sys.argv) > 1 else "hazirkal"
OZEL = os.path.abspath(sys.argv[2]) if len(sys.argv) > 2 else None
if VARIANT not in ("hazirkal", "kisisel"): sys.exit("Sürüm: hazirkal veya kisisel")
if VARIANT == "kisisel" and not (OZEL and os.path.isdir(OZEL)): sys.exit("Kişisel sürüm için özel klasör yolu gerekli")

CONF = {
    "hazirkal": {"slug": "hazirkal", "ad": "Hazırkal", "site": "https://hazirkal.com", "surum": "0.9 beta · Kasım 2026",
                 "aciklama": "İnternetsiz ilk yardım ve afet rehberi", "renk": "#1F2328"},
}.get(VARIANT) or json.load(open(os.path.join(OZEL, "ayar.json"), encoding="utf-8"))  # kişisel sürümün adı ve adresi özel klasörde

ORDER = ["data/iller.js", "data/figs.js", "data/art.js", "data/art2.js", "data/gal.js", "data/cizim.js", "data/guide1.js", "data/guide2.js", "data/guide3.js", "data/lists.js",
         "data/plans.js", "data/places.js", "data/doga.js", "data/guide4.js", "data/meta.js", "data/photoplace.js",
         "data/doga2.js", "data/ilk.js", "data/ilk2.js", "data/yapi.js", "data/ek0.js", "data/ek1.js", "data/ek2.js", "data/ek3.js", "data/ek4.js", "data/ek5.js", "data/ek6.js", "data/ilfiltre.js", "app.js", "setup.js", "vault.js", "kpr.js", "boot.js"]
EKLER = {"data/places.js": "places_ankara.js", "data/doga.js": "doga_kisisel.js"}  # kişisel ek dosyalar: hangi dosyanın hemen ardından

YAMA = {}
if VARIANT == "kisisel":
    for y in json.load(open(os.path.join(OZEL, "yamalar.json"), encoding="utf-8")):
        YAMA.setdefault(y["dosya"], []).append(y)

def ad_degis(s):
    return s.replace("Hazırkal", CONF["ad"]).replace("HAZIRKAL", CONF["ad"].upper().replace("I", "I")) if VARIANT == "kisisel" else s

def rd(p):
    s = open(os.path.join(SRC, p), encoding="utf-8").read()
    for y in YAMA.get(p, []):
        if s.count(y["genel"]) != 1: sys.exit("Yama uygulanamadı: %s: %r" % (p, y["genel"][:80]))
        s = s.replace(y["genel"], y["kisisel"])
    s = ad_degis(s)
    if VARIANT == "kisisel" and p in EKLER:
        s += "\n" + open(os.path.join(OZEL, "ekler", EKLER[p]), encoding="utf-8").read()
    return s

HKV = "window.HKV=" + json.dumps({"ad": CONF["ad"], "site": CONF["site"], "surum": CONF["surum"]}, ensure_ascii=False) + ";\n"
js = HKV + "window.HK=window.HK||{};HK.PH=" + rd("data/photos.json") + ";\n" + "\n".join(rd(p) for p in ORDER)
IMG = os.path.join(SRC, "img"); SND = os.path.join(SRC, "snd")
imgs = sorted([f[:-5] for f in os.listdir(IMG) if f.endswith(".webp")])
snds = sorted([f[:-4] for f in os.listdir(SND) if f.endswith(".mp3")])
css = rd("style.css"); tpl = rd("index.html")

# Sürüm anahtarı önbelleğe alınan HER dosyayı kapsar: yalnızca pdf.js, görsel ya da ses değişse de kurulu uygulamalar güncellenir.
_h = hashlib.sha1((js + css + tpl).encode())
for d in (IMG, SND):
    for r, ds, fs in sorted(os.walk(d)):
        ds.sort()
        for f in sorted(fs):
            fp = os.path.join(r, f); _h.update(os.path.relpath(fp, d).encode()); _h.update(open(fp, "rb").read())
for _f in ("pdf.min.js", "pdf.worker.min.js"): _h.update(open(PDFDIR + _f, "rb").read())
for _f in sorted(os.listdir(os.path.join(SRC, "ikon"))): _h.update(_f.encode()); _h.update(open(os.path.join(SRC, "ikon", _f), "rb").read())
_h.update(json.dumps(CONF, sort_keys=True, ensure_ascii=False).encode())  # simgeler ve manifest de sürüm anahtarına girer
ver = _h.hexdigest()[:8]

def b64f(p): return base64.b64encode(open(p, "rb").read()).decode()
def imgmap():
    m = {}
    for n in imgs:
        m[n] = "data:image/webp;base64," + b64f(os.path.join(IMG, n + ".webp"))
        m["t/" + n] = "data:image/webp;base64," + b64f(os.path.join(IMG, "t", n + ".webp"))
    return "window.HKIMG=" + json.dumps(m) + ";"
def sndmap(): return "window.HKSND=" + json.dumps({n: "data:audio/mpeg;base64," + b64f(os.path.join(SND, n + ".mp3")) for n in snds}) + ";"
def sha(x): return "'sha256-" + base64.b64encode(hashlib.sha256(x.encode()).digest()).decode() + "'"

CSPS = {}
def page(pwa):
    head = ('<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon-192.png">'
            '<link rel="apple-touch-icon" href="icon-192.png">') if pwa else ""
    body = re.sub(r"</script", "<\\/script", js if pwa else (imgmap() + "\n" + sndmap() + "\n" + js), flags=re.I)
    extra = ""; hashes = [sha(body)]
    if not pwa:  # tek dosyada PDF okuyucu gömülü; işçi ana iş parçacığında çalışır (file:// altında Worker açılamaz)
        lib = re.sub(r"</script", "<\\/script", open(PDFDIR + "pdf.min.js", encoding="utf-8").read(), flags=re.I)
        wk = re.sub(r"</script", "<\\/script", open(PDFDIR + "pdf.worker.min.js", encoding="utf-8").read(), flags=re.I)
        extra = "<script>" + lib + "</script><script>" + wk + "</script>"; hashes += [sha(lib), sha(wk)]
    # İnternet kilidi: sayfa hiçbir yere bağlanamaz (connect-src 'none'); yalnızca gömülü/aynı kaynaktan betik çalışır.
    csp = ("default-src 'none'; script-src 'self' " + " ".join(hashes) + "; style-src 'unsafe-inline'; "
           "img-src 'self' data: blob:; media-src 'self' data: blob:; worker-src 'self' blob:; "
           "manifest-src 'self'; connect-src 'none'; font-src 'none'; object-src 'none'; frame-src 'none'; "
           "base-uri 'none'; form-action 'none'")
    CSPS[pwa] = csp
    meta = '<meta http-equiv="Content-Security-Policy" content="' + csp + '">'
    out = tpl.replace("<!--PWA-->", head).replace("/*CSS*/", css).replace('<meta charset="utf-8">', '<meta charset="utf-8">' + meta)
    return out.replace("<script>/*JS*/</script>", extra + "<script>" + body + "</script>")

def icons(dst):
    if VARIANT == "hazirkal":
        for a, b in (("hazirkal-192", "icon-192"), ("hazirkal-512", "icon-512"), ("hazirkal-mask", "icon-mask")):
            shutil.copy(os.path.join(SRC, "ikon", a + ".png"), os.path.join(dst, b + ".png"))
        return
    from PIL import Image, ImageDraw  # kişisel sürümün dağ + pusula simgesi
    def icon(size, path, maskable=False):
        im = Image.new("RGB", (size, size), (0, 0, 0)); d = ImageDraw.Draw(im)
        s = size / 512; pad = 0 if not maskable else 40; k = lambda v: v * s
        d.polygon([(k(96 + pad / 2), k(380 - pad / 2)), (k(256), k(120 + pad / 2)), (k(416 - pad / 2), k(380 - pad / 2))], outline=(201, 165, 75), width=max(2, int(k(22))))
        d.polygon([(k(256), k(200)), (k(282), k(330)), (k(256), k(310)), (k(230), k(330))], fill=(208, 69, 58))
        d.line([(k(150), k(420)), (k(362), k(420))], fill=(127, 143, 78), width=max(2, int(k(14))))
        im.save(path)
    icon(192, os.path.join(dst, "icon-192.png")); icon(512, os.path.join(dst, "icon-512.png")); icon(512, os.path.join(dst, "icon-mask.png"), True)

SLUG = CONF["slug"]; PWA = os.path.join(DIST, SLUG)
for p in (PWA, os.path.join(DIST, SLUG + ".html"), os.path.join(DIST, SLUG + "-web.zip")):
    if os.path.isdir(p): shutil.rmtree(p)
    elif os.path.exists(p): os.remove(p)
os.makedirs(PWA)
open(os.path.join(DIST, SLUG + ".html"), "w", encoding="utf-8").write(page(False))
open(os.path.join(PWA, "index.html"), "w", encoding="utf-8").write(page(True))
shutil.copytree(IMG, os.path.join(PWA, "img")); shutil.copytree(SND, os.path.join(PWA, "snd"))
os.makedirs(os.path.join(PWA, "pdf"))
for _f in ("pdf.min.js", "pdf.worker.min.js"): shutil.copy(PDFDIR + _f, os.path.join(PWA, "pdf"))
icons(PWA)
json.dump({
    "name": CONF["ad"], "short_name": CONF["ad"], "description": CONF["aciklama"], "id": "./",
    "start_url": "./index.html#/", "scope": "./", "display": "standalone", "orientation": "portrait",
    "background_color": "#000000", "theme_color": "#000000", "lang": "tr",
    "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
              {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
              {"src": "icon-mask.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]
}, open(os.path.join(PWA, "manifest.webmanifest"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
open(os.path.join(PWA, "sw.js"), "w", encoding="utf-8").write("""// %s service worker: her şeyi önbelleğe alır, internetsiz çalışır
var C='hk-%s',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-mask.png'],I=%s;
// İlerleme: sayfaya "kaç dosya indi" bilgisi gider; ilk kurulumda kullanıcı bitmeden interneti kapatmasın diye.
function say(m){return self.clients.matchAll({includeUncontrolled:true,type:'window'}).then(function(cs){cs.forEach(function(c){c.postMessage(m)})})}
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){var R=function(u){return new Request(u,{cache:'reload'})},n=0,t=F.length+I.length;
 return c.addAll(F.map(R)).then(function(){n=F.length;say({hk:'yuk',n:n,t:t});return Promise.all(I.map(function(u){return c.add(R(u)).then(function(){n++;if(n%%25===0)say({hk:'yuk',n:n,t:t})})}))})}))});
// Etkinleşince açık sayfayı hemen devral: ilk açılışta görseller de önbellekten gelir, internet kapansa bile görünür.
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}).then(function(){return say({hk:'hazir'})}))});
self.addEventListener('message',function(e){if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request).catch(function(){if(e.request.mode==='navigate')return caches.match('./index.html');throw new Error('offline')})}))});
""" % (CONF["ad"], ver, json.dumps(["./img/" + n + ".webp" for n in imgs] + ["./img/t/" + n + ".webp" for n in imgs] + ["./snd/" + n + ".mp3" for n in snds] + ["./pdf/pdf.min.js", "./pdf/pdf.worker.min.js"])))
HTACCESS = """# %s web uygulaması: Apache (GoDaddy cPanel) ayarları. Bu dosya derleyici tarafından üretilir.
Options -Indexes
DirectoryIndex index.html
AddDefaultCharset utf-8
AddType application/manifest+json .webmanifest
AddType text/javascript .js
AddType image/webp .webp
AddType audio/mpeg .mp3
# Gizli dosya ve klasörler (.git, .env, .htaccess) dışarı verilmez
RedirectMatch 404 "/\\.(?!well-known/)"
<FilesMatch "^\\.">
  Require all denied
</FilesMatch>
<FilesMatch "(^error_log$|\\.(php\\d*|pht|phtml|phar|phps|inc|bak|old|orig|log|sql|zip|yml)$|~$)">
  Require all denied
</FilesMatch>
# Uygulama yalnızca okunur: GET ve HEAD dışındaki yöntemler (POST, PUT, DELETE...) reddedilir
Require method GET HEAD
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %%{HTTPS} off
  RewriteRule ^ https://%%{HTTP_HOST}%%{REQUEST_URI} [L,R=301]
</IfModule>
<IfModule mod_headers.c>
  # Sayfa: index.html içindeki meta CSP ile aynı kural + çerçeve yasağı (sayfa hiçbir yere bağlanamaz)
  Header always set Content-Security-Policy "%s; frame-ancestors 'none'"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "no-referrer"
  Header always set X-Frame-Options "DENY"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  # Konum (Konumum, pusula) ve kamera (fener) yalnızca uygulamanın kendisi için
  Header always set Permissions-Policy "camera=(self), geolocation=(self), microphone=(), payment=(), usb=(), interest-cohort=()"
  Header always set Strict-Transport-Security "max-age=31536000" "expr=%%{HTTPS} == 'on'"
  <Files "sw.js">
    # Önbelleğe alma işçisi yalnızca aynı sunucudan dosya çekebilir
    Header always set Content-Security-Policy "default-src 'none'; script-src 'self'; connect-src 'self'"
  </Files>
  <FilesMatch "^(sw\\.js|index\\.html|manifest\\.webmanifest)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
"""
open(os.path.join(PWA, ".htaccess"), "w", encoding="utf-8").write(HTACCESS % (CONF["ad"], CSPS[True]))
with zipfile.ZipFile(os.path.join(DIST, SLUG + "-web.zip"), "w", zipfile.ZIP_DEFLATED) as z:
    for r, ds, fs in os.walk(PWA):
        ds.sort()
        for f in sorted(fs):
            fp = os.path.join(r, f); z.write(fp, SLUG + "/" + os.path.relpath(fp, PWA))
print("ok", VARIANT, ver, os.path.getsize(os.path.join(DIST, SLUG + ".html")) // 1024, "KB")
