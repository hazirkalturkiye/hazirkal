/* Belge kasası: dosyalar AES-GCM 256 ile şifrelenir, anahtar PIN'den PBKDF2-SHA256 ile türetilir.
   Anahtar sadece bellekte tutulur; uygulama arka plana geçince, 3 dk işlem yapılmayınca veya sayfadan çıkınca silinir.
   Dosya adı ve türü de şifrelidir. İnternet yok: her şey bu cihazdaki IndexedDB'de. */
(function(){
"use strict";
var A=window.HKAPP,R=A.R,esc=A.esc,ic=A.ic,$=function(s){return document.querySelector(s)};
var CATS=["Sağlık sigortası","Kasko","Trafik sigortası","DASK","Konut sigortası","Kimlik / pasaport kopyası","Tapu","Reçete / rapor","Araç ruhsatı","Araç bakım","Diğer"];
var ITER=600000,MAXF=25*1024*1024,KEY=null,idle=null,fails=0,lockUntil=0;
var C=window.crypto&&window.crypto.subtle;
/* ---- IndexedDB ---- */
var dbp=null;
function db(){if(dbp)return dbp;dbp=new Promise(function(ok,no){var r=indexedDB.open("hk_vault",1);r.onupgradeneeded=function(){var d=r.result;d.createObjectStore("meta");d.createObjectStore("files",{keyPath:"id"})};r.onsuccess=function(){ok(r.result)};r.onerror=function(){no(r.error)}});return dbp}
function tx(st,mode,fn){return db().then(function(d){return new Promise(function(ok,no){var t=d.transaction(st,mode),s=t.objectStore(st),res;var q=fn(s);if(q)q.onsuccess=function(){res=q.result};t.oncomplete=function(){ok(res)};t.onerror=function(){no(t.error)};t.onabort=function(){no(t.error)}})})}
function mget(k){return tx("meta","readonly",function(s){return s.get(k)})}
function mput(k,v){return tx("meta","readwrite",function(s){return s.put(v,k)})}
function fall(){return tx("files","readonly",function(s){return s.getAll()})}
function fget(id){return tx("files","readonly",function(s){return s.get(id)})}
function fput(o){return tx("files","readwrite",function(s){return s.put(o)})}
function fdel(id){return tx("files","readwrite",function(s){return s.delete(id)})}
function wipe(){return tx("files","readwrite",function(s){return s.clear()}).then(function(){return tx("meta","readwrite",function(s){return s.clear()})})}
/* ---- Kripto ---- */
var te=new TextEncoder(),td=new TextDecoder();
function rnd(n){var a=new Uint8Array(n);crypto.getRandomValues(a);return a}
function derive(pin,salt,it){return C.importKey("raw",te.encode(pin),"PBKDF2",false,["deriveKey"]).then(function(k){return C.deriveKey({name:"PBKDF2",salt:salt,iterations:it||ITER,hash:"SHA-256"},k,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])})}
function gcm(iv,aad){var p={name:"AES-GCM",iv:iv};if(aad)p.additionalData=te.encode(aad);return p}
function enc(key,buf,aad){var iv=rnd(12);return C.encrypt(gcm(iv,aad),key,buf).then(function(ct){return {iv:iv,ct:ct}})}
function dec(key,o,aad){return C.decrypt(gcm(o.iv,aad),key,o.ct)}
/* Sürüm 2 kayıtlar kimliğe bağlanır (AAD): şifreli içerik başka bir kaydın yerine konamaz. */
function aadM(f){return f.v===2?f.id+"|m":null}
function aadD(f){return f.v===2?f.id+"|d":null}
function newId(){return "f"+Array.prototype.map.call(rnd(9),function(b){return ("0"+b.toString(16)).slice(-2)}).join("")}
var IDOK=/^[A-Za-z0-9_-]{1,40}$/,ITMIN=310000,ITMAX=2000000;
function itOk(n){return n>=ITMIN&&n<=ITMAX}
function rec(f){if(!f||!IDOK.test(String(f.id)))throw new Error("Yedek dosyası bozuk.");return {id:String(f.id),v:f.v===2?2:undefined,iv:unb64(f.iv),ct:unb64(f.ct).buffer,miv:unb64(f.miv),mct:unb64(f.mct).buffer}}
function inVault(){return /^#\/vault(\?|$)/.test(location.hash)}
function lock(){KEY=null;clearTimeout(idle);var lb=$("#vview");if(lb)closeView();if(inVault())R.vault()}
function touch(){clearTimeout(idle);idle=setTimeout(lock,180000)}
document.addEventListener("visibilitychange",function(){if(document.hidden)lock()});
window.addEventListener("hashchange",function(){if(!inVault()&&(KEY||$("#vview"))){KEY=null;clearTimeout(idle);closeView()}});
/* ---- Sayfa ---- */
R["vault"]=function(){A.setHead("BELGE KASASI","Şifreli · sadece bu telefonda",true);A.tabOn("plan");
 if(!C||!window.indexedDB){A.main.innerHTML='<div class="card warn">Bu tarayıcı şifrelemeyi desteklemiyor. Uygulamayı Chrome\'da, ana ekrana eklenmiş hâliyle (https adresinden) aç.</div>';return}
 mget("chk").then(function(chk){if(!chk)return setup();if(!KEY)return unlock(chk);list()}).catch(function(e){A.main.innerHTML='<div class="card warn">Kasa açılamadı: '+esc(e&&e.message)+'</div>'})};
function setup(){A.main.innerHTML='<div class="card info"><b>Kasa nasıl çalışır?</b> Belirleyeceğin parolayla tüm dosyalar telefonda <b>şifrelenir</b>. Uygulama kapalıyken ya da kasa kilitliyken kimse (sen de) parola olmadan dosyaları açamaz. <b>Parolayı unutursan dosyalar kurtarılamaz</b>: parolayı kâğıda yaz, güvenli bir yerde sakla.</div><label class="lb">Parola (en az 10 karakter, yalnızca rakam olmasın; ör. iki kelime ve bir sayı)</label><input class="in" id="p1" type="password" autocomplete="new-password" inputmode="text"><label class="lb">Parolayı tekrar yaz</label><input class="in" id="p2" type="password" autocomplete="new-password"><div class="btns"><button class="btn pri" id="mk">Kasayı oluştur</button></div><div id="vm"></div><details class="draw"><summary>Başka telefondaki kasanın yedeğini yükle</summary><p style="font-size:.9em">Yedeği oluştururken kullandığın parolayı yukarıdaki kutuya yaz, sonra dosyayı seç.</p><label class="btn">Yedek dosyasını seç<input type="file" id="rs" accept=".hkvault,application/json" hidden></label></details>';
 $("#rs").onchange=function(){var f=this.files[0],pin=$("#p1").value;if(!f)return;if(!pin){msg("Önce yedeğin parolasını yaz.");return}var r=new FileReader();r.onload=function(){try{var o=JSON.parse(r.result);if(o.hkvault!==1)throw 0;var salt=unb64(o.salt),chk={iv:unb64(o.chk.iv),ct:unb64(o.chk.ct).buffer},it=+o.iter||310000;if(!itOk(it)||!Array.isArray(o.files))throw 0;var recs=o.files.map(rec);
   derive(pin,salt,it).then(function(k){return dec(k,chk).then(function(){KEY=k})}).then(function(){return mput("salt",salt).then(function(){return mput("iter",it)}).then(function(){return mput("chk",chk)})}).then(function(){return Promise.all(recs.map(fput))}).then(function(){touch();list()}).catch(function(){KEY=null;msg("Bu parola yedeği açmıyor.")})}catch(e){msg("Yedek dosyası okunamadı.")}};r.readAsText(f)};
 $("#mk").onclick=function(){var a=$("#p1").value,b=$("#p2").value;if(a.length<10||/^\d+$/.test(a)){msg("Parola en az 10 karakter olmalı ve yalnızca rakamdan oluşmamalı. Dosya çalınırsa kısa bir PIN dakikalar içinde kırılabilir.");return}if(a!==b){msg("İki parola aynı değil.");return}
  $("#mk").textContent="Oluşturuluyor…";var salt=rnd(16);derive(a,salt).then(function(k){KEY=k;return enc(k,te.encode("HK-OK"))}).then(function(c){return mput("salt",salt).then(function(){return mput("iter",ITER)}).then(function(){return mput("chk",c)})}).then(function(){touch();list()}).catch(function(e){msg("Hata: "+esc(e.message))})}}
function msg(t){var e=$("#vm");if(e)e.innerHTML='<div class="card warn">'+t+'</div>'}
function unlock(chk){var wait=Math.max(0,Math.ceil((lockUntil-Date.now())/1000));
 A.main.innerHTML='<div style="text-align:center;margin:20px 0">'+ic("shield")+'<h2>Kasa kilitli</h2></div><label class="lb">Parola</label><input class="in" id="pin" type="password" autocomplete="current-password"><div class="btns"><button class="btn pri" id="op">Aç</button></div><div id="vm">'+(wait?'<div class="card warn">Çok fazla hatalı deneme yapıldı: '+wait+' saniye bekle.</div>':'')+'</div><details class="draw"><summary>Parolayı unuttum</summary><p>Parola olmadan dosyalar açılamaz. Kasayı tamamen silip yeniden kurabilirsin.</p><button class="btn" id="wp">Kasayı sil</button></details>';
 mget("fails").then(function(f){if(f){fails=+f.n||0;lockUntil=+f.u||0}});
 var go=function(){if(Date.now()<lockUntil){msg("Biraz bekle.");return}var p=$("#pin").value;$("#op").textContent="Açılıyor…";
  Promise.all([mget("salt"),mget("iter")]).then(function(r){return derive(p,r[0],r[1]||310000)}).then(function(k){return dec(k,chk).then(function(b){if(td.decode(b)!=="HK-OK")throw 0;KEY=k;fails=0;lockUntil=0;mput("fails",{n:0,u:0});touch();list()})}).catch(function(){fails++;if(fails>=5){lockUntil=Date.now()+30000*Math.pow(2,Math.min(fails-5,8))}mput("fails",{n:fails,u:lockUntil});$("#op").textContent="Aç";msg("Parola yanlış."+(fails>=5?" "+Math.round((lockUntil-Date.now())/1000)+" saniye bekle.":""))})};
 $("#op").onclick=go;$("#pin").onkeydown=function(e){if(e.key==="Enter")go()};
 $("#wp").onclick=function(){if(confirm("Kasadaki TÜM dosyalar kalıcı olarak silinecek. Emin misin?")&&confirm("Son onay: bu işlem geri alınamaz."))wipe().then(function(){KEY=null;R.vault()})}}
function list(){touch();fall().then(function(fs){return Promise.all(fs.map(function(f){return dec(KEY,{iv:f.miv,ct:f.mct},aadM(f)).then(function(b){var m=JSON.parse(td.decode(b));m.id=f.id;return m}).catch(function(){return {id:f.id,name:"(okunamadı)",cat:"Diğer"}})}))}).then(function(ms){
  ms.sort(function(a,b){return CATS.indexOf(a.cat)-CATS.indexOf(b.cat)||(b.t||0)-(a.t||0)});
  var h='<div class="btns"><label class="btn pri">'+ic("doc")+' Dosya ekle<input type="file" id="fi" accept="application/pdf,image/*" multiple hidden></label><button class="btn" id="lk">Kilitle</button></div><label class="lb">Eklenecek dosyanın türü</label><select class="in" id="ct">'+CATS.map(function(c){return '<option>'+c+'</option>'}).join("")+'</select><div id="vm"></div>';
  if(!ms.length)h+='<p class="mut">Henüz dosya yok. Poliçe PDF\'leri, belgelerin fotoğrafı, reçeteler, araç bakım dosyaları.</p>';
  var last="";ms.forEach(function(m){if(m.cat!==last){h+='<h2>'+esc(m.cat)+'</h2>';last=m.cat}h+='<div class="item vf"><span>'+ic(/pdf/.test(m.type)?"doc":"pin")+'</span><div class="f" data-o="'+esc(m.id)+'"><b>'+esc(m.name)+'</b><small class="mut">'+(m.size?Math.round(m.size/1024)+" KB · ":"")+(m.t?new Date(m.t).toLocaleDateString("tr-TR"):"")+'</small></div><button class="btn" data-d="'+esc(m.id)+'" aria-label="Sil">✕</button></div>'});
  h+='<details class="draw"><summary>Yedekle / başka telefona taşı</summary><p style="font-size:.9em">Yedek dosyası da <b>şifrelidir</b>; aynı parolayla açılır. Güçlü bir parola kullandıysan yedeği USB bellekte ya da güvendiğin bir yerde saklayabilirsin. <u>Parolayı dosyayla aynı yere yazma.</u></p><div class="btns"><button class="btn" id="ex">Şifreli yedek indir</button><label class="btn">Yedeği yükle<input type="file" id="im" accept=".hkvault,application/json" hidden></label></div></details>';
  h+='<div class="card tip">Uygulamadan çıkınca, telefon kilitlenince ya da 3 dakika işlem yapılmayınca kasa <b>kendiliğinden kilitlenir</b>. Belgelerin asıllarına e-Devlet\'ten ve sigorta şirketinden de ulaşabildiğinden emin ol.</div>';
  A.main.innerHTML=h;bindList(ms)})}
function bindList(ms){
 $("#lk").onclick=lock;
 $("#fi").onchange=function(){var fs=[].slice.call(this.files),cat=$("#ct").value;if(!fs.length)return;touch();
  var chain=Promise.resolve();fs.forEach(function(f){chain=chain.then(function(){if(f.size>MAXF){msg(esc(f.name)+": dosya en fazla 25 MB olabilir.");return}if(!/^(application\/pdf|image\/(jpeg|png|webp|gif|heic|heif))$/.test(f.type)){msg(esc(f.name)+": yalnızca PDF ya da fotoğraf eklenebilir.");return}msg("Şifreleniyor: "+esc(f.name)+"…");
   var id=newId();return f.arrayBuffer().then(function(buf){return Promise.all([enc(KEY,buf,id+"|d"),enc(KEY,te.encode(JSON.stringify({name:f.name.slice(0,120),type:f.type,size:f.size,cat:cat,t:Date.now()})),id+"|m")])}).then(function(r){return fput({id:id,v:2,iv:r[0].iv,ct:r[0].ct,miv:r[1].iv,mct:r[1].ct})})})});
  chain.then(list).catch(function(e){msg("Hata: "+esc(e&&e.message))})};
 Array.prototype.forEach.call(document.querySelectorAll("[data-o]"),function(e){e.onclick=function(){var id=e.getAttribute("data-o"),m=ms.filter(function(x){return x.id===id})[0];open(id,m)}});
 Array.prototype.forEach.call(document.querySelectorAll("[data-d]"),function(e){e.onclick=function(){if(confirm("Bu dosya kasadan silinsin mi?"))fdel(e.getAttribute("data-d")).then(list)}});
 $("#ex").onclick=exportV;$("#im").onchange=function(){var f=this.files[0];if(f)importV(f)};
}
/* ---- Görüntüleme: çözülen dosya sadece bellekte, ekranda; diske yazılmaz ---- */
var urls=[],CUR=null;
function closeView(){var v=$("#vview");if(v){Array.prototype.forEach.call(v.querySelectorAll("canvas"),function(c){c.width=c.height=0});v.remove()}urls.forEach(function(u){URL.revokeObjectURL(u)});urls=[];if(CUR){try{CUR.destroy()}catch(e){}CUR=null}}
function open(id,m){touch();var v=document.createElement("div");v.id="vview";v.innerHTML='<div class="vbar"><b>'+esc(m.name)+'</b><button class="btn" id="vx">Kapat</button></div><div class="vbody" id="vb"><p class="mut">Şifre çözülüyor…</p></div>';document.body.appendChild(v);$("#vx").onclick=closeView;
 fget(id).then(function(f){return dec(KEY,f,aadD(f))}).then(function(buf){var b=$("#vb");if(!b)return;
  if(/^image\//.test(m.type)){var u=URL.createObjectURL(new Blob([buf],{type:m.type}));urls.push(u);b.innerHTML='<img src="'+u+'" alt="" style="width:100%;height:auto">';return}
  if(/pdf/.test(m.type))return pdfRender(buf,b);
  b.innerHTML='<p>Bu dosya türü gösterilemiyor.</p>'}).catch(function(e){var b=$("#vb");if(b)b.innerHTML='<div class="card warn">Açılamadı: '+esc(e&&e.message||"")+'</div>'})}
function loadPdf(){if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);
 return new Promise(function(ok,no){var s=document.createElement("script");s.src="pdf/pdf.min.js";s.onload=function(){window.pdfjsLib?ok(window.pdfjsLib):no(new Error("PDF okuyucu bulunamadı"))};s.onerror=function(){no(new Error("PDF okuyucu yüklenemedi"))};document.head.appendChild(s)})}
function pdfRender(buf,box){return loadPdf().then(function(L){
  if(!window.pdfjsWorker)L.GlobalWorkerOptions.workerSrc="pdf/pdf.worker.min.js";
  return L.getDocument({data:new Uint8Array(buf),isEvalSupported:false,enableXfa:false,disableFontFace:false,useSystemFonts:true}).promise}).then(function(doc){CUR=doc;box.innerHTML='<p class="mut" style="font-size:.85em">'+doc.numPages+' sayfa</p>';var W=Math.min(window.innerWidth-16,900),p=Promise.resolve();
  for(var i=1;i<=Math.min(doc.numPages,60);i++)(function(n){p=p.then(function(){if(!$("#vview"))return;return doc.getPage(n).then(function(pg){var v0=pg.getViewport({scale:1}),sc=W/v0.width*(window.devicePixelRatio||1),vp=pg.getViewport({scale:sc}),c=document.createElement("canvas");c.width=vp.width;c.height=vp.height;c.style.width="100%";box.appendChild(c);return pg.render({canvasContext:c.getContext("2d"),viewport:vp}).promise})})})(i);
  return p.then(function(){var v=$("#vview");if(!v)doc.destroy()})})}
/* ---- Yedek ---- */
function b64(buf){var s="",a=new Uint8Array(buf);for(var i=0;i<a.length;i+=32768)s+=String.fromCharCode.apply(null,a.subarray(i,i+32768));return btoa(s)}
function unb64(s){var b=atob(s),a=new Uint8Array(b.length);for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a}
function exportV(){touch();Promise.all([mget("salt"),mget("chk"),fall(),mget("iter")]).then(function(r){var o={hkvault:1,iter:r[3]||310000,salt:b64(r[0]),chk:{iv:b64(r[1].iv),ct:b64(r[1].ct)},files:r[2].map(function(f){var x={id:f.id,iv:b64(f.iv),ct:b64(f.ct),miv:b64(f.miv),mct:b64(f.mct)};if(f.v===2)x.v=2;return x})};
  var u=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/octet-stream"})),a=document.createElement("a");a.href=u;a.download="hazirkal-kasa-"+new Date().toISOString().slice(0,10)+".hkvault";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},5000)})}
function importV(file){var r=new FileReader();r.onload=function(){try{var o=JSON.parse(r.result);if(o.hkvault!==1)throw 0;var salt=unb64(o.salt);
   mget("salt").then(function(s){if(s&&b64(s)!==o.salt)throw new Error("Bu yedek farklı bir parola ile oluşturulmuş. Önce bu telefondaki kasayı sil (Parolayı unuttum › Kasayı sil), sonra yedeği yükle.");
    return dec(KEY,{iv:unb64(o.chk.iv),ct:unb64(o.chk.ct)}).catch(function(){throw new Error("Yedek bu parola ile açılmıyor.")})}).then(function(){if(!Array.isArray(o.files))throw new Error("Yedek dosyası bozuk.");var recs=o.files.map(rec);return Promise.all(recs.map(function(x){return fget(x.id).then(function(e){if(!e)return fput(x)})}))}).then(list).catch(function(e){msg(esc(e.message))})}catch(e){msg("Yedek dosyası okunamadı.")}};r.readAsText(file)}
/* Kasa kurulmamışken yedekten kurulum: unlock ekranından değil, setup'tan sonra yükle */
})();
