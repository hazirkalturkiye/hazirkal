/* HAZIRKAL — çevrimdışı hayatta kalma rehberi. Tek dosya, harici bağlantı yok. */
(function(){
"use strict";
if(window.top!==window.self){document.documentElement.style.display="none";try{window.top.location.replace(window.self.location.href)}catch(e){}return}
var D = window.HK; // içerik verisi
var $ = function(s,r){return (r||document).querySelector(s)};
var main = $("main"), titleEl = $("#ttl"), subEl = $("#sub");
var HOME0 = D.ilMerkez(); // seçilen ilin merkezi (kurulumda ev konumuyla değişir)
var store = {
  get:function(k,d){try{var v=localStorage.getItem("hk_"+k);if(v===null)return d;v=JSON.parse(v);if(d!=null&&(v==null||typeof v!==typeof d||Array.isArray(v)!==Array.isArray(d)))return d;return v}catch(e){return d}},
  set:function(k,v){try{localStorage.setItem("hk_"+k,JSON.stringify(v))}catch(e){}}
};
function lf(){var g=store.get("lastfix",null);if(!g)return null;var la=+g.lat,lo=+g.lon;if(!isFinite(la)||!isFinite(lo)||Math.abs(la)>90||Math.abs(lo)>180)return null;return {lat:la,lon:lo,acc:Math.round(+g.acc)||0,alt:g.alt==null||!isFinite(+g.alt)?null:Math.round(+g.alt),t:+g.t||0}}
function home(){var h=store.get("home",null);return (h&&isFinite(h.lat)&&isFinite(h.lon)&&Math.abs(h.lat)<=90&&Math.abs(h.lon)<=180)?{lat:+h.lat,lon:+h.lon,name:String(h.name||"Ev").slice(0,40),ilce:String(h.ilce||"").slice(0,60)}:HOME0}
function short(){return home().name.split(/[ (,]/)[0]}
/* Kullanıcının içe aktardığı yerler: her gösterimde yeniden doğrulanır ve kaçışlanır (yedekten gelen veri de güvenilmez) */
function num(v,l){if(v==null||v===""||typeof v==="object")return null;v=+v;return (isFinite(v)&&Math.abs(v)<=l)?v:null}
function sanU(p,k){var lat=num(p&&p.lat,90),lon=num(p&&p.lon,180);if(lat==null||lon==null)return null;var t=function(x,m){return esc(String(x==null?"":x).slice(0,m||300))};
 return {id:"u"+k,n:t(p.n,60)||"Nokta",short:t(p.n,18),ilce:t(p.ilce,40)||"—",lat:lat,lon:lon,acc:"Y",ai:1,ty:/^[wfcvtr]$/.test(p.ty)?p.ty:"v",tier:[1,2,3].indexOf(+p.tier)>-1?+p.tier:2,
  why:t(p.why)+" <i class='mut'>(Yapay zekâ önerisi, doğrulanmadı.)</i>",water:t(p.water),route:t(p.route),risk:t(p.risk)||"Doğrulanmadı."}}
function places(){var u=store.get("uplaces",[]);return D.places.concat((Array.isArray(u)?u:[]).slice(0,80).map(sanU).filter(Boolean))}
function avoids(){var u=store.get("uavoid",[]);return (D.avoid||[]).concat((Array.isArray(u)?u:[]).slice(0,40).map(function(a){var la=num(a&&a.lat,90),lo=num(a&&a.lon,180);return la==null||lo==null?null:{lat:la,lon:lo}}).filter(Boolean))}
var stops = []; // açık sensör/zamanlayıcıları sayfa değişince kapat
function cleanup(){stops.forEach(function(f){try{f()}catch(e){}});stops=[]}

/* ---------- İkonlar (inline SVG, çizgi stili) ---------- */
var P = {
  sos:'<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17v.5"/>',
  book:'<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-1 .2"/><path d="M20 4v14h-7"/>',
  pin:'<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  check:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 5-6"/>',
  plan:'<path d="M4 5h16M4 12h10M4 19h7"/><circle cx="18" cy="17" r="3"/>',
  tool:'<path d="M14 6a4 4 0 0 0 5 5l-8 8a2 2 0 0 1-3-3z"/><path d="M5 5l3 3"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  moon:'<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z"/>',
  back:'<path d="M15 5 8 12l7 7"/>',
  search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4-4"/>',
  drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
  fire:'<path d="M12 21c4 0 6-3 6-6 0-4-3-5-3-9-2 1-4 3-4 6-1-1-2-2-2-4-2 2-3 4-3 7 0 3 2 6 6 6z"/>',
  tent:'<path d="M3 20 12 4l9 16z"/><path d="M12 4v16M9 20l3-5 3 5"/>',
  heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/><path d="M7 11h3l1-2 2 4 1-2h3"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  food:'<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 3-3 6s1 4 3 4v8"/>',
  knot:'<path d="M4 16c4 0 4-8 8-8s4 8 8 8"/><path d="M4 8c4 0 4 8 8 8s4-8 8-8"/>',
  radio:'<rect x="4" y="9" width="16" height="12" rx="2"/><path d="M8 9 17 3"/><circle cx="9" cy="15" r="2"/><path d="M14 14h3M14 17h3"/>',
  quake:'<path d="M2 12h4l2-5 3 10 3-8 2 3h6"/>',
  wave:'<path d="M2 15c3 0 3-3 6-3s3 3 6 3 3-3 6-3"/><path d="M2 20c3 0 3-3 6-3s3 3 6 3 3-3 6-3"/><path d="M12 3v7M9 7l3 3 3-3"/>',
  snow:'<path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10"/>',
  bio:'<circle cx="12" cy="12" r="3"/><path d="M12 9V3M9.4 13.5 4.2 16.5M14.6 13.5l5.2 3"/><circle cx="12" cy="12" r="9"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
  brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  leaf:'<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19 13 11"/>',
  star:'<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
  flash:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  steps:'<path d="M8 3c2 0 3 2 3 5s-1 5-3 5-3-2-3-5 1-5 3-5zM6 16h4v3a2 2 0 0 1-4 0zM16 7c2 0 3 2 3 5s-1 5-3 5-3-2-3-5 1-5 3-5z"/>',
  battery:'<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10v4M6 10v4"/>',
  map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
  cave:'<path d="M2 20c2-9 6-14 10-14s8 5 10 14"/><path d="M8 20c1-4 2-6 4-6s3 2 4 6"/>',
  home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  bandage:'<rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M10 12h.01M12 10h.01M14 12h.01M12 14h.01"/>',
  bone:'<path d="M6 8a2 2 0 1 1 2-3l9 9a2 2 0 1 1 3 2 2 2 0 1 1-3 2l-9-9a2 2 0 1 1-2-1z"/>',
  snake:'<path d="M4 18c3 0 3-4 6-4s3 4 6 4 4-3 4-6-2-5-5-5H9"/><circle cx="7" cy="7" r="2"/>',
  thermo:'<path d="M10 4a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
  lung:'<path d="M12 4v8M12 12c-2 0-3-1-4-3-2 1-4 5-4 9 0 2 2 2 4 1s4-3 4-7M12 12c2 0 3-1 4-3 2 1 4 5 4 9 0 2-2 2-4 1s-4-3-4-7"/>',
  doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 19v1M17 19v1"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
  bag:'<rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2M9 13h6"/>',
  city:'<path d="M3 21V9l5-3v15M8 21V4h8v17M16 21v-9l5 2v7M11 8h2M11 12h2M11 16h2"/>',
  sms:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>'
};
function ic(n,c){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'+(c?' class="'+c+'"':'')+'>'+(P[n]||P.book)+'</svg>'}
window.HKic = ic;
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

/* ---------- Coğrafya yardımcıları ---------- */
function rad(d){return d*Math.PI/180}
function dist(a,b){var R=6371,dLa=rad(b.lat-a.lat),dLo=rad(b.lon-a.lon);var h=Math.sin(dLa/2)*Math.sin(dLa/2)+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLo/2)*Math.sin(dLo/2);return 2*R*Math.asin(Math.sqrt(h))}
function brg(a,b){var y=Math.sin(rad(b.lon-a.lon))*Math.cos(rad(b.lat));var x=Math.cos(rad(a.lat))*Math.sin(rad(b.lat))-Math.sin(rad(a.lat))*Math.cos(rad(b.lat))*Math.cos(rad(b.lon-a.lon));return (Math.atan2(y,x)*180/Math.PI+360)%360}
var DIRS=["K","KKD","KD","DKD","D","DGD","GD","GGD","G","GGB","GB","BGB","B","BKB","KB","KKB"];
function dir(b){return DIRS[Math.round(b/22.5)%16]}
function days(km){var walk=km*1.3; /* yol kıvrımı payı */ return walk<20?"<1 gün":(walk/22).toFixed(1).replace(".",",")+" gün"}
function omMap(ps){return "om://map?v=1"+ps.map(function(p){return "&ll="+p.lat+","+p.lon+"&n="+encodeURIComponent(p.n)}).join("")}
window.HKom=omMap;
function origin(){var g=lf();return (store.get("useGps",false)&&g)?{lat:g.lat,lon:g.lon,name:"Son GPS konumu"}:home()}

/* ---------- GPS: tek seferlik okuma (sürekli takip yok = pil dostu) ---------- */
function fix(cb){
  if(!navigator.geolocation){cb(null,"Bu cihazda konum özelliği yok.");return}
  navigator.geolocation.getCurrentPosition(function(p){
    var f={lat:+p.coords.latitude.toFixed(5),lon:+p.coords.longitude.toFixed(5),acc:Math.round(p.coords.accuracy),alt:p.coords.altitude==null?null:Math.round(p.coords.altitude),t:Date.now()};
    store.set("lastfix",f);cb(f);
  },function(e){cb(null,e.code===1?"Konum izni verilmedi.":"Konum alınamadı. Açık alana çık, 1–2 dakika bekle ve yeniden dene.")},{enableHighAccuracy:true,timeout:90000,maximumAge:60000});
}
function fmtTime(t){var d=new Date(t);return d.toLocaleString("tr-TR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}

/* ---------- Güneş doğuş / batış (NOAA basit algoritma) ---------- */
function sunTimes(date,lat,lon){
  var start=new Date(date.getFullYear(),0,0),N=Math.floor((date-start)/864e5);
  function calc(rise){
    var lngHour=lon/15,t=N+((rise?6:18)-lngHour)/24;
    var M=0.9856*t-3.289;
    var L=(M+1.916*Math.sin(rad(M))+0.020*Math.sin(rad(2*M))+282.634)%360; if(L<0)L+=360;
    var RA=Math.atan(0.91764*Math.tan(rad(L)))*180/Math.PI; RA=(RA+360)%360;
    RA=RA+(Math.floor(L/90)*90-Math.floor(RA/90)*90); RA/=15;
    var sinDec=0.39782*Math.sin(rad(L)),cosDec=Math.cos(Math.asin(sinDec));
    var cosH=(Math.cos(rad(90.833))-sinDec*Math.sin(rad(lat)))/(cosDec*Math.cos(rad(lat)));
    if(cosH>1||cosH<-1)return null;
    var H=rise?360-Math.acos(cosH)*180/Math.PI:Math.acos(cosH)*180/Math.PI; H/=15;
    var T=H+RA-0.06571*t-6.622, UT=((T-lngHour)%24+24)%24;
    var d=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0));
    return new Date(d.getTime()+UT*36e5);
  }
  return {rise:calc(true),set:calc(false)};
}

/* ---------- Ortak parçalar ---------- */
function setHead(t,s,back){
  titleEl.textContent=t; subEl.textContent=s||"HAZIRKAL · çevrimdışı";
  $("#bk").style.display=back?"":"none";
}
function tabOn(n){Array.prototype.forEach.call(document.querySelectorAll("nav.tabs a"),function(a){a.classList.toggle("on",a.getAttribute("data-t")===n)})}
function tile(href,icon,t,s,cls){return '<a class="tile '+(cls||"")+'" href="'+href+'">'+ic(icon)+'<b>'+t+'</b>'+(s?'<small class="mut">'+s+'</small>':'')+'</a>'}
function item(href,icon,t,s){return '<a class="item" href="'+href+'">'+ic(icon)+'<div class="f"><b>'+t+'</b>'+(s?'<small class="mut">'+s+'</small>':'')+'</div><span class="chev">›</span></a>'}
var TYPE={w:"Su",f:"Orman",c:"Mağara/Kaya",v:"Köy/Yerleşim",t:"Kaplıca",r:"Buluşma"};

/* ---------- SAYFALAR ---------- */
var R = {};

var ROLES={
 lider:{t:"Lider",c:"#c9a54b",ic:"star",d:"Karar verir, alarm seviyesini ilan eder, yoklama alır",l:[["#/plan/karar","plan","Kal mı, git mi?"],["#/plan/seviye","shield","Alarm seviyesi ilan et"],["#/team","sms","Ekibe yoklama SMS'i"],["#/plan/tahliye","map","Tahliye planı"]]},
 saglik:{t:"Sağlık",c:"#d0453a",ic:"heart",d:"Yaralıya ilk o bakar; ilaçlardan ve ilk yardım çantasından sorumludur",l:[["#/g/ilkadim","shield","İlk adımlar ve 112"],["#/g/triyaj","users","Çok yaralı: triyaj"],["#/tools/kpr","heart","Sesli KPR koçu"],["#/med","doc","Ekibin sağlık bilgisi"],["#/c/ilkyardim","check","İlk yardım çantası"]]},
 guvenlik:{t:"Güvenlik",c:"#e08a2e",ic:"shield",d:"Nöbet tutar, yangın ve gaz kontrolü yapar, yürüyüşte en arkadan gelir",l:[["#/g/griadam","city","Kentte güvenlik"],["#/g/gizlen","shield","Görünmeden hareket"],["#/g/arama","city","Enkaz: arama-kurtarma"],["#/g/zehir","bio","Gaz ve karbonmonoksit"]]},
 rehber:{t:"Rehber",c:"#6e93b8",ic:"compass",d:"Rotayı belirler, harita ve pusulayı kullanır, yürüyüşte en önden gider",l:[["#/p","pin","Güvenli yerler"],["#/tools/compass","compass","Pusula"],["#/tools/gps","pin","Konumum"],["#/tools/sun","sun","Gün ışığı"]]},
 erzak:{t:"Erzak",c:"#7f8f4e",ic:"food",d:"Su, yiyecek ve yakıttan sorumludur, stok sayımı yapar",l:[["#/tools/ration","food","Erzak hesabı"],["#/tools/water","drop","Su arıtma hesabı"],["#/plan/sukesinti","drop","Su kesintisi planı"],["#/c/ev","home","Ev stoğu listesi"]]}
};
function team(){var t=store.get("team",null);if(!Array.isArray(t))t=[];t=t.filter(function(m){return m&&typeof m==="object"}).slice(0,10);while(t.length<3)t.push({ad:"",tel:"",kan:"",rol:"",not:"",roles:[]});
 t.forEach(function(m){["ad","tel","kan","rol","not"].forEach(function(k){m[k]=String(m[k]==null?"":m[k]).slice(0,400)});m.tel=m.tel.replace(/[^\d+]/g,"").slice(0,20);m.roles=Array.isArray(m.roles)?m.roles.filter(function(r){return ROLES.hasOwnProperty(r)}):[]});return t}
function roleChips(rs){return (rs||[]).map(function(r){var x=ROLES[r];return x?'<span class="rchip" style="--rc:'+x.c+'">'+x.t+'</span>':''}).join("")}
function setupGaps(){var t=team().filter(function(m){return m.ad}),g=[];if(!store.get("home",null))g.push("ev konumu");if(t.length<3)g.push("ekip "+t.length+"/3");if(!(team()[0].roles||[]).length)g.push("rolün");return g}
R[""] = function(){ // ACİL ana ekran
  setHead("ACİL","Önce nefes al · Dur, Düşün, Gözle, Planla");tabOn("sos");
  var q=["kanama","kpr","bogulma","bilincsiz","kalp","nobet","astim","anafilaksi","deprem","yanik","kirik","hipotermi","yilan","triyaj"].map(function(id){return D.guide.filter(function(g){return g.id===id})[0]}).filter(Boolean),me=team()[0],gaps=setupGaps();
  var h='<a class="sosbig" href="tel:112">112 · ACİL ÇAĞRI</a><p class="mut" style="font-size:.85em;margin:4px 0 10px;text-align:center">Ambulans, itfaiye, polis, jandarma, AFAD, orman yangını ve sahil güvenlik için tek numara: <b>112</b> · Zehir Danışma Merkezi: <a href="tel:114"><b>114</b></a></p>';
  h+='<div class="card warn"><b>Önce kendi güvenliğini sağla.</b> Yangın, gaz, çökme, trafik ya da elektrik tehlikesi var mı, bak. Sonra yaralıya bak, sonra yardım çağır. Arama geçmiyorsa <b>SMS</b> at. → <a href="#/g/ilkadim">İlk adımlar ve 112\'ye ne söylenir</a></div>';
  var now=Date.now(),upd=+store.get("upd",0);if(!upd){store.set("upd",now);upd=now}
  if(now-upd>90*864e5)h+='<div class="card info"><b>Güncelleme zamanı.</b> Son hatırlatmadan bu yana 3 ay geçti. İnternet varken <b>'+esc((D.SITE||"https://hazirkal.com").replace(/^https?:\/\//,""))+'</b> adresine bak; yeni sürüm ve düzeltmeler orada yayımlanır. Uygulama kendiliğinden internete bağlanmaz. <button class="btn" id="upk">Tamam, baktım</button></div>';
  h+=kurBilgi();
  if(!D.ilKod())h+='<a class="card info setupbar" href="#/il">'+ic("pin")+'<span><b>İlini seç:</b> canlı türleri, iklim ve deprem bilgileri iline göre gösterilsin ›</span></a>';
  if(gaps.length&&!store.get("setupDone",false))h+='<a class="card info setupbar" href="#/setup">'+ic("users")+'<span><b>Kurulumu tamamla:</b> '+gaps.join(", ")+' eksik ›</span></a>';
  (me.roles||[]).forEach(function(r){var x=ROLES[r];if(!x)return;h+='<h2 style="color:'+x.c+'">Görevin: '+x.t+'</h2><div class="grid">';x.l.forEach(function(l){h+=tile(l[0],l[1],l[2],"","role")});h+='</div>'});
  h+='<h2>Hızlı ilk yardım</h2><div class="grid">';
  q.forEach(function(g){h+=tile("#/g/"+g.id,g.ic,g.t,g.d,"red")});
  h+='</div><h2>Hemen</h2><div class="grid">';
  h+=tile("#/team","sms","Ekibe SMS","Konumunu tek dokunuşla gönder");
  h+=tile("#/g/krizmodu","battery","Kriz modu","Telefonu 2G'ye ve tasarruf moduna al");
  h+=tile("#/tools/torch","flash","Fener / SOS","Işık ve Mors sinyali");
  h+=tile("#/plan/karar","plan","Kal mı, git mi?","Karar ağacı");
  h+='</div><div class="foot">Pilin en uzun dayanması için uçak modunu aç ve yalnızca bu uygulamayı kullan. <a href="#/battery">Pil rehberi</a></div>';
  main.innerHTML=h;  if($("#upk"))$("#upk").onclick=function(){store.set("upd",Date.now());R[""]()};
  kurBagla();
};
R["g"] = function(){ // Rehber dizini + arama
  setHead("REHBER","Tüm bilgiler internetsiz");tabOn("g");
  var h='<input class="search" id="q" placeholder="Ara: su, kanama, düğüm, yılan, deprem…" autocomplete="off"><div id="res"></div><div id="idx">';
  D.cats.forEach(function(c){
    var gs=D.guide.filter(function(g){return g.cat===c.id});if(!gs.length)return;
    var op=store.get("gopen",{})[c.id];
    h+='<details class="cat" data-c="'+c.id+'"'+(op?' open':'')+'><summary><b>'+c.t+'</b><small class="mut">'+gs.length+'</small><span class="chev">›</span></summary><div class="list">';
    gs.forEach(function(g){h+=item("#/g/"+g.id,g.ic,g.t,g.d)});
    h+='</div></details>';
  });
  h+='</div>';main.innerHTML=h;
  Array.prototype.forEach.call(document.querySelectorAll("details.cat"),function(d){d.addEventListener("toggle",function(){var o=store.get("gopen",{});o[d.getAttribute("data-c")]=d.open?1:0;store.set("gopen",o)})});
  var q=$("#q"),res=$("#res"),idx=$("#idx");
  q.addEventListener("input",function(){
    var s=q.value.trim().toLocaleLowerCase("tr");
    if(s.length<2){res.innerHTML="";idx.style.display="";return}
    idx.style.display="none";
    var out=[];
    D.guide.forEach(function(g){var txt=(g.t+" "+g.d+" "+g.h.replace(/<[^>]+>/g," ")).toLocaleLowerCase("tr");if(txt.indexOf(s)>-1)out.push(item("#/g/"+g.id,g.ic,g.t,g.d))});
    places().forEach(function(p){if((p.n+" "+p.why+" "+p.ilce).toLocaleLowerCase("tr").indexOf(s)>-1)out.push(item("#/p/"+p.id,"pin",p.n,TYPE[p.ty]+" · "+p.ilce))});
    D.lists.forEach(function(l){l.g.forEach(function(gr){gr.i.forEach(function(it){if(it.toLocaleLowerCase("tr").indexOf(s)>-1)out.push(item("#/c/"+l.id,"check",it.replace(/\|.*/,""),l.t))})})});
    res.innerHTML=out.length?'<div class="list">'+out.slice(0,60).join("")+'</div>':'<p class="mut">Sonuç yok.</p>';
  });
};
R["g/*"] = function(id){
  var g=D.guide.filter(function(x){return x.id===id})[0];if(!g)return R[""]();
  setHead(g.t,(D.cats.filter(function(c){return c.id===g.cat})[0]||{t:"Rehber"}).t,true);tabOn(g.sos?"sos":"g");
  main.innerHTML='<p class="mut">'+g.d+'</p>'+g.h+(g.src?'<p class="foot">Kaynak: '+g.src+'</p>':'');
};

R["p"] = function(){ // Yerler
  setHead("GÜVENLİ YERLER",short()+" çevresi · yürüme mesafesi");tabOn("p");
  var o=origin(),f=store.get("pf","all");
  var ps=places().map(function(p){var x=Object.assign({},p);x.km=dist(o,p);x.b=brg(o,p);return x}).sort(function(a,b){return a.km-b.km});
  var h='<div class="card info">Mesafeler <b>'+esc(o.name)+'</b> noktasından kuş uçuşu ölçülür. Yürüme süresi günde ~22 km ve %30 yol payıyla hesaplanır. Yönler: K Kuzey, D Doğu, G Güney, B Batı. ★ birincil hedef demektir: su, odun ve örtü bir arada bulunur.</div>';
  h+='<div class="btns"><a class="btn" href="#/map">'+ic("map")+' Şema harita</a><a class="btn" href="#/ai">'+ic("star")+' Yapay zekâ ile ekle</a><button class="btn" id="gp">'+ic("pin")+(store.get("useGps",false)?" "+esc(short())+" noktasına göre":" GPS'e göre")+'</button></div>';
  h+='<div class="chips">';[["all","Tümü"],["t1","★ Birincil"],["w","Su"],["f","Orman"],["c","Mağara"],["v","Köy"],["t","Kaplıca"],["r","Buluşma"]].forEach(function(c){h+='<span class="chip'+(f===c[0]?" on":"")+'" data-f="'+c[0]+'">'+c[1]+'</span>'});h+='</div><div class="list">';
  ps.forEach(function(p){if(f==="t1"){if(p.tier!==1)return}else if(f!=="all"&&p.ty!==f&&(p.ty2||"")!==f)return;
    h+='<a class="item" href="#/p/'+p.id+'">'+ic(p.ty==="w"?"drop":p.ty==="f"?"leaf":p.ty==="c"?"cave":p.ty==="t"?"thermo":p.ty==="r"?"users":"home")+'<div class="f"><b>'+p.n+(p.tier===1?' <span style="color:var(--ac)">★</span>':'')+'</b><small class="mut">'+Math.round(p.km)+' km '+dir(p.b)+' · '+days(p.km)+' · '+p.ilce+'</small></div><span class="tag '+p.ty+'">'+TYPE[p.ty]+'</span></a>'});
  h+='</div>';if(!ps.length)h+='<div class="card tip"><b>Henüz kaçış noktan yok.</b> İnternet varken evinin çevresindeki su, orman, köy ve buluşma noktalarını kendi yapay zekâ uygulamanla bulup <a href="#/ai">yapay zekâ ile ekle</a> sayfasından yükle. Sonra her noktayı Organic Maps\'te kontrol et. İlk buluşma noktan olarak e-Devlet › AFAD Acil Toplanma Alanı sorgusunda çıkan yeri seç.</div>';main.innerHTML=h;
  Array.prototype.forEach.call(document.querySelectorAll(".chip"),function(c){c.onclick=function(){store.set("pf",c.getAttribute("data-f"));R.p()}});
  $("#gp").onclick=function(){
    if(store.get("useGps",false)){store.set("useGps",false);R.p();return}
    $("#gp").textContent="Konum alınıyor…";
    fix(function(f,err){if(!f){alert(err);R.p();return}store.set("useGps",true);R.p()});
  };
};
R["p/*"] = function(id){
  var p=places().filter(function(x){return x.id===id})[0];if(!p)return R.p();
  var o=origin(),km=dist(o,p),b=brg(o,p);
  setHead(p.n,TYPE[p.ty]+" · "+p.ilce,true);tabOn("p");
  var h='<div class="row"><div class="f"><div class="big">'+Math.round(km)+' km</div><small class="mut">'+esc(o.name)+' noktasından · yön '+Math.round(b)+'° '+dir(b)+' · yürüyüş '+days(km)+'</small></div></div>';
  h+='<dl class="kv" style="margin-top:10px"><dt>Koordinat</dt><dd class="mono">'+p.lat.toFixed(4)+', '+p.lon.toFixed(4)+'</dd>'+(p.alt?'<dt>Rakım</dt><dd>~'+p.alt+' m</dd>':'')+'<dt>Tür</dt><dd>'+TYPE[p.ty]+(p.ty2?" + "+TYPE[p.ty2]:"")+'</dd><dt>Değer</dt><dd>'+["","★ Birincil hedef","İkincil / ara durak","Geçiş veya kısıtlı"][p.tier]+'</dd></dl>'+(p.acc==="Y"?'<div class="card info" style="font-size:.85em">Koordinat <b>yaklaşıktır</b>. İnternet varken Organic Maps\'te kontrol et, doğru konumu not al.</div>':'');
  h+='<h2>Neden</h2><p>'+p.why+'</p>';
  if(p.water)h+='<h2>Su</h2><p>'+p.water+'</p>';
  if(p.route)h+='<h2>Güzergâh</h2><p>'+p.route+'</p>';
  h+='<div class="card warn"><b>Riskler:</b> '+p.risk+'</div>';
  var st0=lf(),me=(st0&&Date.now()-st0.t<6*36e5)?{lat:st0.lat,lon:st0.lon,n:"Konumum"}:{lat:home().lat,lon:home().lon,n:short()};
  h+='<div class="btns"><a class="btn pri" href="'+omMap([p])+'">'+ic("map")+' Organic Maps\'te göster</a><a class="btn pri" href="om://route?sll='+me.lat+','+me.lon+'&saddr='+encodeURIComponent(me.n)+'&dll='+p.lat+','+p.lon+'&daddr='+encodeURIComponent(p.n)+'&type=pedestrian">'+ic("steps")+' Yürüyüş rotası</a><a class="btn" href="#/tools/compass?to='+p.id+'">'+ic("compass")+' Pusula ile yön</a><a class="btn" href="geo:'+p.lat+','+p.lon+'?q='+p.lat+','+p.lon+'">Diğer harita</a></div>';
  h+='<p class="mut" style="font-size:.85em">Son 6 saat içinde konum aldıysan rota bulunduğun yerden, almadıysan ev konumundan başlar. Organic Maps, Türkiye haritası indirilmişse internetsiz çalışır.</p>';
  if(p.src)h+='<p class="foot">Kaynak: '+p.src+'</p>';
  if(p.ai)h+='<p class="foot">Bu nokta yapay zekâdan içe aktarıldı ve doğrulanmadı. <a href="#/ai">Yapay zekâ ile yerler</a></p>';
  main.innerHTML=h;
};

R["map"] = function(){ // Şema harita: ev merkezli, mesafe halkaları
  var z=store.get("mz",0),RINGS=z?[10,20,30,40,50,60]:[25,50,75,100,125];
  setHead("ŞEMA HARİTA",short()+" merkez · halkalar "+(z?10:25)+" km",true);tabOn("p");
  var W=360,C=180,S=z?2.8:1.25; // 1 km kaç piksel
  var h='<div class="chips"><span class="chip'+(z?"":" on")+'" data-z="0">Tümü (140 km)</span><span class="chip'+(z?" on":"")+'" data-z="1">Yakın (60 km)</span></div><div class="fig"><svg viewBox="0 0 360 360" style="max-height:none">';
  RINGS.forEach(function(k){h+='<circle cx="'+C+'" cy="'+C+'" r="'+(k*S)+'" fill="none" stroke="var(--line)" stroke-dasharray="'+(k%(z?20:50)?"2 4":"0")+'"/><text x="'+(C+3)+'" y="'+(C-k*S+10)+'" font-size="8" fill="var(--dim)">'+k+'</text>'});
  h+='<path d="M'+C+' 8v344M8 '+C+'h344" stroke="var(--line)"/><text x="'+C+'" y="10" font-size="11" fill="var(--ac)" text-anchor="middle" font-weight="700">K</text>';
  // gün halkası etiketleri
  h+='<text x="8" y="352" font-size="8" fill="var(--dim)">1 yürüyüş günü ≈ 17 km kuş uçuşu</text>';
  (store.get("home",null)?[]:(D.mapLines||[])).forEach(function(l){var pts=l.p.map(function(q){var km=dist(home(),{lat:q[0],lon:q[1]}),b=rad(brg(home(),{lat:q[0],lon:q[1]}));return (C+Math.sin(b)*km*S).toFixed(1)+","+(C-Math.cos(b)*km*S).toFixed(1)}).join(" ");h+='<polyline points="'+pts+'" fill="none" stroke="'+l.c+'" stroke-width="'+(l.w||1.2)+'" '+(l.d?'stroke-dasharray="'+l.d+'"':'')+' opacity=".8"/>'+(l.lab?'<text x="'+pts.split(" ")[l.li||0].split(",")[0]+'" y="'+(+pts.split(" ")[l.li||0].split(",")[1]-3)+'" font-size="7" fill="'+l.c+'">'+l.lab+'</text>':'')});
  var col={w:"#6e93b8",f:"#7f8f4e",c:"#c9a54b",v:"#b9a58a",t:"#c98a5a",r:"#d0453a"};
  places().forEach(function(p){var km=dist(home(),p),b=rad(brg(home(),p));if(km*S>175)return;var x=C+Math.sin(b)*km*S,y=C-Math.cos(b)*km*S;
    h+='<a href="#/p/'+p.id+'"><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="'+col[p.ty]+'"/><text x="'+(x+5).toFixed(1)+'" y="'+(y+3).toFixed(1)+'" font-size="'+(z?9:7.5)+'" fill="var(--tx)">'+(p.short||p.n)+'</text></a>'});
  var me=lf();if(me){var mk=dist(home(),me),mb=rad(brg(home(),me)),mx=C+Math.sin(mb)*mk*S,my=C-Math.cos(mb)*mk*S;if(mk*S<175)h+='<circle cx="'+mx.toFixed(1)+'" cy="'+my.toFixed(1)+'" r="6" fill="none" stroke="#fff" stroke-width="2"/><text x="'+(mx+8).toFixed(1)+'" y="'+(my-6).toFixed(1)+'" font-size="9" fill="#fff">SEN</text>'}
  avoids().forEach(function(a){var km=dist(home(),a),b=rad(brg(home(),a)),x=C+Math.sin(b)*km*S,y=C-Math.cos(b)*km*S;h+='<path d="M'+(x-3.5)+' '+(y-3.5)+'l7 7m0-7l-7 7" stroke="#d0453a" stroke-width="1.6"/>'});
  h+='<circle cx="'+C+'" cy="'+C+'" r="5" fill="none" stroke="var(--ac)" stroke-width="2"/><text x="'+(C+7)+'" y="'+(C+12)+'" font-size="8" fill="var(--ac)">'+esc(short())+'</text></svg>';
  h+='<small>Renkler: mavi su, yeşil orman, sarı mağara ya da kaya, bej köy, turuncu kaplıca, kırmızı nokta buluşma yeri. Kırmızı ✕ askerî tesis ya da kaçınılacak başka bir yerdir: <u>yaklaşma.</u> Çizgiler otoyolların ve nehirlerin yönünü kabaca gösterir. Bu şema yol bulmak için değil, yönü ve mesafeyi kestirmek içindir.</small></div>';
  h+='<a class="btn pri full" href="'+omMap(places())+'">'+ic("map")+' Tüm noktaları Organic Maps\'te aç</a>';
  h+='<div class="card tip">Gerçek yürüyüş haritası için internet varken Organic Maps\'e Türkiye haritasını indir. Bir noktaya dokunursan ayrıntıları açılır. Son GPS konumun beyaz halkayla (SEN) gösterilir. Kâğıt harita ve pusulayı her zaman yedek olarak yanında taşı.</div>';
  main.innerHTML=h;
  Array.prototype.forEach.call(document.querySelectorAll("[data-z]"),function(c){c.onclick=function(){store.set("mz",+c.getAttribute("data-z"));R.map()}});
};

R["c"] = function(){ // Listeler
  setHead("LİSTELER","İşaretler bu telefonda saklanır");tabOn("c");
  var h='';
  D.lists.forEach(function(l){var st=store.get("ck_"+l.id,{}),n=0,d=0;l.g.forEach(function(g){g.i.forEach(function(it,i){n++;if(st[g.n+"|"+i])d++})});
    h+='<a class="item" href="#/c/'+l.id+'" style="display:block;padding:12px 2px;border-bottom:1px solid var(--line);text-decoration:none;color:var(--tx)"><div class="row">'+ic(l.ic)+'<div class="f"><b>'+l.t+'</b><small class="mut" style="display:block">'+l.d+'</small></div><small class="mut">'+d+'/'+n+'</small></div><div class="bar"><i style="width:'+(n?Math.round(d/n*100):0)+'%"></i></div></a>'});
  main.innerHTML='<div class="list">'+h+'</div>';
};
R["c/*"] = function(id){
  var l=D.lists.filter(function(x){return x.id===id})[0];if(!l)return R.c();
  setHead(l.t,l.d,true);tabOn("c");
  var st=store.get("ck_"+l.id,{});
  function draw(){
    var n=0,d=0,h='';
    l.g.forEach(function(g){h+='<h2>'+g.n+'</h2>';g.i.forEach(function(it,i){n++;var k=g.n+"|"+i,on=!!st[k];if(on)d++;var p=it.split("|");
      h+='<div class="ck'+(on?" on":"")+'" data-k="'+esc(k)+'"><div class="bx"></div><div class="tx">'+p[0]+(p[1]?'<small class="mut">'+p[1]+'</small>':'')+'</div></div>'})});
    var top='<div class="row"><div class="f"><div class="bar"><i style="width:'+(n?Math.round(d/n*100):0)+'%"></i></div></div><b>'+d+'/'+n+'</b></div>'+(l.note?'<div class="card tip">'+l.note+'</div>':'');
    main.innerHTML=top+h+'<div class="btns"><button class="btn" id="rs">Sıfırla</button><button class="btn" id="ms">Eksikleri SMS ile paylaş</button></div>';
    Array.prototype.forEach.call(document.querySelectorAll(".ck"),function(e){e.onclick=function(){var k=e.getAttribute("data-k");if(st[k])delete st[k];else st[k]=1;store.set("ck_"+l.id,st);draw();}});
    $("#rs").onclick=function(){if(confirm("Bu listedeki tüm işaretler silinsin mi?")){st={};store.set("ck_"+l.id,st);draw()}};
    $("#ms").onclick=function(){var miss=[];l.g.forEach(function(g){g.i.forEach(function(it,i){if(!st[g.n+"|"+i])miss.push("- "+it.split("|")[0])})});location.href="sms:?body="+encodeURIComponent(l.t+": eksikler\n"+miss.slice(0,25).join("\n"))};
  }
  draw();
};

R["plan"] = function(){
  setHead("PLANLAR","Kısa, orta ve uzun süreli");tabOn("plan");
  var h='<div class="grid">'+tile("#/team","users","Ekip kartı","Roller, telefon, kan grubu")+tile("#/vault","shield","Belge kasası","Sigorta, DASK, reçete · şifreli")+tile("#/setup","map","Kurulum","Konum, ekip, yapay zekâ ile yerler")+tile("#/rally","pin","Buluşma noktaları","RP1, RP2, RP3 ve kod sözcükler")+tile("#/card","doc","Cep kartı","Yazdır, lamine et, cüzdanda taşı")+tile("#/g/analiz","brain","Plan eleştirisi","Uzmanlar ne diyor?")+'</div><div class="list" style="margin-top:8px">';
  D.plans.forEach(function(p){h+=item("#/plan/"+p.id,p.ic,p.t,p.d)});
  main.innerHTML=h+'</div>';
};
R["plan/*"] = function(id){
  var p=D.plans.filter(function(x){return x.id===id})[0];if(!p)return R.plan();
  setHead(p.t,p.d,true);tabOn("plan");main.innerHTML=p.h;
};

/* ---------- Ekip ---------- */
var TEAM_DEF=[];
function memberForm(m,i){var h='<label class="lb">Ad'+(i===0?' (sen)':'')+'</label><input class="in" id="e_ad" value="'+esc(m.ad)+'" autocomplete="off"><label class="lb">Telefon</label><input class="in" id="e_tel" type="tel" value="'+esc(m.tel)+'"><label class="lb">Roller (birden fazla seçebilirsin)</label><div class="chips" id="e_roles">';
  Object.keys(ROLES).forEach(function(r){h+='<span class="chip'+((m.roles||[]).indexOf(r)>-1?" on":"")+'" data-r="'+r+'" title="'+ROLES[r].d+'">'+ROLES[r].t+'</span>'});
  h+='</div><small class="mut" id="e_rd"></small><label class="lb">Kan grubu</label><input class="in" id="e_kan" value="'+esc(m.kan)+'" placeholder="0 Rh+"><label class="lb">Beceri</label><input class="in" id="e_rol" value="'+esc(m.rol)+'" placeholder="hemşire, telsizci, tamirci…"><label class="lb">Sağlık notu (alerji, ilaç, hastalık), ulaşılacak yakını, adresi</label><textarea class="in" id="e_not" rows="3">'+esc(m.not)+'</textarea>';
  return h}
function bindRoles(){Array.prototype.forEach.call(document.querySelectorAll("#e_roles .chip"),function(c){c.onclick=function(){c.classList.toggle("on");$("#e_rd").textContent=ROLES[c.getAttribute("data-r")].d}})}
function readForm(m){["ad","tel","kan","rol","not"].forEach(function(k){m[k]=$("#e_"+k).value.trim()});m.tel=m.tel.replace(/[^\d+ ]/g,"");m.roles=Array.prototype.map.call(document.querySelectorAll("#e_roles .chip.on"),function(c){return c.getAttribute("data-r")})}
R["team"] = function(){
  setHead("EKİP","En az 3, en fazla 10 kişi · bilgiler yalnızca bu telefonda",true);tabOn("plan");
  var t=team(),last=lf(),n=t.filter(function(m){return m.ad}).length;
  var h=(n<3?'<div class="card warn">Ekipte en az <b>3 kişi</b> olmalı (şu an '+n+'). Biri yaralanırsa veya ulaşılamazsa diğerleri işi sürdürür.</div>':'')+'<div class="card info">Şebeke zayıfken <b>sesli arama yerine SMS</b> gönder: mesaj sırada bekler, sinyal gelince gider. Kısa yaz, konumunu ekle.</div>';
  h+='<h2>Hazır mesajlar (tüm ekibe)</h2><div class="btns">';
  D.smsTpl.forEach(function(s,i){h+='<button class="btn" data-s="'+i+'">'+s.t+'</button>'});
  h+='</div><p class="mut" style="font-size:.85em">Mesaja son GPS konumu eklenir'+(last?' ('+fmtTime(last.t)+')':' (henüz konum yok)')+'.</p>';
  h+='<button class="btn full" id="fx">'+ic("pin")+' Şimdi konum al</button><h2>Üyeler</h2>';
  t.forEach(function(m,i){h+='<div class="card"><div class="row"><b class="f">'+(i+1)+'. '+(esc(m.ad)||'<span class="mut">boş</span>')+(i===0?' <small class="mut">(sen)</small>':'')+'</b>'+(m.tel?'<a class="btn" href="tel:'+esc(m.tel)+'">Ara</a><a class="btn" href="sms:'+esc(m.tel)+'">SMS</a>':'')+'<button class="btn" data-e="'+i+'">Düzenle</button></div>'+(m.roles&&m.roles.length?'<div class="rrow">'+roleChips(m.roles)+'</div>':'')+(m.ad?'<small class="mut">'+esc([m.tel,m.kan&&("Kan: "+m.kan),m.rol].filter(Boolean).join(" · "))+'</small>'+(m.not?'<div style="font-size:.85em;margin-top:4px">'+esc(m.not)+'</div>':''):'')+'</div>'});
  if(t.length<10)h+='<button class="btn full" id="add">+ Üye ekle</button>';
  var miss=Object.keys(ROLES).filter(function(r){return !t.some(function(m){return (m.roles||[]).indexOf(r)>-1})});
  if(miss.length)h+='<div class="card tip">Henüz kimseye verilmemiş roller: <b>'+miss.map(function(r){return ROLES[r].t}).join(", ")+'</b>. Her rolün bir sahibi ve bir yedeği olsun.</div>';
  main.innerHTML=h;
  function body(tpl){var l=lf();var loc=l?(" Konum: "+l.lat+","+l.lon+" (±"+l.acc+"m "+fmtTime(l.t)+")"):"";return tpl.replace("{loc}",loc)}
  Array.prototype.forEach.call(document.querySelectorAll("[data-s]"),function(b){b.onclick=function(){var nums=t.slice(1).filter(function(m){return m.tel}).map(function(m){return m.tel.replace(/\s/g,"")}).join(",");location.href="sms:"+nums+"?body="+encodeURIComponent(body(D.smsTpl[+b.getAttribute("data-s")].b))}});
  Array.prototype.forEach.call(document.querySelectorAll("[data-e]"),function(b){b.onclick=function(){edit(+b.getAttribute("data-e"))}});
  if($("#add"))$("#add").onclick=function(){t.push({ad:"",tel:"",kan:"",rol:"",not:"",roles:[]});store.set("team",t);edit(t.length-1)};
  $("#fx").onclick=function(){$("#fx").textContent="Konum alınıyor… (açık alanda daha hızlı)";fix(function(f,e){if(!f)alert(e);R.team()})};
  function edit(i){var m=t[i];
    main.innerHTML='<h2>Üye '+(i+1)+'</h2>'+memberForm(m,i)+'<div class="btns"><button class="btn pri" id="sv">Kaydet</button><button class="btn" id="cn">Vazgeç</button>'+(i>2?'<button class="btn" id="dl">Sil</button>':'')+'</div>';
    bindRoles();
    $("#sv").onclick=function(){readForm(m);store.set("team",t);R.team()};
    $("#cn").onclick=function(){R.team()};
    if($("#dl"))$("#dl").onclick=function(){if(confirm("Bu üye silinsin mi?")){t.splice(i,1);store.set("team",t);R.team()}};
  }
};
R["med"] = function(){
  setHead("EKİP SAĞLIK BİLGİSİ","Sağlık rolü için · sadece bu telefonda",true);tabOn("plan");
  var t=team().filter(function(m){return m.ad});
  main.innerHTML=(t.length?'<div class="tw"><table><tr><th>Kişi</th><th>Kan</th><th>Not (alerji, ilaç, hastalık)</th></tr>'+t.map(function(m){return '<tr><td><b>'+esc(m.ad)+'</b><br><small class="mut">'+esc(m.tel)+'</small></td><td>'+esc(m.kan||"—")+'</td><td>'+esc(m.not||"—")+'</td></tr>'}).join("")+'</table></div>':'<p class="mut">Ekip kartı boş.</p>')+'<div class="card tip">Bilgileri <a href="#/team">Ekip kartı</a> sayfasında güncel tut. Reçete ve raporların fotoğraflarını <a href="#/vault">Belge kasası</a>\'nda sakla.</div>';
};
R["rally"] = function(){
  setHead("BULUŞMA NOKTALARI","Herkes ezbere bilmeli",true);tabOn("plan");
  var r=store.get("rally",D.rallyDef);if(!Array.isArray(r)||!r.every(function(x){return x&&typeof x.k==="string"}))r=JSON.parse(JSON.stringify(D.rallyDef));
  var h='<div class="card tip"><b>Kural:</b> Şebeke yoksa olaydan sonra 1. buluşma noktasına (<b>RP1</b>) git ve <b>2 saat</b> bekle. Sonra not bırakıp <b>RP2</b>’ye geç. Olaydan sonraki <b>6. ve 24. saatte</b> herkes RP2’de olsun. Şehir dışına tahliyede <b>RP3</b>’te buluşun. Her noktada sabit bir "not bırakma yeri" seçin (ör. kapı yanındaki taşın altı). Nota şunları yaz: TARİH-SAAT / KİM / DURUM / NEREYE.</div>';
  r.forEach(function(x,i){h+='<label class="lb">'+esc(x.k)+'</label><input class="in" data-i="'+i+'" value="'+esc(x.v)+'">'});
  h+='<label class="lb">Kod sözcükler (SMS için)</label><textarea class="in" id="kod" rows="5">'+esc(store.get("kod",D.codeDef))+'</textarea><div class="btns"><button class="btn pri" id="sv">Kaydet</button></div>';
  main.innerHTML=h;
  $("#sv").onclick=function(){Array.prototype.forEach.call(document.querySelectorAll("[data-i]"),function(e){r[+e.getAttribute("data-i")].v=e.value});store.set("rally",r);store.set("kod",$("#kod").value);alert("Kaydedildi")};
};

/* ---------- Araçlar ---------- */
R["tools"] = function(){
  setHead("ARAÇLAR","Sensörler yalnızca sayfa açıkken çalışır");tabOn("tools");
  main.innerHTML='<div class="grid">'+tile("#/tools/gps","pin","Konumum","Koordinat, rakım, son konum")+tile("#/tools/compass","compass","Pusula","Hedefin yönünü gösterir")+tile("#/tools/sun","sun","Gün ışığı","Doğuş, batış, kalan süre")+tile("#/tools/torch","flash","Fener","Flaş ya da ekran ışığı")+tile("#/tools/morse","flash","Mors / SOS","Ekran ışığıyla sinyal")+tile("#/tools/kpr","heart","Sesli KPR koçu","Ritim ve sesli komut")+tile("#/tools/nefes","brain","Sakinleş","Sesli kutu nefesi")+tile("#/tools/water","drop","Su arıtma","Çamaşır suyu damla hesabı")+tile("#/tools/pace","steps","Adım sayacı","Mesafe tahmini")+tile("#/tools/ration","food","Erzak hesabı","Kişi ve güne göre su, kalori")+tile("#/battery","battery","Pil rehberi","En güçlü tasarruf ayarları")+'</div>';
};
R["tools/gps"] = function(){
  setHead("KONUMUM","GPS uydudan çalışır, internet gerekmez",true);tabOn("tools");
  var l=lf();
  var h='<button class="btn pri full" id="go">'+ic("pin")+' Konum al</button><div id="out">';
  if(l){var k=dist(home(),l),b=brg(home(),l);h+='<h2>Son konum</h2><div class="big mono" style="font-size:1.6em">'+l.lat.toFixed(5)+'<br>'+l.lon.toFixed(5)+'</div><dl class="kv"><dt>Doğruluk</dt><dd>±'+l.acc+' m</dd><dt>Rakım</dt><dd>'+(l.alt==null?"—":l.alt+" m")+'</dd><dt>Zaman</dt><dd>'+fmtTime(l.t)+'</dd><dt>Eve</dt><dd>'+k.toFixed(1)+' km, '+dir((b+180)%360)+' yönünde</dd></dl>';
    var near=places().map(function(p){return {p:p,k:dist(l,p)}}).sort(function(a,b){return a.k-b.k}).slice(0,3);
    h+='<h2>En yakın 3 nokta</h2><div class="list">';near.forEach(function(x){h+=item("#/p/"+x.p.id,"pin",x.p.n,x.k.toFixed(1)+" km "+dir(brg(l,x.p))+" · "+TYPE[x.p.ty])});h+='</div>';
    h+='<div class="btns"><a class="btn" href="sms:?body='+encodeURIComponent("Konumum: "+l.lat+","+l.lon+" ±"+l.acc+"m "+fmtTime(l.t))+'">'+ic("sms")+' SMS ile gönder</a></div>';}
  h+='</div><div class="card tip">İlk konumu almak (soğuk başlangıç) açık havada 30 saniye ile 2 dakika sürebilir. Bina içinde GPS sinyali zayıftır. Konum alındıktan sonra GPS kapanır; uygulama seni sürekli izlemez.</div>';
  main.innerHTML=h;
  $("#go").onclick=function(){$("#go").textContent="Uydular aranıyor…";fix(function(f,e){if(!f)alert(e);R["tools/gps"]()})};
};
R["tools/compass"] = function(q){
  var to=(q||"").replace("to=",""),tgt=places().filter(function(p){return p.id===to})[0];
  setHead("PUSULA",tgt?("Hedef: "+tgt.n):"Telefonu yere paralel tut",true);tabOn("tools");
  var o=origin(),tb=tgt?brg(lf()||o,tgt):null,il=D.il&&D.il(),SP=Math.round((il&&il.sapma)||6);
  var h='<svg class="compass" viewBox="0 0 220 220"><g id="rose"><circle cx="110" cy="110" r="100" fill="none" stroke="var(--line)" stroke-width="2"/>';
  for(var a=0;a<360;a+=15){var L=a%90?6:14,r1=100-L;h+='<line x1="'+(110+Math.sin(rad(a))*r1)+'" y1="'+(110-Math.cos(rad(a))*r1)+'" x2="'+(110+Math.sin(rad(a))*100)+'" y2="'+(110-Math.cos(rad(a))*100)+'" stroke="var(--mut)"/>'}
  [["K",0],["D",90],["G",180],["B",270]].forEach(function(x){h+='<text x="'+(110+Math.sin(rad(x[1]))*72)+'" y="'+(115-Math.cos(rad(x[1]))*72)+'" text-anchor="middle" font-size="16" font-weight="700" fill="'+(x[0]==="K"?"var(--red)":"var(--tx)")+'">'+x[0]+'</text>'});
  if(tb!=null)h+='<g transform="rotate('+tb+' 110 110)"><path d="M110 18 118 40 102 40z" fill="var(--ac)"/></g>';
  h+='</g><path d="M110 60 116 110 104 110z" fill="var(--red)"/><path d="M110 160 116 110 104 110z" fill="var(--dim)"/></svg>';
  h+='<div style="text-align:center"><div class="big" id="hd">—</div><small class="mut" id="hs">Başlat\'a bas</small></div>';
  if(tgt)h+='<div class="card">Hedef yönü: <b>'+Math.round(tb)+'° '+dir(tb)+'</b> · '+Math.round(dist(lf()||o,tgt))+' km. Sarı üçgen hedefin yönünü gösterir; telefonun üst kenarını sarı üçgene doğru çevir.</div>';
  h+='<div class="btns"><button class="btn pri" id="st">Başlat (60 sn)</button></div><p class="mut" style="font-size:.85em">Telefonun ölçtüğü manyetik yöne '+(il?esc(il.ad)+" için ":"")+'manyetik sapma (+'+SP+'°) eklenir; gösterilen yön haritadaki gerçek kuzeye göredir. İğneli pusula ise manyetik kuzeyi gösterir: onunla karşılaştırırken bu farkı unutma.</p><div class="card warn">Telefon pusulası metal eşya, araç, mıknatıs ve elektrik hatlarının yakınında yanlış gösterir. Önce telefonu havada 8 çizerek ayarla (kalibrasyon). Yönü mutlaka iğneli pusulayla ya da güneşe ve yıldızlara bakarak doğrula (Rehber › Navigasyon).</div>';
  main.innerHTML=h;
  $("#st").onclick=function(){
    var ev=("ondeviceorientationabsolute" in window)?"deviceorientationabsolute":"deviceorientation",got=false;
    function on(e){var hd=e.webkitCompassHeading!=null?e.webkitCompassHeading:(e.absolute||ev==="deviceorientationabsolute")&&e.alpha!=null?(360-e.alpha)%360:null;if(hd==null)return;got=true;hd=(hd+SP+360)%360;var r=$("#rose");if(!r)return;r.setAttribute("transform","rotate("+(-hd)+" 110 110)");$("#hd").textContent=Math.round(hd)+"° "+dir(hd);$("#hs").textContent="telefonun üst kenarının yönü (gerçek kuzeye göre)"}
    function go(){window.addEventListener(ev,on,true);var t=setTimeout(off,60000);function off(){window.removeEventListener(ev,on,true);clearTimeout(t);var s=$("#hs");if(s)s.textContent=got?"Pil için durdu. Yeniden başlatabilirsin.":"Pusula sensörü yanıt vermedi."}stops.push(off);$("#hs").textContent="Okunuyor…"}
    if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission){DeviceOrientationEvent.requestPermission().then(function(s){if(s==="granted")go()})}else go();
  };
};
R["tools/sun"] = function(){
  setHead("GÜN IŞIĞI","Güneşin batmasına ne kadar var?",true);tabOn("tools");
  var l=lf()||home(),now=new Date(),s=sunTimes(now,l.lat,l.lon),f=function(d){return d?d.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}):"—"};
  var left=s.set?(s.set-now)/6e4:0;
  var h='<dl class="kv" style="font-size:1.1em"><dt>Doğuş</dt><dd><b>'+f(s.rise)+'</b></dd><dt>Batış</dt><dd><b>'+f(s.set)+'</b></dd><dt>Kalan</dt><dd><b>'+(left>0?Math.floor(left/60)+" sa "+Math.round(left%60)+" dk":"Güneş battı")+'</b></dd></dl><p class="mut">Konum: '+esc(l.name||"son GPS konumu")+'. Batıştan sonra yaklaşık 30 dakika alacakaranlık sürer.</p>';
  h+='<div class="card tip"><b>Kural:</b> Kamp kurmaya batıştan <b>en az 3 saat önce</b> başla (kışın daha erken). Su bulmak, odun toplamak ve barınak kurmak karanlıkta 3 kat zordur.</div>';
  h+='<h2>El yöntemi (saatsiz)</h2><p>Kolunu uzat, elini yatay tut, serçe parmağın ufuk çizgisine değsin. Güneş ile ufuk arasına sığan her <b>parmak yaklaşık 15 dakika</b>, her <b>el (4 parmak) yaklaşık 1 saat</b> demektir.</p>'+D.fig.hand;
  main.innerHTML=h;
};
var MORSE={A:".-",B:"-...",C:"-.-.",Ç:"-.-..",D:"-..",E:".",F:"..-.",G:"--.",Ğ:"--.-.",H:"....",I:"..-..",İ:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",Ö:"---.",P:".--.",Q:"--.-",R:".-.",S:"...",Ş:".--..",T:"-",U:"..-",Ü:"..--",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",0:"-----",1:".----",2:"..---",3:"...--",4:"....-",5:".....",6:"-....",7:"--...",8:"---..",9:"----."};
R["tools/morse"] = function(){
  setHead("MORS / SOS","Ekranı ışık olarak kullan",true);tabOn("tools");
  var h='<button class="btn red full" id="sos" style="font-size:1.2em;padding:18px">SOS ışığı başlat  ··· ––– ···</button><label class="lb">Kendi mesajın</label><input class="in" id="tx" value="YARDIM" style="text-transform:uppercase"><div class="mono" id="cd" style="margin:6px 0;color:var(--ac);word-break:break-all"></div><div class="btns"><button class="btn" id="pl">Mesajı ışıkla gönder</button></div>';
  h+='<div class="card tip">Ekran parlaklığını en üste al. Gece 1–2 km uzaktan görülebilir. Pil tüketir: yalnızca birini görünce ya da duyunca kullan. Uluslararası imdat işareti: <b>3 kısa, 3 uzun, 3 kısa</b>. Işıkla, düdükle, aynayla ya da ateşle verdiğin her işaret 3\'lü olsun.</div><h2>Mors tablosu</h2><div class="mono" style="columns:3;font-size:.9em">';
  Object.keys(MORSE).forEach(function(k){h+='<div>'+k+' '+MORSE[k].replace(/\./g,"·").replace(/-/g,"–")+'</div>'});
  main.innerHTML=h+'</div>';
  var tx=$("#tx"),cd=$("#cd");function enc(s){return s.toLocaleUpperCase("tr").split("").map(function(c){return c===" "?"/":(MORSE[c]||"")}).join(" ")}
  function upd(){cd.textContent=enc(tx.value).replace(/\./g,"·").replace(/-/g,"–")}tx.oninput=upd;upd();
  $("#sos").onclick=function(){flash("SOS",true)};$("#pl").onclick=function(){flash(tx.value,false)};
};
function flash(msg,loop){
  var fl=$("#flash"),U=220,seq=[],tm=null;
  var code=msg.toLocaleUpperCase("tr").split("").map(function(c){return c===" "?"/":(MORSE[c]||"")});
  code.forEach(function(c,ci){if(c==="/"){seq.push([0,U*4]);return}c.split("").forEach(function(s,i){seq.push([1,s==="."?U:U*3]);seq.push([0,U])});seq.push([0,U*2])});
  seq.push([0,U*7]);
  var i=0;fl.classList.add("on");
  function step(){if(i>=seq.length){if(loop)i=0;else return stop()}var s=seq[i++];fl.style.background=s[0]?"#fff":"#000";tm=setTimeout(step,s[1])}
  function stop(){clearTimeout(tm);fl.classList.remove("on");fl.style.background="#000"}
  $("#flash button").onclick=stop;stops.push(stop);step();
}
R["tools/torch"] = function(){
  setHead("EL FENERİ","Telefonun flaşı · yedek: beyaz ekran",true);tabOn("tools");
  main.innerHTML='<button class="btn pri full" id="tf" style="padding:22px;font-size:1.2em">'+ic("flash")+' Flaşı aç / kapat</button><div class="btns"><button class="btn" id="tw">Beyaz ekran ışığı</button><button class="btn" id="tr">Kırmızı ekran (gece görüşü)</button></div><p class="mut" id="ts" style="font-size:.85em">Flaş için kamera izni istenir; izin yalnızca ışık için kullanılır, görüntü alınmaz. Bazı telefonlarda tarayıcı flaşı açamaz; açabildiğinde de kamera açık kaldığı için çok pil harcar. <b>Asıl fener olarak Hızlı Ayarlar\'daki feneri kullan.</b></p><a class="btn red full" href="#/tools/morse">SOS ışık sinyali (Mors)</a><div class="card tip">Hızlı Ayarlar\'daki fener, ekran ışığından çok daha az pil harcar. Kırmızı ekran gece görüşünü bozmaz; harita okumak için yeterlidir.</div>';
  var tr=null;
  function off(){if(tr){try{tr.stop()}catch(e){}tr=null}}
  stops.push(off);
  $("#tf").onclick=function(){
    if(tr){off();$("#ts").textContent="Kapalı";return}
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){$("#ts").textContent="Bu tarayıcı flaşı desteklemiyor: beyaz ekranı veya Hızlı Ayarlar fenerini kullan.";return}
    navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}}}).then(function(st){var t=st.getVideoTracks()[0];var c=t.getCapabilities?t.getCapabilities():{};
      if(!c.torch){t.stop();$("#ts").textContent="Bu telefonda tarayıcıdan flaş açılamıyor: beyaz ekranı veya Hızlı Ayarlar fenerini kullan.";return}
      t.applyConstraints({advanced:[{torch:true}]}).then(function(){tr=t;$("#ts").textContent="Açık. Kapatmak için yeniden bas; sayfadan çıkınca da kapanır."}).catch(function(){t.stop();$("#ts").textContent="Flaş açılamadı."})
    }).catch(function(){$("#ts").textContent="Kamera izni verilmedi ya da kamera burada kullanılamıyor."})};
  function scr(col){var fl=$("#flash");fl.style.background=col;fl.classList.add("on");$("#flash button").onclick=function(){fl.classList.remove("on");fl.style.background="#000"}}
  $("#tw").onclick=function(){scr("#fff")};$("#tr").onclick=function(){scr("#a00")};
};
R["tools/water"] = function(){
  setHead("SU ARITMA","En etkilisi kaynatma, sonra klor, sonra filtre",true);tabOn("tools");
  var h='<label class="lb">Su miktarı (litre)</label><input class="in" id="lt" type="number" value="5" min="1"><label class="lb">Su durumu</label><select class="in" id="cl"><option value="1">Berrak</option><option value="2">Bulanık ya da soğuk (önce süz, sonra çift doz)</option></select><label class="lb">Çamaşır suyunun yoğunluğu (etikette yazar)</label><select class="in" id="pc"><option value="5">%4–6 sodyum hipoklorit (çoğu marka)</option><option value="8">%8 ve üstü (konsantre)</option></select><div class="card" id="res"></div>';
  h+='<div class="card warn"><b>Yalnızca kokusuz, katkısız</b> çamaşır suyu kullan. <u>Parfümlü, "renkliler için" ya da deterjanlı çamaşır suyu kullanma.</u> Karıştır, <b>30 dakika</b> bekle. Suda hafif klor kokusu yoksa dozu tekrarla ve 15 dakika daha bekle. Hiçbir yöntem kimyasal ya da yakıt kirliliğini temizlemez: <u>böyle bir suyu kullanma.</u></div>';
  h+='<h2>Kaynatma</h2><p>Önce bezden süz. Su fokur fokur kaynamaya başlayınca <b>1 dakika</b> daha kaynat (2000 metrenin üstünde 3 dakika). Yerleşim yerlerinin çoğu 2000 metrenin altındadır; bu yüzden çoğu yerde 1 dakika yeter.</p>';
  main.innerHTML=h;
  function c(){var L=+$("#lt").value||0,m=+$("#cl").value,p=+$("#pc").value,dr=Math.ceil(L*(p>=8?1.5:2)*m);$("#res").innerHTML='<div class="big">'+dr+' damla</div><small class="mut">≈ '+(dr*0.05).toFixed(1).replace(".",",")+' ml ('+L+' L için). Damlalıkla 1 damla yaklaşık 0,05 ml\'dir. Kaşıkla ölçeceksen 1 tatlı kaşığı (5 ml) yaklaşık 100 damla, 1 çay kaşığı yaklaşık 50 damladır.</small>'}
  ["lt","cl","pc"].forEach(function(i){$("#"+i).oninput=c});c();
};
R["tools/pace"] = function(){
  setHead("ADIM SAYACI","Çift adımla mesafe ölç",true);tabOn("tools");
  var pc=store.get("pace",65),n=0;
  var h='<p>Askerî yöntem: <b>sol ayağın her yere bastığında 1</b> say (bu bir çift adımdır). Kendi değerini 100 m düz yolda ölç; ortalama bir yetişkinde <b>60–70</b> çift adımdır. Yokuşta, kumda, karda, gece ve yük taşırken bu sayı %10–30 artar.</p><label class="lb">100 metredeki çift adım sayın</label><input class="in" id="pc" type="number" value="'+(+pc||65)+'"><div style="text-align:center;margin:14px 0"><div class="big" id="n">0</div><small class="mut" id="m">0 m</small></div><button class="btn pri full" id="t" style="padding:26px;font-size:1.3em">+1 (sol ayak)</button><div class="btns"><button class="btn" id="r">Sıfırla</button></div><div class="card tip"><b>Adım boncuğu:</b> bir ipe altta 9, üstte 4 boncuk diz. Her 100 metrede alttaki boncuklardan birini indir. 10. yüz metrede üstteki boncuklardan birini indir: her üst boncuk 1 km demektir. Telefonsuz çalışır.</div>';
  main.innerHTML=h;
  function u(){pc=+$("#pc").value||65;store.set("pace",pc);$("#n").textContent=n;$("#m").textContent=Math.round(n/pc*100)+" m"}
  $("#t").onclick=function(){n++;u()};$("#r").onclick=function(){n=0;u()};$("#pc").oninput=u;
};
R["tools/ration"] = function(){
  setHead("ERZAK HESABI","Kişi ve gün sayısına göre",true);tabOn("tools");
  var h='<label class="lb">Kişi sayısı</label><input class="in" id="k" type="number" value="'+(team().filter(function(m){return m.ad}).length||4)+'"><label class="lb">Gün</label><input class="in" id="g" type="number" value="14"><label class="lb">Koşul</label><select class="in" id="s"><option value="0">Evde, az hareketle</option><option value="1">Yürüyüş ya da yük taşıma</option><option value="2">Sıcak havada ağır efor</option></select><div class="card" id="o"></div><p class="mut" style="font-size:.85em">Su hesabı, ABD Federal Acil Durum Yönetim Ajansı (FEMA) ve Kızılhaç\'ın önerisine dayanır: kişi başı günde yaklaşık 4 L (1 galon) su, içmek ve temel temizlik için. AFAD resmî bir litre miktarı vermiyor, "yeterli su" bulundurmayı öneriyor. Kalori: dinlenirken yaklaşık 2000, yürürken ya da yük taşırken 3000–3500 kcal.</p>';
  main.innerHTML=h;
  function c(){var k=+$("#k").value||0,g=+$("#g").value||0,s=+$("#s").value,w=[4,6,7][s],kc=[2000,3200,3200][s];$("#o").innerHTML='<dl class="kv" style="font-size:1.05em"><dt>Su</dt><dd><b>'+(k*g*w)+' L</b> (kişi başı günde '+w+' L)</dd><dt>Kalori</dt><dd><b>'+(k*g*kc/1000).toFixed(0)+'k kcal</b></dd><dt>Pirinç/bulgur karşılığı</dt><dd>~'+(k*g*kc/3600).toFixed(0)+' kg (kuru, ~360 kcal/100 g)</dd><dt>Yağ (zeytinyağı)</dt><dd>~'+(k*g*0.05).toFixed(1)+' L (kişi başı günde 50 ml)</dd><dt>Tuz</dt><dd>~'+(k*g*6/1000).toFixed(1)+' kg</dd></dl>'}
  ["k","g","s"].forEach(function(i){$("#"+i).oninput=c});c();
};

/* ---------- Daha fazla ---------- */
/* Ana ekrana eklenmeden tarayıcı sekmesinde kullanılıyorsa uyar: iPhone'da Safari, ana ekrana eklenmemiş sitelerin
   verisini 7 gün kullanılmazsa silebilir; tarayıcı geçmişi temizlenince de veriler gider. */
var KURIST=null;window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();KURIST=e;if(location.hash===""||location.hash==="#/"){var b=$("#kurbtn");if(b)b.style.display=""}});
function kurulu(){try{return (window.matchMedia&&(matchMedia("(display-mode: standalone)").matches||matchMedia("(display-mode: fullscreen)").matches||matchMedia("(display-mode: minimal-ui)").matches))||navigator.standalone===true}catch(e){return false}}
function kurBilgi(){if(kurulu()||location.protocol==="file:"||sessionStorage.getItem("hk_kurgec"))return "";
  var ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  return '<div class="card warn" id="kurkart"><b>Önce uygulamayı ana ekrana ekle.</b> Şu an tarayıcıda açıksın: '+(ios?"iPhone, ana ekrana eklenmemiş bir siteyi 7 gün kullanmazsan <b>verilerini silebilir</b>.":"tarayıcı geçmişini temizlersen bilgilerin silinir.")+' Ana ekrana eklersen ekip, buluşma ve belge bilgilerin kaybolmaz; uygulama internet olmadan da ana ekrandan açılır.<br><br>'+
   (ios?'<b>Safari</b> › alttaki Paylaş düğmesi (kare ve ok) › <b>Ana Ekrana Ekle</b>. Sonra ana ekrandaki Hazırkal simgesinden aç.':'<button class="btn pri" id="kurbtn"'+(KURIST?'':' style="display:none"')+'>Uygulamayı yükle</button> <b>Chrome</b> › sağ üstteki ⋮ › <b>Uygulamayı yükle</b> ya da <b>Ana ekrana ekle</b>. Sonra ana ekrandaki simgeden aç.')+
   '<div class="btns"><button class="btn" id="kurgec">Şimdilik geç</button></div></div>'}
function kurBagla(){var g=$("#kurgec"),b=$("#kurbtn");if(g)g.onclick=function(){try{sessionStorage.setItem("hk_kurgec","1")}catch(e){}var k=$("#kurkart");if(k)k.remove()};
  if(b)b.onclick=function(){if(!KURIST)return;KURIST.prompt();KURIST.userChoice.then(function(){KURIST=null;var k=$("#kurkart");if(k)k.remove()}).catch(function(){})}}
R["il"] = function(){
  setHead("İLİN","Canlı türleri, iklim ve deprem bilgileri buna göre gösterilir",true);tabOn("");
  var cur=D.ilKod(),h='<p>Hazırkal ilini telefonda saklar; internete göndermez. İl değişince uygulama bir kez yeniden açılır.</p><label class="lb" for="ils">İl</label><select class="in" id="ils"><option value="">Seç…</option>'+D.ILLER.map(function(r){return '<option value="'+r[0]+'"'+(r[0]===cur?' selected':'')+'>'+r[1]+'</option>'}).join("")+'</select><div class="btns"><button class="btn pri" id="ilk">Kaydet</button></div>';
  if(cur&&!store.get("il",0))h+='<p class="mut" style="font-size:.85em">İlin şu an ev konumuna göre tahmin edildi: '+esc(D.il().ad)+'.</p>';
  main.innerHTML=h;
  $("#ilk").onclick=function(){var v=+$("#ils").value;if(!(v>=1&&v<=81))return;store.set("il",v);location.hash="#/";location.reload()};
};
R["oner"] = function(){
  setHead("ARKADAŞINA ÖNER","",true);tabOn("");
  var u=D.SITE||"https://hazirkal.com",t=D.AD+": internetsiz ilk yardım ve afet rehberi. Ücretsiz ve açık kaynaklı, hesap açmanı istemez. Kurmak için: "+u;
  main.innerHTML='<p>Uygulamayı dosya olarak değil, <b>bağlantıyla</b> paylaş: herkes resmî ve güncel sürümü kendisi kursun, sahtesine denk gelmesin.</p><div class="card"><b>'+esc(u)+'</b></div><div class="btns"><button class="btn pri" id="sh">Paylaş</button><a class="btn" href="sms:?body='+encodeURIComponent(t)+'">SMS ile gönder</a><button class="btn" id="cp">Kopyala</button></div><div id="om"></div>';
  $("#sh").onclick=function(){if(navigator.share){navigator.share({title:D.AD,text:t,url:u}).catch(function(){})}else{$("#om").innerHTML='<p class="mut">Bu tarayıcı paylaşımı desteklemiyor: SMS ile gönder ya da Kopyala düğmesini kullan.</p>'}};
  $("#cp").onclick=function(){try{navigator.clipboard.writeText(t);$("#om").innerHTML='<p class="mut">Kopyalandı.</p>'}catch(e){}};
};
R["more"] = function(){
  setHead("AYARLAR VE KAYNAKLAR","",true);tabOn("");
  var n=document.documentElement.classList.contains("night"),b=document.documentElement.classList.contains("big");
  var h='<div class="btns"><button class="btn'+(n?" pri":"")+'" id="nm">'+ic("moon")+' Gece (kırmızı) modu</button><button class="btn'+(b?" pri":"")+'" id="bf">Büyük yazı</button></div><p class="mut" style="font-size:.85em">Kırmızı mod gece görüşünü korur ve ekranı daha az aydınlatır.</p><div class="list">';
  var il=D.il();h+=item("#/il","pin","İl: "+(il?il.ad:"seçilmedi"),"Canlı türleri, iklim ve deprem bilgileri iline göre gösterilir");
  h+=item("#/oner","users","Arkadaşına öner","Kurulum sayfasının bağlantısını paylaş");
  h+=item("#/battery","battery","Pil rehberi","En güçlü pil tasarrufu ve kurulum");
  h+=item("#/setup","users","Kurulum","Ev konumu, ekip, roller, yapay zekâ ile yerler");
  h+=item("#/vault","shield","Belge kasası","Sigorta, DASK, reçete, bakım dosyaları · şifreli");
  h+=item("#/privacy","shield","Güvenlik ve gizlilik","İnternet bağlantısı, şifreleme, verilerin nerede durduğu");
  h+=item("#/g/uygulamalar","star","Telefona kurulacaklar","Yardımcı uygulamalar ve karşılaştırma");
  h+=item("#/sources","book","Kaynaklar","Kitaplar, kişiler, resmî rehberler");
  h+=item("#/backup","doc","Yedekle / taşı","Ekip ve listeleri başka telefona aktar");
  main.innerHTML=h+'</div><p class="foot">Hazırkal · '+D.SURUM+' · Ücretsiz ve açık kaynak (GPL-3.0). Bilgiler eğitim amaçlıdır; ilk yardım eğitiminin ve resmî talimatların yerini tutmaz.</p>';
  $("#nm").onclick=function(){document.documentElement.classList.toggle("night");store.set("night",document.documentElement.classList.contains("night"));R.more()};
  $("#bf").onclick=function(){document.documentElement.classList.toggle("big");store.set("big",document.documentElement.classList.contains("big"));R.more()};
};
R["battery"] = function(){setHead("PİL REHBERİ","Yalnızca arama, SMS ve bu uygulama",true);tabOn("");main.innerHTML=D.battery};

R["sources"] = function(){setHead("KAYNAKLAR","Yararlanılan kitaplar ve kurumlar",true);tabOn("");main.innerHTML=D.sources};
R["card"] = function(){
  setHead("CEP KARTI","Telefonun şarjı bitince de işe yarayan tek sayfa",true);tabOn("plan");
  var t=team().filter(function(m){return m.ad}),r=store.get("rally",D.rallyDef),k=String(store.get("kod",D.codeDef));if(!Array.isArray(r)||!r.every(function(x){return x&&typeof x.k==="string"}))r=D.rallyDef;
  var h='<div id="pc" style="background:#fff;color:#000;padding:12px;border-radius:8px;font-size:13px;line-height:1.35"><b style="font-size:15px">ACİL CEP KARTI</b> · 112 · Zehir 114<br><br><b>Buluşma</b><br>'+r.map(function(x){return esc(x.k)+': '+esc(x.v)}).join('<br>')+'<br><br><b>Ekip</b><br>'+(t.length?t.map(function(m){return esc(m.ad)+' '+esc(m.tel)+(m.kan?' · '+esc(m.kan):'')+(m.roles&&m.roles.length?' · '+m.roles.map(function(r){return ROLES[r]?ROLES[r].t:''}).join('/'):'')}).join('<br>'):'(Ekip kartını doldur)')+'<br><br><b>Kodlar</b><br>'+esc(k).replace(/\n/g,'<br>')+'<br><br><b>Kurallar</b><br>Aramak yerine SMS at · Telefonu sabit saatlerde aç: 08, 12, 18, 21 · RP1’de 2 saat bekle, sonra RP2’ye geç (6. ve 24. saatte herkes RP2’de) · Depremde Çök-Kapan-Tutun · Turnike taktıysan saatini yaz</div><div class="btns"><button class="btn pri" id="pr">Yazdır</button></div><p class="mut" style="font-size:.85em">Kartı yazdırıp lamine et; ekipteki her aile onu cüzdanında ve 72 saat çantasında taşısın.</p>';
  main.innerHTML=h;$("#pr").onclick=function(){var w=window.open("","_blank");if(!w){window.print();return}w.document.write('<html><head><meta charset="utf-8"><title>Cep kartı</title><style>b{color:#000}</style></head><body style="font-family:sans-serif">'+$("#pc").outerHTML+'</body></html>');w.document.close();w.print()};
};
R["credits"] = function(){setHead("FOTOĞRAF ATIFLARI","Wikimedia Commons",true);tabOn("");main.innerHTML=D.photoCredits?D.photoCredits():""};
/* Yedeğe giren ve yedekten alınan anahtarlar aynı listedir; son GPS konumu (hk_lastfix) gibi anahtarlar dışarı çıkmaz */
var BK_OK=/^hk_(team|rally|kod|home|il|assets|uplaces|uavoid|night|big|pace|pf|mz|gopen|seen|setupDone|ck_[a-z0-9]+)$/;
R["backup"] = function(){
  setHead("YEDEKLE / TAŞI","Ekip kartı, buluşma noktaları, listeler",true);tabOn("");
  var data={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(BK_OK.test(k))data[k]=localStorage.getItem(k)}
  main.innerHTML='<p>Bu metni kopyala ve diğer telefonda aynı ekrana yapıştır. Ekip lideri bilgileri bir kez doldurup herkese dağıtabilir.</p><div class="card warn">Bu metin <b>şifresizdir</b>; telefon numaralarını, sağlık notlarını ve ev konumunu içerir. Yalnızca yüz yüze ya da güvendiğin bir kanaldan ver; yapıştırdıktan sonra panoyu temizle. Belge kasası ayrıca, şifreli olarak yedeklenir.</div><textarea class="in mono" id="bx" rows="8" style="font-size:.75em">'+esc(JSON.stringify(data))+'</textarea><div class="btns"><button class="btn" id="cp">Kopyala</button><button class="btn pri" id="ld">Yapıştırılanı yükle</button></div>';
  $("#cp").onclick=function(){var t=$("#bx");t.select();try{navigator.clipboard.writeText(t.value)}catch(e){document.execCommand("copy")}};
  $("#ld").onclick=function(){try{var o=JSON.parse($("#bx").value),OK=BK_OK,n=0;
    if(!o||typeof o!=="object")throw 0;if(!confirm("Bu telefondaki ekip, buluşma ve liste bilgileri yedektekilerle değiştirilecek. Devam edilsin mi?"))return;
    var TY={team:"array",rally:"array",kod:"string",home:"object",il:"number",assets:"object",uplaces:"array",uavoid:"array",night:"boolean",big:"boolean",pace:"number",pf:"string",mz:"number",gopen:"object",seen:"boolean",setupDone:"boolean"},ty=function(v){return v===null?"null":Array.isArray(v)?"array":typeof v};
    Object.keys(o).forEach(function(k){if(OK.test(k)&&typeof o[k]==="string"&&o[k].length<200000){try{var v=JSON.parse(o[k]),b=k.slice(3),want=/^ck_/.test(b)?"object":TY[b];if(ty(v)!==want)return;if(want==="array"&&!v.every(function(x){return x&&typeof x==="object"||typeof x==="string"}))return;localStorage.setItem(k,o[k]);n++}catch(e){}}});alert(n+" kayıt yüklendi.");location.hash="#/"}catch(e){alert("Metin okunamadı. Eksiksiz yapıştırdığından emin ol.")}};
};

/* ---------- Yönlendirici ---------- */
function route(){
  cleanup();
  var hs=location.hash.replace(/^#\/?/,""),q="";
  if(hs.indexOf("?")>-1){q=hs.split("?")[1];hs=hs.split("?")[0]}
  if(D.alias&&Object.prototype.hasOwnProperty.call(D.alias,hs)){location.replace("#/"+D.alias[hs]);return}
  if(!hs&&!store.get("seen",false)){store.set("seen",true);location.replace("#/setup");return}
  var parts=hs.split("/"),fn=Object.prototype.hasOwnProperty.call(R,hs)?R[hs]:null;
  if(!fn&&parts.length>1){var f2=R[parts[0]+"/*"];if(f2){try{f2(parts.slice(1).join("/"),q)}catch(e){location.replace("#/");}window.scrollTo(0,0);return}}
  try{(fn||R[""])(q)}catch(e){main.innerHTML='<a class="sosbig" href="tel:112">112 · ACİL ÇAĞRI</a><div class="card warn">Bu sayfa açılamadı (kayıtlı veri bozuk olabilir). <a href="#/g/kanama">İlk yardım</a> · <a href="#/backup">Veriyi düzelt</a></div>'}window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
/* Adım gösterici (düğüm, barınak, ateş, ilk yardım çizimleri) */
document.addEventListener("click",function(e){var b=e.target.closest?e.target.closest(".stp button"):null;if(!b)return;var w=b.closest(".stp");
  if(b.classList.contains("stp-all")){w.classList.toggle("all");b.textContent=w.classList.contains("all")?"Tek tek":"Hepsi";return}
  var ss=w.querySelectorAll(".stp-s"),ds=w.querySelectorAll(".stp-d i"),n=ss.length,i=0;for(var k=0;k<n;k++)if(ss[k].classList.contains("on"))i=k;
  i=(i+(+b.getAttribute("data-d"))+n)%n;for(k=0;k<n;k++){ss[k].classList.toggle("on",k===i);if(ds[k])ds[k].classList.toggle("on",k===i)}});
$("#bk").onclick=function(){history.length>1?history.back():(location.hash="#/")};
if(store.get("night",false))document.documentElement.classList.add("night");
if(store.get("big",false))document.documentElement.classList.add("big");
window.HKAPP={kurBilgi:kurBilgi,kurBagla:kurBagla,R:R,store:store,setHead:setHead,tabOn:tabOn,ic:ic,esc:esc,main:main,tile:tile,item:item,fix:fix,dist:dist,brg:brg,dir:dir,home:home,team:team,ROLES:ROLES,memberForm:memberForm,bindRoles:bindRoles,readForm:readForm,places:places,cleanup:function(f){stops.push(f)},fmtTime:fmtTime,TYPE:TYPE,
 boot:function(){route();try{if(navigator.storage&&navigator.storage.persist&&location.protocol==="https:")navigator.storage.persisted().then(function(p){if(!p)navigator.storage.persist()}).catch(function(){})}catch(e){}if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){var had=!!navigator.serviceWorker.controller;navigator.serviceWorker.register("sw.js").then(function(reg){
  function ask(w){if(!w||document.getElementById("upd"))return;var d=document.createElement("div");d.id="upd";d.innerHTML='<span>Yeni sürüm hazır.</span><button class="btn pri" id="updok">Güncelle</button><button class="btn" id="updno">Sonra</button>';document.body.appendChild(d);
   document.getElementById("updok").onclick=function(){w.postMessage("skip");d.remove()};document.getElementById("updno").onclick=function(){d.remove()}}
  if(reg.waiting&&navigator.serviceWorker.controller)ask(reg.waiting);
  reg.addEventListener("updatefound",function(){var n=reg.installing;if(n)n.addEventListener("statechange",function(){if(n.state==="installed"&&navigator.serviceWorker.controller)ask(n)})});
  /* İlk kurulumda (önceden denetleyici yokken) sayfa yeniden yüklenmez; yalnızca güncellemede yenilenir. */
  var done=false;navigator.serviceWorker.addEventListener("controllerchange",function(){if(done)return;done=true;if(had)location.reload()});
  if(!had&&(reg.installing||!reg.active)){var kb=function(t,son){var d=document.getElementById("cev");if(!d){d=document.createElement("div");d.id="cev";d.setAttribute("role","status");document.body.appendChild(d)}d.textContent=t;if(son)setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d)},7000)};
   kb("İnternetsiz kullanım için dosyalar indiriliyor. Bitene kadar interneti kapatma.");
   navigator.serviceWorker.addEventListener("message",function(e){var m=e.data||{};if(m.hk==="yuk"&&m.t)kb("İnternetsiz kullanım için dosyalar indiriliyor: %"+Math.min(99,Math.round(m.n/m.t*100))+". Bitene kadar interneti kapatma.");if(m.hk==="hazir")kb("Hazır: Hazırkal artık internetsiz de çalışır.",true)});
   var iz=function(n){if(n)n.addEventListener("statechange",function(){if(n.state==="redundant")kb("İndirme yarıda kaldı. İnternet varken uygulamayı yeniden aç.",true)})};iz(reg.installing);reg.addEventListener("updatefound",function(){iz(reg.installing)})}
 }).catch(function(){})}}};
})();
