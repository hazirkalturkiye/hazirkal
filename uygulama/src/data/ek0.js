/* Ekler: The Survival Medicine Handbook (Alton, 2013) karşılaştırması sonrası eklenen bilgiler için ortak araçlar.
   Çelişen noktalarda Türk Kızılay / T.C. Sağlık Bakanlığı İlk Yardım Eğitimi Kitabı (2025) / MEB İlk Yardım Birimi esas alındı.
   ek1.js: yeni sayfalar · ek2.js: ilk yardım sayfalarına ekler · ek3.js: afet, hijyen, plan ve liste ekleri. */
(function(){
var H=window.HK;
function bul(id){
 if(id.indexOf("plan/")===0){var p=id.slice(5);return (H.plans||[]).filter(function(x){return x.id===p})[0]}
 return H.guide.filter(function(x){return x.id===id})[0]}
function uyar(m){if(typeof console!=="undefined"&&console.warn)console.warn("HK-EK: "+m)}
/* Sayfaya HTML ekle. once verilirse sayfada bir kez geçen o metnin hemen ÖNÜNE, sonra verilirse hemen ARDINA; ikisi de yoksa sona. */
H.ekle=function(id,html,yer){var a=bul(id);if(!a){uyar("sayfa yok: "+id);return}
 if(yer){var s=yer.once||yer.sonra,i=a.h.indexOf(s);
  if(i>=0&&a.h.indexOf(s,i+1)<0){if(yer.sonra)i+=s.length;a.h=a.h.slice(0,i)+html+a.h.slice(i);return}
  uyar("yer bulunamadı ya da birden çok: "+id+" / "+s)}
 a.h+=html};
/* Sayfadaki metni değiştir (bir kez geçmeli). */
H.degis=function(id,eski,yeni){var a=bul(id);if(!a){uyar("sayfa yok: "+id);return}
 var i=a.h.indexOf(eski);if(i<0||a.h.indexOf(eski,i+1)>=0){uyar("değişecek metin bulunamadı ya da birden çok: "+id+" / "+eski.slice(0,60));return}
 a.h=a.h.slice(0,i)+yeni+a.h.slice(i+eski.length)};
H.kaynakEkle=function(id,s){var a=bul(id);if(a)a.src=(a.src?a.src+"; ":"")+s};
/* Yeni sayfa: sonra verilirse o sayfanın hemen ardına (kategorideki sıra H.guide sırasıdır). */
H.yeniSayfa=function(o,sonra){var i=-1;H.guide.forEach(function(x,k){if(x.id===sonra)i=k});if(i>=0)H.guide.splice(i+1,0,o);else H.guide.push(o)};
/* Listeye madde: grubun SONUNA eklenir. Telefondaki işaretler grup adı + sıra numarasıyla saklandığı için araya ekleme yapılmaz. */
H.listeEkle=function(lid,grup,items){var L=(H.lists||[]).filter(function(x){return x.id===lid})[0];if(!L){uyar("liste yok: "+lid);return}
 var G=L.g.filter(function(x){return x.n===grup})[0];if(!G){uyar("liste grubu yok: "+lid+" / "+grup);return}G.i=G.i.concat(items)};
/* Listeye yeni grup: listenin sonuna */
H.listeGrup=function(lid,grup){var L=(H.lists||[]).filter(function(x){return x.id===lid})[0];if(!L){uyar("liste yok: "+lid);return}L.g.push(grup)};
})();
