/* Görselleri rehber sayfalarına yerleştirir. İlke: sayfa başına az ve işe yarar görsel.
   Canlı türleri ve bulutlar: gerçek fotoğraf (doga2.js kartları). Barınak, ateş, ilk yardım: tek elden çizim. Düğümler: fotoğraflı adım serisi. */
(function(){
var H=window.HK,G=H.gal;
function page(id){return H.guide.filter(function(g){return g.id===id})[0]}
function top(id,html){var g=page(id);if(g&&html)g.h=html+g.h}
function end(id,html){var g=page(id);if(g&&html)g.h+=html}
var has=function(k){return ((H.PH||{})[k]||[]).length};
/* Düğümler: fotoğraflı adım serisi; seri kısa ise bitmiş hâl fotoğrafı ve katlanır çizim */
var K=[["Kazık düğümü (bowline)","Kaymayan sabit ilmek. Kurtarmada, bele bağlamada ve branda köşesinde kullanılır.","ks_bowlineA","k_bowline","bowline"],
 ["Kazık bağı (clove hitch)","Halatı direğe hızlıca bağlar. Kayabilir: kalıcı bağlarken ucuna bir yarım bağ ekle.","ks_clove","k_clove","clove"],
 ["Volta + iki yarım bağ","Yük altındayken bile bağlanır ve çözülür. Sırt ipinde, yük ve sırık bağlarken kullanılır.","ks_round","k_roundturn","roundturn"],
 ["Gergi düğümü (taut-line)","Kaydırarak gerilen, ayarlanabilir gergi. Çadır ve branda iplerinde kullanılır.","ks_taut","k_taut","taut"],
 ["Ağ düğümü (sheet bend)","Farklı kalınlıkta iki ipi ekler; kıvrımı kalın olan ip yapar.","ks_sheet","k_sheet","sheet"],
 ["Camadan (reef)","Sargı ve paket bağlamak için kullanılır. <u>Yük taşıyan ipleri eklemek için kullanma.</u>","ks_reef","k_reef","reef"],
 ["Prusik","Halat üstünde kayan bir tutamaktır; yük gelince kilitlenir.","ks_prusik","k_prusik","prusik"],
 ["Sekiz düğümü","Halat ucunun delikten kaçmasını önler. Bele bağlanan emniyet ilmeği de bu düğümle yapılır.","ks_eight","k_eight","eight"]];
var d=page("dugum");
if(d){var h="<p>Fotoğrafa dokunursan büyür; sağa sola kaydırarak adım adım ilerleyebilirsin. Her düğümü <b>gözün kapalı ve eldivenle</b> 20 kez bağlayabilene kadar çalış: krizde eller titrer, hava karanlık olabilir.</p>";
 K.forEach(function(x,i){var n=has(x[2]),series=n>=4;
  h+="<h2>"+(i+1)+". "+x[0]+"</h2><p class='mut' style='font-size:.9em'>"+x[1]+"</p>"+(n?G([x[2]],series?"Adım adım":"",{steps:series}):"")+(series?"":G([x[3]],"")+"<details class='draw'><summary>Çizimli anlatım (aç)</summary>"+H.steps(x[4],x[0])+"</details>")});
 var tip=d.h.indexOf('<div class="card tip"><b>İp yönetimi');
 d.h=h+(tip>-1?d.h.slice(tip):"");}
/* Gökyüzü */
top("yildiz",G(["s_bigdipper","s_orion"],"Gökyüzü"));
top("yildirim",G(["c_cumulonimbus:0"],""));
/* Barınak ve ateş: çizim varsa çizim, yoksa eski fotoğraf */
function pick(il,ph,title){return has(il)?G([il],title):G(ph,title)}
var bb=page("brandabar");
if(bb){bb.h=(has("i_bar")?G(["i_bar"],"Barınak ve çadır tipleri"):G(["h_aframe:0","h_leanto:0","h_debris:0","h_tent"],"Örnekler"))+
 "<p class='mut' style='font-size:.85em'><b>Kubbe çadır</b> kazıksız da durur, rüzgârda sağlamdır; rüzgârlı bozkır ve açık arazi için en uygun aile çadırıdır. <b>Tünel çadır</b> daha hafif ve geniştir ama kazık ister; dar ucunu rüzgâra çevir. <b>Branda</b> en hafif ve çok amaçlıdır ama beceri ister.</p>"+
 (has("i_bar")?bb.h.replace(/<!--S-->[\s\S]*?<!--\/S-->/g,""):bb.h)}
top("kar",pick("i_kar",["h_quinzhee:0","h_snowtrench"],""));
var at=page("ates");
if(at){at.h=pick("i_ates",["f_tinder:0","f_feather:0","f_teepee:0","f_logcabin","f_ferro:0","f_dakota"],"Kav, dizilim, ateş çubuğu (ferro çubuk), çukur ateşi")+(has("i_ates")?at.h.replace(/<!--S-->[\s\S]*?<!--\/S-->/g,""):at.h)}
(function(){var g=page("surtunme");if(!g)return;if(has("i_bow"))g.h=H.ione("i_bow",0)+g.h.replace(/<!--S-->[\s\S]*?<!--\/S-->/g,"");else top("surtunme",G(["f_bowdrill:0"],""))})();
/* Fotoğraf atıfları */
H.photoCredits=function(){var h='<div class="tw"><table><tr><th>Görsel</th><th>Yazar · Lisans</th></tr>';Object.keys(H.PH||{}).forEach(function(k){H.PH[k].forEach(function(x){h+='<tr><td>'+x.c.split(":")[0]+'</td><td style="font-size:.85em">'+x.a+(x.u?'<br><span class="mut" style="word-break:break-all">'+x.u+'</span>':'')+'</td></tr>'})});return h+'</table></div>'};
})();
