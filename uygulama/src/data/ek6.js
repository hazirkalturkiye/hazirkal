/* ek6.js: SAS Survival Handbook (Wiseman, 2009) karşılaştırması sonrası afet ekleri:
   yangın (başlangıç yangını, pencereden inmek, orman yangınında araç), sel (binada mahsur, batan araç),
   araç kiti, sıcakta kapalı araç, kar fırtınasında araç, helikopter kurtarması, tehlikeli madde taşıyan araç.
   AFAD, itfaiye ve Türk Kızılay ile çelişen bir şey yazılmadı. */
(function(){var H=window.HK;

/* ---------- g/yangin ---------- */
/* (1) Başlangıç yangınını söndürmek: bölümün başına */
H.ekle("yangin",
 "<h3>Yangın yeni başladıysa</h3>"+
 "<p>Yangın küçükse (çöp kovası, tava ya da tek bir eşya kadar), oda dumanla dolmadıysa ve çıkış kapısı arkanda kalıyorsa söndürmeyi dene; önce birine 112'yi arat. Öyle değilse <u>söndürmeye uğraşma</u>: herkesi çıkar, 112'yi ara.</p><ul>"+
 "<li><b>Yangın söndürücü:</b> Pimi çek. Hortumu alevlere değil, alevin dibine, yanan şeye tut. Tetiği sık ve hortumu sağa sola süpürür gibi gezdir. Söndürücü kısa sürede boşalır: yangın sönmezse hemen çık.</li>"+
 "<li><b>Tava ya da yağ yangını:</b> <u>Su dökme</u>: su değince yanan yağ her yere sıçrar, yangın büyür. Ocağı kapat. Tavanın kapağını kapat ya da üstüne ıslak bir havlu veya yangın battaniyesi ört. <u>Tavayı taşıma</u>, soğuyana kadar <u>kapağı ya da örtüyü kaldırma</u>.</li>"+
 "<li><b>Elektrikli cihaz:</b> Önce elektriği sigortadan ya da şalterden kes, sonra söndürücüyü kullan. <u>Su dökme.</u></li>"+
 "<li><b>Tüp:</b> Vanayı kapatabiliyorsan kapat. Kapatamıyorsan herkesi dışarı çıkar, uzaklaş ve 112'yi ara.</li></ul>"+
 "<h3>Binadan çıkarken</h3>",
 {sonra:"<h2>Bina yangını</h2>"});
H.degis("yangin",
 "ağzını ıslak bezle kapat.",
 "ağzını ıslak bezle kapat. Geçtiğin kapıları arkandan kapat ama <u>kapıları kilitleme</u>: kapalı kapı ateşi ve dumanı yavaşlatır. Dışarı çıkınca <u>binaya geri girme</u>; içeride kalan biri varsa itfaiyeye söyle.");
/* (3) Pencereden inmek: mahsur kalma adımının ardına */
H.ekle("yangin",
 "<h3>Pencereden inmek</h3>"+
 "<p>Yalnızca zemin kattaysan ya da 1. kattaysan ve kapıdan çıkamıyorsan pencereden in. Önce aşağıya yatak ya da minder at. Yüzün duvara dönük olarak pervaza tutun, kollarını uzatarak sark, sonra bırak; yere değerken dizlerini bük. 2. katta ya da daha yüksekteysen <u>pencereden atlama</u>: 3. adımdaki gibi kapıyı kapalı tut, camdan işaret ver ve itfaiyeyi bekle.</p>",
 {sonra:"yere yakın, alçakta kal.</div></div>"});
/* (2) Orman yangınında araçtaysan */
H.ekle("yangin",
 "<h3>Araçtaysan</h3><ul>"+
 "<li>Yol açıksa farlarını yak, yavaş sür ve yangından uzaklaş.</li>"+
 "<li>Yangın yolu kestiyse aracı bitkisi az, açık bir yere (çakıllık, sürülmüş tarla, yanmış alan) çek. Ağaçlardan ve çalılardan uzak dur.</li>"+
 "<li>Farları ve dörtlüleri yak, motoru durdur. Camları, kapıları ve havalandırmayı kapat.</li>"+
 "<li>Cam hizasının altına eğil, ayak boşluğuna çömel. Herkesi yün battaniyeyle ört; yün yoksa pamuklu bir örtü kullan. Su iç.</li>"+
 "<li><u><b>Araçtan çıkıp koşma.</b></u> Araç sallanabilir, içeri duman ve kıvılcım girebilir, içerisi ısınır: yine de araçta kal. Dışarıda ateşin yaydığı sıcaklık öldürür; araç seni bundan korur. Yakıt deposu nadiren patlar.</li>"+
 "<li>Alevler geçip sıcaklık düşünce dikkatle in ve yanmış alana geç; aracın metal yerleri sıcak olabilir. 112'yi ara.</li></ul>",
 {sonra:"yangının uğultusunu görmezden gelme</u>; erkenden uzaklaş.</div></div>"});
H.kaynakEkle("yangin","Wiseman, SAS Survival Handbook (2009); Ankara İtfaiyesi, alev alan yağa su dökülmez; CFA (Victoria İtfaiyesi, Avustralya) ve NSW RFS, orman yangınında araçta kalmak");

/* ---------- g/sel ---------- */
/* (5) Batan araç: sıra */
H.degis("sel",
 "Araç suda kaldıysa emniyet kemerini çöz, camı aç ya da kır, araçtan çık ve aracın tavanına çık.",
 "Araç suda kaldıysa vakit kaybetmeden şu sırayla davran: emniyet kemerini çöz, camı aç ya da kır, çocukları senden önce camdan çıkar, sonra sen çık ve aracın tavanına çık. <u>Kapıyı zorlamakla vakit kaybetme</u>: suyun basıncı kapıyı açtırmaz. <u>Eşya almak ya da 112'yi aramak için durma</u>; önce çık. Bazı yeni araçların yan camı lamine camdır (kırılınca dağılmayan, iki katlı cam) ve cam kırıcıyla kırılmaz: o zaman arka camı kır.");
/* (4) Binada mahsur kalmak */
H.ekle("sel",
 "<h2>Selde binada mahsur kalırsan</h2><ul>"+
 "<li>Su hızla yükseliyorsa sağlam binada kal. <u>Yürüyerek ya da araçla çıkmaya çalışma.</u></li>"+
 "<li>Vaktin varsa gazı ana vanadan kapat, elektriği şalterden indir. Ayağın sudayken ya da elin ıslakken <u>şaltere dokunma</u>.</li>"+
 "<li>Üst kata çık. Yanına su, telefon, el feneri, düdük ve renkli bir bez al.</li>"+
 "<li><u>Kapalı çatı arasına çıkma</u>: su yükselirse orada sıkışırsın. Gerekirse çatıya çık ve oradan işaret ver (→ <a href='#/g/isaret'>İşaret verme</a>).</li>"+
 "<li>112'yi ara. Arama geçmiyorsa ekibine ve yakınlarına SMS at; adresini ve kaçıncı katta olduğunu yaz.</li>"+
 "<li>Su çekilirken ya da kurtarılırken <u>su altındaki yoldan ve köprüden geçme</u>: altı oyulmuş ya da yıkılmış olabilir.</li></ul>",
 {once:"<h2>Sel suyuna değen konserve</h2>"});
H.kaynakEkle("sel","Wiseman, SAS Survival Handbook (2009); FEMA, selde binada mahsur kalmak (kapalı çatı arası); batan araçtan çıkış sırası: Giesbrecht");

/* ---------- c/arac (grubun sonuna) ---------- */
H.listeEkle("arac","",[
 "Kemer kesicili cam kırma çekici|sürücünün kemeri takılıyken uzanabileceği yerde (kapı cebi ya da orta konsol) dursun; araç suya düşerse ya da kapılar sıkışırsa camı kırıp çıkarsın. Lamine cam kırılmaz: aracının hangi camının kırılabildiğini öğren. Yangın söndürücüyü de bagajda değil, kabinde sabitlenmiş olarak tut: kazada bagaj kapağı sıkışabilir, sabitlenmemiş tüp çarpmada fırlar"]);

/* ---------- g/sicak: kapalı araç ---------- */
H.ekle("sicak",
 "<li>Araç gölgede olsa da, yalnızca birkaç dakikalığına bile olsa çocuğu, uyuyan ya da yaralı kişiyi ve hayvanı <u>kapalı araçta bırakma</u>. Araç içi dakikalar içinde tehlikeli ölçüde ısınır; camı aralamak işe yaramaz, güneş de yer değiştirir. Araçtan inerken arka koltuğa bak. Kapalı araçta kalmış bir çocuk ya da hayvan görürsen 112'yi ara.</li>"+
 "<li>Yazın depremden ya da selden sonra gündüz <u>kapalı araçta barınma</u>. Gündüz gölgede kal; aracı, branda ya da örtü germek için iskelet olarak kullanabilirsin.</li>",
 {sonra:"ıslak çarşaf as.</li>"});
H.kaynakEkle("sicak","Wiseman, SAS Survival Handbook (2009); ABD Ulusal Hava Servisi (NWS), kapalı araçta sıcaklık");

/* ---------- plan/kisa: araçta barınma ---------- */
H.ekle("plan/kisa",
 "<div class=\"step\"><div class=\"n\">6</div><div class=\"f\">Yazın gündüz <u>kapalı araçta barınma</u>: araç içi kısa sürede tehlikeli ölçüde ısınır. Gündüz gölgede kal. Çocuğu, yaşlıyı, hastayı ve hayvanı <u>kapalı araçta bırakma</u> (→ <a href='#/g/sicak'>Sıcak çarpması ve sıcak hava</a>).</div></div>",
 {sonra:"bacakta pıhtıya yol açabilir.</div></div>"});

/* ---------- g/kisfirtina ---------- */
H.degis("kisfirtina",
 "aracı karbonmonoksitle (kokusuz, zehirli gaz) doldurur.",
 "aracı karbonmonoksitle (kokusuz, zehirli gaz) doldurur. <u>Motor çalışırken uyuma</u>; sırayla uyuyun, biri hep uyanık kalsın. Baş ağrısı, baş dönmesi, bulantı ya da uyku hâli karbonmonoksit belirtisi olabilir: motoru hemen kapat, camı aç (→ <a href='#/g/zehir'>Zehirlenme ve karbonmonoksit</a>).");
H.ekle("kisfirtina",
 "<h2>Araçtan ayrılman gerekirse</h2><ul>"+
 "<li>Araçtan ancak tipi dinince, gün ışığında ve izleyebileceğin bir yol işareti (yol direkleri, bariyer, elektrik direkleri) varsa ayrıl.</li>"+
 "<li>Yardım çok yakınsa ve kısa süre için ayrılıyorsan aracın yanına bir sopa dik, ucuna renkli bez bağla: dönerken aracı karın içinde kolay bulursun. Araçta kimin, ne zaman, hangi yöne gittiğini yazan bir not bırak.</li></ul>");
H.kaynakEkle("kisfirtina","Wiseman, SAS Survival Handbook (2009); ABD Ulusal Hava Servisi (NWS), kışın araçta mahsur kalmak");

/* ---------- g/isaret: helikopter kurtarması ---------- */
H.ekle("isaret",
 "<h2>Helikopter yaklaşınca</h2><ul>"+
 "<li><b>Hazırlık:</b> Çadır, branda, şapka, poşet gibi uçabilecek eşyaları topla ya da bağla: pervanenin rüzgârı çok güçlüdür. Sopa ve yürüyüş batonu gibi uzun eşyaları yatay ve aşağıda taşı.</li>"+
 "<li><b>Rüzgâr:</b> Rüzgârın yönünü dumanla ya da bir sopaya bağladığın bezle göster.</li>"+
 "<li><b>Gece:</b> Fenerini iniş yerine tut. <u>Pilotun gözüne ışık tutma</u>: pilot gece görüş gözlüğü takıyor olabilir, ışık onu kör eder.</li>"+
 "<li><b>Yaklaşırken:</b> Pilot ya da ekip işaret etmeden <u>helikoptere yaklaşma</u>. Önden ya da önden yana, pilotun seni görebileceği yerden, eğilerek yaklaş. <u><b>Helikoptere arkadan yaklaşma</b></u>: kuyruktaki pervane dönerken görünmez. Eğimli yerde yokuşun aşağı tarafından yaklaş: yokuş tarafında pervane yere yakındır.</li>"+
 "<li><b>Vinçle alınıyorsan:</b> Kanca, sepet ya da kurtarma kemeri yere değmeden <u>ona dokunma</u>: helikopterin biriktirdiği statik elektrik seni çarpar. Kurtarma kemeri koltuk altından geçince kollarını aşağıda tut; <u>kollarını kaldırma</u>, yoksa kemerden kayarsın.</li>"+
 "<li>Ekip ne derse onu yap.</li></ul>");
H.kaynakEkle("isaret","Wiseman, SAS Survival Handbook (2009); ABD Sahil Güvenlik (USCG), helikopterle kurtarmada statik elektrik; Avustralya Sivil Havacılık Otoritesi (CASA), helikopter çevresinde güvenlik");

/* ---------- g/kbrn ve g/ilkadim: tehlikeli madde taşıyan araç kazası ---------- */
H.ekle("kbrn",
 "<h3>Tehlikeli madde taşıyan araç kazası</h3><ul>"+
 "<li>Kazaya karışan tankerde ya da kamyonda turuncu levha varsa araç tehlikeli madde taşıyordur. Sızıntı görmesen de <u>araca yaklaşma</u>: bazı gazların rengi ve kokusu yoktur.</li>"+
 "<li>Rüzgârı arkana al (rüzgâr senden araca doğru essin), mümkünse yokuş yukarıda dur ve araçtan en az 100 m uzak kal. Araç yanıyorsa en az 800 m uzaklaş: tanker patlayabilir. Çevredekileri de uzaklaştır.</li>"+
 "<li><u>Dökülen sıvıya basma, dumanın ve buharın içine girme.</u> Sürücüye yardım etmek için bile <u>araca yaklaşma</u>; itfaiyeyi bekle.</li>"+
 "<li>112'yi ara ve levhadaki iki sayıyı söyle: üstteki sayı tehlikenin türünü, alttaki sayı maddeyi gösterir. Uzaktan okuyamıyorsan telefonunun kamerasıyla yakınlaştırarak oku.</li></ul>",
 {sonra:"oradan hemen uzaklaş.</p>"});
H.kaynakEkle("kbrn","Wiseman, SAS Survival Handbook (2009); Tehlikeli Madde Acil Müdahale Rehberi (ERG 2024), kılavuz 111: en az 100 m, araç yanıyorsa 800 m, rüzgârı arkana al");
/* Uyarı, okuyan kişi araca yaklaşıp kontağı kapatmadan önce görsün diye 2. adımın ilk cümlesinin ardına konur. */
H.degis("ilkadim",
 "Kendi aracını güvenli bir yere çek, dörtlüleri yak, yansıtıcı yeleğini giy.",
 "Kendi aracını güvenli bir yere çek, dörtlüleri yak, yansıtıcı yeleğini giy. Kazaya karışan tankerde ya da kamyonda turuncu levha varsa <u>araca yaklaşma</u>: rüzgârı arkana alarak en az 100 m uzakta dur, araç yanıyorsa en az 800 m uzaklaş ve 112'yi ara (→ <a href='#/g/kbrn'>Kimyasal / nükleer / endüstriyel</a>).");
H.kaynakEkle("ilkadim","Wiseman, SAS Survival Handbook (2009); tehlikeli madde taşıyan araç: ERG 2024");
})();
/* Kaynak satırlarında aynı kaynağın iki kez geçmesini önle (ek4–ek6 aynı sayfaya ayrı ayrı ekleyebiliyor).
   Anahtar, girdinin " (" öncesindeki kısmıdır: "Wiseman, SAS Survival Handbook (2009) (konum bildirme)" ile
   "Wiseman, SAS Survival Handbook (2009)" aynı kitap sayılır. Aynı anahtarlı girdilerden yalnızca İLKİ kalır. */
(function(){var H=window.HK;(H.guide||[]).concat(H.plans||[]).forEach(function(g){if(!g.src)return;var seen={},out=[];g.src.split(/;\s*/).forEach(function(p){var k=p.trim(),i=k.indexOf(" ("),a=i>=0?k.slice(0,i):k;if(k&&!seen[a]){seen[a]=1;out.push(k)}});g.src=out.join("; ")})})();
