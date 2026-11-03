/* ek3.js: afet, hijyen, plan ve liste ekleri (kitap karşılaştırması sonrası).
   Çelişmelerde AFAD, Türk Kızılay ve T.C. Sağlık Bakanlığı esas alındı. */
(function(){var H=window.HK,cd=H.cd,st=H.st;

/* ---------- g/deprem ---------- */
/* (a) Araç kuralı: AFAD önerisiyle birleştirildi */
H.degis("deprem",
 "Arabadaysan yolu kapatmadan kenara çek ve araçta kal. Köprü, üst geçit, direk ya da elektrik hattının yanındaysan araçtan in ve açık alana git. Tüneldeysen araçtan inip aracın yanına çök, başını koru.",
 "Araç kullanıyorsan yolu kapatmadan sağa yanaş ve dur. Kontağı takılı bırak, araçta bekle. Köprüdeysen, tüneldeysen, kapalı otoparktaysan ya da elektrik hattının yanındaysan aşağıdaki <b>Araçtaysan</b> bölümüne bak.");
H.ekle("deprem",
 "<h3>Araçtaysan</h3><ul>"+
 "<li>Durmak için köprüden, üst geçitten, ağaçtan ve elektrik direğinden uzak bir yer seç.</li>"+
 "<li>Durduğun yer güvenli değilse (köprü üstü, üst geçit altı, ağaç, elektrik direği ya da hattı yanı) aracı kontak takılı bırak, in ve trafikten uzak, açık bir alana git.</li>"+
 "<li>Tüneldeysen ve çıkışa yakın değilsen aracı durdur, in. Aracın yanına çök, başını ve enseni kollarınla koru.</li>"+
 "<li>Kapalı otoparktaysan araçtan çık, aracın yanına çök, başını koru.</li>"+
 "<li>Elektrik hattı aracın üstüne düşerse <u>araçtan inme</u>. 112'yi ara, yardım gelene kadar araçta bekle.</li>"+
 "<li>Sarsıntı bitince <u>hasarlı yolu, köprüyü ve rampayı kullanma</u>.</li></ul>",
 {once:"<h2>Sonra</h2>"});
/* (d) Araçta ya da çadırda kalanlar */
H.ekle("deprem",
 "<li>Araçta ya da çadırda kalıyorsan uyanıkken saatte bir bacaklarını oynat, birkaç adım yürü ve su iç: saatlerce kıpırdamadan oturmak bacakta pıhtıya yol açabilir. Bir bacağında ağrı ve şişlik başlarsa sağlık kuruluşuna git; ani nefes darlığı ya da göğüs ağrısı olursa 112'yi ara (<a href='#/g/tehlike'>Hasta bakımı ve tehlike işaretleri</a>).</li>",
 {sonra:"<li>e-Devlet'ten önceden öğrendiğin toplanma alanına git.</li>"});
/* (b) Okulun planı, (c) eşya sabitleme */
H.ekle("deprem",
 "<h2>Depremden önce: evini ve aileni hazırla</h2><ul>"+
 "<li><b>Eşyaları sabitle:</b> Dolabı ve kitaplığı duvara L demiriyle ya da kayışla, televizyonu kayışla sabitle. Ağır eşyaları alt raflara koy.</li>"+
 "<li><u>Yatağın üstüne raf, ayna ya da çerçeve asma.</u></li>"+
 "<li><b>Çocuğun okulu:</b> Okulun deprem planını öğren: çocuklar hangi toplanma alanına götürülüyor, çocuğu kimler teslim alabilir? Sen ulaşamazsan çocuğu alabilecek kişilerin adını ve telefonunu okula yazılı olarak ver. Bu bilgiyi ekip planına da yaz.</li></ul>");
H.kaynakEkle("deprem","AFAD, deprem anında araç kullanırken ve eşya sabitleme önerileri; CDC, uzun süre hareketsizlikte pıhtı");

/* ---------- g/sel: sel suyuna değen konserve ---------- */
H.degis("sel","sel suyuna değen yiyecekleri at.","sel suyuna değen yiyecekleri at. Yalnızca sağlam metal konserve kutuları temizlenerek kurtarılabilir (aşağıda).");
H.ekle("sel",
 "<h2>Sel suyuna değen konserve</h2>"+
 "<p>Kavanozları, kapaklı şişeleri, karton kutuları (süt, meyve suyu, mama) ve ev konservelerini <b>at</b>: bunlar temizlenerek kurtarılamaz. Şişmiş, ezik, delik, sızdıran ya da paslı metal kutuları da at.</p>"+
 "<p>Sağlam metal kutuyu şöyle kurtar:</p>"+
 st(["Etiketini çıkar, çamurunu fırçala ya da sil.",
  "Kutuyu sabunlu suyla yıka, temiz suyla durula.",
  "Kokusuz çamaşır suyundan 10 litre suya 1 çay bardağı koy; kutuları bu çözeltide 15 dakika beklet. Çamaşır suyun yoksa kutuları kaynayan suda 2 dakika tut.",
  "Kutuları en az 1 saat havada kurut.",
  "İçindekini ve son kullanma tarihini kalıcı kalemle kutunun üstüne yaz. Bu kutuları önce tüket."]));
H.kaynakEkle("sel","FDA ve CDC, sel suyuna değen yiyecek ve konserve kutuları");

/* ---------- g/yangin ---------- */
/* (b) Evde mahsur kalma: mevcut adımla birleştirildi */
H.degis("yangin",
 "<u>Asansöre binme.</u> Çıkamıyorsan kapının altını ıslak havluyla tıka, pencereden işaret ver.",
 "<u>Asansöre binme.</u> Çıkamıyorsan bir odaya gir, kapıyı kapat ve altındaki aralığı ıslak havluyla ya da bezle tıka. 112'yi ara; adresini, katını ve hangi odada olduğunu söyle. Pencereden açık renkli bir bezle işaret ver ve yere yakın, alçakta kal.");
/* (a) Duman soluyan kişi */
H.ekle("yangin",
 "<h2>Duman soluyan kişi</h2>"+
 st(["Kişiyi temiz havaya çıkar. <u>Yoğun dumanın içine kendin girme</u>: toz maskesi (FFP2) dumandaki zehirli gazları tutmaz.",
  "Bilinci açıksa yarı oturur hâlde tut, sakinleştir. <u>Sırtüstü yatırma.</u>",
  "Bilinci kapalı ama nefes alıyorsa <a href='#/g/bilincsiz'>derlenme pozisyonuna</a> al. Normal nefes almıyorsa 112'yi ara, <a href='#/g/kpr'>kalp masajına (KPR)</a> başla.",
  "Nefes darlığı ya da hırıltı varsa veya bilinci bulanıklaşırsa 112'yi ara.",
  "Öksürük, ses kısıklığı, ağızda ya da burunda is veya yüzde yanık varsa kişi iyi görünse de sağlık kuruluşuna götür: nefes yolu saatler sonra şişebilir."],true)+
 "<p>Dumanda karbonmonoksit de vardır; belirtileri için <a href='#/g/zehir'>Zehirlenme ve karbonmonoksit</a> sayfasına bak.</p>",
 {once:"<h2>Orman ve bozkır yangını</h2>"});
/* (c) Orman kenarındaki ev */
H.ekle("yangin",
 "<h2>Orman kenarındaki evde, yangın mevsiminden önce</h2><ul>"+
 "<li>Evin çevresinde yaklaşık 10 metre içinde <u>kuru ot, çalı ve odun yığını bırakma</u>; odunu evden uzakta tut.</li>"+
 "<li>Çatıdaki ve çatı oluğundaki kuru yaprakları temizle: uçuşan kıvılcımlar en çok orayı tutuşturur.</li></ul>");
H.kaynakEkle("yangin","Türk Kızılay, duman soluyan kişiye ilk yardım; CAL FIRE, ev çevresinde yangın emniyet alanı");

/* ---------- g/kbrn ---------- */
H.degis("kbrn","<u>Kendi kendine iyot hapı alma, tentürdiyot içme.</u>","<u>Kendi kendine iyot hapı alma. Tentürdiyotu içme, deriye de sürme</u>: deriye sürülen iyot tiroidi korumaz.");
H.ekle("kbrn",cd("info","<b>Maske:</b> Toz maskesi (FFP2) tozu ve radyoaktif tozu tutar; dışarı çıkman gerekirse tak. Radyasyonun kendisinden korumaz. Kimyasal gazları ise tutmaz: gaz sızıntısında <u>maskeye güvenme</u>, içeride kal, kapı ve pencere aralıklarını bantla."));
H.kaynakEkle("kbrn","Dünya Sağlık Örgütü (DSÖ), iyot profilaksisi rehberi 2017; CDC/NIOSH, toz maskeleri gazları tutmaz");

/* ---------- g/sanitasyon ---------- */
/* Kanalizasyon hasarı */
H.ekle("sanitasyon"," Deprem ya da selden sonra da böyle yap: binanın borularının ve sokaktaki kanalizasyonun sağlam olduğu belli olana kadar <u>sifonu çekme, klozete su dökme</u>. Kırık borudan atık evin içine geri taşabilir.",
 {sonra:"kapaklı bir kovada dışarıda biriktir."});
/* Diş, idrar yolu, kontakt lens: mevcut maddelerle birleştirildi */
H.degis("sanitasyon",
 "<b>Diş:</b> Fırça yoksa dişlerini temiz bir bezle sil; uzun krizlerde diş ağrısı ciddi bir sorundur.",
 "<b>Diş:</b> Dişlerini içme suyuyla ya da arıtılmış suyla fırçala. Fırça yoksa temiz bir bezle sil. Uzun krizlerde diş ağrısı ciddi bir sorundur: dişin ağrır ya da diş etin şişerse diş hekimine git. Yüzün şişer ve ateşin çıkarsa beklemeden sağlık kuruluşuna git.");
H.degis("sanitasyon",
 "İdrar yolu enfeksiyonunu önlemek için bol su iç ve önden arkaya doğru temizlen.",
 "İdrar yolu enfeksiyonunu önlemek için bol su iç, <u>tuvalete gitmemek için suyu kısma, idrarını tutma</u>; önden arkaya doğru temizlen. İdrar yaparken yanma ile birlikte ateş, titreme ya da böğür ağrısı olursa sağlık kuruluşuna git.");
H.degis("sanitasyon",
 "Kirli ortamda lens takarsan göz enfeksiyonu riski artar.",
 "Kirli ortamda lens takarsan göz enfeksiyonu riski artar. Lensi yalnızca lens solüsyonuyla temizle; <u>musluk suyuyla ya da tükürükle temizleme</u>. Ellerini yıkayamıyorsan <u>lensini takma</u>, gözlüğünü tak. Gözün kızarır ya da ağrırsa lensi çıkar ve sağlık kuruluşuna git.");
/* Mutfak hijyeni */
H.ekle("sanitasyon",
 "<h2>Mutfak hijyeni</h2><ul>"+
 "<li>Yemek hazırlamadan ve yemekten önce, tuvaletten sonra ellerini sabunla yıka.</li>"+
 "<li>Çiğ et ve tavuk için ayrı bir kesme tahtası ve bıçak kullan; işin bitince bunları sabunlu suyla yıka.</li>"+
 "<li>Pişmiş yemeği oda sıcaklığında <u>2 saatten uzun bırakma</u>. Buzdolabı çalışmıyorsa bir öğünde yiyeceğin kadar pişir.</li>"+
 "<li>Meyveyi ve sebzeyi içme suyuyla ya da arıtılmış suyla yıka.</li>"+
 "<li>Tezgâhı ve kesme tahtasını sabunlu suyla yıka, sonra 1/100 oranında sulandırılmış kokusuz çamaşır suyuyla (10 litre suya 1 çay bardağı) sil. <u>Çamaşır suyunu tuz ruhuyla ya da başka bir temizlik ürünüyle karıştırma</u>: zehirli gaz çıkar.</li></ul>");
/* Bit, uyuz, tahtakurusu */
H.ekle("sanitasyon",
 "<h2>Toplu barınakta bit, uyuz ve tahtakurusu</h2><ul>"+
 "<li><b>Bit:</b> Başın kaşınır; saç diplerinde bit ya da saç teline yapışmış küçük beyaz yumurtalar (sirke) görürsün.</li>"+
 "<li><b>Uyuz:</b> Kaşıntı geceleri artar; parmak aralarında, el bileklerinde ve belde küçük kabarcıklar görülür.</li>"+
 "<li><b>Tahtakurusu:</b> Deride sıra hâlinde dizilmiş ısırıklar olur; yatağın ve çantanın dikiş yerlerinde küçük kan lekeleri ve böcekler görürsün.</li>"+
 "<li>Çamaşırı, nevresimi ve havluyu 60 °C suda yıka. Bit ve uyuzda yıkanamayan eşyayı ağzı kapalı bir poşette 2 hafta beklet. <u>Tarağı, havluyu, bereyi ve giysiyi kimseyle ortak kullanma.</u></li>"+
 "<li>Barınaktaki sağlık birimine haber ver. İlacı eczacıya ya da hekime danışarak kullan.</li></ul>");
H.kaynakEkle("sanitasyon","T.C. Sağlık Bakanlığı, afet sonrası çevre sağlığı ve yüzey temizliği (1/100 çamaşır suyu); Dünya Sağlık Örgütü (DSÖ), güvenli gıdanın 5 anahtarı; CDC, bit, uyuz, tahtakurusu ve kontakt lens hijyeni");

/* ---------- g/salgin ---------- */
H.ekle("salgin",
 "<li>Hasta kişi de maske taksın. Öksürürken ve hapşırırken ağzını mendille ya da dirseğinin içiyle kapatsın, mendili kapaklı çöpe atsın.</li>"+
 "<li>Kapı kolu, musluk, tezgâh ve telefon gibi sık dokunulan yüzeyleri her gün önce sabunlu suyla, sonra 1/100 oranında sulandırılmış kokusuz çamaşır suyuyla (10 litre suya 1 çay bardağı) sil. <u>Çamaşır suyunu başka bir temizlik ürünüyle karıştırma.</u></li>"+
 "<li><b>Göz iltihabı (konjonktivit):</b> Gözde kızarıklık, sulanma ve çapak olur; sabah uyandığında kirpiklerin birbirine yapışmış olabilir. Çok bulaşır: ellerini sık yıka, <u>gözüne dokunma</u>. <u>Havluyu, yastık kılıfını ve göz damlasını ortak kullanma.</u> Gözünde ağrı başlarsa, ışığa bakamazsan ya da görmen bulanıklaşırsa sağlık kuruluşuna git.</li>",
 {sonra:"herkesin kendi kabı olsun.</li>"});
H.ekle("salgin",cd("warn","Ateşli bir hastada nefes darlığı, ense sertliği ya da bilinç bulanıklığı başlarsa 112'yi ara. Zatürre, menenjit ve kana yayılan enfeksiyon (sepsis) gibi tehlikeli hastalıkların işaretleri için <a href='#/g/tehlike'>Hasta bakımı ve tehlike işaretleri</a> sayfasına bak."));
H.kaynakEkle("salgin","T.C. Sağlık Bakanlığı, yüzey temizliği (1/100 çamaşır suyu); CDC, konjonktivit");

/* ---------- Planlar ---------- */
H.ekle("plan/tahliye",
 "<li><b>Uykusuz sürüş:</b> Afet gecesinden sonra sürücüler de uykusuzdur ve bunu çoğu zaman fark etmez. Yolda 2 saatte bir mola verin, sürücüler sırayla direksiyona geçsin. Gözlerin kapanıyorsa ya da şeritten çıkıyorsan güvenli bir yerde dur, 15–20 dakika uyu.</li>",
 {sonra:"her 50–100 km'de bir buluşma noktası belirleyin.</li>"});
H.degis("plan/sukesinti","Küvetteki suyu yalnızca sifon ve temizlik için kullan.",
 "Küvetteki suyu yalnızca sifon ve temizlik için kullan; <u>depremden ya da selden sonra sifon için kullanma</u> (3. adım).");
H.degis("plan/sukesinti","ya da sifon yerine gri su (bulaşık ve duş suyu) dök.",
 "ya da sifon yerine gri su (bulaşık ve duş suyu) dök. Deprem ya da selden sonra boruların ve kanalizasyonun sağlam olduğu belli değilse <u>sifonu çekme, klozete su da dökme</u>; yalnızca poşetli tuvalet kullan (<a href='#/g/sanitasyon'>Tuvalet, hijyen ve sağlık</a>).");
H.ekle("plan/kisa",
 "<div class=\"step\"><div class=\"n\">5</div><div class=\"f\">Araçta ya da çadırda kalıyorsan uyanıkken saatte bir bacaklarını oynat, birkaç adım yürü ve su iç: saatlerce kıpırdamadan oturmak bacakta pıhtıya yol açabilir.</div></div>",
 {sonra:"nöbeti ikişer kişi tutsun, diğerleri uyusun.</div></div>"});

/* ---------- Listeler (grubun sonuna) ---------- */
H.listeEkle("cant72","Sağlık & hijyen",[
 "Koruyucu gözlük (yan korumalı)|enkazda tozdan, yangında külden gözünü korur",
 "Böcek ve kene kovucu (DEET ya da ikaridin içeren)|kene (Kırım-Kongo kanamalı ateşi) ve sivrisineğe karşı; kutusundaki talimata göre kullan"]);
H.listeEkle("cant72","Kadın sağlığı",[
 "Prezervatif (doğum kontrolü için)|uzun krizde doğum kontrolüne ulaşmak zorlaşır; kutudaki son kullanma tarihine bak"]);
H.listeEkle("cant72","Belge & para",[
 "Basılı cep kartı (lamine)|acil numaralar, buluşma noktaları, kod sözcükler, ekibin telefonları ve kan grupları yazılı; Plan › Cep kartı ekranından yazdır, ilaçlarını ve alerjilerini kartın arkasına elle yaz, cüzdanında taşı"]);
H.listeEkle("ekip","Sağlık & güvenlik",[
 "Baret|enkaz çevresinde çalışacak her kişiye bir tane"]);
H.listeEkle("ev","Hijyen & sanitasyon",[
 "FFP2 maske (bir kutu) ve nitril eldiven (bir kutu)|toz, salgın ve hasta bakımı için",
 "Böcek ve kene kovucu|sel sonrasında sivrisinek artar"]);
H.listeEkle("ilkyardim","Yara",[
 "Çengelli iğneler|üçgen sargıyı tutturmak için"]);
H.listeEkle("ilkyardim","Kırık & diğer",[
 "Su geçirmez keçeli kalem ve renkli bant (kırmızı, sarı, yeşil, siyah)|triyaj rengini ve turnikenin takıldığı saati yazmak için; tükenmez kalem ıslak ya da kanlı deriye yazmaz"]);
H.listeEkle("bakim","",[
 "İlaçlar serin, kuru ve güneş görmeyen bir yerde mi?|banyo, ocak başı ve araç ilaç saklamaya uygun değildir; şurup ve damlalar daha çabuk bozulur",
 "Adrenalin kaleminin ve astım spreyinin son kullanma tarihine bak|kalemin penceresindeki sıvı bulanık ya da renkliyse kalemi değiştir; kalemi dondurma, sıcakta bırakma"]);
H.listeEkle("arac","",[
 "İlaçları ve adrenalin kalemini yazın araçta bırakma|sıcakta bozulur; yolculukta yanında taşı"]);
})();
