/* Sesli KPR koçu + sakinleşme nefesi. Ritim WebAudio ile üretilir (dosya yok), komutlar kısa Türkçe ses kayıtları.
   Ekran açık kalır (Wake Lock). İnternet gerekmez. */
(function(){
"use strict";
var A=window.HKAPP,R=A.R,$=function(s){return document.querySelector(s)};
var AC=null;
function ctx(){if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(C)AC=new C()}if(AC&&AC.state==="suspended")AC.resume();return AC}
function beep(f,d,v){var c=ctx();if(!c)return;var o=c.createOscillator(),g=c.createGain();o.type="square";o.frequency.value=f||880;g.gain.setValueAtTime(v||.25,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+(d||.06));o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+(d||.06)+.02)}
var cur=null;
function say(k,txt){try{if(cur){cur.pause();cur=null}}catch(e){}
 var src=window.HKSND?window.HKSND[k]:("snd/"+k+".mp3");
 var au=new Audio();au.src=src;cur=au;au.play().catch(function(){if(window.speechSynthesis&&txt){var u=new SpeechSynthesisUtterance(txt);u.lang="tr-TR";speechSynthesis.speak(u)}})}
var wl=null;function wake(on){try{if(on&&navigator.wakeLock)navigator.wakeLock.request("screen").then(function(w){wl=w}).catch(function(){});else if(wl){wl.release();wl=null}}catch(e){}}
var T={basla:"Göğsün ortasına bas. Sert ve hızlı. Sesle birlikte.",nefes:"Otuz. İki nefes ver.",devam:"Basmaya devam.",degis:"İki dakika oldu. Basan kişi değişsin. Durma.",ara:"Yüz on ikiyi aradın mı? Telefonu hoparlöre al.",aed:"Şok cihazı geldiyse aç, komutlarını uygula."};
R["tools/kpr"]=function(){A.setHead("SESLİ KPR KOÇU","Dakikada 110 · 30 bası : 2 nefes",true);A.tabOn("sos");
 A.main.innerHTML='<div class="kpr"><div class="kc" id="kc">30</div><div class="kl" id="kl">Başlat\'a bas</div><div class="kt mono" id="kt">00:00</div></div>'+
 '<div class="btns"><button class="btn red full" id="ks" style="padding:20px;font-size:1.2em">BAŞLAT</button></div>'+
 '<div class="chips"><span class="chip on" data-m="30">30:2 (nefesli)</span><span class="chip" data-m="0">Yalnızca bası</span></div>'+
 '<div class="card info">Telefonu hastanın başının yanına koy, sesi aç. Her bipte bir kez bas. 30 basıdan sonra ses \"İki nefes ver\" der ve nefesler için 5 saniye bekler. 2 dakikada bir \"Basan kişi değişsin\" der. Ekran açık kalır.</div>'+
 '<a class="btn full" href="#/g/kpr">Adım adım KPR (çizimli)</a>';
 var run=false,tm=null,n=0,t0=0,cyc=0,mode=30,lastSwap=0;
 Array.prototype.forEach.call(document.querySelectorAll("[data-m]"),function(c){c.onclick=function(){Array.prototype.forEach.call(document.querySelectorAll("[data-m]"),function(x){x.classList.remove("on")});c.classList.add("on");mode=+c.getAttribute("data-m")}});
 function clock(){var s=Math.floor((Date.now()-t0)/1000);$("#kt").textContent=("0"+Math.floor(s/60)).slice(-2)+":"+("0"+s%60).slice(-2);
  if(s-lastSwap>=120){lastSwap=s;say("degis",T.degis)}}
 function tick(){if(!run)return;n++;beep(n%10===0?1320:880);var el=$("#kc");if(!el){stop();return}el.textContent=mode?(n):n;clock();
  if(mode&&n>=30){n=0;el.textContent="2 NEFES";$("#kl").textContent="İki nefes ver (her biri 1 saniye; göğüs kalkmalı)";say("nefes",T.nefes);tm=setTimeout(function(){if(!run)return;$("#kl").textContent="Bas";say("devam",T.devam);tm=setTimeout(tick,900)},5200);return}
  tm=setTimeout(tick,545)}
 function stop(){run=false;clearTimeout(tm);wake(false);var b=$("#ks");if(b){b.textContent="BAŞLAT";$("#kl").textContent="Durdu"}}
 $("#ks").onclick=function(){if(run){stop();return}ctx();run=true;n=0;t0=Date.now();lastSwap=0;wake(true);$("#ks").textContent="DURDUR";$("#kl").textContent="Bas";say("basla",T.basla);tm=setTimeout(tick,2600);
  setTimeout(function(){if(run)say("ara",T.ara)},24000);setTimeout(function(){if(run)say("aed",T.aed)},60000)};
 A.cleanup(stop);
};
/* Sakinleşme nefesi (kutu nefes 4-4-4-4) */
R["tools/nefes"]=function(){A.setHead("NEFES","Panik ve stres için · 4-4-4-4",true);A.tabOn("tools");
 A.main.innerHTML='<div class="kpr"><div class="breath" id="bb"></div><div class="kl" id="bl">Başlat\'a bas</div></div><div class="btns"><button class="btn pri full" id="bs" style="padding:18px">BAŞLAT (4 tur)</button></div><div class="card tip">Nefesi burnundan al, karnına doldur. Ağzından yavaşça ver. 4 tur kalp hızını düşürür, ellerinin becerisini geri getirir. Sonra ilk küçük işe başla.</div>';
 var run=false,tm=null,ph=0,k=0;var P=[["Al",4,"al","Nefes al"],["Tut",4,"tut","Tut"],["Ver",4,"ver","Yavaşça ver"],["Tut",4,"tut","Tut"]];
 function step(){if(!run)return;var p=P[ph],b=$("#bb");if(!b){run=false;return}$("#bl").textContent=p[0]+" · 4";b.className="breath "+["in","hold","out","hold2"][ph];say(p[2],p[3]);beep(520,.08,.12);ph=(ph+1)%4;if(ph===0)k++;if(k>=4){tm=setTimeout(function(){run=false;$("#bl").textContent="Bitti. Şimdi tek bir küçük iş seç ve başla.";$("#bs").textContent="TEKRAR"},4000);return}tm=setTimeout(step,4000)}
 $("#bs").onclick=function(){if(run){run=false;clearTimeout(tm);$("#bs").textContent="BAŞLAT (4 tur)";return}ctx();run=true;ph=0;k=0;$("#bs").textContent="DURDUR";step()};
 A.cleanup(function(){run=false;clearTimeout(tm)});
};
})();
