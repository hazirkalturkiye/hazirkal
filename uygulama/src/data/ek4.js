/* ek4.js: SAS Survival Handbook (Wiseman, 2009) karşılaştırması sonrası ilk yardım, zehirli bitki ve hayvan ekleri.
   Çelişen noktalarda Türk Kızılay / T.C. Sağlık Bakanlığı / MEB İlk Yardım Birimi esas alındı. Araçlar ek0.js'de. */
(function(){var H=window.HK,cd=H.cd,st=H.st;
/* H.spCards ile kart üretir, dış <div class="sp-l"> kabını atar: var olan listenin içine eklemek için. */
function kartlar(l){var s=H.spCards(l),a='<div class="sp-l">';return s.slice(a.length,s.length-6)}
var SAS="Wiseman, SAS Survival Handbook (2009)";
/* Kimyasal yanıkta yıkama süresi g/zehir ile aynı olsun (İngiliz Yanık Derneği: en az 20 dakika). Aşağıdaki "yanik" eki bu yeni metne bağlanır. */
H.degis("yanik","sonra en az 15 dakika akan suyla yıka.","sonra en az 20 dakika akan suyla yıka.");

/* ---- Zehirlenme ve karbonmonoksit ---- */
H.ekle("zehir","<li><b>Yakıcı bir madde</b> (çamaşır suyu, kireç çözücü, lavabo açıcı) yuttuysa ya da ağzına değdiyse ve bilinci açıksa ağzını suyla çalkalasın ve tükürsün; <u>suyu yutmasın</u>.</li>",{sonra:"Aktif kömürü yalnızca 114 önerirse ver.</li>"});
H.ekle("zehir",cd("tip","<b>Zehirlenmeden korunmak için:</b> Yakıtı, çamaşır suyunu, ilacı ve kimyasalları <u>su ya da meşrubat şişesinde saklama</u>: çocuk ya da susamış biri su sanıp içebilir. Hepsini kendi kabında ya da üstüne ne olduğunu yazdığın bir kapta, çocukların ulaşamayacağı bir yerde sakla."),{once:"<h2>Temas</h2>"});
H.ekle("zehir","<li>Göze kimyasal kaçtıysa yıkarken kişinin başını yaralı göz altta kalacak biçimde yana eğ: kimyasallı su sağlam göze, ağza ya da buruna akmasın.</li>"+
"<li><u>Kimyasalı sirke, limon ya da karbonatla etkisizleştirmeye çalışma</u>: tepkime ısı çıkarır ve yanığı derinleştirir. Yalnızca bol suyla yıka.</li>",{sonra:"Deriyi 20 dakika bol suyla, gözü 10–20 dakika yıka.</li>"});
H.ekle("zehir"," Zehirlenme ilerledikçe kişinin kafası karışır, sarhoş gibi davranabilir; çoğu zaman zehirlendiğini fark etmez.",{sonra:"Aynı ortamdaki herkeste birden başlar."});
H.ekle("zehir"," Mum alevine bakarak karbonmonoksit olup olmadığını anlayamazsın; mum da yanarken karbonmonoksit çıkarır.",{sonra:"Mümkünse pilli karbonmonoksit dedektörü kullan."});
H.kaynakEkle("zehir",SAS+"; karbonmonoksitin ilk belirtilerinin fark edilmeyebileceği: Hacettepe Üniversitesi Halk Sağlığı AD, Karbonmonoksit zehirlenmesi bilgi notu; yakıcı madde yutmada ağzı suyla çalkalama: MEB, Zehirlenmeler ders notu (2025)");

/* ---- Yanık: kimyasal yanık ---- */
H.ekle("yanik"," <u>Kimyasalı sirke, limon ya da karbonat sürerek etkisizleştirmeye çalışma</u>: tepkime ısı çıkarır ve yanığı derinleştirir. Yalnızca bol suyla yıka.",{sonra:"sonra en az 20 dakika akan suyla yıka."});
H.kaynakEkle("yanik",SAS+"; kimyasal yanıkta yalnızca bol suyla yıkama: MEB İlk Yardım Birimi, Yanık, soğuk ve sıcak acillerinde ilk yardım; kimyasal yanıkta en az 20 dakika yıkama: İngiliz Yanık Derneği (BBA), ilk yardım kılavuzu");

/* ---- Göz: kimyasal ---- */
H.ekle("goz"," Yıkarken kişinin başını yaralı göz altta kalacak biçimde yana eğ: kimyasallı su sağlam göze, ağza ya da buruna akmasın. Sonra kişiyi sağlık kuruluşuna götür.",{sonra:"Göze kimyasal madde kaçtıysa en az 10–20 dakika bol suyla yıka."});
H.kaynakEkle("goz",SAS+" (kimyasal yıkamada başın duruşu)");

/* ---- Kafa: kulaktan ya da burundan sıvı ---- */
H.ekle("kafa"," Kulaktan kan ya da berrak sıvı geliyorsa kişiyi o kulağın olduğu yana çevir: sıvı dışarı aksın.",{sonra:"baş, boyun ve gövdeyi tek parça hâlinde çevirip derlenme pozisyonuna alın."});
H.kaynakEkle("kafa",SAS+"; MEB İlk Yardım Birimi, Yaralanmalarda ilk yardım (yaralıyı kan veya sıvı gelen kulak tarafına çevirme)");

/* ---- Kırık: leğen ve uyluk ---- */
H.ekle("kirik","<h2>Leğen ve uyluk kırığı</h2>"+st([
"Düşen, ezilen ya da trafik kazası geçiren kişinin kasığında, kalçasında ya da alt karnında ağrı varsa <b>leğen kemiği kırığından</b> şüphelen. <b>112'yi ara.</b> <u>Leğeni sıkıştırma, sallama; kişiyi ayağa kaldırmaya çalışma.</u>",
"Dizlerinin ve ayak bileklerinin arasına katlanmış havlu ya da giysi koy. Ayak bileklerini dar bir sargıyla, dizlerini geniş bir sargıyla birbirine bağla.",
"<b>Uyluk kırığında</b> yardım uzun sürede gelecekse ya da yaralıyı taşıman gerekiyorsa koltuk altından ayağa kadar uzanan sağlam bir tahtayı bacağın dış yanına koy, aradaki boşluğu yumuşak dolguyla doldur ve tahtayı bağla. Sonra iki bacağı birbirine bağla. <u>Bacağı düzeltmeye çalışma, bağı kırığın tam üstüne yapma.</u>",
"Uyluk ya da leğen kemiği kırığında kırığın çevresine çok kan kaybedilir; dışarıda kan görünmese de <b>şok</b> gelişebilir. Cilt soğuk, soluk ve terli olursa ya da nabız hızlanırsa → <a href='#/g/sok'>Şok</a>."]),{once:"<h2>Burkulma</h2>"});
/* "Bacak kırığında bacakları kaldırma; yaralıyı yalnızca sedyeyle taşı" sayfanın üstündeki bilgi kutusunda zaten var: leğen bölümünde yinelenmesin, sedye bağlantısı oraya taşındı. */
H.degis("kirik","yaralıyı yalnızca sedyeyle taşı.</div>","yaralıyı yalnızca sedyeyle taşı (→ <a href='#/g/tasima'>Yaralı taşıma ve sedye</a>).</div>");
H.kaynakEkle("kirik",SAS+"; leğen ve uyluk kırığı: MEB İlk Yardım Birimi, Kırık, çıkık ve burkulmalarda ilk yardım");
H.ekle("sok",cd("info","<b>Dışarıda kan görünmese de:</b> Uyluk ya da leğen kemiği kırığında kırığın çevresine çok kan kaybedilir. Bu kişilerde şok bekle (→ <a href='#/g/kirik'>Kırık, çıkık, burkulma</a>). Bu kişilerin <u>bacaklarını kaldırma</u>: 2. adımdaki istisna onlar için de geçerlidir."));
H.kaynakEkle("sok",SAS+"; MEB İlk Yardım Birimi, Kırık, çıkık ve burkulmalarda ilk yardım (uyluk veya leğen kırığında şok)");

/* ---- Isırık ve sokmalar: çok sayıda arı sokması ---- */
H.ekle("yilan"," <b>Kişiyi çok sayıda arı ya da eşek arısı soktuysa</b>, özellikle kişi çocuksa, alerji belirtisi olmasa da 112'yi ara: bu kadar çok zehir tek başına tehlikelidir.",{sonra:"kişinin reçeteli adrenalin kalemi varsa onu kullan (aşağıya bak)."});
H.kaynakEkle("yilan",SAS+" (çok sayıda arı sokması)");

/* ---- Hipotermi: donmayı önle ---- */
H.ekle("hipotermi",cd("tip","<b>Donmayı önle:</b> Soğukta birbirinizin yüzüne, kulaklarına ve ellerine sık sık bakın: deride beyaz, mumsu ya da soluk bir leke donmanın ilk işaretidir; o bölge uyuşur. Leke görürsen yukarıdaki Donma kutusuna göre davran. Yüzünü buruştur, el ve ayak parmaklarını sık sık oynat. <u>Sıkı bot ve sıkı giysi giyme</u>: kan dolaşımını keser. <u>Metale çıplak elle dokunma.</u> Sıfırın altında deriye dökülen benzin ya da gazyağı deriyi anında dondurur: yakıtı eldivenle doldur. Soğuk düşünmeyi yavaşlatır: geri dönüp dönmeyeceğine, barınak kurup kurmayacağına ve yardım çağırıp çağırmayacağına aklın başındayken, erken karar ver."));
H.kaynakEkle("hipotermi",SAS+"; donmanın erken belirtileri (solukluk, beyazlaşma, uyuşma): MEB İlk Yardım Birimi, Yanık, soğuk ve sıcak acillerinde ilk yardım");

/* ---- Zehirli bitkiler ---- */
H.ekle("bitkizehir"," ve acı çekirdek içleri",{sonra:"acı ya da badem kokulu yapraklar"});
H.ekle("bitkizehir"," Aynı mantardan yiyen herkesi, belirtisi olmasa da sağlık kuruluşuna götür. Kusma ve ishal geçip kişi iyileşmiş görünebilir; karaciğer hasarı yine de sürer (yalancı iyileşme). <u>Doktor izin vermeden hastaneden ayrılma.</u></dd>"+
"<dt>Yanlış inanışlar</dt><dd>Zehirli mantarı ayırt eden bir ev testi yoktur. Gümüş kaşık ve soğan kararmasa da, mantarı salyangoz ya da böcek yemiş olsa da mantar zehirli olabilir. Sirkeli ya da tuzlu suda kaynatmak, yoğurtta bekletmek ve kurutmak zehri gidermez.",{sonra:"Kalan mantarı sakla."});
H.ekle("bitkizehir",kartlar([
 {n:"Güzelavratotu",s:"Atropa belladonna",lv:"x",k:"parlak siyah meyve",ph:[],r:[
  ["Tanı","0,5–1,5 m, dallı otsu bitki. Sarkık, çan biçimli, mor-kahverengi çiçek. Yaprak dibinde tek tek duran, kiraz büyüklüğünde, <b>parlak siyah meyve</b>; meyvenin dibinde yıldız gibi açılmış yeşil çanak."],
  ["Nerede","Karadeniz ve Marmara'nın orman açıklıkları, orman kenarları, ağaç kesilmiş alanlar."],
  ["Benzediği","Meyvesi kiraza ya da yaban mersinine benzer ve tatlıdır: çocuklar yer. Yaprakları ıspanak demetlerine karışıp zehirlenmelere yol açmıştır."],
  ["Yerse","Tatuladaki gibi ağız kuruluğu, göz bebeklerinde büyüme, yüzde kızarma, ateş, çarpıntı ve sayıklama olur. Çocukta birkaç meyve bile ağır zehirlenme yapar. <b>112'yi ara.</b>"]]},
 {n:"Yüksükotu",s:"Digitalis",lv:"x",k:"kalbi etkiler",ph:[],r:[
  ["Tanı","İlk yıl yerde tüylü, uzun oval yapraklardan bir rozet yapar. Sonraki yıl 0,5–1,5 m dik sapta, sapın bir yanına dizilmiş, sarkık, <b>yüksük biçimli</b> çiçekler açar: mor-pembe, krem ya da pas rengi, içi benekli ya da damarlı."],
  ["Nerede","Orman açıklığı ve kenarı, çalılık, yol kenarı."],
  ["Benzediği","Çiçek açmamışken yaprakları karakafes otuna (Symphytum) ve hodana benzer; bu otları toplarken yüksükotu yaprağı karışabilir."],
  ["Yerse","Bulantı, kusma, bulanık ya da sarı-yeşil görme, yavaş ve düzensiz nabız olur; kalp durabilir. <b>112'yi ara</b>; kişi normal nefes almıyorsa <a href='#/g/kpr'>KPR</a>'ye başla."]]},
 {n:"Kurtboğan",s:"Aconitum",lv:"x",k:"eldivensiz dokunulmaz",ph:[],r:[
  ["Tanı","0,5–1,5 m dik sap. Üstü başlık ya da miğfer gibi kapalı, mavi-mor (bazı türlerde krem-sarı) çiçekler dik salkım hâlinde. Yaprak el gibi, derin parçalı."],
  ["Nerede","Karadeniz ve Doğu Anadolu'nun nemli yaylaları, dere kenarları, orman açıklıkları."],
  ["Temas","Bitkinin her yeri, en çok kökü, çok zehirlidir; zehir deriden de geçebilir. <u>Çıplak elle dokunma</u>; dokunman gerekirse eldiven giy, sonra ellerini yıka."],
  ["Yerse","Ağızda ve yüzde karıncalanma ve uyuşma, kusma, kas güçsüzlüğü ve düzensiz nabız olur; ölüm hızlı gelebilir. Hemen <b>112'yi ara</b>."]]},
 {n:"Hint yağı bitkisi (keneotu)",s:"Ricinus communis",lv:"x",k:"benekli tohum",ph:[],r:[
  ["Tanı","1–3 m, iri, el gibi 5–9 parçalı, çoğu zaman kırmızımsı yapraklı bitki. Dikenli, kırmızı ya da yeşil kapsüllerin içinde fasulye büyüklüğünde, parlak, <b>benekli tohumlar</b> olur."],
  ["Nerede","Bahçe ve parklarda süs bitkisidir; Akdeniz, Ege ve Güneydoğu'da yol kenarında, dere yatağında kendiliğinden de yetişir."],
  ["Yerse","Çiğnenen tohum saatler sonra şiddetli kusma, kanlı ishal ve sıvı kaybı yapar; çocukta ölümcül olabilir. Belirti olmasa da <b>114'ü ara</b>; kusma ya da ishal başlarsa <b>112'yi ara</b>."]]},
 {n:"Düğünçiçeği",s:"Ranunculus",lv:"x",k:"parlak sarı çiçek",ph:[],r:[
  ["Tanı","Cilalı gibi parlak, 5 taç yapraklı sarı çiçek; derin parçalı yaprak."],
  ["Nerede","Nemli çayır, dere ve tarla kenarı; ilkbaharda hemen her yerde."],
  ["Benzediği","Genç yaprakları, ilkbaharda toplanan yenen otların arasına karışabilir."],
  ["Yerse","Taze bitki ağızda, boğazda ve midede yanma, kusma ve ishal yapar; özsuyu deriyi kızartır ve kabartır. Ağzını çalkala, <b>114'ü ara</b>. Deriye değdiyse bol suyla yıka."]]},
 {n:"Orman gülü ve deli bal",s:"Rhododendron",lv:"x",k:"deli bal",ph:[],r:[
  ["Tanı","Mor-pembe çiçekli tür (Rhododendron ponticum): kalın, deri gibi, parlak, uzun yapraklı, kışın da yeşil kalan çalı. Sarı çiçekli tür (Rhododendron luteum, sarı ağu): ince, tüylü yapraklı, kışın yaprağını döken çalı. İkisinin de çiçekleri iri kümeler hâlindedir."],
  ["Nerede","Karadeniz'in ormanları ve yaylaları."],
  ["Kural","Bu bitkiden bal yapan arıların balı (<b>deli bal</b>) zehirlidir. <u>Yabani kovandan ya da kaynağını bilmediğin kovandan bal yeme. Deli balı ilaç diye yeme. Orman gülünün yaprağından ya da çiçeğinden çay yapma.</u>"],
  ["Yerse","Baş dönmesi, terleme, kusma, yavaş nabız ya da bayılma başlarsa kişiyi yatır ve <b>112'yi ara</b>. Belirtiler genellikle yedikten sonraki birkaç saat içinde başlar."]]},
 {n:"Acı badem ve acı çekirdek",s:"siyanür zehri",lv:"x",k:"acı tat tehlikedir",ph:[],r:[
  ["Tanı","Acı tadı olan badem ile kayısı, şeftali, erik ve taflan (karayemiş) çekirdeğinin içi, vücutta siyanüre dönüşen bir madde taşır. Acı badem kokusu ve acı tat bu zehrin işaretidir."],
  ["Kural","<u>Acı bademi ve acı çekirdek içini yeme, çocuğa verme</u>: çocukta birkaç tane bile tehlikelidir. Taflanın meyvesi yenir; <u>çekirdeğini ve yaprağını yeme</u>."],
  ["Yerse","Baş ağrısı, baş dönmesi, kusma, nefes darlığı, bilinç bulanıklığı ya da nöbet başlarsa hemen <b>112'yi ara</b>. Belirti yoksa <b>114'ü ara</b>."]]}
]),{sonra:"soğuk su yudumla, <b>114'ü ara</b>.</dd></dl></details>"});
/* Yılan yastığı (doga2.js): suyu yutmadan çalkalama (MEB) ve şişmede 112. Kart ekinin bağlandığı eski metin yukarıda kullanıldığı için bu değişiklik ondan sonra gelir. */
H.degis("bitkizehir","Ağızda şiddetli yanma ve şişme olur: ağzını çalkala, soğuk su yudumla, <b>114'ü ara</b>.",
 "Ağızda şiddetli yanma ve şişme olur. Ağzını soğuk suyla çalkalasın ve tükürsün; <u>suyu yutmasın</u>. <b>114'ü ara</b>. Dudak, dil ya da boğaz şişerse, kişi yutkunamaz ya da nefes darlığı başlarsa <b>112'yi ara</b>.");
H.kaynakEkle("bitkizehir",SAS+"; yanlış mantar inanışları ve erken taburcu uyarısı: Ordu Tarım ve Orman İl Müdürlüğü, Mantar zehirlenmeleri ve başlıca zehirli mantarlar; kayısı çekirdeğiyle siyanür zehirlenmesi: Türkiye Çocuk Hastalıkları Dergisi (2009) ve Turkish Archives of Pediatrics (2012) olgu sunumları; deli bal: Sakarya Tıp Dergisi 2016;6(3):166–169; sarı orman gülünün yaprak dökmesi: Kraliyet Bahçecilik Derneği (RHS), Rhododendron luteum; yüksükotunun karakafes otuyla karışması: EurekAlert; yılan yastığında ağzı çalkalama: MEB, Zehirlenmeler ders notu (2025); UZEM 114");

/* ---- Yenilebilir bitkiler: kestane ve at kestanesi ---- */
H.ekle("bitkiyen",kartlar([
 {n:"Kestane",s:"Castanea sativa",lv:"y",k:"Eylül–Kasım",ph:[],r:[
  ["Tanı","Tek, uzun, kenarı iğne uçlu dişlerle testere gibi yaprak. Meyve kabuğu sık, ince, iğne gibi dikenlerle kaplı bir toptur; içinde 2–3 kestane olur. Kestanenin bir yüzü düzdür, ucu sivri ve püsküllüdür."],
  ["Nasıl","Kabuğunu bıçakla çiz (yoksa ateşte patlar), közde ya da haşlayarak pişir."],
  ["Benzerleri","<b>At kestanesi (Aesculus) zehirlidir:</b> yaprağı 5–7 parmaklı el gibidir; meyve kabuğu kalındır, üstünde seyrek, kısa, kalın dikenler vardır ya da hiç diken yoktur; içinde çoğunlukla tek, yuvarlak, parlak bir tohum olur, ucunda püskül yoktur. Kentlerde park ve cadde ağacıdır. <u>At kestanesini yeme.</u> Yenirse kusma, ishal ve karın ağrısı yapar: <b>114'ü ara</b>."]]}
]),{sonra:"<u>Palamudu çiğ yeme</u>: mideyi ve böbreği bozar.</dd></dl></details>"});
H.kaynakEkle("bitkiyen",SAS+"; at kestanesi tohumunun zehirliliği: Tarım ve Orman Bakanlığı, Aesculus hippocastanum L. bilimsel görüşü");

/* ---- Balık ve su ---- */
H.ekle("balik","<li><u>Suda ölü bulduğun ya da kıyıya vurmuş balığı yeme.</u> Toplu balık ölümü olan, yeşil köpüklü ya da sanayi veya kanalizasyon atığı alan sudan <u>balık tutma</u>: pişirmek bu zehirleri gidermez.</li>",{sonra:"İç organlarını çıkar, iyice pişir.</li>"});
H.kaynakEkle("balik",SAS+" (ölü bulunan balık, kirli su)");
H.ekle("subul"," Yeşil, köpüklü sudaki alg (su yosunu) zehri de kaynatmakla gitmez.",{sonra:"Maden, sanayi ve tarım ilacı kirliliğini ne kaynatmak ne de klor giderir."});
H.kaynakEkle("subul",SAS+" (mavi-yeşil alg)");
H.ekle("suaritma",cd("warn","Suyu arıtmak için ayırdığın çamaşır suyunu kendi şişesinde ya da üstüne <b>\"ÇAMAŞIR SUYU, İÇİLMEZ\"</b> yazdığın ayrı bir kapta, çocukların ulaşamayacağı bir yerde sakla. <u>Çamaşır suyunu hiçbir zaman su ya da meşrubat şişesine koyma</u>: biri su sanıp içebilir."));
H.kaynakEkle("suaritma",SAS+" (zehirli sıvıyı içecek şişesinde saklamama)");

/* ---- Hayvanlar: şarbon ---- */
H.ekle("hayvan",kartlar([
 {n:"Ölü ya da aniden ölen hayvan",s:"şarbon (Bacillus anthracis)",lv:"d",k:"leşe dokunulmaz",ph:[],r:[
  ["Tanı","Şarbondan ölen hayvanın leşi şişer ve katılaşmaz; burnundan, ağzından ya da makatından koyu, pıhtılaşmayan kan sızar. Şarbon en çok sığır, koyun ve keçiden insana bulaşır."],
  ["Kural","<u>Ölü bulduğun ya da aniden ölen hayvana çıplak elle dokunma; hayvanı kesme, derisini yüzme, etini yeme.</u> <u>Selden ya da depremden sonra ölen hayvanların etini de yeme.</u> Leşi il ya da ilçe tarım ve orman müdürlüğüne, ulaşamazsan 112'ye bildir."],
  ["Dokunduysan","Sonraki 1–7 gün içinde elinde ya da kolunda kaşıntılı bir kabarcık çıkar ve ortası kararıp siyah bir kabuğa dönerse (genelde ağrısızdır) hemen sağlık kuruluşuna git ve hayvana dokunduğunu söyle. Hasta hayvanın etini yedikten sonra ateş, karın ağrısı, kusma ya da ishal başlarsa da sağlık kuruluşuna git."]]}
]),{sonra:"tavşana dokunduğunu söyle.</dd></dl></details>"});
H.kaynakEkle("hayvan",SAS+"; şarbon: T.C. Sağlık Bakanlığı HSGM, Şarbon sıkça sorulan sorular (şüpheli hayvan kesilmez, derisi yüzülmez, eti yenmez; deri şarbonunda ortası siyah yara); il ve ilçe müdürlüğüne bildirim: Tarım ve Orman Bakanlığı, Şarbon Hastalığına Karşı Korunma ve Mücadele Yönetmeliği; Hacettepe Üniversitesi Halk Sağlığı AD, Şarbon bilgi notu (2018)");
})();
