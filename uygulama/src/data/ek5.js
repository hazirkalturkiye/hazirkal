/* ek5.js: SAS Survival Handbook (Wiseman, 2009) karşılaştırmasından çıkan ekler:
   deniz akıntısı, dere, barınak ve kamp yeri, çığ, heyelan, dağda kaybolma, grup düzeni, konum bildirme,
   pusula, saat yöntemi, düğüm, balta, yıldırım, hava, su, ateş, konserve, kamp hijyeni.
   Araçlar ek0.js'de. Çelişmelerde AFAD, Türk Kızılay ve T.C. Sağlık Bakanlığı esas alındı. */
(function(){var H=window.HK,cd=H.cd,st=H.st;
var SAS="Wiseman, SAS Survival Handbook (2009)";

/* ---------- g/suda: denizde çeken akıntı, ip atarak kurtarma ---------- */
H.ekle("suda",
 "<h2>Denizde akıntıya kapılırsan</h2>"+
 "<p>Çeken akıntı (rip akıntısı) seni dibe değil, <b>açığa</b> doğru çeker. Rüzgârlı ve dalgalı günlerde güçlenir; Karadeniz kıyısındaki boğulmaların çoğu bu akıntı yüzünden olur. Suyun bulanık olduğu, köpüğün ve yüzen şeylerin açığa doğru aktığı, dalgaların kırılmadığı dar bir şerit çeken akıntı olabilir: <u>oradan denize girme</u>.</p>"+
 st(["<u>Akıntıya karşı, kıyıya doğru yüzmeye çalışma</u>: yorulup batarsın. <u>Paniğe kapılma</u>; akıntı seni dibe çekmez.",
  "Sırtüstü süzülerek nefesini toparla.",
  "<b>Kıyıya paralel</b> yüz (sağa ya da sola): akıntı çoğunlukla dar bir şerittir. Akıntının dışına çıkınca kıyıya doğru yüz; dalgalar seni kıyıya taşır.",
  "Yüzemeyecek kadar yorulduysan sırtüstü süzül; tek kolunu sallayıp bağır. <u>İki kolunu birden sallama</u>: batarsın.",
  "Kayalara doğru sürükleniyorsan sırtüstü, oturur gibi dur: ayakların önde, dizlerin hafif bükük olsun. Çarpmayı ayaklarınla karşıla."],true)+
 "<ul><li>Cankurtaranı olan yerde yüz. Kırmızı bayrak, \"denize girmek yasaktır\" ya da çeken akıntı levhası varsa <u>denize girme</u>.</li>"+
 "<li>Derinliğini bilmediğin suya <u>başla atlama, dalma</u>: dipteki kaya ya da kum boynunu kırabilir. Suya ayaklarınla gir.</li>"+
 "<li>Küçük teknede, kanoda ve şişme botta <b>can yeleğini hep giy</b>: suya düşünce yelek giymeye vakit olmaz.</li></ul>"+
 cd("warn","<b>Akıntıya kapılan birini kurtarıyorsan:</b> <u>Kurtarma eğitimin ve yanında yüzen bir şey yoksa peşinden suya atlama</u>; kurtarmak için suya giren pek çok kişi boğulur. Cankurtarana seslen, 112'yi ara. Kişiye can simidi, boş bidon ya da ip at. İpin kendi ucunu bir ağaca ya da direğe bağla veya birine sıkıca tutturt: yoksa suya sen çekilirsin. İpi kişinin biraz ötesine at: ip onun üstünden geçip eline yakın düşer. Ucuna yarısı su dolu bir şişe bağlarsan daha uzağa gider; <u>ağır ucu kişinin kafasına atma</u>. <u>Akıntılı ya da dalgalı suda ipi beline bağlama</u>: akıntı seni de suyun altına çeker. Kişi sudan çıkınca yukarıdaki boğulma adımlarını uygula."),
 {once:"<h2>Soğuk suya ya da buza düşersen</h2>"});
H.kaynakEkle("suda",SAS+"; çeken akıntı: İTÜ öğretim üyesi Prof. Dr. Serdar Beji ve cankurtaran Yılmaz Çelik (AA, TRT Haber, 2023)");

/* ---------- g/dere: ipe bağlanma, geri akıntı, kar suyu ---------- */
H.degis("dere","Kullanacaksan ipi iki kıyıdaki ağaçlara sabit bir emniyet ipi olarak ger.",
 "Kullanacaksan ipi iki kıyıdaki ağaçlara sabit bir emniyet ipi olarak ger ve ipe yalnızca elinle tutun. <u>İpi kimsenin beline ya da göğsüne bağlama</u>: akıntı ipe bağlı kişiyi suyun altına bastırır, kişi ipten kurtulamaz.");
H.ekle("dere",
 "<li><u>Büyük kayanın, şelalenin, bendin ya da regülatörün hemen aşağısındaki köpüklü suya girme</u>: su orada geri döner, içine düşeni çekip su altında tutar. Bu yerler uzaktan sakin görünebilir.</li>"+
 "<li>Kar suyuyla beslenen dere çok soğuktur ve öğleden sonra kabarır; sabah erken geç. Bu suda <u>derin yerden yürüyerek ya da yüzerek geçmeye çalışma</u>: soğuk birkaç dakikada kollarını ve bacaklarını tutmaz hâle getirir. Su yalnızca ayaklarını ıslatacak kadar sığsa geç; karşı kıyıda ayaklarını hemen kurula ve kuru çorap giy. Derinse köprü ya da başka bir geçit ara.</li>",
 {sonra:"Sakin görünen yüzeyin altında hızlı akıntı olabilir.</li>"});
H.kaynakEkle("dere",SAS);

/* ---------- g/barinak ve g/kamp: kış istisnası, taşkın izi, su düzeni ---------- */
H.degis("barinak","Barınağı tepenin rüzgâr almayan yamacına, kayalığın ya da ağaç kümesinin arkasına kur. <u>Sırtta ve tepede kamp yapma.</u>",
 "Barınağı tepenin rüzgâr almayan yamacına, kayalığın ya da ağaç kümesinin arkasına kur. <u>Sırtta ve tepede kamp yapma.</u> <b>Karlı dağda dikkat:</b> rüzgâr almayan yamaçta kar birikir ve çığ olur. Kışın <u>dik yamacın, uçurumun ve dar oluğun dibine barınak kurma</u>; buralara çığ ve kar saçağı düşer (→ <a href='#/g/kar'>Çığ</a>).");
H.degis("barinak","Sudan 60 m uzakta, biraz yüksekte, düz bir yer seç.",
 "Sudan 60 m uzakta, biraz yüksekte, düz bir yer seç. Derenin yakınındaysan <b>taşkın izine</b> bak: dallarda, çalılarda ve kayalarda kalmış çerçöp çizgisi suyun ne kadar yükseldiğini gösterir. Barınağı bu çizginin belirgin biçimde üstüne kur. Yukarıdaki dağlara yağan yağmur, senin olduğun yerde hiç yağmasa da neredeyse uyarısız sel getirir.");
H.kaynakEkle("barinak",SAS);

H.degis("kamp","Yeri incele: akıntının yukarısında ölü hayvan, başının üstünde kuru dal var mı, bak.",
 "Yeri incele: akıntının yukarısında ölü hayvan, başının üstünde kuru dal var mı, bak. Dere kenarındaysan taşkın izinin (dallarda kalmış çerçöp çizgisi) belirgin biçimde üstünde kal (→ <a href='#/g/barinak'>Barınak yeri</a>).");
H.ekle("kamp",
 "<li><b>Dere kenarında su düzeni:</b> İçme suyunu derenin en yukarısından al; kimse bu noktanın yukarısında yıkanmasın. Yıkanma yeri onun aşağısında, bulaşık yeri daha da aşağıda olsun.</li>",
 {once:"<li>Birkaç gün kalacaksanız tuvalet hendeğini"});
H.kaynakEkle("kamp",SAS);

/* ---------- g/sanitasyon: tuvalet hendeği ---------- */
H.degis("sanitasyon","her kullanımdan sonra üstüne toprak at.",
 "her kullanımdan sonra üstüne toprak, varsa odun külü at. Hendeği tahta, branda ya da dallarla ört: sinekler dışkıdaki mikrobu yemeğe taşır.");
H.kaynakEkle("sanitasyon",SAS+" (kamp tuvaleti)");

/* ---------- g/kar: çığ ---------- */
H.ekle("kar",
 "<h2>Çığ</h2>"+
 "<p>Çığların çoğu <b>30–45°</b> eğimli, ağaçsız yamaçlarda olur. Çığa yakalananların çoğunda çığı kendileri ya da grupları başlatır.</p>"+
 "<h3>Ne zaman tehlikeli?</h3><ul>"+
 "<li>Yoğun kar yağarken ve yağıştan sonraki <b>24 saatte</b> risk en yüksektir; bir seferde 25 cm'den fazla yeni kar yağdıysa daha da yüksektir.</li>"+
 "<li>Hava birden ısınınca, ılık rüzgâr esince ya da karın üstüne yağmur yağınca kar ağırlaşır ve kayar. Güneş alan yamaçlarda risk öğleden sonra artar: bu yamaçları sabah erken geç.</li>"+
 "<li>Kuvvetli rüzgâr karı taşıyıp yamaçlara yığdıysa risk artar.</li>"+
 "<li><b>En açık uyarılar:</b> Yakında yeni çığ izi varsa, karda ayağının önünde çatlak açılıyorsa ya da kar ayağının altında boğuk bir sesle çöküyorsa hemen geri dön.</li></ul>"+
 "<h3>Nerede?</h3><ul>"+
 "<li>Rüzgârın kar biriktirdiği yamaçlar ve sırt kenarındaki kar saçakları tehlikelidir.</li>"+
 "<li>Aşağı doğru dikleşen (dışbükey) yamaçlar ile dar ve dik oluklar tehlikelidir. Çığ vadi tabanına ve oluğun dibine akar; buralarda kar derin yığılır.</li>"+
 "<li>Sık ağaçlı yamaçlar daha az tehlikelidir ama tam güvenli değildir. Kardan çıkan kayaların çevresinde kar ince ve zayıftır: çığ en kolay oradan kopar.</li></ul>"+
 "<h3>Tehlikeli yamacı geçmek zorundaysan</h3><ul>"+
 "<li>Önce sırttan, sık ağaçlıktan ya da yamacın en az eğimli yerinden dolaşmayı dene.</li>"+
 "<li>Yamaca <b>tek tek</b> girin. Ötekiler güvenli bir yerde bekleyip geçeni gözlesin; <u>yamacın ortasında durma</u>, <u>grup olarak orada toplanma</u>.</li>"+
 "<li>Kışın dağa çıkan herkes <b>çığ vericisi</b> (gömülen kişinin yerini bulduran verici-alıcı cihaz), <b>sonda</b> (karı yoklamaya yarayan katlanır ince çubuk) ve kürek taşısın; kullanmayı önceden çalışın.</li></ul>"+
 "<h3>Çığa yakalanırsan</h3>"+
 st(["Bağırarak ötekileri uyar ve <b>çığın kenarına doğru, yana</b> kaç: kenarda kar daha yavaş ve sığdır.",
  "Kayak ve baton gibi eşyaları bırak. Bir ağaca ya da kayaya tutunabiliyorsan tutun.",
  "Kar seni sürüklerken ağzını kapalı tut; yüzer gibi kollarını ve bacaklarını çırparak karın üstünde kalmaya çalış.",
  "Kar yavaşlamaya başlayınca bir kolunu bükerek yüzünün önüne al: ağzının ve burnunun önünde <b>hava boşluğu</b> kalsın, dirseğin göğsünü korusun. Öbür kolunu yukarı, yüzeye doğru uzat.",
  "Kar durunca hemen sertleşir. Sakin kal, <u>nefesini boşa harcama</u>. Yüzeye yakın olduğunu hissediyorsan ya da yukarıdan ses duyuyorsan bağır."],true)+
 cd("warn","<b>Biri çığ altında kaldıysa:</b> Onu en son gördüğün yeri işaretle. Telefonla 112'ye haber ver; yardım gelmesini beklemeden kişiyi aramaya başla: çığ altında kalanın kurtulma şansı <b>ilk 15 dakikada</b> yüksektir, sonra hızla düşer. Son görüldüğü noktanın aşağısında, karın üstündeki eşyaya, ele ya da ayağa bakarak ara. Bulduğunda önce yüzünü ve göğsünü aç; nefes almıyorsa <a href='#/g/kpr'>KPR</a>'ye başla, sonra ısıt (→ <a href='#/g/hipotermi'>Hipotermi</a>).<br><u>Çığdan sonra çığ yolunda toplanma, bekleme, araç durdurma</u>: aynı yamaçtan ikinci çığ gelebilir. Van Bahçesaray'da 2020'de ilk çığa müdahale eden ekibin üstüne ikinci çığ düştü; iki çığda toplam 41 kişi öldü. Aramada görevi olmayan herkes çığ yolunun dışında beklesin."));
(function(){var g=H.guide.filter(function(x){return x.id==="kar"})[0];if(g)g.d+=", çığ"})();
H.kaynakEkle("kar",SAS+"; Meteoroloji Genel Müdürlüğü (MGM) çığ broşürü; Van Bahçesaray çığları (2020); kayaların çevresindeki ince kar: avalanche.org, çığ ansiklopedisi (tetikleme noktası)");

/* ---------- g/sel: heyelan ve çamur akıntısı ---------- */
H.ekle("sel",
 "<h2>Heyelan ve çamur akıntısı</h2>"+
 "<p>Heyelan çoğunlukla uzun ya da şiddetli yağmurdan ve kar eriyince olur; Karadeniz'de ve dik yamaçlarda sıktır. Sağanakta ve sonrasında <u>dere yatağında, vadi tabanında ve dik yamacın dibinde durma</u>: çamur ve taş akıntısı bu yollardan hızla iner.</p>"+
 "<p><b>Şunları görür ya da duyarsan</b> hemen uzaklaş, çevrendekileri uyar ve 112'yi ara:</p><ul>"+
 "<li>Yamaçta, yolda ya da bahçede yeni çatlaklar; toprakta kabarma ya da çökme</li>"+
 "<li>Eğilen ağaç, elektrik direği, duvar ya da çit</li>"+
 "<li>Evde birden sıkışan kapı ve pencereler, duvarda yeni çatlaklar, kırılan su boruları</li>"+
 "<li>Yağmur dinmediği hâlde dere suyunun birden azalması ya da kesilmesi, suyun bulanıklaşması (yukarıda toprak kayıp dereyi tıkamış olabilir)</li>"+
 "<li>Yamaçtan gelen uğultu, ağaç çatırtısı ya da taş sesi</li></ul>"+
 st(["Açıktaysan kaymanın ve çamur akıntısının yolundan <b>yana doğru</b> çık, sonra yükseğe uzaklaş. <u>Akıntının önünden aşağı doğru kaçma</u>; <u>dere yatağına ve vadiye inme</u>.",
  "Binadaysan ve hemen çıkıp tehlikeli yerden uzaklaşabiliyorsan çık. Vaktin yoksa içeride kal; sağlam bir eşyanın yanında Çök-Kapan-Tutun yap (→ <a href='#/g/deprem'>Deprem anı</a>).",
  "Kaçamıyorsan top gibi kıvrıl, kollarınla başını ve enseni koru.",
  "Kayma durduktan sonra <u>o yamaca ve evlere geri dönme</u>: yeni kayma olabilir. Elektriği, gazı ve suyu kapat. Gaz kaçağı olabilir: <u>kibrit ya da çakmak yakma</u>, fener kullan. <u>Hasarlı binaya eşya almak için girme.</u>",
  "Toprak altında kalan varsa 112'yi ara. Kayan yere yalnızca kurtarmak için gir: yamaçta yeni çatlak, uğultu ya da akan çamur varsa bekle; biri yamacı gözlesin ve gerekirse bağırarak uyarsın. Görebiliyorsan önce kişinin başını ve göğsünü aç ki nefes alabilsin. Yangın ya da yeni kayma tehlikesi yoksa <u>yaralıyı yerinden oynatma</u>."],true));
(function(){var g=H.guide.filter(function(x){return x.id==="sel"})[0];if(g)g.d+=" · heyelan"})();
H.kaynakEkle("sel",SAS+" (heyelan); AFAD heyelan önerileri (okul afet broşürlerinde ve Sivil Savunma Derneği metninde aktarılan hâli); heyelan belirtileri: ABD Jeoloji Araştırmaları Kurumu (USGS)");

/* ---------- g/kayip: dağda ---------- */
H.degis("kayip","Daha uzağı görmek için güvenle çıkabileceğin bir tepe ya da yükselti varsa çık;",
 "Daha uzağı görmek için güvenle çıkabileceğin ve <b>geri inebileceğinden emin olduğun</b> bir tepe ya da yükselti varsa çık;");
H.ekle("kayip",
 "<h2>Dağda</h2><ul>"+
 "<li>Biri rotanı biliyorsa ve seni arayacaksa olduğun yerde kal, işaret ver (→ <a href='#/g/isaret'>İşaret verme</a>). Kimse seni aramayacaksa gündüz vadiye doğru in: aşağıda su, yol ve köy bulunur. Gece, sisli ve tipili havada barınakta bekle.</li>"+
 "<li><u>İnemeyeceğin yere tırmanma</u>. Engelin üstünden aşmak yerine çevresinden dolaş.</li>"+
 "<li>Dik yerde her an <b>üç dayanak noktan</b> olsun: iki el ve bir ayak ya da iki ayak ve bir el. Bir elini ya da ayağını oynatmadan önce öbür üçünün sağlam durduğundan emin ol.</li>"+
 "<li>Dik yamacı zikzak çizerek geç. Basacağın yeri önce yokla; <u>gevşek taşa ve çürük kütüğe basma</u>. Taş düşürürsen alttakilere \"TAŞ!\" diye bağır.</li>"+
 "<li>Gevşek taşlı (kayşat) yamaç ve aşağı doğru dikleşen yamaç, altındaki uçurumu gizler: inmeden önce yandan ya da karşı yamaçtan bakıp altını gör. <u>Dik kar yamacından kayarak inme.</u></li>"+
 "<li><b>Telefon sinyali</b> sırtta ve açık yükseltide daha iyidir, dar vadide ve vadi tabanında zayıftır (→ <a href='#/g/telefon'>Telefon ve SMS</a>).</li></ul>"+
 cd("warn","<b>Yaralı varsa ve telefon çekmiyorsa:</b> İlk yardım bilen kişi yaralının yanında kalsın. Yardım çağırmaya en dinç iki kişi gitsin; <u>kimseyi tek başına gönderme</u>. Gidenler yanlarına yazılı bir not alsın: konum (Araç › <a href='#/tools/gps'>Konumum</a> ekranındaki enlem-boylam ya da yol tarifi), yaralının durumu ve yapılan ilk yardım, saat, geride kalanların sayısı ve ihtiyaçları. Yolda telefon çekerse hemen 112'yi arasınlar."));
H.kaynakEkle("kayip",SAS);

/* ---------- g/telefon: sinyal ---------- */
H.ekle("telefon",
 "<div class=\"step\"><div class=\"n\">7</div><div class=\"f\"><b>Sinyal arıyorsan:</b> Dar vadide ve vadi tabanında sinyal zayıftır; sırtta ve açık bir yükseltide daha iyidir. Cevap gelmese de mesaj göndermeyi sürdür: mesajın ulaşmış, cevabı sana ulaşamamış olabilir.</div></div>",
 {once:"<div class=\"card info\">AFAD Acil Çağrı"});
H.kaynakEkle("telefon",SAS+" (sinyal)");

/* ---------- g/grupyuruyus: dağılmamak, sis ve tipi ---------- */
H.ekle("grupyuruyus",
 "<li><b>Grubu dağıtmamak:</b> Grubu çoğunlukla öndeki kişi kaybeder. Öndeki kişi her engelden (dere, kaya, dik iniş) sonra durup herkes gelene kadar beklesin. Dere geçişinden ve zor bir geçitten sonra sayım yapın. Rotadaki belirgin noktaları (köprü, çeşme, sırt) yola çıkmadan toplanma yeri olarak herkese söyle.</li>"+
 "<li><b>Sis ve tipide:</b> Aralıklı tek sıra yürüyün; herkes öndekini görebilsin. Pusulayı tutan kişi sıranın arkasında yürüsün ve en öndekini \"sağa, sola\" diye yönlendirsin ya da öndeki sık sık arkaya bakıp sırayı düz bir çizgide tutsun. Yalnızsan arkanda bıraktığın çubuk ya da taş yığınlarına bakarak doğrultunu kontrol et. Görüş çok düşerse dur ve bekle (→ <a href='#/g/hava'>Hava belirtileri</a>).</li>",
 {sonra:"Yanında yoksa ilk yapacağın alet budur.</li>"});
H.kaynakEkle("grupyuruyus",SAS);

/* ---------- g/ilkadim: 112'ye koordinat ---------- */
H.degis("ilkadim","(il, ilçe, mahalle, sokak, numara, yol tarifi).",
 "(il, ilçe, mahalle, sokak, numara, yol tarifi). Adres yoksa (dağ, kır, yol dışı) konumunu <b>enlem-boylam</b> olarak söyle: telefonun harita uygulamasından ya da Araç › <a href='#/tools/gps'>Konumum</a> ekranından oku. İki sayıyı da noktadan sonraki bütün rakamlarıyla oku: önce enlemi (Türkiye'de yaklaşık 35 ile 42 arası), sonra boylamı (yaklaşık 25 ile 45 arası).");
H.kaynakEkle("ilkadim",SAS+" (konum bildirme)");

/* ---------- g/pusula: mesafe hatası ---------- */
H.ekle("pusula",
 "<li><b>En sık hata:</b> Yürüdüğün mesafeyi olduğundan fazla sanırsın (yokuşta, engebede, yorgunken ve gece). Adımlarını say, saati not et. <u>Haritayı bulunduğunu sandığın yere uydurmaya çalışma</u>: çevrendeki tepeleri, dereleri ve yolları haritada ara. Arazi haritaya uymuyorsa dur ve yerini yeniden bul.</li>",
 {sonra:"Bunları bilen kaybolmaz.</li>"});
H.kaynakEkle("pusula",SAS);

/* ---------- g/gunes: saat yönteminde Türkiye saati ---------- */
H.degis("gunes","Kadranlı (akrepli) saat yöntemi. Öğleden önce kadranın sol yanındaki açıyı, öğleden sonra sağ yanındaki açıyı ikiye böl. Hata payı ±15° kadardır; ara sıra gölge çubuğuyla doğrula.",
 "Kadranlı (akrepli) saat yöntemi. Öğleden önce kadranın sol yanındaki açıyı, öğleden sonra sağ yanındaki açıyı ikiye böl. Çizimde açı 12'ye göre değil 1'e göre bölünür, çünkü Türkiye saati (UTC+3) ülkenin batısında güneşten yaklaşık 1 saat ileridedir. Daha doğru yön için 1 yerine, aşağıda yazan ve güneşin tam güneyde olduğu saati kullan. Hata payı ±15° kadardır; ara sıra gölge çubuğuyla doğrula.");
H.kaynakEkle("gunes",SAS+" (saat yöntemi ve yerel güneş saati)");

/* ---------- g/dugum: ip güvenliği ---------- */
H.degis("dugum","Kurtarmada, bele bağlamada ve branda köşesinde kullanılır.",
 "Kurtarmada, bele bağlamada ve branda köşesinde kullanılır. Yük kalkınca gevşeyebilir: ucunu ilmeğin dışında bir yarım bağla kilitle.");
H.ekle("dugum",
 cd("warn","<b>İp güvenliği:</b> <u>Kimsenin beline, göğsüne ya da boynuna kayan (sıkışan) ilmek bağlama</u>: yük gelince ilmek daralır, nefesi keser ve öldürebilir. İnsana yalnızca kazık düğümü gibi kaymayan bir ilmek bağla. Her düğüm ipi zayıflatır; bazı düğümler ipin dayanıklılığını yarıya indirir. Naylon ip başka bir ipe sürtününce ısınıp erir, keskin kaya kenarında kopar: kenarın altına bez ya da giysi koy. <u>Akan suda kimseyi ipe bağlama</u> (→ <a href='#/g/dere'>Dere geçişi</a>)."));
H.kaynakEkle("dugum",SAS);

/* ---------- g/bicak: balta ---------- */
H.ekle("bicak",
 "<h2>Balta</h2><ul>"+
 "<li>Kullanmadan önce baltanın başının sapa sıkı oturduğunu kontrol et: gevşek baş sallarken uçar.</li>"+
 "<li>Baltayı hep bedeninden uzağa doğru salla: ıskalarsan bacağına ya da başkasına gelmesin. Salladığın alanın içinde kimse durmasın.</li>"+
 "<li><u>Odunu elinle dik tutarak ya da ayağınla sabitleyerek yarma</u>. Odunu altlık kütüğün üstüne dik koy.</li>"+
 "<li><u>Baltayı yere atma, yere yatık bırakma</u>: üstüne basan ya da düşen yaralanır. İşin bitince ağzını kütüğe sapla ya da kılıfına koy.</li>"+
 "<li>Derin bir kesikte kanamayı durdur (→ <a href='#/g/kanama'>Kanama</a>).</li></ul>",
 {once:"<h2>Doğaçlama ip ve kap</h2>"});
H.kaynakEkle("bicak",SAS+" (balta)");

/* ---------- g/yildirim: mağara ve kaya çıkıntısı ---------- */
H.ekle("yildirim",
 "<h3>Dağda ve kayalıkta</h3><ul>"+
 "<li><u>Mağara ağzına ve kaya çıkıntısının altına sığınma</u>: yıldırımın akımı kayadaki açıklığın üstünden atlarken oradaki kişinin vücudundan geçer.</li>"+
 "<li>Derin bir mağaradaysan girişten ve duvarlardan en az 1 m uzak dur, çömel.</li>"+
 "<li>Kuru bir uyku matın, kuru ipin ya da çantan varsa üstünde çömel. Bu, yerden gelen akıma karşı biraz korur ama sığınağın yerini tutmaz.</li></ul>",
 {once:"<div class=\"card info\">Fırtına sürüyorsa önce kendini koru."});
H.kaynakEkle("yildirim",SAS+" (mağara ve kaya çıkıntısı)");

/* ---------- g/hava: sabah sisi, duman ---------- */
H.degis("hava","HAVA BOZACAK</span> · görüş düşük","GÖRÜŞ DÜŞÜK</span> · kalkmazsa hava bozar");
H.degis("hava","Çisenti, kışın kar ve düşük görüş getirir. Vadideki sis, soğuk havanın vadide toplandığını gösterir.",
 "Çisenti, kışın kar ve düşük görüş getirir. Vadideki sis, soğuk havanın vadide toplandığını gösterir. Açık ve rüzgârsız bir geceden sonra vadide oluşan sis sabah güneşle kalkıyorsa hava güzel geçecek demektir. Sis öğlene kadar kalkmıyorsa ya da bulut dağın tepesine takılıp kalıyorsa hava kötüleşiyor demektir; öğleden sonra yağış gelebilir.");
H.ekle("hava",
 "<li>Ateşin dumanı dik yükseliyorsa hava sakin ve dengelidir. Duman yere doğru bastırılıyor ve dönüp duruyorsa hava bozuyor, sağanak yaklaşıyor olabilir.</li>",
 {sonra:"vadi tabanı gecenin en soğuk yeridir.</li>"});
H.kaynakEkle("hava",SAS);

/* ---------- g/subul ve g/sudepo ---------- */
H.degis("subul","Yağmur ve kar:</b> Branda ya da poşetle topla.",
 "Yağmur ve kar:</b> Branda ya da poşetle topla; bu suyu da <b>arıt</b>: çatıdan, brandadan ve kaptan kir ve mikrop alır.");
H.degis("subul","Termosifonda ya da kombi deposunda 50–100 L su olur",
 "Termosifonda ya da depolu (boylerli) kombinin sıcak su deposunda 50–100 L su olur");
H.degis("subul","Apartmanın su deposuna da bak.",
 "Apartmanın su deposuna da bak. <u>Kalorifer peteğindeki ve kombinin ısıtma tesisatındaki su ile aracın radyatör suyu içilmez</u>: içinde pas, kimyasal katkı ve zehirli antifriz olabilir.");
H.ekle("subul",
 cd("warn","<u>Deniz suyu ve idrar içilmez</u>: tuzu susuzluğu artırır ve böbreği bozar. Kaynatmak tuzu gidermez. Deniz suyu ancak damıtılırsa (kaynatıp buharını soğuk bir yüzeyde toplarsan) içilir."),
 {once:"<h2>Çiy</h2>"});
H.kaynakEkle("subul",SAS+" (deniz suyu, idrar, kalorifer ve radyatör suyu); yağmur suyunu arıtma: ABD Hastalık Kontrol ve Önleme Merkezleri (CDC)");

H.degis("sudepo","Su şişede değil vücutta saklanır: su varken iç.",
 "Su şişede değil vücutta saklanır: su varken iç. <u><b>Su kıtsa tuzlu yiyecek yeme</b></u> (cips, turşu, salamura, tuzlu kraker): vücudun tuzu atmak için su harcar, susuzluğun artar. Suyun yeterliyse ve çok terliyorsan tuzlu bir şey ye (→ <a href='#/g/sicak'>Sıcak çarpması</a>).");
H.kaynakEkle("sudepo",SAS);

/* ---------- g/ates: sıvı yakıt ---------- */
H.ekle("ates",
 cd("warn","<b>Sıvı yakıt:</b> <u>Ateşi benzin, tiner, kolonya ya da ispirto dökerek tutuşturma</u>: buharı bir anda alev alır, yüzünü ve ellerini yakar. <u>Yanan ya da közü kalmış ateşe, söndü sandığın sobaya sıvı yakıt dökme</u>: alev şişeye kadar geri teper. Mecbur kalırsan biraz yakıtı bir bez parçasına emdir, bidonu kapatıp uzağa koy, sonra bezi kavın altına yerleştirip yak."));
H.kaynakEkle("ates",SAS+" (sıvı yakıt)");

/* ---------- g/yiyecek: konserveyi ısıtmak ---------- */
H.ekle("yiyecek",
 "<li>Konserveyi ateşte ya da ocakta ısıtacaksan önce kapağını aç ya da del: <u>kapalı kutuyu ısıtma</u>, patlar ve kaynar içi yakar.</li>",
 {sonra:"botulizm (ölümcül besin zehirlenmesi) yapabilir.</li>"});
H.kaynakEkle("yiyecek",SAS+" (konserve)");
})();
