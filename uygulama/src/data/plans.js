/* Planlar */
(function(){
var H=window.HK,st=H.st,cd=H.cd;
H.smsTpl=[
 {t:"İyiyim",b:"[EKIP] IYIYIM. Yerimde kaliyorum.{loc}"},
 {t:"Yardım lazım",b:"[EKIP] YARDIM LAZIM. Yarali/ihtiyac: ____{loc}"},
 {t:"RP1'e gidiyorum",b:"[EKIP] RP1'E GIDIYORUM. Varis ~__ dk.{loc}"},
 {t:"RP2'ye gidiyorum",b:"[EKIP] RP2'YE GIDIYORUM.{loc}"},
 {t:"Tahliye",b:"[EKIP] KIRMIZI: TAHLIYE. Plan 0 (arac) / yuruyus: ____. RP3: ____.{loc}"},
 {t:"Yoklama",b:"[EKIP] YOKLAMA: herkes 'OK + konum + kisi sayisi' yazsin.{loc}"}
];
H.rallyDef=[
 {k:"RP1 — Mahalle",v:"Her ailenin kendi apartmanına ait AFAD toplanma alanı (e-Devlet'ten öğren)"},
 {k:"RP2 — Mahalle dışı ortak nokta",v:"____ (açık alanı olan, herkesin bildiği bir yer; deprem sonrası bina kontrol edilmeden içeri girilmez)"},{k:"Şebeke yoksa kural",v:"Olaydan sonra RP1'e git, 2 saat bekle, not bırak, RP2'ye geç. Olaydan sonraki 6. ve 24. saatte herkes RP2'de hazır bulunur."},
 {k:"RP3 — Şehir dışı toplanma",v:"Yerler listesinden seç (ör. güney koridoru)"},
 {k:"Not bırakma yeri",v:"Her buluşma noktasında: ____"},
 {k:"Telsiz kanalı (PMR446)",v:"Kanal: ____ · CTCSS: ____ · yedek kanal: ____"},
 {k:"Sabit iletişim saatleri",v:"Şu saatlerin başında 5 dk: 08, 12, 18, 21"},
 {k:"Şehir dışı irtibat kişisi",v:"Başka ilde yaşayan, herkesin haber verdiği kişi: ____"}
];
H.codeDef="YESIL = herkes iyi, normal hayat\nSARI = hazırlan: depo dolu, nakit, çantalar kapıda\nTURUNCU = RP2'de toplan (lider ilan eder)\nKIRMIZI = tahliye: Plan 0 araçla ev sahibine, yoksa yürüyüş planı\n____ = konuşamıyorum, sonra ararım (kendi kod sözcüğünüzü yazın)\n____ = güvendeyim ama yardım lazım";

H.plans=[
{id:"karar",ic:"plan",t:"Kal mı, git mi?",d:"Evde barınma mı, tahliye mi: karar ağacı",h:
 cd("info","Temel kural: <b>EVDE KAL.</b> Ev sağlamsa ve tehlike eve ulaşmıyorsa stoğun, ısınma düzenin, yatağın ve çevren oradadır. Tahliye ağır bir karardır: yoldayken olabileceğin en savunmasız hâldesin.")+
 '<h2>Şu durumlarda evi hemen terk et</h2><ul><li>Bina hasarlıysa (depremden sonra çatlak, eğilme ya da gaz kokusu varsa)</li><li>Yangın, sel ya da kimyasal bulut yaklaşıyorsa</li><li>Resmî tahliye emri geldiyse (AFAD, valilik)</li></ul>'+
 '<h2>Şu durumlarda evde kal, içeride korun</h2><ul><li>Bina sağlamsa ve bölgende doğrudan bir tehlike yoksa</li><li>Kimyasal ya da radyolojik bir olayda "içeride kalın" duyurusu yapıldıysa: pencereleri ve havalandırmayı kapat</li><li>Kar fırtınası ya da aşırı soğuk varsa</li><li>Dışarıda kargaşa varsa ya da yollar tıkalıysa</li></ul>'+
 '<h2>Şu durumlarda şehirden çık (RP3: şehir dışı buluşma noktası)</h2><ul><li>14 günlük stok bitiyorsa ve yenisini bulamıyorsan</li><li>Şebeke suyu uzun süredir yoksa ve yakında başka su kaynağı bulunamıyorsa</li><li>Bölgede güvenlik çöktüyse</li></ul><p>Yola çıkmadan önce şunlardan emin ol: ekip RP2\'de (mahalle dışındaki ortak buluşma noktası) toplandı, herkes yürüyebilecek durumda ve hava uygun.</p>'+
 cd("tip","<b>Tetikleyicileri (harekete geçme kurallarını) önceden yaz.</b> Örnek: \"Su 5 gün kesik kalırsa ve AFAD su dağıtmıyorsa Turuncu seviyeye geçeriz.\" Kriz anında karar vermek zordur; önceden yazılmış bir kural kararı kolaylaştırır.")},
{id:"seviye",ic:"shield",t:"Alarm seviyeleri",d:"Yeşil · Sarı · Turuncu · Kırmızı",h:
 '<div class="tw"><table><tr><th>Seviye</th><th>Durum</th><th>Eylem</th></tr>'+
 '<tr><td style="color:#7f8f4e"><b>YEŞİL</b></td><td>Normal hayat</td><td>Aylık bakımı ve eğitimleri sürdür. Stoğu eskisinden başlayarak kullan ve yerine yenisini koy.</td></tr>'+
 '<tr><td style="color:#d9c34b"><b>SARI</b></td><td>Belirsizlik var: haberlerde kriz konuşuluyor, kesintiler başladı</td><td>Araçların deposunu doldur, nakit çek, ilaç al, çantaları kapının yanına koy, telefonları şarj et. Ekibe SMS ile yoklama yap.</td></tr>'+
 '<tr><td style="color:#e08a2e"><b>TURUNCU</b></td><td>Kriz başladı, şehir hizmetleri aksıyor</td><td>Ekip RP2\'de (mahalle dışındaki ortak buluşma noktası) toplanır ya da herkes evinde kalır. 6 saatte bir yoklama yapın, tahliyeye hazırlanın.</td></tr>'+
 '<tr><td style="color:#d0453a"><b>KIRMIZI</b></td><td>Ev ya da şehir güvenli değil</td><td>Tahliye: Plan A rotası, RP3. Telefon tasarruf moduna, telsizle iletişim</td></tr></table></div>'+
 cd("tip","Seviyeyi yalnızca ekip lideri, o yoksa yardımcısı ilan eder. Kod sözcükleri SMS ile gönderin; kod listesi Plan › Buluşma noktaları ekranındadır.")},
{id:"kisa",ic:"sos",t:"Kısa süreli plan: 0–72 saat",d:"Deprem, sel, kesinti ya da kargaşada ilk 3 gün",h:
 '<h2>İlk 10 dakika</h2>'+st(["Kendini koru: içerideysen Çök-Kapan-Tutun yap, dışarıdaysan açık alana geç.","Yaralı var mı, bak. Önce hayati kanamayı ve nefesi kontrol et.","Hasar varsa doğalgaz ve su ana vanasını kapat, elektrik şalterini indir.","Ayakkabı giy (yerde cam olabilir), kafa lambanı ve çantanı al."],true)+
 '<h2>İlk 1 saat</h2>'+st(["Ekibe SMS at: \"İYİYİM\" ya da \"YARDIM\" yaz, konumunu ekle (Ekip ekranındaki hazır mesajlar). <u>Sesli arama yapma</u>: hatları tıkar.","Bina hasarlıysa toplanma alanına (RP1: mahalledeki ilk buluşma noktası) git. Sağlamsa içeride kal ve hasarı kontrol et.","Radyoyu aç (TRT ya da yerel radyo), resmî duyuruları dinle.","Telefonu Maksimum güç tasarrufuna al."])+
 '<h2>İlk 24 saat</h2>'+st(["Su: musluk akıyorsa her kabı doldur. Akmıyorsa evdeki gizli suyu topla (termosifon, klozet rezervuarı).","Durumu öğren: kim nerede, kimin neyi eksik? Ekip listesinden tek tek yoklama yap.","Komşularınla, özellikle yaşlı, engelli ve çocuklu ailelerle görüş. Ateşi, suyu ve nöbeti birlikte düzenleyin.","Kararını ver: evde kal, RP2'ye (mahalle dışındaki ortak buluşma noktası) git ya da şehirden çıkıp RP3'e git (bkz. Kal mı, git mi?)."])+
 '<h2>24–72 saat</h2>'+st(["Günlük bir düzen kur: yoklama ve yemek saatleri, nöbet, temizlik belli olsun.","Resmî yardım noktalarını (AFAD ve Kızılay çadırları) öğren; bilgiyi ve suyu oradan al.","Stoğu say: kaç gün yeter? Önceden yazdığınız tetikleyicilere (harekete geçme kurallarına) bak.","Uyku düzeni kur: nöbeti ikişer kişi tutsun, diğerleri uyusun."])},
{id:"orta",ic:"home",t:"Orta süreli plan: 3–14 gün",d:"Evde barınma, kaynak yönetimi",h:
 "<ul><li><b>Su:</b> Her gün ne kadar su kullandığınızı ölç ve yaz. Kişi başı günde 4 L hedefle: 3 L içmek, 1 L temizlik için. Yağmur suyu toplamak için bir düzenek kur.</li>"+
 "<li><b>Gıda:</b> Elektrik yoksa ilk 1–2 gün buzdolabındaki bozulacak yiyecekleri ye, sonra dondurucudakileri, en son kuru stoğu. Günde 2 sıcak öğün morali yükseltir.</li>"+
 "<li><b>Tuvalet ve hijyen:</b> Sifon çalışmıyorsa klozete poşet geçir, içine kedi kumu ya da talaş koy. Poşetin ağzını bağla, dışarıda kapalı bir varilde biriktir. El yıkamak ishal salgınını önler: su kıt olsa bile en son kısacağın şey el yıkamak olsun.</li>"+
 "<li><b>Enerji:</b> Telefonları sırayla açın: aynı anda yalnızca 1–2 telefon açık kalsın, diğerleri uçak modunda dursun. Güneş panelini gündüz sürekli şarjda tut.</li>"+
 "<li><b>Güvenlik:</b> Geceleri ışık dışarıdan görünmesin diye perdeleri kapat. <u>Stoğunu kimseye gösterme.</u> Kapıda nöbet tutun; komşularla birlikte mahallede düzen kurun.</li>"+
 "<li><b>Bilgi:</b> Radyoyu günde 2 kez, sabah ve akşam dinle. Ekiple günde 1 kez telsizle ya da SMS ile yoklama yapın.</li></ul>"+
 cd("tip","Sağlıklı rutin: sabah 20 dk hafif hareket (esneme, yürüyüş), akşam nefes çalışması. Bedeni sıcak tutar, moral ve uykuyu düzeltir.")},
{id:"uzun",ic:"leaf",t:"Uzun süreli plan: 2 haftadan uzun",d:"Aylar sürebilecek düzensizlik",h:
 "<p>Uzun krizlerde (savaş, ağır ekonomik çöküş, altyapının uzun süre çökmesi) kişisel stok biter. Saraybosna (1992–96), Lübnan ve Venezuela'da yaşananlar şunu gösteriyor: uzun dönemde hayatta kalmayı <b>topluluk, beceri ve takas</b> belirler.</p>"+
 "<h2>1. Topluluk</h2><ul><li>Ekibinle (en fazla 10 kişi) birlikte, güvendiğin komşulardan oluşan bir ağ kur. Tek başına kalan bir aile çok savunmasızdır.</li><li>Kimin hangi beceriyi bildiğini listele: sağlıkçı, tamirci, elektrikçi, aşçı, bahçıvan, öğretmen.</li><li>Su taşıma, odun, nöbet, çocuk bakımı ve ders gibi işleri ortak yapın.</li></ul>"+
 "<h2>2. Kaynak</h2><ul><li>Su: kalıcı bir kaynak (kuyu, pınar, yağmur suyu) ve kalıcı bir arıtma yolu bul (su kendi ağırlığıyla süzülen asma filtre, kaynatmak için yakıt).</li><li>Gıda: kuru bakliyat ve tohum (yerel, ata tohumu) biriktir; saksıda ya da balkonda sebze yetiştir; takas için bir köyle bağlantı kur.</li><li>Isınma: soba ve odun ya da kömür bul; tek odada yaşayın.</li><li>Sağlık: doktorunla konuşup kronik ilaçlardan 3 aylık stok yap; diş bakımına ve temizliğe dikkat et.</li></ul>"+
 "<h2>3. Takas ve değer</h2><ul><li>En çok aranan şeyler: ilaç, pil, çakmak, tuz, şeker, kahve, çay, sigara, alkol, tohum ve beceri (tamir, dikiş, sağlık).</li><li><u>Gücünü belli etme</u>; takası az ve sessizce yap.</li></ul>"+
 "<h2>4. Köye/kırsala geçiş</h2><ul><li>Şehir dışında bir tanıdığının ya da akrabanın köyünü önceden belirle; bu köy RP3 (şehir dışı buluşma noktası) ya da daha ötesi olabilir. <u>Eli boş gitme</u>; işe yarar bir beceri ve malzeme götür.</li><li>Köyde iş çoktur: su, odun, tarla, hayvan. Saygı göster ve katkı sağla: misafir gibi değil, çalışan biri gibi davran.</li></ul>",
 src:"Saraybosna kuşatması tanıklıkları; FEMA; Wiseman"},
{id:"tahliye",ic:"map",t:"Tahliye & yürüyüş planı",d:"Ne zaman çıkılır, rota nasıl kurulur",h:"__TAHLIYE__"},
{id:"pace",ic:"radio",t:"İletişim planı (PACE)",d:"Birincil · Alternatif · Acil durum · Son çare",h:
 "<p>PACE dört basamaklı bir iletişim planıdır: birincil, alternatif, acil durum ve son çare yöntemi (İngilizce baş harfleri P, A, C, E). Bir yöntem çalışmazsa sıradakine geç.</p>"+
 '<div class="tw"><table><tr><th></th><th>Yöntem</th><th>Ne zaman</th></tr>'+
 '<tr><td><b>P</b><br><small>Birincil</small></td><td>Cep telefonu: SMS, aramadan iyidir</td><td>Şebeke varken. SMS kuyrukta bekler, sinyal gelince gider. <b>2023 ve 2025 depremlerinde şebeke saatlerce, yer yer günlerce çöktü: <u>şebekeye güvenme.</u></b></td></tr>'+
 '<tr><td><b>A</b><br><small>Alternatif</small></td><td>Wi‑Fi arama (VoWiFi) ve internetten mesajlaşma</td><td>İnterneti çalışan bir Wi‑Fi ağı varsa. Telefon 2G kriz modundayken internet yoktur; gerekirse kısa süre 4G\'ye geç.</td></tr>'+
 '<tr><td><b>C</b><br><small>Acil durum</small></td><td>PMR446 telsiz (lisans gerektirmeyen el telsizi), önceden belirlenen kanal ve saatlerde</td><td>Şebeke çöktüğünde. Menzil şehirde 0,5–2 km, tepeden 5 km\'den fazla.</td></tr>'+
 '<tr><td><b>E</b><br><small>Son çare</small></td><td>Buluşma noktası ve not bırakma</td><td>Hiçbir şey çalışmazsa olaydan sonra <b>RP1</b>\'e (mahalledeki toplanma alanı) git, 2 saat bekle, not bırak, <b>RP2</b>\'ye (mahalle dışındaki ortak nokta) geç. Olaydan sonraki <b>6. ve 24. saatte</b> herkes RP2\'de hazır bulunur.</td></tr></table></div>'+
 cd("tip","<b>Şehir dışı irtibat kişisi:</b> Yerel hatlar tıkalıyken şehirlerarası SMS ve aramalar bazen geçer. Herkes durumunu başka ildeki bu kişiye bildirsin; o kişi ekibin \"haber merkezi\" olur.")+
 cd("info","<b>Telsiz disiplini:</b> Önce dinle. Kısa konuş: \"Ali'den Ayşe'ye\" → \"Dinliyorum\" → mesaj → \"Tamam, bitti\". İsim ve adres yerine kod sözcük kullan. Telsizi sabit saatlerin başında 5 dk aç, sonra pil bitmesin diye kapat.")},
{id:"deprem",ic:"quake",t:"Deprem senaryosu",d:"Kendi ilin ve büyük bir İstanbul depremi",h:
 "⟦06:<p>Ankara, Kuzey Anadolu Fayı'na göre daha düşük tehlikeli bir bölgede olsa da orta büyüklükte depremler ve çevre faylar (ör. Eskişehir–Bala hatları) riski vardır. Ayrıca büyük bir İstanbul depremi, Ankara'da yakıt, gıda, ulaşım ve iletişim zincirini günlerce etkileyebilir.</p>⟧⟦!06:<p>İlinin deprem tehlikesini <a href='#/g/fay'>Deprem tehlikesi ve faylar</a> sayfasından öğren. Tehlikesi düşük bir ilde yaşasan da büyük bir İstanbul ya da bölge depremi yakıt, gıda, ulaşım ve iletişim zincirini günlerce etkileyebilir.</p>⟧"+
 '<h2>Deprem anında</h2>'+st(["<b>ÇÖK</b> — dizlerinin üstüne.","<b>KAPAN</b> — başını ve enseni kollarınla koru; sağlam masa altı varsa oraya.","<b>TUTUN</b> — masanın ayağına; sarsıntı bitene kadar yerinde kal.","Merdivene, asansöre, balkona koşma. Dışarıdaysan bina, direk ve camlardan uzaklaş.","Arabada: güvenli yerde dur, köprü/üst geçit altında durma, içeride kal."],true)+
 cd("warn","Resmi yöntem <b>Çök-Kapan-Tutun</b>'dur (AFAD). Boşluklar önceden kestirilemez ve sarsıntı sırasında yer değiştirmek yaralanmaların başlıca nedenidir. Not: AKUT kurucularından Dr. Ferudun Çelikmen, Türkiye'deki yıkılan binalar için sağlam eşya yanında cenin pozisyonunu savunur; bu bir tartışma konusudur.")+
 '<h2>Sarsıntı bitince</h2>'+st(["Ayakkabı giy, çantayı al, gazı kapat. Kibrit/çakmak YAKMA (gaz kaçağı).","Merdivenden çık, artçılara karşı binalardan uzak dur.","Toplanma alanına (RP1). Ekibe SMS.","Enkaz altında kalan varsa: konumunu belirle, ses yap (3 vuruş), profesyonel ekipleri yönlendir; kendin tünel kazma."])+
 cd("tip","<b>Enkaz altındaysan:</b> Kıpırdama, toz kaldırma, ağzını bezle ört. Bağırma (enerji/oksijen) — boruya veya duvara 3'erli vur, düdük çal. Telefonun varsa SMS gönder, pil için ekranı kapat.")},
{id:"kiskesinti",ic:"snow",t:"Kış kesintisi senaryosu",d:"Doğalgaz ve elektrik yok, hava −15 °C",h:
 "<p>Büyük kentlerde ısınma büyük ölçüde doğalgaza bağlıdır. Kışın uzun süren bir gaz ya da elektrik kesintisi, şehirdeki en ciddi risktir.</p>"+
 st(["<b>Kesinti başlar başlamaz:</b> Herkes kat kat giyinsin. Hep birlikte tek odaya çekilin (aşağıdaki Tek oda düzeni bölümüne bak).","<b>Su boruları:</b> Donmasın diye musluğu ince ince akıt ya da tesisatın suyunu boşalt.","<b>Isınma:</b> Yalnızca güvenli yöntemleri kullan: vücut ısısı, sıcak su şişesi, kat kat battaniye, oda içinde çadır.","<b>Yemek:</b> Yağlı ve sıcak ye; günde 3000 kcal hedefle (titremek kalori yakar).","<b>Kesinti 48 saati geçerse:</b> Isıtılan ortak bir alana (belediyenin ısınma merkezi gibi) ya da ekipteki en sıcak eve toplanın.","<b>Dışarı çıkarken:</b> Dışarıya hep 2 kişi çıkın, yüzünüzü kapatın; biriniz yolu bilsin."])+
 cd("warn","Bu durumda ölümlerin çoğu soğuktan değil; karbonmonoksitten (mangal, tüp, jeneratör) ve kaygan zeminde düşmekten olur.")},
{id:"egitim",ic:"users",t:"Ekip eğitim takvimi",d:"Aylık 2 saat, 12 ay",h:
 "<p>Ekipmandan önemli olan <b>prova edilmiş beceri</b>dir. Düzenli bir araya gelen gruplar (spor kulübü, apartman, işyeri ekibi) burada avantajlıdır: düzenli antrenman, disiplin, takım çalışması.</p>"+
 '<div class="tw"><table><tr><th>Ay</th><th>Konu</th><th>Pratik</th></tr>'+
 [["1","Plan ve ekip kartı","Herkes bu uygulamayı kurar, en güçlü pil tasarrufu modunu prova eder"],["2","İlk yardım I","Kalp masajı (KPR), derlenme pozisyonu (sertifikalı eğitmenle)"],["3","İlk yardım II","Turnike, basınçlı bandaj, atel"],["4","Deprem tatbikatı","Çök-Kapan-Tutun, RP1'den RP2'ye (buluşma noktaları) yürüyüş, SMS ile yoklama"],["5","Navigasyon I","Harita ve pusula, ⟦06:Eymir çevresinde⟧⟦!06:yakındaki bir park ya da korulukta⟧ kerteriz (pusulayla yön açısı) alma"],["6","Su","Su arıtma, filtre kullanımı, su bulma yürüyüşü"],["7","Ateş ve barınak","Branda kurulumu, ateş çubuğu, Dakota çukur ateşi"],["8","Düğümler","8 düğümü gözü kapalı atabilmek"],["9","Gece yürüyüşü","Yıldızlarla yön bulma, kırmızı ışık kullanımı, sessiz hareket"],["10","Telsiz","PMR446 (lisanssız el telsizi) ile menzil testi, telsizde konuşma kuralları"],["11","Kış","Kat kat giyinme, hipotermi (vücut ısısının düşmesi), kış çantası"],["12","Büyük tatbikat","Dışarıda 1 gece, RP3 (şehir dışı buluşma noktası) yürüyüşünün ilk günü"]].map(function(r){return '<tr><td>'+r[0]+'</td><td><b>'+r[1]+'</b></td><td>'+r[2]+'</td></tr>'}).join("")+'</table></div>'}
];
})();
