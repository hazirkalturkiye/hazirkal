/* İlk açılış kurulumu: ev konumu → ekip (≥3) ve roller → araç → yapay zekâ ile kaçış noktaları → belge kasası.
   Acil durumda tek dokunuşla atlanır; eksikler ana ekranda hatırlatılır. */
(function(){
"use strict";
var D=window.HK,A=window.HKAPP,R=A.R,store=A.store,esc=A.esc,ic=A.ic,$=function(s){return document.querySelector(s)};
var STEPS=["Başla","Konum","Ekip","Araç","Yerler","Belgeler","Bitti"];
function bar(i){return '<div class="wz">'+STEPS.map(function(s,k){return '<span class="'+(k<i?"ok":k===i?"on":"")+'">'+s+'</span>'}).join("")+'</div>'}
function nav(i,okLabel){return '<div class="btns wzb">'+(i>0?'<button class="btn" id="wb">‹ Geri</button>':'')+'<button class="btn pri" id="wn">'+(okLabel||"Devam ›")+'</button></div>'+(i>0&&i<6?'<p class="mut" style="text-align:center;font-size:.85em"><a href="#/" id="wl">Sonra tamamla</a></p>':'')}
function go(i){store.set("wiz",i);draw(i);window.scrollTo(0,0)}
R["setup"]=function(){draw(Math.max(0,Math.min(6,parseInt(store.get("wiz",0),10)||0)))};
function draw(i){var m=A.main;A.setHead("KURULUM","Adım "+(i+1)+" / "+STEPS.length,true);A.tabOn("");
 var h=bar(i);
 if(i===0){
  h+=A.kurBilgi()+'<a class="sosbig" href="#/" id="skip" style="margin-top:14px">ACİL DURUM VARSA: KURULUMU ATLA</a>'+
  '<h2>5 dakikada hazırla</h2><ol class="ol"><li>Evinin konumu (kaçış noktaları buna göre hesaplanır)</li><li>En az <b>3 kişilik</b> ekibin ve <b>rollerin</b></li><li>Araç bilgisi (isteğe bağlı)</li><li>Kendi yapay zekâna vereceğin hazır metinle <b>çevrendeki kaçış noktaları</b></li><li>Sigorta, DASK (zorunlu deprem sigortası), reçete gibi belgeler için <b>şifreli kasa</b></li></ol><div class="card info">Her şey <b>sadece bu telefonda</b> saklanır. Uygulama internete hiçbir veri göndermez.</div>'+nav(0,"Kuruluma başla ›");
 }
 if(i===1){var hm=store.get("home",null)?A.home():{};
  h+='<h2>Ev konumu</h2><p>Kaçış noktalarının mesafesi ve yönü buradan hesaplanır. Evdeysen konumu GPS ile al; değilsen koordinatı elle yaz.</p><button class="btn full" id="gps">'+ic("pin")+' Şu an evdeyim: GPS ile al</button><label class="lb" for="hil">İl</label><select class="in" id="hil"><option value="">Seç…</option>'+D.ILLER.map(function(r){return '<option value="'+r[0]+'"'+(r[0]===D.ilKod()?' selected':'')+'>'+r[1]+'</option>'}).join("")+'</select><label class="lb">Konumun adı</label><input class="in" id="hn" value="'+esc(hm.name||"")+'" placeholder="Ev"><label class="lb">Enlem, boylam</label><input class="in mono" id="hl" value="'+(hm.lat?(+hm.lat)+", "+(+hm.lon):"")+'" placeholder="'+D.ilMerkez().lat+", "+D.ilMerkez().lon+'" inputmode="decimal"><label class="lb" for="hi">İlçe</label><input class="in" id="hi" list="hil-l" value="'+esc(hm.ilce||"")+'" placeholder="İlçe"><datalist id="hil-l">'+((D.il()||{}).ilceler||[]).map(function(x){return '<option value="'+esc(x)+'">'}).join("")+'</datalist><p class="mut" style="font-size:.85em">Koordinatı Organic Maps\'te evine uzun basıp alabilirsin.</p><div id="herr"></div>'+nav(1);
 }
 if(i===2){var t=A.team();
  h+='<h2>Ekibin</h2><p>Önce kendini, sonra en az <b>2 kişi daha</b> yaz. Roller ana ekranını belirler: seçtiğin rolün araçları en üstte durur.</p><div class="card tip">'+Object.keys(A.ROLES).map(function(r){return '<b style="color:'+A.ROLES[r].c+'">'+A.ROLES[r].t+':</b> '+A.ROLES[r].d}).join("<br>")+'</div><div id="tl"></div><button class="btn full" id="tadd">+ Kişi ekle</button><div id="terr"></div>'+nav(2);
 }
 if(i===3){var as=store.get("assets",{});
  h+='<h2>Araç ve diğer bilgiler</h2><p>Bunlar sana özel bakım dosyası ve kaçış planı üretmek için kullanılır. Boş bırakabilirsin.</p><h2>Araç</h2><label class="lb">Marka, model, yıl</label><input class="in" id="car" value="'+esc(as.car||"")+'" placeholder="Dacia Duster 2019"><label class="lb">Yakıt</label><select class="in" id="fuel">'+["","Benzin","Dizel","LPG + benzin","Hibrit","Elektrik"].map(function(x){return '<option'+(as.fuel===x?' selected':'')+'>'+x+'</option>'}).join("")+'</select><h2>Ekipte</h2><div class="chips" id="needs">'+[["kid","Çocuk"],["old","Yaşlı"],["dis","Engelli / kronik hasta"],["pet","Evcil hayvan"]].map(function(x){return '<span class="chip'+((Array.isArray(as.needs)?as.needs:[]).indexOf(x[0])>-1?" on":"")+'" data-n="'+x[0]+'">'+x[1]+'</span>'}).join("")+'</div>'+nav(3);
 }
 if(i===4){h+='<h2>Çevrendeki kaçış noktaları</h2>'+aiBlock()+nav(4);}
 if(i===5){h+='<h2>Belge kasası</h2><p>Sağlık sigortası, kasko, trafik sigortası, DASK, tapu, kimlik fotokopisi, reçete ve raporlar, araç bakım dosyaları. Dosyalar <b>şifrelenerek</b> sadece bu telefonda saklanır; uygulama kapalıyken açılamaz.</p><a class="btn pri full" href="#/vault">'+ic("shield")+' Kasayı aç / dosya ekle</a><p class="mut" style="font-size:.85em">İstersen bu adımı atla; kasaya sonra Plan › Belge kasası\'ndan ulaşırsın.</p>'+nav(5);}
 if(i===6){var g=window.HKAPP.team().filter(function(x){return x.ad}).length;
  h+='<h2>Hazırsın</h2><ul><li>Ev konumu: '+(store.get("home",null)?"<b>tamam</b>":"eksik")+'</li><li>Ekip: <b>'+g+'</b> kişi'+(g<3?' (en az 3 olmalı)':'')+'</li><li>Senin rollerin: '+((A.team()[0].roles||[]).map(function(r){return (A.ROLES[r]||{}).t}).join(", ")||"seçilmedi")+'</li><li>Eklenen kaçış noktası: <b>'+(+store.get("uplaces",[]).length||0)+'</b></li></ul><div class="card tip"><b>Şimdi yap:</b> Rehber › Telefonu kriz moduna al sayfasındaki adımları uygula. Bu bilgileri ekibine aktarmak için Ayarlar › Yedekle / taşı bölümünü kullan.</div>'+nav(6,"Uygulamaya geç ›");}
 m.innerHTML=h;bind(i);
}
function bind(i){
 if($("#skip"))$("#skip").onclick=function(){store.set("wiz",1)};
 A.kurBagla();
 if($("#wl"))$("#wl").onclick=function(){store.set("wiz",i)};
 if($("#wb"))$("#wb").onclick=function(){save(i);go(i-1)};
 $("#wn").onclick=function(){if(save(i)===false)return;if(i===6){store.set("setupDone",true);store.set("wiz",0);location.hash="#/";return}go(i+1)};
 if(i===1){$("#gps").onclick=function(){$("#gps").textContent="Uydular aranıyor… (açık havada 30 sn–2 dk)";A.fix(function(f,e){if(!f){$("#gps").textContent=e;return}$("#hl").value=f.lat+", "+f.lon;$("#gps").textContent="Konum alındı (±"+f.acc+" m)"})};}
 if(i===2)drawTeam();
 if(i===3)Array.prototype.forEach.call(document.querySelectorAll("#needs .chip"),function(c){c.onclick=function(){c.classList.toggle("on")}});
 if(i===4)bindAI();
}
function save(i){
 if(i===1){var il0=+store.get("il",0),il1=+$("#hil").value;if(il1>=1&&il1<=81&&il1!==il0){store.set("il",il1);store.set("wiz",2);if($("#hl").value.trim())saveHome();location.reload();return false}var v=$("#hl").value.replace(/[^\d.,\- ]/g,"").split(/[ ,]+/).filter(Boolean).map(Number);
  if(!$("#hl").value.trim())return true;
  if(v.length<2||!isFinite(v[0])||!isFinite(v[1])||Math.abs(v[0])>90||Math.abs(v[1])>180){$("#herr").innerHTML='<div class="card warn">Koordinatı "39.8755, 32.6880" biçiminde yaz.</div>';return false}
  saveHome()}
 if(i===2){var t=A.team(),n=t.filter(function(m){return m.ad}).length;
  if(n<3){$("#terr").innerHTML='<div class="card warn">En az <b>3 kişi</b> gerekli (şu an '+n+'). Biri ulaşılamazsa diğerleri işi sürdürür. Şimdilik atlamak istiyorsan alttaki "Sonra tamamla" bağlantısına bas.</div>';return false}}
 if(i===3){store.set("assets",{car:$("#car").value.trim().slice(0,80),fuel:$("#fuel").value,needs:Array.prototype.map.call(document.querySelectorAll("#needs .chip.on"),function(c){return c.getAttribute("data-n")})})}
 return true;
}
function saveHome(){var v=$("#hl").value.replace(/[^\d.,\- ]/g,"").split(/[ ,]+/).filter(Boolean).map(Number);if(v.length<2||!isFinite(v[0])||!isFinite(v[1])||Math.abs(v[0])>90||Math.abs(v[1])>180)return;
 store.set("home",{lat:+v[0].toFixed(5),lon:+v[1].toFixed(5),name:($("#hn").value.trim()||"Ev").slice(0,40),ilce:$("#hi").value.trim().slice(0,60)})}
function drawTeam(){var t=A.team(),box=$("#tl");
 box.innerHTML=t.map(function(m,k){return '<div class="card"><div class="row"><b class="f">'+(k+1)+'. '+(esc(m.ad)||'<span class="mut">'+(k===0?"sen":"boş")+'</span>')+'</b><button class="btn" data-k="'+k+'">'+(m.ad?"Düzenle":"Yaz")+'</button></div>'+(m.roles.length?'<div class="rrow">'+m.roles.map(function(r){return '<span class="rchip" style="--rc:'+A.ROLES[r].c+'">'+A.ROLES[r].t+'</span>'}).join("")+'</div>':'')+'</div>'}).join("");
 Array.prototype.forEach.call(box.querySelectorAll("[data-k]"),function(b){b.onclick=function(){edit(+b.getAttribute("data-k"))}});
 $("#tadd").onclick=function(){if(t.length>=10)return;t.push({ad:"",tel:"",kan:"",rol:"",not:"",roles:[]});store.set("team",t);edit(t.length-1)};
 function edit(k){var m=t[k];A.main.innerHTML=bar(2)+'<h2>'+(k===0?"Sen":"Kişi "+(k+1))+'</h2>'+A.memberForm(m,k)+'<div class="btns"><button class="btn pri" id="sv">Kaydet</button><button class="btn" id="cn">Vazgeç</button></div>';A.bindRoles();
  $("#sv").onclick=function(){A.readForm(m);store.set("team",t);draw(2)};$("#cn").onclick=function(){draw(2)}}
}

/* ---------- Yapay zekâ metinleri ---------- */
function mon(){return ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"][new Date().getMonth()]}
function promptPlaces(){var hm=A.home(),as=store.get("assets",{}),n=Math.max(3,A.team().filter(function(m){return m.ad}).length),nd=Array.isArray(as.needs)?as.needs:[];
 var slow=nd.indexOf("kid")>-1||nd.indexOf("old")>-1||nd.indexOf("dis")>-1;
 return "Sen deneyimli bir afet planlamacısı ve arazi rehberisin. Aşağıdaki başlangıç noktası için GERÇEK ve doğrulanabilir kaçış ve sığınma noktalarını listele.\n\n"+
 "Başlangıç: "+hm.name+(hm.ilce?", "+hm.ilce:"")+(D.il()&&String(hm.ilce||"").indexOf(D.il().ad)<0?", "+D.il().ad:"")+" — yaklaşık koordinat "+(+hm.lat).toFixed(3)+", "+(+hm.lon).toFixed(3)+"\n"+
 "Ekip: "+n+" kişi"+(slow?" (çocuk/yaşlı/hasta var: günde 5–8 km yürür)":" (yetişkin: günde 20–25 km)")+(nd.indexOf("pet")>-1?", evcil hayvan var":"")+"; araç: "+(as.car?"var ("+as.car+")":"yok")+"\n"+
 "Mevsim: "+mon()+"\n\n"+
 "İSTENEN\n- Yürüyerek 3–5 gün (kuş uçuşu en fazla ~100 km) menzilde 15–25 nokta: içme suyu (pınar, köy çeşmesi, baraj, dere), ormanlık alan, mağara veya kaya sığınağı, küçük köy, kaplıca ve evin yakınında 2–3 buluşma noktası adayı (park, açık toplanma alanı).\n"+
 "- Yaklaşılmaması gereken yerler ayrı listede: askerî tesis, havaalanı, sanayi/kimya tesisi, baraj gövdesinin aşağısındaki taşkın alanı, büyük kavşak ve köprüler.\n\n"+
 "KURALLAR\n- Sadece gerçekten var olan yerler; uydurma. Koordinatı emin olduğun kaynaktan ver; emin değilsen \"acc\":\"Y\" yaz.\n- Her nokta için 1–2 cümle: neden seçildi, su durumu, kısa rota önerisi (ana yol yerine paralel yollar), riskler (yaban hayatı, sel, yasaklı dönem, orman yangını yasağı).\n- Türkçe yaz.\n\n"+
 "ÇIKTI: SADECE aşağıdaki biçimde geçerli JSON ver, önünde ve arkasında başka metin olmasın:\n"+
 '{"hk":1,"origin":{"name":"'+JSON.stringify(String(hm.name)).slice(1,-1)+'","lat":'+(+hm.lat).toFixed(3)+',"lon":'+(+hm.lon).toFixed(3)+'},"places":[{"n":"Yer adı","ty":"w","tier":1,"lat":0.0,"lon":0.0,"ilce":"İlçe","acc":"V","why":"...","water":"...","route":"...","risk":"..."}],"avoid":[{"n":"Yer adı","lat":0.0,"lon":0.0,"why":"..."}]}'+"\n"+
 "ty: w=su, f=orman, c=mağara/kaya, v=köy, t=kaplıca, r=buluşma · tier: 1=birincil (su+odun+örtü bir arada), 2=ara durak, 3=geçiş/kısıtlı · acc: V=koordinat kaynakta doğrulandı, Y=yaklaşık";}
function promptCar(as){return "Aşağıdaki araç için kriz ve afet dönemine yönelik, yazdırılabilir Türkçe bir PDF rehber hazırla (A4, en fazla 6 sayfa, büyük başlıklar, kısa maddeler, adım adım):\n\nAraç: "+as.car+(as.fuel?" · "+as.fuel:"")+"\n\nBölümler:\n1) Haftalık kontrol listesi: motor yağı, soğutma suyu, fren hidroliği, cam suyu, lastik basınçları (bu modelin değerleriyle)\n2) Lastik değiştirme: kriko noktaları, bijon sırası ve torku, stepnenin yeri\n3) Akü takviye (kablo bağlama sırası) ve akü bakımı\n4) Sigorta kutularının yeri ve kritik sigortalar\n5) Gösterge uyarı lambalarının anlamı ve ne yapılacağı\n6) Kış hazırlığı: antifriz oranı, zincir takma"+(/dizel/i.test(as.fuel||"")?", dizel donması/jelleşmesine karşı önlem":"")+"\n7) Yakıt tasarrufu ve menzil artırma\n8) Araçta bulunması gereken acil durum kiti\n9) Çekme halatıyla çekilme ve çekme kuralları, çeki demirinin yeri\n10) Bu modelin bilinen kronik arızaları ve yol kenarında geçici çözümleri\n\nÜretici kullanım kılavuzunu esas al. Emin olmadığın değerleri \"kılavuzdan kontrol et\" diye işaretle."}
function pbox(id,title,txt,after){return '<details class="draw pbox" '+(id==="pp"?"open":"")+'><summary>'+title+'</summary><textarea class="in mono" id="'+id+'" rows="7" readonly style="font-size:.72em">'+esc(txt)+'</textarea><div class="btns"><button class="btn pri" data-cp="'+id+'">Metni kopyala</button></div>'+(after||"")+'</details>'}
function aiBlock(){var as=store.get("assets",{}),n=+store.get("uplaces",[]).length||0;
 var h='<ol class="ol"><li>Aşağıdaki metni kopyala.</li><li>Kendi kullandığın yapay zekâ sohbet uygulamasına yapıştır. Mümkünse <b>web araması açık</b> olsun.</li><li>Gelen cevabın tamamını kopyala, alttaki kutuya yapıştır ve <b>Yükle</b>\'ye bas.</li></ol>';
 h+=pbox("pp","1. Kaçış noktaları metni",promptPlaces(),'<label class="lb">Yapay zekânın cevabı (JSON biçiminde)</label><textarea class="in mono" id="pj" rows="5" style="font-size:.75em" placeholder=\'{"hk":1,"places":[…]}\'></textarea><div class="btns"><button class="btn pri" id="pl">Yükle</button><label class="btn">Dosyadan<input type="file" id="pf" accept=".json,.txt,application/json,text/plain" hidden></label>'+(n?'<button class="btn" id="px">Eklenenleri sil ('+n+')</button>':'')+'</div><div id="pres"></div>');
 if(as.car)h+=pbox("pc","2. Araç bakım dosyası metni",promptCar(as),'<p class="mut" style="font-size:.85em">Yapay zekâdan PDF iste, indir; sonra <a href="#/vault">Belge kasası</a> › "Araç bakım" olarak ekle.</p>');
 if(!as.car)h+='<p class="mut" style="font-size:.85em">Araç bilgisi girersen (önceki adım) bakım dosyası metni de burada çıkar.</p>';
 return h+'<div class="card warn">Yapay zekâ yer uydurabilir veya koordinatı yanlış verebilir. Eklenen her nokta <b>"doğrulanmadı"</b> işaretiyle gelir: internet varken Organic Maps\'te kontrol et, mümkünse gidip yerinde gör.</div>'}
function bindAI(){
 Array.prototype.forEach.call(document.querySelectorAll("[data-cp]"),function(b){b.onclick=function(){var t=$("#"+b.getAttribute("data-cp"));t.removeAttribute("readonly");t.select();try{navigator.clipboard.writeText(t.value).then(function(){b.textContent="Kopyalandı ✓"})}catch(e){document.execCommand("copy");b.textContent="Kopyalandı ✓"}t.setAttribute("readonly","")}});
 if($("#pl"))$("#pl").onclick=function(){imp($("#pj").value)};
 if($("#pf"))$("#pf").onchange=function(){var f=this.files[0];if(!f)return;if(f.size>2e6){res("Dosya çok büyük.");return}var r=new FileReader();r.onload=function(){imp(String(r.result))};r.readAsText(f)};
 if($("#px"))$("#px").onclick=function(){if(confirm("Yapay zekâdan eklenen tüm noktalar silinsin mi?")){store.set("uplaces",[]);store.set("uavoid",[]);res("Silindi.")}};
}
function res(t,ok){var e=$("#pres");if(e)e.innerHTML='<div class="card '+(ok?"tip":"warn")+'">'+t+'</div>'}
/* Güvenli içe aktarma: sadece beklenen alanlar, düz metin, sınırlı uzunluk, geçerli koordinat */
function txt(v,max){return String(v==null?"":v).replace(/[\u0000-\u001f<>]/g," ").slice(0,max||300)}
function num(v,lim){if(v==null||v===""||typeof v==="object")return null;v=+v;return (isFinite(v)&&Math.abs(v)<=lim)?+v.toFixed(5):null}
function imp(raw){var o;raw=String(raw||"");var a=raw.indexOf("{"),b=raw.lastIndexOf("}");
 if(a<0||b<a){res("Metinde JSON bulunamadı. Yapay zekâdan <b>sadece JSON</b> vermesini iste.");return}
 try{o=JSON.parse(raw.slice(a,b+1))}catch(e){res("JSON okunamadı: "+txt(e.message,80)+". Cevabı eksiksiz kopyaladığından emin ol.");return}
 var ps=Array.isArray(o.places)?o.places.slice(0,60):[],out=[],av=[],hm=A.home(),bad=0,far=0;
 ps.forEach(function(p,k){if(!p||typeof p!=="object"){bad++;return}var lat=num(p.lat,90),lon=num(p.lon,180);if(lat==null||lon==null||!p.n){bad++;return}
  var km=A.dist(hm,{lat:lat,lon:lon});if(km>250){far++;return}
  out.push({id:"u"+k+"_"+Math.random().toString(36).slice(2,7),n:txt(p.n,60),short:txt(p.n,18),ilce:txt(p.ilce,40)||"—",lat:lat,lon:lon,acc:"Y",ai:1,
   ty:/^[wfcvtr]$/.test(p.ty)?p.ty:"v",tier:[1,2,3].indexOf(+p.tier)>-1?+p.tier:2,
   why:txt(p.why),water:txt(p.water),route:txt(p.route),risk:txt(p.risk)||"Doğrulanmadı."})});
 (Array.isArray(o.avoid)?o.avoid.slice(0,30):[]).forEach(function(p){if(!p||typeof p!=="object")return;var lat=num(p.lat,90),lon=num(p.lon,180);if(lat!=null&&lon!=null)av.push({n:txt(p.n,60),lat:lat,lon:lon})});
 if(!out.length){res("Geçerli nokta bulunamadı"+(bad?" ("+bad+" kayıtta koordinat ya da ad eksik)":"")+(far?" ("+far+" nokta 250 km'den uzak)":"")+".");return}
 store.set("uplaces",out);store.set("uavoid",av);
 res("<b>"+out.length+" nokta</b> ve "+av.length+" kaçınılacak yer eklendi"+(bad?", "+bad+" hatalı kayıt atlandı":"")+(far?", "+far+" uzak nokta atlandı":"")+". <a href='#/p'>Yerler</a> sekmesinde görebilirsin.",true);
}
R["ai"]=function(){A.setHead("YAPAY ZEKÂ İLE YERLER","Kendi yapay zekân · sonuç bu telefonda kalır",true);A.tabOn("p");A.main.innerHTML=aiBlock();bindAI()};
/* Güvenlik ve gizlilik */
R["privacy"]=function(){A.setHead("GÜVENLİK VE GİZLİLİK","Veri nerede, kim ulaşabilir",true);A.tabOn("");
 A.main.innerHTML='<div class="card tip"><b>İnternet:</b> Uygulama hiçbir sunucuya veri göndermez, hiçbir sunucudan veri almaz. Android sürümünün internet izni yoktur. Web sürümünde sayfaya gömülü güvenlik kuralı (CSP), sayfanın arka planda ağ isteği yapmasını <b>tarayıcı düzeyinde engeller</b>.</div>'+
 '<div class="tw"><table><tr><th>Veri</th><th>Nerede</th><th>Koruma</th></tr><tr><td>Ekip, buluşma, listeler, yerler</td><td>Telefonun uygulama deposu</td><td>Android\'in uygulama yalıtımı ve ekran kilidi korur. Krizde PIN sormadan açılsın diye şifrelenmez.</td></tr><tr><td>Belge kasası</td><td>Telefonun uygulama deposu</td><td><b>AES-256 şifreli</b> (paroladan türetilen anahtar, 600.000 tur PBKDF2; eski sürümden taşınan kasalarda 310.000). Uygulama kapalıyken veya kilitliyken okunamaz.</td></tr></table></div>'+
 '<ul><li><b>Wi‑Fi ya da Bluetooth ile verilerine ulaşılamaz:</b> Uygulama sunucu çalıştırmaz, bağlantı noktası (port) açmaz; aynı ağdaki başka bir cihaz verilerine erişemez.</li><li>Uygulamanın yüklendiği site (hosting) yalnızca uygulamanın kodunu verir; senin verilerin oraya hiç gitmez. İlk kurulumdan sonra site kapansa da uygulama çalışır.</li><li><b>Telefonunu koru:</b> güçlü bir ekran kilidi kullan; Geliştirici seçeneklerini ve USB hata ayıklamayı <b>kapalı</b> tut. Telefon kaybolursa üreticinin ya da Google\'ın cihaz bulma hizmetiyle telefonu uzaktan sil.</li><li>Yedek metni (Ayarlar › Yedekle) şifresizdir: yalnızca güvendiğin kişiye ver. Kasa yedeği ise şifreli bir dosyadır.</li></ul>'};
})();
