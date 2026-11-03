/* Sadeleştirme: tekrar eden sayfaları birleştirir, kategori sırasını kurar, eksik kalan kuralları tamamlar.
   Eski bağlantılar H.alias ile yeni sayfaya yönlenir. */
(function(){
var H=window.HK,cd=H.cd,st=H.st;
function g(id){return H.guide.filter(function(x){return x.id===id})[0]}
function drop(id){H.guide=H.guide.filter(function(x){return x.id!==id})}
H.alias={};
function merge(into,from,title,d,sep){var a=g(into),b=g(from);if(!a||!b)return;a.h+=(sep?'<h2>'+sep+'</h2>':'')+b.h;if(title)a.t=title;if(d)a.d=d;if(b.src)a.src=(a.src?a.src+"; ":"")+b.src;drop(from);H.alias["g/"+from]="g/"+into}

/* --- Birleştirmeler --- */
(function(){var a=g("stop"),b=g("oncelik");if(a&&b){a.h=a.h+"<h2>Öncelik sırası</h2>"+b.h;a.t="İlk 15 dakika: STOP ve öncelikler";a.d="Kriz başlayınca, kaybolunca";drop("oncelik");H.alias["g/oncelik"]="g/stop"}})();
merge("griadam","zanshin","Kentte güvenlik ve farkındalık","Gri insan, renk kodları, kalabalık","Farkındalık: renk kodları");
merge("subul","sutopla","Su bulma ve toplama","Bozkırda nereye bakılır, çiy, kar, sızma kuyusu");
merge("barinak","dogalbar","Barınak yeri ve doğal barınak","Yer seçiminin 5 kuralı, devrik ağaç, mağara","Doğal barınaklar");
(function(){var a=g("atesalt"),b=g("surtunme");if(a&&b){a.h=cd("warn","<b>Yanında mutlaka şunlardan biri olsun</b>, en iyisi üçü birden ve üstünde ayrı yerlerde: <b>çakmak</b> (koynunda taşı, soğukta gazı çalışmaz), <b>rüzgâra ve suya dayanıklı kibrit</b> (su geçirmez kutuda), <b>ateş çubuğu</b> (ferro çubuk ya da magnezyum çubuk: ıslansa bile binlerce kez kıvılcım verir). Üçü de kamp ve hırdavat dükkânlarında ucuza satılır.")+
 "<h2>Ateş çubuğuyla ateş yakma</h2>"+st(["<b>Kavı hazırla:</b> Avuç kadar kuru ve ince kav (vazelinli pamuk, kuru ot, ince kabuk talaşı) yuvası yap. Çırayı ve yakıtı yanına diz.","Çubuğun ucunu kavın <b>içine, dibine</b> daya ve çubuğu sıkıca tut.","Kazıyıcıyı (ya da bıçağın sırtını) çubuğa yaklaşık <b>45°</b> açıyla bastır.","Kazıyıcıyı sabit tut, <b>çubuğu sertçe geriye, kendine doğru çek</b>. Kıvılcımlar kavın içine düşer, kavı dağıtmazsın.","Kav tutuşunca alçaktan, yavaşça üfle; ince çırayı azar azar ekle. Sonrası için → <a href='#/g/ates'>Ateş yakma</a>."])+H.steps("ferro","Ateş çubuğu: çizimli")+
 cd("tip","Yeni çubuğun üstündeki siyah kaplamayı birkaç kez kazıyarak sıyır; ilk kıvılcımlar ancak ondan sonra güçlü çıkar. Çubuk ıslandıysa kurulayıp kullan.")+
 "<h2>Diğer yollar</h2>"+a.h+"<h2>Son çare: yay matkabı (sürtünmeyle ateş)</h2>"+"<p>Yay matkabı zordur ve çok güç ister: yukarıdaki yollardan hiçbiri yoksa dene.</p>"+b.h;
 a.t="Kibritsiz ve çakmaksız ateş";a.d="Ateş çubuğu, pil, mercek; en son yay matkabı";drop("surtunme");H.alias["g/surtunme"]="g/atesalt"}})();
merge("zehir","co","Zehirlenme ve karbonmonoksit","Yutma, temas, gaz, kapalı alanda ateş","Karbonmonoksit");
merge("sicak","sicakdalga","Sıcak çarpması ve sıcak hava","Hemen soğut · sıcakta korunma","Sıcak hava dalgasında");
merge("gunes","yildiz","Güneş, saat ve yıldızla yön","Gölge çubuğu, saat, Kutup Yıldızı","Gece: yıldız ve Ay");
merge("sanitasyon","hijyen","Tuvalet, hijyen ve sağlık","Salgını önleyen alışkanlıklar","Kişisel hijyen");
merge("yiyecek","toplayici","Yiyecek: öncelik ve güvenlik","Yiyeceksiz 3 hafta yaşanır; tanımadığını yeme","Doğadan toplarken");
/* Evde ısısız kış → Plan › Kış kesintisi (tek yer) */
(function(){var a=g("evisi"),p=H.plans.filter(function(x){return x.id==="kiskesinti"})[0];if(a&&p){p.h=p.h+"<h2>Tek oda düzeni</h2>"+a.h;drop("evisi");H.alias["g/evisi"]="plan/kiskesinti"}})();
/* Deprem: tek sayfa (rehber); plan sürümü kaldırıldı */
(function(){var a=g("deprem"),i=-1;H.plans.forEach(function(p,k){if(p.id==="deprem")i=k});if(a&&i>-1){var p=H.plans[i];
 a.h=a.h.replace(/<div class="card info">Plan › Deprem senaryosu[^<]*<\/div>/,"")+cd("tip","<b>Enkaz altındaysan:</b> <u>Kıpırdama ve tozu kaldırma</u>; ağzını bir bezle ört. <u>Bağırma</u>; bunun yerine boruya ya da duvara <b>üçer üçer vur</b>, düdük çal. Telefonun varsa SMS gönder, sonra ekranı kapat.")+cd("info","Enkazda komşularını arayacaksan önce <a href='#/g/arama'>Hafif arama-kurtarma</a> sayfasını oku. Çok yaralı varsa <a href='#/g/triyaj'>Triyaj</a> sayfasına bak.")+cd("warn","AFAD'ın önerdiği resmî yöntem <b>Çök-Kapan-Tutun</b>'dur. <u>Sarsıntı sırasında yer değiştirmeye, \"boşluk\" aramaya çalışma</u>: yaralanmaların başlıca nedeni sarsıntıda hareket etmektir. Olduğun yerde, sağlam bir eşyanın yanında çök, kapan, tutun.");
 H.plans.splice(i,1);H.alias["plan/deprem"]="g/deprem"}})();
/* Deprem tehlikesi ve faylar: ayrı sayfa değil, Deprem sayfasının "önce" bölümü */
(function(){var a=g("deprem"),b=g("fay");if(!a||!b)return;a.h+="<h2>Depremden önce: adresinin ve ilinin tehlikesi</h2>"+b.h;if(b.src)a.src=(a.src?a.src+"; ":"")+b.src;drop("fay");H.alias["g/fay"]="g/deprem"})();
/* Ayarlar'daki karşılaştırma → uygulamalar sayfasının sonuna */
(function(){var a=g("uygulamalar");if(a&&H.compare){a.h+="<details class='draw'><summary>Benzer uygulamalarla karşılaştırma (aç)</summary>"+H.compare+"</details>";H.alias["compare"]="g/uygulamalar"}})();
/* Analiz sadece Plan sekmesinde */
(function(){var a=g("analiz");if(a)a.cat="_"})();
/* Kamp ve bıçak barınak kategorisine */
["kamp","bicak","dugum"].forEach(function(id){var a=g(id);if(a)a.cat="bar"});(function(){var a=g("sanitasyon");if(a)a.cat="su";a=g("brandabar");if(a){a.t="Branda ve çadır";a.d="A-çatı, tek eğim, yaprak kulübe, çadır tipleri"}})();
H.cats=[{id:"ilk",t:"İlk yardım"},{id:"afet",t:"Afetler"},{id:"su",t:"Su ve hijyen"},{id:"bar",t:"Barınak, kamp, düğüm, alet"},{id:"ates",t:"Ateş"},{id:"nav",t:"Navigasyon"},{id:"sin",t:"Sinyal ve iletişim"},{id:"kent",t:"Güvenlik, grup, hareket"},{id:"yiy",t:"Yiyecek"},{id:"doga",t:"Doğa ve canlılar"},{id:"temel",t:"Temeller ve psikoloji"}];

/* --- Yarım kalan kurallar --- */
(function(){var a=g("kamp");if(!a)return;
 a.h=a.h.replace("kimin işaret ateşini yakacağı belli.","işaretçinin kim olduğu da belli olsun (aşağıya bak).").replace('<h2>Alanlar</h2>',
 cd("warn","<b>İşaret kuralı:</b> Uçak ya da helikopter sesi duyan herkes <b>\"HAVA!\"</b> diye bağırır. <b>İşaretçi</b> (önceden seçilmiş kişi) hazır sinyal ateşini yakar: gündüz ateşe yeşil dal atarak duman çıkarır, gece alevle işaret verir; güneş varsa aynayla yansıtır. Diğerleri açık alana çıkar, <b>iki kolunu Y biçiminde yukarı</b> açar ve kollarını hareket ettirir. Uçak ya da helikopter uzaklaşınca ateşi kontrol altına al. Yaz kuraklığında sinyal ateşi yerine ayna, renkli bez ve ışık kullan.")+'<h2>Alanlar</h2>')})();
(function(){var a=g("isaret");if(!a)return;
 a.h=cd("warn","<b>Ne zaman?</b> Sinyali yalnızca biri seni görebilecekken ver: uçak ya da helikopter sesi duyunca, uzakta araç, ışık ya da insan görünce. Her şeyi önceden <b>hazır kur</b>, sonra bekle: aynayı boynunda, düdüğü göğsünde, sinyal ateşini yakmaya hazır tut. <b>Kim?</b> Ekipte bir işaretçi ve bir yedeği belli olsun. Sesi ilk duyan \"HAVA!\" diye bağırır.")+a.h})();
(function(){var a=g("telsiz");if(!a)return;a.h=a.h.replace("Kanal ve CTCSS kodunu önceden seç, Ekip › Buluşma noktalarına yaz.","Kanalı, CTCSS kodunu ve yedek kanalı ekipçe önceden seçin; Plan › Buluşma noktalarına yazın.")})();
(function(){var a=g("telefon");if(!a)return;a.h=a.h.replace("Ekip ekranındaki hazır mesajlar bunu yapar.","Ekip ekranındaki hazır mesajlar bunu yapar.").replace("Örn. 08-12-18-21.","<b>08 · 12 · 18 · 21</b>'de 10 dakika açık tut.")})();
(function(){var a=g("psiko");if(!a)return;a.h=a.h.replace("Tek lider, net görev dağılımı (su, ateş, nöbet, ilk yardım, navigasyon).","Ekibin tek bir lideri olsun ve roller belli olsun: <b>lider, sağlık, güvenlik, rehber, erzak</b> (Ekip kartında yazılı). Herkes kendi işini ve yedeği olduğu kişinin işini bilsin.")})();
(function(){var a=g("grupyuruyus");if(!a)return;a.h=a.h.replace("<b>Sıra:</b> Önde rota bilen (navigatör)","<b>Sıra:</b> Önde rotayı bilen <b>rehber</b>").replace("sonda deneyimli \"süpürgeci\"","sonda <b>güvenlik</b> rolündeki \"süpürgeci\"")})();

/* --- Yeni sayfalar (ABD Ordusu ATP 3-50.21 ve SERE kılavuzlarındaki eksik konular) --- */
(function(){var a=g("balik");if(!a)return;a.t="Balık, salyangoz, tuzak";a.d="Yalnızca gerçek zorunlulukta";a.h=
 cd("info","Normal zamanda avcılık ve balıkçılık izne ve av dönemi kurallarına bağlıdır; tuzak kurmak çoğu yerde yasaktır. Bu sayfa yalnızca hayati zorunluluk içindir. <b>Kısa bir krizde (3–5 gün) avlanmaya değmez:</b> harcayacağın enerji, eline geçecek yiyecekten fazladır.")+
 "<h2>Balık</h2><ul><li>Baraj ve göllerin çoğunda sazan, kadife, tatlı su kefali bulunur. Sabah ve akşam, sığ ve otlu kıyıda dene.</li><li><b>Bırakıp bekleyen olta</b> enerji harcatmaz: akşam 3–5 olta kur (iğne + misina + solucan ya da çekirge), dala bağla, sabah bak. İğne yoksa iki ucu sivri, 3 cm'lik bir ağaç ya da kemik parçası kullan: balık yutunca enine takılır.</li><li>Taze balığın solungacı kırmızı, gözü parlak, eti serttir. İç organlarını çıkar, iyice pişir.</li></ul>"+
 "<h3>Taş kapan</h3>"+(H.fig.taskapan||"")+st(["Sığ ve yavaş akan bir dere bul.","Dereye taşlardan, akıntı yönünde daralan bir huni dik (V biçimi).","Huninin dar ucunu taşlarla çevrili küçük bir havuza aç.","Balıklar akıntıyla huniye girer, dar ağızdan geri çıkamaz. Sabah ve akşam bak; havuzun ağzını bir taşla kapatıp balığı elle al."])+
 "<h2>Salyangoz</h2><ul><li>İri bahçe salyangozu yağmurdan sonra, nemli çalılık, bağ ve bahçe kenarında çıkar. Türkiye'de toplanıp yurt dışına satılır.</li><li>Toplayınca 2–3 gün aç beklet ya da yalnızca temiz yaprakla besle: yediği zararlı otları atar.</li><li>Yıka, en az 10 dakika kaynat, sonra kabuğundan çıkarıp pişir. <u>Çiğ yeme. Sümüklü böcek ve deniz kenarındaki salyangozları toplama.</u></li></ul>"+
 "<h2>Küçük hayvan (ilmek tuzağı)</h2>"+(H.fig.ilmek||"")+st(["<b>Yer:</b> tavşan patikası: otlar arasında tünel gibi bir iz ve dışkı. Tuzağı patikanın <b>daraldığı</b> yere kur.","<b>İlmek:</b> ince tel ya da sağlam ipin ucuna küçük bir halka yap, öbür ucunu bu halkadan geçir: çekince daralan, <b>yumruk büyüklüğünde</b> bir ilmek olur.","<b>Kur:</b> ilmeği patikanın tam üstüne, alt kenarı yerden <b>bir el (8–10 cm)</b> yukarıda dik as; iki yanına ince dal dikerek sabitle. İpin öbür ucunu sağlam bir dala ya da kazığa bağla.","Hayvan başını ilmeğe sokup ilerleyince ilmek daralır. Elini toprakla ov (kokun kalmasın), çevreyi bozma.","Tek tuzak çoğu zaman boş çıkar: 10–15 tuzak kur, yerlerini kâğıda yaz. Sabah ve akşam kontrol et."])+
 cd("warn","<b>Tularemi (tavşan hastalığı):</b> tavşan ve kemirgenlerden, kirli sudan bulaşan bakteriyel bir hastalıktır; ateş ve boyunda, koltuk altında şişlik yapar. Avladığın hayvanı eldivenle temizle. Karaciğerinde beyaz benekler varsa <u>eti yeme</u>, hayvanı göm. Eti iyice pişir.")+
 "<h2>Son çare: böcek ve solucan</h2>"+st(["<b>Çekirge, cırcırböceği:</b> sabah serinde yavaştır, elle topla. Kanadını, bacaklarını ve başını kopar, iç organlarını çek, <b>mutlaka pişir</b> (parazit).","<b>Böcek kurtçukları:</b> çürük kütüklerin içinde bulunur. Kavurarak ye.","<b>Solucan:</b> yağmurdan sonra toprağın üstüne çıkar. 15 dakika temiz suda beklet (toprağını atar), pişir.","<u>Parlak renkli, tüylü, kötü kokan böcekleri; sinek, sivrisinek, kene, örümcek ve tırtılı yeme.</u>"])+
 "<h2>Saklama</h2><p>Eti 0,5 cm kalınlığında ince şeritler hâlinde ateşin dumanında ya da güneşte kurut; kemik gibi kırılınca hazırdır. Yaz sıcağında pişmiş et bile 1 günde bozulur.</p>";
 a.src="ABD Ordusu ATP 3-50.21 (Survival), bölüm 4; DK Survival Handbook"})();
/* Yenilebilir bitkiler Yiyecek bölümünde; önce zehirli bitkilere bakılsın */
(function(){var a=g("bitkiyen");if(!a)return;a.cat="yiy";a.h=cd("warn","<b>Yemeden önce <a href='#/g/bitkizehir'>Zehirli bitkiler</a> sayfasına bak.</b> Birçok zehirli bitki yenen bitkilere benzer; kesin tanımadığın hiçbir bitkiyi yeme.")+a.h;
 var i=-1,k=-1;H.guide.forEach(function(x,n){if(x.id==="yiyecek")i=n;if(x.id==="bitkiyen")k=n});if(i>-1&&k>-1){var b=H.guide.splice(k,1)[0];i=H.guide.indexOf(g("yiyecek"));H.guide.splice(i+1,0,b)}})();

H.guide.push({id:"gizlen",cat:"kent",ic:"shield",t:"Görünmeden hareket",d:"Yağma ve kargaşa sırasında dikkat çekmeden yol almak",h:
 cd("info","Amaç savaşmak değil, <b>fark edilmemek</b>. Bir ekip en çok hareket, ışık, ses ve siluetle dikkat çeker.")+
 "<h2>Seni ele veren 6 şey</h2>"+'<div class="tw"><table><tr><th>Ne</th><th>Önlem</th></tr><tr><td><b>Hareket</b></td><td>Göz en çok hareketi yakalar. Duruyorsan tamamen dur. Açık alanı birer birer, hızlıca ve kenarından geçin.</td></tr><tr><td><b>Siluet</b></td><td><u>Tepenin sırtında, gökyüzüne karşı yürüme</u>: tepenin <b>hemen altından</b> geç.</td></tr><tr><td><b>Şekil</b></td><td>Çantanın, brandanın ve insan bedeninin düz hatları dikkat çeker; doğada düz çizgi yoktur. Gölgede dur.</td></tr><tr><td><b>Parlaklık</b></td><td>Saat, gözlük, folyo ve telefon ekranı parlar. Ekranı kapat, parlayan eşyayı ört.</td></tr><tr><td><b>Ses</b></td><td>Metal eşyayı bantla; yerinde zıplayıp ses çıkıyor mu, kontrol et. Fısıltıyla konuşun, el işaretleri kullanın.</td></tr><tr><td><b>Işık ve koku</b></td><td>Gece yalnızca kırmızı ışık kullan ve ışığı yere tut. Sigara, yemek kokusu ve ateş dumanı kilometrelerce uzağa gider.</td></tr></table></div>'+
 "<h2>Rota ve mola</h2>"+st(["Ana yol yerine ona paralel patikaları, orman kenarını ya da dere yatağını kullan. Köprü, tünel ve kavşak darboğazdır: geçmeden önce uzaktan gözle.","En iyi hareket saati <b>şafak ve akşam alacasıdır</b>. Gece yürüyüşü yavaştır ve kaza riski yüksektir: yalnızca gerekirse gece yürü.","Molayı yoldan en az 100 m içeride, arkası kapalı ve <b>iki çıkışı</b> olan bir yerde ver. Varınca 5 dakika sessizce dinle.","Her etapta bir <b>toplanma noktası</b> söyle: \"Dağılırsak şu tepenin altındaki ağaçlarda 30 dk bekleriz.\"","Kalkarken arkana bak: <u>eşya, çöp ya da iz bırakma.</u>"])+
 "<h2>Yabancılarla temas</h2><ul><li>Köye ya da gruba yaklaşmadan önce uzaktan 10 dakika izle: kim var, ne yapıyorlar?</li><li>Yalnızca bir kişi, elleri görünür hâlde ve sakin yaklaşır; diğerleri görüş mesafesinde bekler.</li><li>İhtiyacını kısaca söyle (su, yol tarifi, yaralıya yardım), karşılığında iş ya da beceri öner. <u>Ekibin büyüklüğünü, stokunu ve varış yerini anlatma.</u></li><li>Gerginlik sezersen teşekkür et ve uzaklaş: hiçbir şey kavgaya değmez.</li></ul>",
 src:"ABD Ordusu ATP 3-50.3 (Survival, Evasion and Recovery); ATP 3-50.21"});

(function(){var a=g("isi");if(!a)return;a.h+=cd("tip","<b>Doğaçlama giysi (ABD Ordusu hayatta kalma kılavuzu ATP 3-50.21):</b> Kalın bir çöp poşetinde baş ve kol delikleri aç, montun altına giy: rüzgârı ve buharı geçirmeyen bir kat olur. Montla iç kat arasına <b>kuru ot, yaprak ya da buruşturulmuş gazete</b> doldur: asıl yalıtımı, bunların arasında hapsolan hava sağlar. Islak çorabı gece göğsünde kurut. Donmayı geciktirmek için elini koltuk altına, ayağını arkadaşının karnına koy.")})();
(function(){var a=g("bicak");if(!a)return;a.h+="<h2>Doğaçlama ip ve kap</h2><ul><li><b>İp:</b> Isırgan sapının, ıhlamur ve söğüt iç kabuğunun liflerini kullan. Lif demetini ikiye böl, ikisini aynı yöne bük, sonra birbirinin üstünden <b>ters yöne</b> sar: kendini kilitleyen bir ip olur. Demet bitmeden yeni lifi araya ekle.</li><li><b>Kap:</b> Plastik şişe, konserve kutusu ya da kalın poşet kap olarak işe yarar. Plastik kabı ateşe koyup kaynatamazsın; ama ateşte ısıttığın taşları içine atarak suyu ısıtabilirsin. <u>Taşları dereden alma</u>: ısınınca patlar.</li><li><b>Kazık ve sırık:</b> Ölü, sert bir dal kullan. Bıçağını korumak için ucunu taşa sürterek sivrilt.</li></ul>";a.t="Bıçak, alet, doğaçlama";a.src+="; ATP 3-50.21"})();

/* --- Planlar: belirsiz yer tutucuları netleştir --- */
H.plans.forEach(function(p){
 p.h=p.h.replace("Suyun X gün yokluğu ve dönüş tarihinin belirsizliği (ekip X'i önceden yazsın).","Şebeke suyu <b>7 gündür</b> yoksa, dağıtım yapılmıyorsa ve suyun ne zaman geleceği belli değilse.")
  .replace("Kural: <b>tetik gelince Y saat içinde çık, çıkamadıysan kal</b>.","Kural: <b>Tetikleyicilerden biri olunca 6 saat içinde yola çık; çıkamadıysan evde kal</b> ve ertesi sabahı bekle.")
  .replace("Telefonu Maksimum güç tasarrufuna al.","Telefonu <b>kriz moduna</b> al (Rehber › Telefonu kriz moduna al).")
  .replace("Tahliye: Plan A rotası, RP3. Telefon tasarruf moduna, telsizle iletişim","Tahliye et: önce <b>Plan 0</b>'ı uygula (araçla ev sahibine git); araç yoksa yürüyüş planını uygula. Telefonları KRİZ modunda tut, telsizi sabit saatlerde aç.")
  .replace("Ekip RP2\\'de toplanır veya evde kalır; her 6 saatte yoklama; tahliye hazırlığı","Ekip RP2'de toplanır veya evde kalır; her 6 saatte yoklama; tahliye hazırlığı")
  .replace("[\"8\",\"Düğümler\",\"6 düğüm gözü kapalı\"]","[\"8\",\"Düğümler\",\"8 düğüm gözü kapalı\"]");
});
})();
