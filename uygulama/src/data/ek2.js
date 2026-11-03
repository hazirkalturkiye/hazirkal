/* ek2.js: mevcut ilk yardım sayfalarına ekler (kitap karşılaştırması sonrası). Araçlar ek0.js'de. */
(function(){var H=window.HK,cd=H.cd,st=H.st;
function sayfaVar(id){return H.guide.some(function(x){return x.id===id})}

/* ---- Kafa ve omurga ---- */
H.degis("kafa","burnundan veya kulağından berrak sıvı geliyorsa, ","burnundan veya kulağından berrak sıvı geliyorsa, darbe almayan yerde iki gözünün çevresinde (rakun gözü) ya da kulağının arkasında morluk varsa (kafa tabanı kırılmış olabilir), ");
H.degis("kafa","Gece 2 saatte bir uyandır.","Gece 2 saatte bir uyandır (aşağıdaki 48 saat izlemine bak).");
H.ekle("kafa","<h2>Hastaneye ulaşamıyorsan: 48 saat izle</h2>"+
"<p>Kişi bilincini kısa bir süre kaybettiyse ve onu hastaneye ulaştıramıyorsan <b>48 saat</b> yakından izle. Yanında hep biri olsun; o gün dinlensin.</p><ul>"+
"<li>Uyumasına izin ver; onu uyutmamaya çalışman gerekmez. Ama gece 2 saatte bir uyandır ve konuştur: seni tanıyor mu, nerede olduğunu biliyor mu?</li>"+
"<li>Her uyandırdığında iki kolunu ve iki bacağını normal güçle oynatabiliyor mu, kontrol et.</li>"+
"<li>Göz çevresindeki ve kulak arkasındaki morluk saatler, hatta 1–2 gün sonra çıkabilir: her kontrolde bu bölgelere de bak.</li>"+
"<li>Kusarsa, baş ağrısı artarsa, kolunda ya da bacağında güçsüzlük başlarsa, kafası karışırsa, uyandırılamıyorsa ya da yukarıdaki tehlike işaretlerinden biri çıkarsa <b>112'yi ara</b>.</li></ul>"+
"<h2>Diş yaralanması</h2><ul>"+
"<li>Yerinden çıkan kalıcı dişi <b>taç kısmından</b> (ağızda görünen beyaz kısmından) tut; <u>kök kısmına dokunma</u>. <u>Dişin kurumasına izin verme.</u></li>"+
"<li>Dişi temiz bir kapta <b>sade süt</b> içine koy. Süt yoksa kişi bir kaba tükürsün, dişi bu tükürüğe koy; ya da serum fizyolojik kullan. <u>Dişi suda saklama, fırçalama ya da ovma.</u></li>"+
"<li>Kişiyi ve dişi en geç <b>60 dakika</b> içinde diş hekimine ulaştır.</li>"+
"<li>Diş kırıldıysa kırık parçayı bul, onu da sütte sakla ve 60 dakika içinde diş hekimine götür. Parçayı bulamasan da diş hekimine git.</li>"+
"<li>Çocuğun <b>süt dişi</b> çıktıysa <u>dişi yerine takma</u>; çocuğu yine de diş hekimine götür.</li></ul>");
H.kaynakEkle("kafa","Diş: T.C. Sağlık Bakanlığı Dental Travma Rehberi; ERC 2021 ilk yardım (diş yaralanması). Geç belirtiler ve 48 saat izlem: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Kanama ---- */
H.ekle("kanama",cd("tip","<b>Kan durdurucu (hemostatik) gazlı bez varsa</b> 2. adımda normal bez yerine onu kullan: yaranın içine sıkıca doldur, üstünden en az <b>3 dakika</b> kesintisiz bastır. Ürünün paketindeki talimata uy; bazı ürünler daha uzun bası ister. Bu bez yoksa 2. adımdaki gibi temiz gazlı bezle doldur ve bastır."),{sonra:"<u>boynu çepeçevre sıkıca sarma</u>.</div></div>"});
H.kaynakEkle("kanama","hemostatik gazlı bez: TCCC (en az 3 dk bası), ürün talimatları");

/* ---- Göğüs ---- */
H.ekle("gogus","<h2>Göğse darbe: kaburga kırığı</h2>"+st([
"Göğsüne darbe alan kişide nefes alırken, öksürürken ya da hareket ederken artan, bir noktada yoğunlaşan ağrı varsa <b>kaburga kırılmış</b> olabilir. Kişiyi sağlık kuruluşuna götür.",
"Kişiyi <b>yarı oturt</b>. Ağrıyan tarafa bir yastık ya da katlanmış mont bastırsın; böyle destekleyerek sık sık derin nefes alsın ve gerektiğinde öksürsün. Ağrı yüzünden yüzeysel nefes alırsa zatürre gelişebilir.",
"<u>Kaburgayı sıkıca sarma ya da bantlama</u>: nefesi kısıtlar, zatürre riskini artırır.",
"Nefes darlığı artarsa, dudakları morarırsa, boyun damarları şişerse ya da şok belirtileri başlarsa (soluk, soğuk, terli cilt, hızlı nabız) akciğer sönmüş olabilir: <b>112'yi ara</b>, kişiyi yarı oturur hâlde tut (→ <a href='#/g/sok'>Şok</a>)."
]),{once:"<h2>Batan cisim</h2>"});
H.degis("gogus","<u><b>Batan cismi çıkarma.</b></u>","Yardım günlerce gelmeyecek olsa bile <u><b>batan cismi çıkarma</b></u> (yüzeysel olta iğnesi için aşağıya bak): cisim kanayan damarı tıkıyor olabilir, çekersen kanama başlar.");
H.kaynakEkle("gogus","Kaburga kırığı: ERC 2021; NHS (göğsü sıkıca sarmama). Batan cisim: T.C. Sağlık Bakanlığı İlk Yardım Uygulamaları Beceri Rehberi (MEB İSG 2025)");

/* ---- Yara ---- */
H.degis("yara","<u>Yaranın içine alkol ya da tentürdiyot dökme</u>","<u>Yaranın içine alkol, oksijenli su (hidrojen peroksit) ya da tentürdiyot dökme, sürme</u>");
H.degis("yara","<u><b>Kirli yaranın kenarlarını birleştirme</b></u>","<u><b>Kirli yaranın, ısırığın ve 8 saatten eski yaranın kenarlarını bantla birleştirme</b></u>");
H.ekle("yara"," Pansuman ıslanır ya da kirlenirse hemen değiştir.",{sonra:"Yarayı her gün kontrol et."});
H.ekle("yara"," Enfeksiyon yayılırken titreme, çok hızlı nefes, çok hızlı nabız ya da bilinç bulanıklığı da başlarsa enfeksiyon kana yayılmış (sepsis) olabilir: <b>112'yi ara</b> (→ <a href='#/g/tehlike'>Hasta bakımı ve tehlike işaretleri</a>).",{sonra:"Kırmızı çizgi görürsen ya da ateş çıkarsa hemen tıbbi yardım al."});
H.ekle("yara",cd("info","<b>Kirli yarada tetanoz:</b> Yara kirliyse ya da derinse (çivi, enkaz, toprak), ısırık, yanık ya da ezilme yarasıysa ve son tetanoz aşının üstünden <b>5 yıldan fazla</b> geçtiyse en kısa sürede aşı için sağlık kuruluşuna git. Temiz, küçük yarada bu süre <b>10 yıldır</b>. Hiç aşı olmadıysan, aşılarını tamamlamadıysan ya da bilmiyorsan her yarada git. Tetanoz belirtileri için → <a href='#/g/tehlike'>Hasta bakımı ve tehlike işaretleri</a>.")+
"<h2>Kıymık</h2><ul>"+
"<li>Ellerini ve kıymığın çevresini sabunla yıka.</li>"+
"<li>Kıymığı temiz bir cımbızla deriye en yakın yerinden tut, girdiği açıyla geri çekerek çıkar. Ucu deri altında kaldıysa bir iğneyi alevden geçir ya da alkolle sil; iğneyle ucu açığa çıkar, sonra cımbızla çek.</li>"+
"<li>Çıkardıktan sonra yeri sabunlu suyla yıka, ört ve enfeksiyon belirtilerini izle.</li>"+
"<li>Kıymık derinse, büyükse ya da gözdeyse <u>çıkarmaya uğraşma</u>; kişiyi sağlık kuruluşuna götür (→ <a href='#/g/goz'>Göz</a>).</li></ul>");
H.kaynakEkle("yara","Tetanoz: EKMUD Erişkin Bağışıklama Rehberi 2019 (yaralanmada tetanoz profilaksisi); TİTCK tetanoz aşısı kısa ürün bilgisi. Bantla kapatılmayacak yaralar, kıymık: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Yanık ---- */
H.ekle("yanik"," Derin yanık beyaz, kahverengi ya da kömürleşmiş (siyah) görünür ve ağrısız olabilir: <u>ağrısı yok diye bekleme</u>, kişiyi mutlaka sağlık kuruluşuna götür.",{sonra:"ya da derinse kişiyi hastaneye götür."});
H.ekle("yanik","<h2>Yardım günlerce gelemiyorsa</h2><ul>"+
"<li>Sıvı vermeye devam et: kişinin bilinci tam açıksa ve kusmuyorsa ORS'yi yudum yudum içir (→ <a href='#/g/susuzluk'>İshal ve sıvı kaybı</a>). İdrarı açık renkte kalsın.</li>"+
"<li>Örtüyü temiz tut. Ellerini yıka, ıslanan ya da kirlenen örtüyü temiz bir streç film ya da poşetle değiştir.</li>"+
"<li>Yanığın çevresinde kızarıklık yayılırsa, ateş çıkarsa, yaradan kötü koku ya da irin gelirse enfeksiyon başlamış olabilir: kişiyi en kısa sürede sağlık kuruluşuna ulaştır. Titreme ya da bilinç bulanıklığı da varsa <b>112'yi ara</b>.</li></ul>"+
"<h2>Çocukta yanığı önle</h2><ul>"+
"<li>Tencerenin ve tavanın sapını ocağın içine doğru çevir.</li>"+
"<li><u>Çocuk kucağındayken ya da yanındayken sıcak içecek taşıma, içme.</u></li>"+
"<li>Sobanın ve ocağın çevresine çit ya da koruma teli koy; <u>çocuğu sobanın yanında yalnız bırakma</u>.</li>"+
"<li>Çocuğu banyoya sokmadan önce suyu dirseğinle dene: su ılık olmalı.</li></ul>");
H.kaynakEkle("yanik","Derin yanık, uzun süreli yanık bakımı ve çocukta yanık önleme: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Kırık ---- */
H.ekle("kirik",cd("info","<b>Kırık mı, burkulma mı?</b> Şekil bozukluğu varsa, kişi o uzva hiç yük veremiyorsa, eklem olmayan bir yerde oynama varsa, kemiğin üstüne bastırınca keskin bir ağrı oluyorsa ya da üstünde yara varsa kırık var kabul et. Emin değilsen de kırık var kabul et."),{once:"<div class=\"step\"><div class=\"n\">1</div><div class=\"f\"><b>112'yi ara.</b>"});
H.ekle("kirik"," <u>Kırık uzuvdaki giysiyi çıkarmaya çalışma</u>; gerekirse giysiyi makasla kes.",{sonra:"yarayı temiz bezle ört."});
H.degis("kirik","parmak uçlarının rengine, ısısına ve hissine bak. Parmaklar morarmışsa, soğumuşsa ya da uyuşmuşsa bağı gevşet.","parmak uçlarının rengine, ısısına ve hissine bak; tırnağına bastırıp bırak, pembe renk 2 saniye içinde geri gelmeli. Parmaklar morarmışsa, soğumuşsa, uyuşmuşsa ya da renk geç geliyorsa bağı gevşet.");
H.ekle("kirik","<h2>Ayak bileği ve parmak kırığı</h2><ul>"+
"<li><b>Ayak bileği:</b> Bir yastığı ya da katlanmış battaniyeyi ayak bileğinin ve ayağın çevresine U biçiminde sar, üstünden 3–4 yerden bağla.</li>"+
"<li><b>Parmak:</b> Kırık parmakla yanındaki sağlam parmağın arasına ince bir bez koy, iki parmağı birlikte bantla.</li>"+
"<li>Bağladıktan sonra parmak uçlarının rengine ve hissine bak (4. adım).</li></ul>",{once:"<h2>Burkulma</h2>"});
H.kaynakEkle("kirik","Kırık mı burkulma mı, doğaçlama atel: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Nöbet: şeker yükselmesi ---- */
H.ekle("nobet","<h2>Şeker yükselmesi (diyabetik ketoasidoz)</h2>"+
cd("info","Şeker hastasının insülini biterse, bozulursa ya da kişi hastalanırsa kan şekeri günler içinde tehlikeli biçimde yükselebilir.")+st([
"Şeker hastasında aşırı susama, sık idrara çıkma, meyvemsi (aseton gibi) kokan nefes, kusma, karın ağrısı, hızlı ve derin nefes ya da uyuşukluk görürsen şeker yükselmesinden şüphelen ve <b>112'yi ara</b>.",
"En önemli iş kişinin <b>insülinine</b> ulaşmasıdır: insülinini getir ya da kişiyi sağlık kuruluşuna ulaştır. Dozu kişi kendisi ya da sağlık ekibi ayarlasın; <u>sen insülin iğnesi yapma</u>.",
"Bilinci açıksa ve kusmuyorsa küçük yudumlarla su içir.",
"Bilinci bulanıklaşırsa <a href='#/g/bilincsiz'>derlenme pozisyonuna</a> al; normal nefes almıyorsa <a href='#/g/kpr'>KPR</a>'ye başla."
],true)+
cd("warn","<u><b>Şeker düşmesiyle karıştırma:</b></u> Şekerin düşük mü yüksek mi olduğunu bilmiyorsan ve kişi bilinçli, yutabiliyorsa önce <b>şeker ver</b> (yukarıdaki uyarı). Şeker düşmesi çok daha hızlı öldürür.")+
cd("tip","<b>İnsülini saklama:</b> Açılmamış insülin buzdolabında durur. Elektrik yoksa insülini serin ve gölge bir yerde tut: pişmiş toprak bir testinin içinde ya da ıslak bir bezle sarılı bir kapta saklayabilirsin. <u>İnsülini doğrudan buzun üstüne koyma, dondurma; donmuş insülini kullanma.</u> <u>Güneşte ya da arabada bırakma.</u>"));
H.kaynakEkle("nobet","Şeker yükselmesi: The Survival Medicine Handbook (Alton, 2013). İnsülin saklama: Cochrane 2023 (insan insülininin sıcaklığa dayanıklılığı, toprak kapta serinletme)");

/* ---- Astım ---- */
H.ekle("astim",cd("warn","<b>Sessiz göğüs:</b> Çok ağır krizde hırıltı kaybolabilir, çünkü akciğere giren hava azalmıştır. Kişi yorulmuşsa, konuşamıyorsa ya da uyuşuklaşıyorsa hırıltının azalması iyiye işaret değildir: <b>112'yi ara</b>."),{sonra:"veya kriz ilk kez oluyorsa <b>112'yi ara</b>.</div></div>"});
H.ekle("astim","bacakta oluşup akciğere giden pıhtı (<a href='#/g/tehlike'>akciğer pıhtısı</a>), ",{once:"duman veya gaz (<a href='#/g/zehir'>karbonmonoksit</a>)"});
if(sayfaVar("anafilaksi")){var as=H.guide.filter(function(x){return x.id==="astim"})[0];
 if(as&&as.h.indexOf("<a href='#/g/yilan'>anafilaksi</a>")>=0)H.degis("astim","<a href='#/g/yilan'>anafilaksi</a>","<a href='#/g/anafilaksi'>anafilaksi</a>")}
H.kaynakEkle("astim","Sessiz göğüs: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Sıcak çarpması ---- */
H.ekle("sicak"," <u>Ateş düşürücü ilaç (parasetamol, ibuprofen, aspirin) verme</u>: sıcak çarpmasında ateşi düşürmez, karaciğere ve böbreğe zarar verebilir. Yapılacak iş hızlı soğutmaktır.",{sonra:"(fazla soğutmak da zararlıdır)."});
H.degis("sicak","Yazın şafakta ve akşamüstü yürü (güneşin yakıcı ışınlarının ~%80'i 09.00–15.00 arasında gelir).","Yazın şafakta ve akşamüstü yürü; güneş en çok 10.00–16.00 arasında yakar.");
H.degis("sicak","11.00–17.00 arası dışarıda ağır iş yapma.","10.00–16.00 arası dışarıda ağır iş yapma.");
H.kaynakEkle("sicak","T.C. Sağlık Bakanlığı sıcak hava uyarısı (10.00–16.00); ateş düşürücü: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Hipotermi ---- */
H.ekle("hipotermi",cd("info","<b>Termometre:</b> Ev termometrelerinin çoğu 34 °C'nin altını ölçemez. Termometre ölçmüyorsa ya da çok düşük gösteriyorsa <u>ölçüme güvenme</u>: hipotermi var kabul et ve ne yapacağını tablodaki belirtilere göre seç."),{sonra:"</table></div>"});
H.ekle("hipotermi"," <b>Başka ısı kaynağı yoksa</b> ten tene ısıt: kişinin ve onu ısıtacak sağlıklı kişinin üst giysilerini çıkar, ikisini göğüs göğse aynı uyku tulumuna ya da battaniyenin altına koy.",{sonra:"yalnızca yüzü açık kalsın."});
H.kaynakEkle("hipotermi","Termometre ve ten tene ısıtma: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Ayak ---- */
H.ekle("ayak","<h2>Siper ayağı (ıslak ve soğuk kalan ayak)</h2>"+
"<p>Ayaklar günlerce ıslak ve soğuk kalırsa donma olmadan da hasar görür. Önce uyuşma, şişme ve solukluk olur; ayak ısınınca kızarır, ağrır, karıncalanır.</p><ul>"+
"<li>Korunmak için 2. ve 3. adıma uy: ıslak çorabı hemen değiştir; kuru görünse bile çorabını her gün değiştir.</li>"+
"<li>Siper ayağı başladıysa ayağı kurula, hafifçe yükseğe koy ve kuru, ılık bir yerde yavaş yavaş ısınmasını bekle. <u>Ayağı ovma</u>; <u>sıcak suya sokma, ateşe tutma</u>.</li>"+
"<li>Ayakta su toplaması, morarma ya da yara olursa kişiyi sağlık kuruluşuna götür.</li></ul>"+
cd("warn","<b>Şeker hastasıysan</b> ayağını her gün kontrol et; tabanına aynayla bak ya da bir arkadaşına baktır. Küçük bir su toplaması ya da yara bile ciddileşebilir: sürtünmeyi hemen kes, yarayı sağlık kuruluşuna göster."));
H.kaynakEkle("ayak","Siper ayağı ve şeker hastasında ayak: The Survival Medicine Handbook (Alton, 2013)");

/* ---- İshal ---- */
H.degis("susuzluk","ishal kanlıysa, ateşi yüksekse ya da kusması durmuyorsa.","ishal kanlıysa ya da dışkı siyahsa, ishal 3 günden uzun sürüyorsa, karın ağrısı şiddetliyse, ateşi yüksekse, kusması durmuyorsa ya da bebeğin bıngıldağı çökmüşse.");
H.ekle("susuzluk","<ul>"+
"<li>Yemeye devam et: kişi iştahı oldukça her zamanki yemeğini yesin. Bebek emiyorsa emzirmeye devam et.</li>"+
"<li><u>İshal kesici ilacı ateşli ya da kanlı ishalde ve çocukta kullanma.</u> Başka durumlarda kullanacaksan önce eczacıya ya da hekime danış. İshal kesici ilaç ORS'nin yerini tutmaz: sıvı vermeyi sürdür.</li>"+
"<li><u>İshali olan kişi başkalarına yemek hazırlamasın.</u></li></ul>");
H.kaynakEkle("susuzluk","Dünya Sağlık Örgütü (ishalde beslenme ve emzirme); tehlike işaretleri ve ishal kesici uyarısı: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Göz ---- */
H.ekle("goz","<h2>Göze darbe (yumruk, top)</h2><ul>"+
"<li>Göz çevresine bezle sarılı soğuk koy. <u>Gözü ovma, göze bastırma.</u></li>"+
"<li>Görme azalırsa, kişi çift görürse, gözde kan görürsen ya da ağrı şiddetliyse kişiyi hemen sağlık kuruluşuna götür.</li></ul>");
H.kaynakEkle("goz","Göze künt darbe: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Triyaj ---- */
H.ekle("triyaj"," <b>Hangi rengi vereceğinden emin değilsen daha acil olan rengi ver.</b>",{sonra:"sonra sıradakine geç."});
H.ekle("triyaj"," Sonra yerde kalanlara geç: en yakındakinden başla, yolunun üstündeki her yaralıya sırayla bak.",{sonra:"Aralarından yardımcı al."});
H.degis("triyaj","<b>Yürüyemeyen biri nefes almıyorsa</b> hava yolunu aç.","<b>Yürüyemeyen biri nefes almıyorsa</b> omurga yaralanması şüphesi olsa bile hava yolunu aç.");
H.degis("triyaj","<b>Dolaşıma bak:</b> Tırnağına bastırıp bırak. Pembe renk 2 saniyede geri gelmiyorsa ya da ağır kanama varsa KIRMIZI ver;","<b>Dolaşıma bak:</b> Tırnağına bastırıp bırak ve bileğinde nabız ara. Pembe renk 2 saniyede geri gelmiyorsa, bilekte nabız alamıyorsan ya da ağır kanama varsa KIRMIZI ver;");
H.kaynakEkle("triyaj","The Survival Medicine Handbook (Alton, 2013): emin değilsen üst renk, en yakından başla, bilek nabzı");

/* ---- Taşıma ---- */
H.degis("tasima","el koltuğuyla (aşağıda) ya da biri sırtında taşıyabilir.","el koltuğuyla ya da biri sırtında taşıyabilir (ikisi de aşağıda). Hayati tehlike yoksa taşımadan önce kanamayı durdur, kırıkları sabitle (→ <a href='#/g/kirik'>Kırık</a>) ve nefesine bak; malzemeyi ve yardımcıları yaralının yanına getir.");
H.ekle("tasima",cd("info","<b>Omurga şüphesinde sert sedye:</b> Battaniyeli ya da montlu sedye ortadan bel verir. Omurga yaralanması şüphesi varsa kapı kanadı ya da sert bir tahta kullan. Yaralıyı kütük gibi (baş, boyun ve gövde birlikte) çevirerek al, başının ve gövdesinin iki yanını rulo yapılmış battaniyeyle destekle, sedyeye bağla."),{sonra:"Yaralıyı koymadan önce sedyeyi sağlam bir kişiyle dene.</div></div>"});
H.ekle("tasima","<h2>Tek başınaysan: battaniyeyle sürükleme, sırtta taşıma</h2><ul>"+
"<li><b>Battaniyeyle sürükleme:</b> Battaniyeyi yaralının yanına uzunlamasına ser, yarısını rulo yap. Yaralıyı kütük gibi yan çevir, ruloyu altına it, geri çevir ve ruloyu öbür yandan aç. Battaniyeyi baş tarafından toplayıp kavra, geri geri yürüyerek düz bir çizgide çek. Ağır yaralıda ve omurga şüphesinde tek kişinin en güvenli yoludur.</li>"+
"<li><b>Sırtta taşıma:</b> Yalnızca bilinci açık, tutunabilen, omurga yaralanması ya da bacak kırığı olmayan yaralıda kullan. Sırtını ona dönerek önüne çömel. Yaralı kollarını senin omuzlarının üstünden geçirip göğsünün önünde çaprazlasın. Onun bileklerini tut, öne eğil ve bacaklarının gücüyle kalk.</li></ul>",{once:"<h2>Araçtan çıkarma (Rentek manevrası)</h2>"});
H.kaynakEkle("tasima","Taşımadan önce sabitleme, battaniyeyle sürükleme, sert sedye: The Survival Medicine Handbook (Alton, 2013)");

/* ---- İlk adımlar: baştan ayağa kontrol ---- */
H.ekle("ilkadim","<h2>Baştan ayağa kontrol</h2>"+
"<p>Önce bilincine, nefesine ve ağır kanamaya bak (3. adım). Sonra yaralıyı oynatmadan, sırayla gözle bak ve elle yokla. Ağrı, şekil bozukluğu, kanama ya da şişlik ara; her zaman sağlam tarafla karşılaştır.</p><ul>"+
"<li><b>Baş ve yüz:</b> Burundan, kulaktan ya da ağızdan kan veya berrak sıvı geliyor mu? Göz bebekleri eşit mi?</li>"+
"<li><b>Boyun:</b> Ağrıyorsa <u>başı oynatma</u> → <a href='#/g/kafa'>Kafa ve omurga</a>.</li>"+
"<li><b>Göğüs:</b> İki yanı eşit kalkıyor mu, yara var mı, kaburgada ağrı var mı?</li>"+
"<li><b>Karın:</b> Sert ya da şiş mi, bastırınca ağrıyor mu? Bunlar iç kanama işareti olabilir.</li>"+
"<li><b>Leğen (kalça kemikleri):</b> Ağrı var mı, sor. <u>Leğeni sıkıştırıp sallama.</u></li>"+
"<li><b>Kollar ve bacaklar:</b> Parmaklarını hissediyor ve oynatabiliyor mu, elini sıkabiliyor mu? Parmak uçlarının rengine bak.</li>"+
"<li><b>Deri:</b> Soluk, soğuk ve terliyse şok olabilir → <a href='#/g/sok'>Şok</a>.</li></ul>"+
"<p>Bulduklarını saatiyle birlikte not et; 112'ye ve sağlık ekibine söyle.</p>",{once:"<div class=\"card warn\"><b>Yapma:</b>"});
H.kaynakEkle("ilkadim","baştan ayağa kontrol: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Isırık ve sokmalar ---- */
H.ekle("yilan"," Öldürülmüş, hatta başı kesilmiş yılan bile refleksle ısırabilir: <u>ölü yılana dokunma</u>.",{sonra:"fotoğrafını çekmen yeter."});
H.degis("yilan","ağızla emmek,","ağızla ya da emme pompasıyla (yılan kiti) emmek,");
H.degis("yilan","İğneyi kredi kartı gibi düz bir kenarla <b>yana sıyırarak</b> çıkar; <u>iğneyi cımbızla sıkma</u>.","İğneyi hemen çıkar: kredi kartı gibi düz bir kenarla, tırnağınla ya da bıçağın sırtıyla yana sıyır. <u>Kart aramak için bekleme</u>: nasıl çıkardığın değil, ne kadar çabuk çıkardığın önemlidir.");
/* Ağır alerji uyarısı: adımlar g/anafilaksi'de; burada belirtiler, 112 ve kalemin hemen kullanılması kalır */
H.degis("yilan","Kişinin adrenalin kalemi varsa <b>emniyet kapağını çıkar</b>, iğne ucunu <b>uyluğun dış yüzüne</b> daya (giysinin üstünden de olur), <u>başparmağını kalemin ucuna koyma</u>; sertçe bastır ve kalemin üstünde yazan süre kadar tut (çoğunda 3–10 saniye). Düzelme olmazsa <b>5 dakika sonra</b> ikinci kalemi uygula. Nefes almakta zorlanıyorsa oturt; bayılacak gibiyse yatırıp bacaklarını kaldır.","Kişinin adrenalin kalemi varsa onu <b>hemen</b> uyluğunun dış yüzüne uygula (giysinin üstünden de olur). Kalemin nasıl kullanılacağı, ikinci kalem, duruş ve bayılmadan farkı için → <a href='#/g/anafilaksi'>Ağır alerji (anafilaksi)</a>.");
H.ekle("yilan","<h2>İnsan ısırığı</h2>"+
"<p>İnsan ısırığı kirli yaradır, çabuk iltihaplanır. Elinden ısırıldıysa yüzüğünü el şişmeden hemen çıkar. Yarayı <b>10–15 dakika</b> sabunla ve akan suyla yıka. <u>Yarayı sıkıca kapatma</u>; temiz bir örtüyle ört ve sağlık kuruluşuna git. Son tetanoz aşının üstünden 5 yıldan fazla geçtiyse aşı gerekir (→ <a href='#/g/yara'>Yara bakımı</a>).</p>",{once:"<h2>Denizanası</h2>"});
H.kaynakEkle("yilan","MEB İlk Yardım Birimi: Böcek sokmaları ve hayvan ısırıklarında ilk yardım (arı iğnesi: kredi kartı gibi düz kenarlı alet, hızla çıkar); Visscher, Lancet 1996 (arı iğnesinde hız). İnsan ısırığı, ölü yılan, emme pompası: The Survival Medicine Handbook (Alton, 2013)");

/* ---- Suda: soğuk suya ve buza düşme ---- */
H.ekle("suda","<h2>Soğuk suya ya da buza düşersen</h2>"+st([
"İlk 1 dakika soğuk şoku yaşarsın: istemeden derin bir soluk alırsın, sonra nefesin hızlanır. <u>Çırpınma</u>; başını suyun dışında tut, sırtüstü süzülerek nefesini yavaşlat. Kollarını ve bacaklarını kullanabileceğin süre yaklaşık 10 dakikadır: kendini kurtarmayı bu sürede dene.",
"Buza düştüysen <b>geldiğin yöne</b> dön: oradaki buz seni taşımıştı. Kollarını buzun üstüne koy, ayaklarınla tekmeleyerek gövdeni yüzüstü buzun üstüne kaydır.",
"<u>Buzun üstünde ayağa kalkma</u>; yuvarlanarak ya da sürünerek delikten uzaklaş. Kuru, sıcak bir yere geçip hemen ısın (→ <a href='#/g/hipotermi'>Hipotermi</a>).",
"Çıkamıyorsan enerjini koru: <u>giysilerini çıkarma</u>, <u>kuru bir yere ulaşamayacaksan yüzmeye çalışma</u>. Can yeleğin ya da tutunacak yüzen bir şey varsa dizlerini göğsüne çek, kollarını göğsünde sar (bu duruş ısı kaybını azaltır). Birden çok kişiyseniz birbirinize sarılın."
],true)+
cd("warn","<b>Kurtarıyorsan:</b> <u>Buza yürüyerek girme.</u> Kıyıdan seslen; dal, ip ya da kürek uzat, yüzen bir şey at. Buza çıkmak zorundaysan yüzüstü yatıp sürün. Kurtardığın kişiyi hemen ısıt (→ <a href='#/g/hipotermi'>Hipotermi</a>)."),{once:"<h2>Elektrik çarpması</h2>"});
H.kaynakEkle("suda","Soğuk suya ve buza düşme: Minnesota Doğal Kaynaklar Dairesi (buzdan kendini kurtarma); 1-10-1 soğuk su ilkesi (Giesbrecht); The Survival Medicine Handbook (Alton, 2013)");
})();
