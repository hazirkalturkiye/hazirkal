/* İlk yardım — eksik konular: ilk adımlar ve 112, kalp krizi ve inme, bayılma-havale-şeker, astım, suda boğulma ve elektrik.
   Esas: T.C. Sağlık Bakanlığı İlk Yardım Uygulamaları Beceri Rehberi (Kızılay dahil eğitim merkezlerinin müfredatı; MEB İSG 2025 eğitim notları üzerinden).
   Rehberin sustuğu yerde ERC 2021 ilk yardım kılavuzu. */
(function(){
var H=window.HK,cd=H.cd,st=H.st;
var SB="T.C. Sağlık Bakanlığı İlk Yardım Uygulamaları Beceri Rehberi (MEB İSG 2025 eğitim notları)";
function add(o,first){var old=H.guide.filter(function(x){return x.id===o.id})[0];if(old){for(var k in o)old[k]=o[k];return}if(first)H.guide.unshift(o);else H.guide.push(o)}

add({id:"ilkadim",cat:"ilk",ic:"shield",t:"İlk yardımın ilk adımları",d:"Güvenlik · değerlendir · 112'ye ne söylenir",h:
 st(["<b>Olay yerinin güvenliğine bak:</b> Yangın, gaz, elektrik, trafik ya da çökme tehlikesi var mı? Önlem alamıyorsan <u>olay yerine yaklaşma</u>; uzaklaş ve 112'yi ara. Kendini koru: eldivenin yoksa eline poşet geçir.",
 "<b>Trafik kazasında:</b> Kendi aracını güvenli bir yere çek, dörtlüleri yak, yansıtıcı yeleğini giy. Uyarı üçgenini şehir içinde en az <b>30 m</b>, şehirlerarası yolda en az <b>150 m</b> uzağa koy (çift yönlü yolda kazanın hem önüne hem arkasına). Kazalı aracın kontağını kapat, el frenini çek, mümkünse tekerleğe takoz koy. <u>Sigara içme, kimsenin içmesine izin verme.</u>",
 "<b>Değerlendir:</b> Omuzlarına hafifçe dokun, \"İyi misiniz?\" de. <b>Yanıt vermiyorsa</b> birine 112'yi arat ve en fazla 10 saniye nefesine bak: normal nefes almıyorsa <a href='#/g/kpr'>KPR</a>'ye başla, alıyorsa <a href='#/g/bilincsiz'>derlenme pozisyonuna</a> al. <b>Yanıt veriyorsa</b> nefes alıp almadığına ve ağır kanama olup olmadığına bak. Sonra vücudunu baştan ayağa kontrol et, ne olduğunu sor.",
 "<b>112'yi ara</b> ya da birine aratıp \"Aradıktan sonra bana haber ver\" de. Sakin ol ve şunları sırayla söyle: <b>adın ve telefon numaran</b>, <b>ne olduğu</b>, <b>kaç kişinin</b> yaralı olduğu, <b>yaralıların durumu ve yaptığın ilk yardım</b>, <b>tam adres</b> (il, ilçe, mahalle, sokak, numara, yol tarifi). <u>Görevli kapatmadan telefonu kapatma.</u>",
 "<b>İlk yardımı uygula</b>; yardım gelene kadar <u>yaralının yanından ayrılma</u>. <u>Gerekmedikçe yaralıyı yerinden oynatma</u>; başına ya da boynuna darbe aldıysa omurga yaralanması var kabul et."],true)+
 cd("warn","<b>Yapma:</b> <u>Kendini tehlikeye atma.</u> <u>Ağır yaralıya ya da bulantısı, uyku hâli veya bilinç bulanıklığı olan kişiye su dahil hiçbir şey verme.</u> <u>Kolonya ya da soğan koklatma.</u> <u>Kimseye ilaç önerme.</u>")+
 cd("tip","<b>İlaç:</b> Kişinin kendi reçeteli ilacını kullanmasına yardım edebilirsin.")+
 cd("info","<b>Arama geçmiyorsa</b> birkaç dakika sonra yeniden dene; ekibine ve yakınlarına SMS at. Resmî <b>HAYAT 112 Acil</b> uygulaması, internet yokken konumunu SMS ile 112'ye gönderebilir. Bu uygulamayı şimdiden telefonuna kur (→ <a href='#/g/uygulamalar'>Diğer uygulamalar</a>)."),
 src:SB},true);

add({id:"kalp",cat:"ilk",sos:1,ic:"heart",t:"Göğüs ağrısı (kalp krizi) ve inme",d:"112 · yarı oturt · Yüz-Kol-Konuşma-Zaman",h:
 "<h2>Kalp krizi şüphesi</h2>"+
 cd("info","<b>Belirtiler:</b> göğüste baskı, sıkışma, yanma; kola (çoğunlukla sol), çeneye, sırta, mide üstüne yayılan ağrı; nefes darlığı, soğuk terleme, bulantı, baş dönmesi. Kadınlarda, yaşlılarda ve şeker hastalarında ağrı hafif olabilir; yalnızca nefes darlığı veya halsizlik görülebilir.")+
 st(["<b>112'yi ara.</b> <u>\"Geçer\" diye bekleme.</u>",
 "Kişiyi <b>yarı oturur</b> pozisyona al: sırtını duvara ya da bir çantaya yasla, dizleri hafifçe bükük olsun. Sıkan giysisini gevşet. <u>Kişiyi yürütme, merdiven çıkartma.</u>",
 "Kişinin kendi <b>reçeteli kalp ilacı</b> (ör. dil altı hap) varsa kullanmasına yardım et.",
 "<b>Aspirin (yalnızca yetişkine):</b> Ağrının kalpten olduğunu düşünüyorsan ve kişi bilinçliyse <b>aspirin</b> çiğnetip az suyla yutturabilirsin: 300 mg'lık <b>1 tablet</b> ya da 100 mg'lık <b>2–3 tablet</b> (yetişkin dozu 150–300 mg). Aspirin alerjisi, mide kanaması ya da yakın zamanda geçirilmiş bir kanama varsa veya emin değilsen <u><b>aspirin verme</b></u>. Verdiysen 112 ekibine söyle.",
 "<u>Bacaklarını <b>kaldırma</b>, kişiyi yalnız bırakma, başka bir şey yedirip içirme.</u> Bilincini kaybeder ve normal nefes almazsa hemen <a href='#/g/kpr'>KPR</a>'ye başla, şok cihazı (OED) getirt."],true)+
 "<h2>İnme (felç) şüphesi</h2>"+
 st(["<b>Yüz:</b> \"Gülümse\" de. Yüzünün bir yanı düşük mü?",
 "<b>Kol:</b> \"İki kolunu öne kaldır, öyle tut\" de. Kollardan biri aşağı düşüyor mu?",
 "<b>Konuşma:</b> Basit bir cümleyi tekrarlat. Konuşması bozuk mu, anlamsız mı, yoksa hiç konuşamıyor mu?",
 "<b>Zaman:</b> Bu belirtilerden biri bile varsa hemen <b>112'yi ara</b>. Belirtilerin <b>başladığı saati</b> yaz ve ekibe söyle: tedavi bu saate göre seçilir."],true)+
 cd("warn","<u>Ağızdan yiyecek, içecek ya da ilaç <b>verme</b></u> (yutması bozulmuş olabilir); <u>aspirin de verme</u>. Bilinci bulanıklaşır ama nefes alırsa <a href='#/g/bilincsiz'>derlenme pozisyonuna</a> al; normal nefes almıyorsa KPR'ye başla. Ani ve çok şiddetli baş ağrısı, ani görme kaybı ve dengesizlik de inme belirtisi olabilir."),
 src:SB+" (göğüs ağrıları, bilinç bozuklukları); ERC 2021"});

add({id:"nobet",cat:"ilk",sos:1,ic:"brain",t:"Bayılma, havale, şeker düşmesi",d:"Yatır · koru · şeker ver",h:
 "<h2>Bayılma</h2>"+
 cd("tip","<b>Bayılacak gibi olursan</b> (baş dönmesi, göz kararması, terleme, bulantı) hemen otur ya da çömel. Bacaklarını çaprazlayıp kaslarını sık ya da ellerini kenetleyip iki yana çek: bu, bayılmanı önleyebilir.")+
 st(["Bayılan kişiyi düz zeminde <b>sırtüstü</b> yatır, bacaklarını yaklaşık <b>30 cm</b> kaldır (düşerken başını ya da bacağını yaraladıysa <u>bacaklarını kaldırma</u>). Sıkan giysisini gevşet, ortamı havalandır.",
 "<b>En fazla 10 saniye</b> nefesine bak. Normal nefes almıyorsa <a href='#/g/kpr'>KPR</a>'ye başla.",
 "Kendine gelince <u>onu hemen ayağa kaldırma</u>; birkaç dakika yatsın, sonra yavaşça otursun.",
 "Kişi birkaç dakikada kendine gelmiyorsa, yeniden bayılıyorsa, göğüs ağrısı, çarpıntı ya da nefes darlığı varsa, düşerken yaralandıysa veya efor sırasında bayıldıysa <b>112'yi ara</b>."],true)+
 cd("info","<b>Hamileyse (20 hafta ve üstü):</b> sırtüstü değil, <b>sol yanına</b> yatır; sırtüstü yatınca bebeğin ağırlığı büyük damara bastırır.")+cd("warn","<b>Yapılmayacaklar:</b> <u>oturtmaya çalışmak, kolonya ya da soğan koklatmak, yüzüne su dökmek, tokat atmak, bilinci tam açılmadan su içirmek.</u>")+
 "<h2>Havale (epilepsi nöbeti)</h2>"+
 st(["Çevredeki sert, keskin ya da sıcak eşyaları uzaklaştır. Başının altına yumuşak bir şey koy, gözlüğünü çıkar, yakasını gevşet.",
 "<u>Nöbeti <b>durdurmaya çalışma</b>; kollarını, bacaklarını tutma, bağlama.</u> <u>Ağzına parmak, kaşık ya da bez <b>sokma</b></u>: kişi dilini yutmaz, ama seni ısırabilir.",
 "Nöbetin <b>başlama saatini</b> not et.",
 "Kasılmalar bitince onu <a href='#/g/bilincsiz'>derlenme pozisyonuna</a> al, nefesini izle; kendine gelene kadar yanında kal, sakin konuş.",
 "Nöbet 5 dakikadan uzun sürerse, kişinin ilk nöbetiyse, bir nöbet biterken yenisi başlarsa, nöbet bitince bilinci açılmazsa ya da nefesi düzelmezse, kişi yaralandıysa, nöbeti suda geçirdiyse, hamileyse veya şeker hastasıysa <b>112'yi ara</b>. <u>Tam kendine gelene kadar yiyecek, içecek verme.</u>"],true)+
 cd("tip","<b>Çocukta ateşli havale:</b> Fazla giysilerini çıkar, <b>oda sıcaklığındaki</b> suyla ıslatılmış bezle serinlet. <u>Soğuk su, buz, alkol ya da sirke kullanma.</u> Kasılma bitince derlenme pozisyonuna al. <b>Her ateşli havalede 112'yi ara.</b>")+
 "<h2>Şeker düşmesi (hipoglisemi)</h2>"+
 cd("info","İnsülin ya da şeker ilacı kullanan bir kişide titreme, terleme, açlık hissi, sinirlilik, sarhoş gibi davranma ya da kafa karışıklığı (konfüzyon) görürsen önce <b>şeker düşmesinden</b> şüphelen.")+
 st(["<b>Bilinci açık ve yutabiliyorsa</b> şeker ver: 4 küp şeker, yarım su bardağı meyve suyu ya da kola (diyet olmayan), 1 yemek kaşığı reçel ya da bal.",
 "<b>112'yi ara.</b> 10–15 dakika bekle; düzelmediyse bir kez daha şeker ver.",
 "Düzelince ekmek, bisküvi gibi bir şey yesin. <u>Kişiyi yalnız bırakma.</u>",
 "<b>Bilinci kapalıysa ya da yutamıyorsa</b> <u>ağızdan hiçbir şey verme</u>; onu <a href='#/g/bilincsiz'>derlenme pozisyonuna</a> al, 112'yi ara."],true)+
 cd("warn","<u><b>İnsülin iğnesi yapma.</b></u> Şekerin düşük mü yüksek mi olduğundan emin değilsen ve kişinin bilinci açıksa <b>şeker ver</b>: düşük şeker dakikalar içinde tehlikeli olur, biraz şeker ise yüksek şekeri belirgin biçimde kötüleştirmez."),
 src:SB+" (bilinç bozuklukları); ERC 2021"});

add({id:"astim",cat:"ilk",ic:"lung",t:"Nefes darlığı ve astım krizi",d:"Oturt · kendi ilacı · 112",h:
 st(["<b>Kişiyi oturt</b>; hafifçe öne eğilip kollarını masaya ya da dizlerine dayasın. Sıkan giysisini gevşet, onu temiz havaya çıkar. Sakin konuş, yavaş nefes alıp vermesini söyle.",
 "Kişinin kendi <b>astım ilacı</b> (genellikle mavi kurtarıcı sprey) varsa, doktorunun söylediği şekilde kullanmasına yardım et. Spreyin haznesi varsa hazneyle kullansın.",
 "İlaçtan sonra 5 dakikada düzelmiyorsa, cümle kuramıyorsa, dudakları morarıyorsa, çok yoruluyor ya da uyuşuklaşıyorsa veya kriz ilk kez oluyorsa <b>112'yi ara</b>.",
 "Bilincini kaybeder ve normal nefes almazsa <a href='#/g/kpr'>KPR</a>'ye başla."],true)+
 cd("info","Ani nefes darlığının başka nedenleri de olabilir: alerji (<a href='#/g/yilan'>anafilaksi</a>), kalp krizi (<a href='#/g/kalp'>göğüs ağrısı</a>), yabancı cisim (<a href='#/g/bogulma'>boğulma</a>), göğüs yarası (<a href='#/g/gogus'>göğüs</a>), duman veya gaz (<a href='#/g/zehir'>karbonmonoksit</a>). Duman ve toz bulutunda ağzını ıslak bezle kapat, temiz havaya çık."),
 src:"ERC 2021 ilk yardım kılavuzu; "+SB});

add({id:"suda",cat:"ilk",ic:"wave",t:"Suda boğulma ve elektrik çarpması",d:"Önce kendi güvenliğin",h:
 "<h2>Suda boğulma</h2>"+
 cd("warn","Suya atlayan kurtarıcı da boğulabilir. <b>Önce kıyıdan yardım et:</b> Seslen; bir dal, kürek ya da havlu uzat; can simidi, boş bidon ya da ip at; mümkünse tekneyle git. Suya yalnızca yüzmeyi ve kurtarmayı biliyorsan ve yanında yüzen bir şey varsa gir.")+
 st(["Kişiyi sudan çıkarırken başını suyun üstünde tut. Sığ suya atlama ya da dalma kazasından şüpheleniyorsan baş, boyun ve gövdeyi birlikte, aynı hizada tut (omurga yaralanmış olabilir).",
 "<b>En fazla 10 saniye</b> nefesini kontrol et. Normal nefes almıyorsa 112'yi ara ve hemen <a href='#/g/kpr'>KPR</a>'ye başla; suda boğulmada nefes vermek özellikle önemlidir.",
 "<u>Karnına bastırarak ya da baş aşağı tutarak <b>su çıkarmaya çalışma</b></u>: zaman kaybettirir, kusturur. Kusarsa yan çevir, ağzını temizle, KPR'ye devam et.",
 "Nefes alıyorsa ıslak giysilerini çıkar, kurula, battaniyeye sar, <a href='#/g/bilincsiz'>derlenme pozisyonuna</a> al.",
 "Şok cihazı (OED) kullanacaksan kişinin göğsünü kurula, onu sudan ve ıslak zeminden uzaklaştır.","Kişi kendine gelse bile <b>hastaneye</b> gitmeli: akciğer sorunu saatler sonra başlayabilir."],true)+
 "<h2>Elektrik çarpması</h2>"+
 st(["<u><b>Akım kesilmeden kişiye dokunma.</b></u> Sigortayı ya da şalteri kapat, fişi çek.",
 "Akımı kesemiyorsan kuru bir zeminin (kuru tahta, lastik paspas) üstünde dur ve kişiyi kuru tahta ya da plastik bir sopayla kaynaktan uzaklaştır. <u>Bunu ıslak elle, metal ya da ıslak bir cisimle deneme.</u>",
 "<b>Yüksek gerilimde</b> (direk, trafo, kopmuş hat, demiryolu) <u><b>kişiye yaklaşma</b>, kimseyi de yaklaştırma</u>; 112'yi ara. Akımı ancak elektrik şirketi kesebilir.",
 "Tehlike geçince nefesini kontrol et; normal nefes almıyorsa <a href='#/g/kpr'>KPR</a>'ye başla ve şok cihazını (OED) kullan. Ortamda tehlike yoksa <u>kişiyi yerinden oynatma</u> (düşerken omurgası yaralanmış olabilir).",
 "Akımın girdiği ve çıktığı yerlerdeki yanıkları 10–15 dakika serin suyla soğut (<u>çok soğuk su kullanma</u>), temiz bir örtüyle ört. Kişi iyi görünse bile onu <b>hastaneye</b> götür: kalp ritmi bozulabilir."],true)+
 cd("info","Yıldırım çarpması için → <a href='#/g/yildirim'>Yıldırım</a>. Fırtına sürüyorsa önce kendini koru. Yıldırım çarpan kişiye dokunmak güvenlidir; gerekiyorsa hemen KPR'ye başla."),
 src:SB+" (boğulmalar, yanıklar); ERC 2021"});
})();
