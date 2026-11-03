/* Doğa kartları: her canlı için aynı düzen — Tanı · Nerede · Uzak dur · Olursa.
   Tek fotoğraf, dokununca büyür. Kart kapalı gelir: liste kısa, aranan hızlı bulunur. */
(function(){
var H=window.HK,cd=H.cd;
var LV={z:["ÖLDÜREBİLİR","#d0453a"],d:["DİKKAT","#e08a2e"],s:["ZARARSIZ","#7f8f4e"],y:["YENİR","#7f8f4e"],x:["ZEHİRLİ","#d0453a"],g:["İYİ HAVA","#7f8f4e"],b:["HAVA BOZACAK","#e08a2e"],f:["FIRTINA","#d0453a"]};
function thumb(spec){var p=spec.split(":"),a=(H.PH||{})[p[0]]||[],x=a[+(p[1]||0)];return x?'<img alt="" loading="lazy" src="'+H.imgSrc(x.f,false)+'">':'<span class="noimg"></span>'}
/* it: {n, s(bilimsel), lv, ph:[spec], r:[[başlık,metin],...]} */
H.spCards=function(list){return '<div class="sp-l">'+list.map(function(it){var l=LV[it.lv]||LV.d;
  return '<details class="sp"><summary>'+thumb(it.ph[0]||"")+'<div class="f"><b>'+it.n+'</b><small><span style="color:'+l[1]+'">'+l[0]+'</span>'+(it.k?' · '+it.k:'')+'</small></div><span class="chev">›</span></summary>'+
   '<div class="sp-im">'+it.ph.map(function(s){var p=s.split(":");return H.ione(p[0],+(p[1]||0))}).join("")+'</div>'+(it.s?'<p class="mut sci">'+it.s+'</p>':'')+'<dl class="spd">'+it.r.map(function(r){return '<dt>'+r[0]+'</dt><dd>'+r[1]+'</dd>'}).join("")+'</dl></details>'}).join("")+'</div>'};
var BITE="<a href='#/g/yilan'>Isırık ve sokmalar</a>";
var RAB="Yarayı <b>15 dakika sabunla ve akan suyla</b> yıka, povidon iyot sür. <u>Yarayı dikme, sıkıca kapatma.</u> <b>Hemen</b> sağlık kuruluşuna git, gecikmiş olsan bile git: kuduz ve tetanoz aşısı gerekir. Hayvanın yerini ve davranışını not et.";
var ANIMALS=[
 {n:"Boynuzlu engerek",s:"Vipera ammodytes",lv:"z",k:"burnunda boynuz",ph:["a_vammo:0"],r:[
  ["Tanı","50–90 cm, kalın gövde. <b>Burnunun ucunda küçük yumuşak boynuz</b>, sırtta koyu zikzak şerit, üçgen baş, dikey göz bebeği."],
  ["Nerede","Güneye bakan kayalık ve taşlık yamaçlar, taş duvarlar, yıkıntılar. Nisan–Ekim; sabah ve akşamüstü güneşlenir."],
  ["Uzak dur","Bot ve uzun pantolon giy. <u>Taşı, kütüğü <b>elle kaldırma</b></u>; ayağınla ya da sopayla kendinden uzağa doğru çevir. <u>Göremediğin yere elini sokma.</u> Taşlıkta sopayla yoklayarak, ayak sesi çıkararak yürü; <u>gece fenersiz yürüme.</u>"],
  ["Görürsen","Dur. Yavaşça <b>2 m geri</b> çekil, yılanın çevresinden geniş dolaş. <u>Öldürmeye ya da yakalamaya çalışma</u>: ısırıkların çoğu böyle olur."],
  ["Isırırsa","Her ısırığı zehirli kabul et. Kişiyi yatır, <u>hareket ettirme</u>. Yüzüğünü ve kol saatini çıkar, uzvu gevşek bandajla sarıp atelle sabitle, şişliğin sınırını kalemle çiz, yanına saati yaz, <b>112'yi ara</b>. <u>Isırığı kesme, ağızla emme; turnike, buz ya da soğuk uygulama.</u> → "+BITE]]},
 {n:"Osmanlı engereği",s:"Montivipera xanthina",lv:"z",k:"Türkiye'nin en tehlikelilerinden",yer:"b:MR,EG,AK,IA",ph:["a_mxanth:0"],r:[
  ["Tanı","70–100 cm, çok kalın gövde, <b>boynuz yok</b>. Gri-krem zemin üstünde koyu kenarlı kahverengi lekeler dizisi, geniş üçgen baş."],
  ["Nerede","Türkiye'nin batısı, İç ve Güney Anadolu: kayalık dağ yamaçları, çalılık, dere kenarı kayalar."],
  ["Uzak dur","Boynuzlu engerekteki kuralların aynısını uygula. Kayalık yamaçta oturmadan önce yere bak."],
  ["Isırırsa","Isırık hızla şişlik, morarma ve kanama yapabilir; zaman kritiktir. Kişiyi hareketsiz tut, uzvu atelle sabitle, şişliğin sınırını işaretle, <b>112'yi ara</b>. → "+BITE]]},
 {n:"Koca engerek",s:"Macrovipera lebetina",lv:"z",k:"en büyük engerek",yer:"b:GD,DA i:1,31,33,46,80",ph:[],r:[
  ["Tanı","1–1,5 m'ye kadar, Türkiye'nin en büyük engereği. Çok kalın gövde, iri üçgen baş, <b>boynuz yok</b>; gri-kahverengi zemin üzerinde soluk lekeler."],
  ["Nerede","Orta ve Doğu Akdeniz, Güneydoğu ve Doğu Anadolu: kayalık yamaçlar, taş duvarlar, bağ-bahçe ve dere kenarları. Gece de avlanır."],
  ["Uzak dur","<u>Taşı, odunu elle kaldırma; gece fenersiz yürüme.</u> Bağda ve bahçede çalışırken bot ve kalın pantolon giy."],
  ["Isırırsa","Isırık ağır şişlik ve kanama yapabilir; zaman kritiktir. Kişiyi hareketsiz tut, uzvu atelle sabitle, şişliğin sınırını çiz, yanına saati yaz, <b>112'yi ara</b>. <u>Isırığı kesme, ağızla emme; turnike ya da buz uygulama.</u> → "+BITE]]},
 {n:"Doğu Anadolu dağ engerekleri",s:"Montivipera raddei, M. wagneri, Vipera darevskii, V. eriwanensis",lv:"z",k:"yüksek kayalıklar",yer:"i:4,8,30,36,65,75,76",ph:[],r:[
  ["Tanı","50–90 cm, kalın gövdeli, üçgen başlı engerekler. Ağrı engereği turuncu-kahve benekli; diğerleri gri-kahverengi zikzak desenli."],
  ["Nerede","Kars, Ağrı, Iğdır, Van, Hakkâri, Ardahan ve Artvin'in yüksek, taşlık ve kayalık yamaçları; yayla ve otlaklar."],
  ["Uzak dur","Kayalık yamaçta oturmadan önce yere bak; <u>taş altına elini sokma.</u> Çoğu ancak rahatsız edilince ısırır."],
  ["Isırırsa","Her ısırığı zehirli kabul et: kişiyi hareketsiz tut, uzvu atelle sabitle, şişliğin sınırını işaretle, <b>112'yi ara</b>. → "+BITE]]},
 {n:"Karadeniz engerekleri",s:"Vipera barani, V. kaznakovi, V. pontica",lv:"z",k:"orman açıklıkları",yer:"i:8,52,53,54,61",ph:[],r:[
  ["Tanı","40–70 cm, küçük ve koyu renkli (siyaha yakın ya da turuncu-siyah) engerekler; sırtta koyu zikzak, üçgen baş."],
  ["Nerede","Doğu Karadeniz'in (Artvin, Rize, Trabzon, Ordu) ve Sakarya'nın orman açıklıkları, çayır ve yayla kenarları; nemli taşlık yerler."],
  ["Uzak dur","Yayla yolunda ve çayırda bot giy; ot biçerken ve taş kaldırırken eldiven tak."],
  ["Isırırsa","Kişiyi hareketsiz tut, uzvu atelle sabitle, şişliğin sınırını işaretle, <b>112'yi ara</b>. → "+BITE]]},
 {n:"Çöl kobrası",s:"Walterinnesia morgani",lv:"z",k:"çok nadir",yer:"i:63",ph:[],r:[
  ["Tanı","1 m'ye kadar, <b>parlak siyah</b>, ince gövdeli; kobra gibi boyun açmaz."],
  ["Nerede","Şanlıurfa çevresinin kayalık yamaçlarında kaydedilmiştir; çok nadirdir."],
  ["Isırırsa","Zehri sinir sistemini etkiler, nefes almayı zorlaştırabilir: hemen <b>112'yi ara</b>, kişiyi hareketsiz tut, nefesini izle. → "+BITE]]},
 {n:"Çukurbaşlı yılan",s:"Malpolon insignitus",lv:"d",k:"hafif zehirli",ph:["a_malpolon:0"],r:[
  ["Tanı","1,5–2 m'ye kadar uzun ve ince, gri-yeşil. <b>Büyük yuvarlak göz</b>, üstünde belirgin \"kaş\". Başını kaldırıp yüksek sesle tıslar."],
  ["Nerede","Bozkır, tarla kenarı, çalılık. Gündüz aktif, hızlı."],
  ["Uzak dur","Kaçması için yılana yol bırak. <u>Onu köşeye sıkıştırma.</u>"],
  ["Isırırsa","Zehir dişleri ağzının arkasındadır; insanda etkisi genellikle hafiftir. Yarayı yıka, şişliği izle. Yine de her yılan ısırığında olduğu gibi sağlık kuruluşuna git."]]},
 {n:"Zehirsiz yılanlar",s:"Su yılanı (Natrix), sarı yılan (Dolichophis)",lv:"s",k:"panik yapma",ph:["a_natrix:0","a_dolicho:0"],r:[
  ["Tanı","<b>Su yılanı:</b> ensede sarı-beyaz yarım ay, yuvarlak göz bebeği; su kenarı. <b>Sarı yılan:</b> 2 m'ye varan, hızlı, sarımsı kahverengi; tehdit edilince ısırabilir."],
  ["Kural","Sahada yılanı kesin tanıyamazsın: <b>her yılanı zehirli kabul et</b>, aynı mesafeyi koru."],
  ["Isırırsa","Zehirsiz yılanın ısırığı sıradan bir yaradır: yıka, ört, enfeksiyon belirtilerini izle. Türünden emin değilsen zehirli yılan ısırığı gibi davran."]]},
 {n:"Karakurt",s:"Latrodectus",lv:"z",k:"örümcek",ph:["a_karakurt:0"],r:[
  ["Tanı","Bezelye büyüklüğünde parlak siyah gövde, karnında <b>kırmızı benekler</b> veya kum saati deseni."],
  ["Nerede","Taş altı, tarla kenarı, saman ve odun yığını, dış tuvalet, harman. Haziran–Eylül."],
  ["Uzak dur","Odun, taş, saman kaldırırken <b>eldiven</b> tak. Giysini ve ayakkabını giymeden, uyku tulumuna girmeden önce silkele. Dışarıda bıraktığın giysiyi poşete koy."],
  ["Isırırsa","Isırık iğne batması gibi başlar; 30–60 dakika sonra karında ve sırtta şiddetli kramp ve terleme olur. Bölgeye soğuk uygula, kişiyi sakin tut, hastaneye götür. Isırılan çocuk ya da yaşlıysa durum acildir: <b>112'yi ara</b>."]]},
 {n:"Akrep",s:"Mesobuthus",lv:"d",k:"gece aktif",ph:["a_scorp:0"],r:[
  ["Tanı","5–8 cm, sarımsı kahverengi, kıskaçlı, kuyruğu yukarı kıvrık iğneli."],
  ["Nerede","Taş altı, duvar çatlağı, yıkıntı, odun yığını. Yaz geceleri çıkar."],
  ["Uzak dur","Ayakkabıyı giymeden önce <b>ters çevirip silkele</b>; gece botları bir çubuğa ters geçir. Çadırın fermuarını hep kapalı tut. <u>Çıplak yere yatma.</u>"],
  ["Sokarsa","Bölgeyi yıka, 15 dakika bezle sarılı soğuk uygula, gevşek bandajla sar, uzvu sabitle, <b>112'yi ara</b>. <u>Yarayı kesme, ağızla emme.</u> Sokulan kişi çocuk ya da yaşlıysa veya nefes almada ya da yutmada güçlük, kas seğirmesi, aşırı terleme başlarsa durum çok acildir."]]},
 {n:"Ölümcül akrepler",s:"Leiurus abdullahbayrami, Androctonus crassicauda, Hottentotta saulcyi",lv:"z",k:"Güneydoğu",yer:"i:1,2,21,23,27,30,31,33,44,46,47,63,72,73,79",ph:[],r:[
  ["Tanı","<b>Sarı akrep</b> (Leiurus): 8–10 cm, açık sarı, ince kıskaçlı. <b>Kara akrep</b> (Androctonus): koyu kahve-siyah, çok kalın kuyruklu. Mardin akrebi (Hottentotta) evlerin çevresinde sık görülür."],
  ["Nerede","Güneydoğu Anadolu ve çevresi (Şanlıurfa, Mardin, Gaziantep, Kilis, Hatay, Kahramanmaraş, Adıyaman, Diyarbakır, Batman, Şırnak, Hakkâri, Elazığ, Malatya, Adana, Mersin): taş altı, duvar çatlağı, kerpiç ev, avlu. Yaz geceleri eve girer."],
  ["Uzak dur","Yatağı duvardan ayır, <u>çarşafı yere sarkıtma</u>. Sabah ayakkabını ve giysini silkele. <u>Gece avluda fenersiz ve yalınayak yürüme.</u>"],
  ["Sokarsa","<b>Hemen 112'yi ara.</b> Özellikle çocuk ve yaşlıda ölümcül olabilir; akrep serumu yalnızca hastanededir. Bölgeyi yıka, bezle sarılı soğuk uygula, uzvu sabitle, kişiyi sakin ve hareketsiz tut."]]},
 {n:"Kene",s:"Hyalomma (KKKA taşır)",lv:"z",k:"Nisan–Eylül",ph:["a_hyalomma:0"],r:[
  ["Tanı","Mercimek büyüklüğünde, <b>çizgili bacaklı</b>, kanla şişince nohut kadar olur. Kırım-Kongo kanamalı ateşi (KKKA) hastalığını taşır."],
  ["Nerede","Uzun ot, çalılık, hayvan otlağı ve ağıl çevresi; kene her ilde vardır. KKKA en çok İç Anadolu'nun kuzeyi, Orta ve Doğu Karadeniz ile Doğu Anadolu'nun kuzeyinde görülür (ör. Tokat, Sivas, Çorum, Gümüşhane, Erzurum, Artvin)."],
  ["Uzak dur","Açık renkli, uzun kollu giysi giy; <b>paçayı çoraba sok</b>. <u>Ağıl ve sürü yakınında kamp yapma.</u> Günde 2 kez birbirinizi kontrol edin: kasık, koltuk altı, kulak arkası, saç dibi, diz arkası."],
  ["Tutunursa","<u>Keneye çıplak elle dokunma.</u> İnce uçlu cımbızla keneyi <b>deriye en yakın yerinden</b> (başından) tut; <u>sıkmadan ve çevirmeden</u> düz yukarı çek. <u>Keneyi ezme, yakma; üstüne benzin, aseton, kolonya ya da yağ sürme.</u> Tarihi yaz ve <b>en kısa sürede sağlık kuruluşuna</b> git (KKKA riski). <b>1–14 gün</b> içinde ateş, halsizlik, kas ağrısı ya da kanama başlarsa hemen hastaneye git ve kene tutunduğunu söyle."]]},
 {n:"Arı ve eşek arısı",s:"Apis, Vespa",lv:"d",k:"alerjide öldürür",ph:["a_wasp:0"],r:[
  ["Nerede","Çöp, et ve tatlı yiyecek çevresi, çatı altı, toprakta delik, içi boş kütük."],
  ["Uzak dur","Yiyeceği ve tatlı içeceği kapalı tut; <u>bardağın içine bakmadan içme.</u> Yuva görünce yavaşça uzaklaş; <u>el sallama, arılara vurma.</u>"],
  ["Saldırırsa","Koşarak uzaklaş, başını ve yüzünü ört, kapalı bir yere gir. <u>Suya atlama</u>: arılar suyun üstünde bekler."],
  ["Sokarsa","İğneyi kredi kartı gibi düz bir kenarla <b>yana sıyırarak</b> çıkar (<u>cımbızla sıkıp çekme</u>), soğuk uygula. <b>Boğazda şişme, nefes darlığı ya da yaygın kaşıntı başlarsa veya kişi bayılırsa bu anafilaksidir (ağır alerji krizi):</b> <b>112'yi ara</b>; kişinin adrenalin kalemi varsa hemen uyluğuna uygula. → "+BITE]]},
 {n:"Başıboş köpek ve çoban köpeği",s:"en gerçekçi tehdit",lv:"z",k:"kuduz riski",ph:["a_dog:0"],r:[
  ["Nerede","Kent kenarı, çöplük, inşaat alanı, köy girişi, ağıl ve sürü yanı (Kangal sürüyü korur)."],
  ["Uzak dur","Köy girişlerinin ve ağılların çevresinden geniş dolaş. Sürü görürsen <b>çobana seslen</b>, onun yanından geç. Elinde baston ya da sopa olsun."],
  ["Yaklaşırsa","<b>DUR, <u>koşma</u>.</b> <u>Köpeğin tam karşısında durma, gözlerine dik dik bakma</u>; ona yan dur. Çantanı ya da sopanı köpekle arana koy, yavaşça geri çekil. Eğilip taş alıyormuş gibi yap. Grupsanız sırt sırta toplanın."],
  ["Saldırırsa","Ön kolunu montla sar ve ısırması için köpeğe onu uzat. Düşersen top gibi kıvrıl, ellerinle enseni koru."],
  ["Isırırsa",RAB]]},
 {n:"Kurt",s:"Canis lupus",lv:"d",k:"orman, bozkır, dağ",ph:["a_wolf:0"],r:[
  ["Nerede","Türkiye'nin hemen her ilinde orman, bozkır ve dağlık arazide yaşar. Kışın ve gece köy kenarına iner.⟦06: Ankara'da Kızılcahamam, Çamlıdere ve Işık Dağı çevresinde görülür.⟧"],
  ["Uzak dur","Yiyeceği ve çöpü kampın dışında, yükseğe as. Gece ateş yak, grup hâlinde dur; <u>çocuğu ve köpeği yalnız bırakma.</u>"],
  ["Karşılaşırsan","<u><b>Koşma.</b></u> Kendini büyük göster, yüksek sesle bağır, taş ve sopa at; yüzün kurda dönük kalacak şekilde geri çekil."],
  ["Isırırsa",RAB]]},
 {n:"Boz ayı",s:"Ursus arctos",lv:"z",k:"dağ ormanları",yer:"b:KD,DA,AK i:6,11,16,18",ph:["a_bear:0"],r:[
  ["Nerede","Karadeniz, Doğu Anadolu ve Toros dağlarının ormanları; meyveli çalılık, dere kenarı, yayla. Nisan–Kasım.⟦06: Ankara'da Kızılcahamam, Çamlıdere ve Işık Dağı ormanlarında yaşar.⟧"],
  ["Uzak dur","Yiyecek, çöp ve kokulu eşyayı kampın <b>100 m</b> uzağında, yerden <b>3 m</b> yükseğe as. Ormanda ses çıkararak yürü (ayıyla birden burun buruna gelmek en tehlikelisidir). Yavru görürsen hemen geri dön: anne yakındadır."],
  ["Karşılaşırsan","<u><b>Koşma, ağaca tırmanma.</b></u> Grupça bir araya gelin. Sakin ve alçak sesle konuş, <u>gözüne dik bakma</u>, yavaşça yan yan geri çekil."],
  ["Saldırırsa","Yüzüstü yat, ellerini ensende kenetle, sırt çantası sırtında kalsın, hiç kıpırdamadan dur. Ayı uzaklaşınca birkaç dakika bekle, sonra kalk."]]},
 {n:"Yaban domuzu",s:"Sus scrofa",lv:"d",k:"yavrulu dişi",ph:["a_boar:0"],r:[
  ["Nerede","Orman kenarı tarlalar, sazlık, dere yatağı. Akşam ve gece."],
  ["Uzak dur","Çizgili yavrular görürsen hemen geri çekil. Akşam tarla kenarında dikkatli ol."],
  ["Saldırırsa","Bir ağacın, kayanın ya da aracın arkasına geç veya yüksek bir yere çık. Domuz düz bir çizgide koşar: <b>yana</b> kaç."]]},
 {n:"Tilki ve çakal",s:"Vulpes, Canis aureus",lv:"d",k:"kuduz taşır",ph:["a_fox:0","a_jackal:0"],r:[
  ["Kural","Normalde ürkektirler ve kaçarlar. <b>Gündüz yaklaşan, sendeleyen ya da korkusuz</b> davranan bir hayvan kuduz olabilir. Uzaklaş; <u>hayvanı besleme, ona dokunma.</u>"],
  ["Isırırsa",RAB]]},
 {n:"Tavşan ve kemirgenler",s:"tularemi (tavşan hastalığı)",lv:"d",k:"ölü hayvana dokunma",ph:["a_hare:0"],r:[
  ["Kural","<b>Tularemi</b>, tavşan ve fare gibi kemirgenlerden ve onların kirlettiği sudan bulaşan bakteriyel bir hastalıktır; Türkiye'de birçok ilde, özellikle kırsalda, kirli içme suyundan salgınlar olur. <u>Ölü ya da hasta hayvana çıplak elle dokunma.</u> Köy pınarının suyunu da arıt."],
  ["Avlarsan","Eldivenle temizle, iyice pişir. Sonraki 2 hafta içinde ateş, boyunda ya da koltuk altında şişlik olursa hastaneye git ve tavşana dokunduğunu söyle."]]}
];
var EDIBLE=[
 {n:"Ebegümeci",s:"Malva",lv:"y",k:"Nisan–Ekim",ph:["p_malva:0"],r:[["Tanı","Uzun saplı, yuvarlak, kenarı dalgalı-dişli, 5–7 loblu yaprak; pembe-mor 5 taç yapraklı çiçek; düğme gibi yuvarlak meyve."],["Nasıl","Yaprağını ve genç sapını haşla, kavur ya da çorbaya kat."],["Benzerleri","Belirgin bir benzeri yoktur: başlangıç için en güvenli bitkidir."]]},
 {n:"Isırgan",s:"Urtica",lv:"y",k:"Mart–Haziran",ph:["p_urtica:0"],r:[["Tanı","Karşılıklı dizilen, testere dişli, tüylü yaprak. Dokununca yakar: onu bu yanmadan tanırsın."],["Nasıl","Genç uçları eldivenle topla, 5 dakika haşla; yakıcılığı gider. Demir ve C vitamini içerir."],["Benzerleri","Ballıbaba ona benzer ama yakmaz; o da zararsızdır."]]},
 {n:"Madımak",s:"Polygonum cognatum",lv:"y",k:"Nisan–Haziran",ph:["p_madimak:0"],r:[["Tanı","Yere yayılan, boğumlu ince saplı, küçük oval yapraklı; minik pembe-beyaz çiçekler."],["Nasıl","Pişirerek ye (bulgurla ya da yumurtayla)."]]},
 {n:"Yemlik, karahindiba, hindiba",s:"Tragopogon, Taraxacum, Cichorium",lv:"y",k:"Mart–Mayıs",ph:["p_taraxacum:0","p_cichorium:0"],r:[["Tanı","Yerde rozet yapan (yere yayılmış halka gibi dizilen) dişli yapraklar. Karahindiba: içi boş sapta tek sarı çiçek. Hindiba: mavi çiçek."],["Nasıl","Genç yapraklarını çiğ ya da haşlayarak ye; haşlayınca acılığı gider."],["Dikkat","Bunlar beyaz sütlü özsu verir: \"sütlü bitkiyi yeme\" kuralının istisnasıdır. Yalnızca kesin tanıdığını ye."]]},
 {n:"Kuzukulağı",s:"Rumex",lv:"y",k:"Nisan–Haziran",ph:["p_rumex:0"],r:[["Tanı","Ok biçimli, ekşi tadı olan yaprak; kırmızımsı çiçek salkımı."],["Nasıl","Az miktarda, çiğ ya da pişmiş ye. Oksalat içerir: <u>çok miktarda ve her gün yeme.</u>"]]},
 {n:"Çoban çantası",s:"Capsella",lv:"y",k:"Mart–Haziran",ph:["p_capsella:0"],r:[["Tanı","<b>Kalp ya da üçgen biçimli</b> küçük tohum keseleri, yerde dişli rozet yapraklar."],["Nasıl","Genç rozet yapraklarını pişir."]]},
 {n:"Su teresi",s:"Nasturtium",lv:"y",k:"Nisan–Haziran",ph:["p_nasturtium:0"],r:[["Tanı","Akan temiz suda, parlak koyu yeşil, yuvarlak yaprakçıklı; acımsı tat; küçük beyaz çiçek."],["Nasıl","Yalnızca temiz kaynak suyunda yetişenini topla; yine de iyice yıka ya da pişir (hayvan otlatılan yerde karaciğer kurdu bulaşabilir)."],["Benzerleri","Su kenarında <b>şemsiye çiçekli</b> zehirli bitkiler de büyür: <u>şemsiye biçimli çiçeği olan bitkiyi toplama.</u>"]]},
 {n:"Kuşburnu",s:"Rosa canina",lv:"y",k:"Eylül–Şubat",ph:["p_rosa:0"],r:[["Tanı","Dikenli çalı; kışa kadar dalda kalan kırmızı oval meyve."],["Nasıl","Çay yap: meyveyi ez, kaynat, <b>süz</b> (içindeki tüyler boğazı tahriş eder). C vitamini çok yüksektir."]]},
 {n:"Alıç",s:"Crataegus",lv:"y",k:"Eylül–Kasım",ph:["p_crataegus:0"],r:[["Tanı","Dikenli ağaççık, derin dilimli yaprak, küçük kırmızı-turuncu meyve kümeleri."],["Nasıl","Meyvesini çiğ ye; <u>çekirdeğini yutma.</u>"]]},
 {n:"Ahlat (yabani armut)",s:"Pyrus elaeagnifolia",lv:"y",k:"Eylül–Kasım",ph:["p_ahlat:0"],r:[["Tanı","Dikenli dallı, dar gümüşi tüylü yapraklı ağaç; küçük sert armut."],["Nasıl","Toplayıp birkaç gün beklet: yumuşayıp tatlanır."]]},
 {n:"Böğürtlen",s:"Rubus",lv:"y",k:"Ağustos–Eylül",ph:["p_rubus:0"],r:[["Tanı","Dikenli sarmaşık çalı; olgunken siyah, küçük boncuklu toplu meyve."],["Nasıl","Çiğ ye."]]},
 {n:"Kızılcık",s:"Cornus mas",lv:"y",k:"Ağustos–Eylül",ph:["p_cornus:0"],r:[["Tanı","Kuzey ormanlarında ağaççık; parlak kırmızı, uzunca, tek çekirdekli meyve."],["Nasıl","Çiğ (ekşidir) ya da kaynatarak ye."]]},
 {n:"Meşe palamudu",s:"Quercus",lv:"y",k:"Ekim–Kasım",ph:["p_quercus:0"],r:[["Tanı","Şapkalı kahverengi palamut."],["Nasıl","Kabuğunu soy, parçala, <b>suyu kahverengi gelmeyene kadar</b> defalarca kaynar suda haşla (acı tanen gider), sonra kavur. <u>Palamudu çiğ yeme</u>: mideyi ve böbreği bozar."]]},
 {n:"Hasır otu (kofa)",s:"Typha",lv:"y",k:"tüm yıl",ph:["p_typha:0"],r:[["Tanı","Göl ve bataklık kenarında, kılıç yapraklı, ucunda kahverengi sosis gibi başak."],["Nasıl","Genç sürgünün beyaz içini çiğ ye; kök sapını ez, çıkan nişastayı pişir. Kuru tüyü mükemmel bir kavdır. Yalnızca temiz sudan topla."]]},
 {n:"Ihlamur, kekik",s:"Tilia, Thymus",lv:"y",k:"Haziran–Ağustos",ph:["p_tilia:0","p_thymus:0"],r:[["Nasıl","Çiçeğini ya da yapraklı uçlarını demle. Isı ve moral verir ama kalori vermez."]]},
 {n:"Çam iğnesi çayı",s:"Pinus nigra, P. sylvestris",lv:"y",k:"tüm yıl",ph:[],r:[["Tanı","Karaçam ve sarıçam iğneleri <b>ikişerli demet</b> hâlindedir."],["Nasıl","Genç iğneleri doğra, sıcak suda (kaynatmadan) demle; C vitamini içerir."],["Benzerleri","<b>Porsuk ağacı (Taxus) ölümcüldür:</b> yassı, tek tek dizilmiş koyu iğneleri ve kırmızı etli meyvesi vardır. Kuzey ormanlarında bulunur. <u>Demet hâlinde olmayan iğneden çay yapma.</u>"]]}
];
var POISON=[
 {n:"Baldıran",s:"Conium maculatum",lv:"x",k:"maydanoza benzer",ph:["x_conium:0","x_conium:1"],r:[["Tanı","1–2 m, beyaz şemsiye çiçek, maydanoz gibi yaprak. Gövde <b>içi boş, kırmızı-mor benekli</b>; ezince fare/idrar kokusu."],["Nerede","Dere kenarı, yol ve tarla kenarı, köy içi."],["Benzediği","Maydanoz, havuç, rezene, kişniş. Türkiye'de her yıl ölümlere yol açar."],["Yerse","Ağızda yanma, kas güçsüzlüğü ve nefes durması olur. Hemen 112'yi ya da 114'ü (Ulusal Zehir Danışma Merkezi, UZEM) ara; nefes durursa KPR'ye (kalp masajı) başla."]]},
 {n:"Acıçiğdem",s:"Colchicum",lv:"x",k:"yabani soğana benzer",ph:["x_colchicum:1","x_colchicum:0"],r:[["Tanı","İlkbaharda geniş parlak yapraklar; sonbaharda yapraksız pembe-mor çiğdem çiçeği."],["Benzediği","Yabani soğan, sarımsak, pırasa. <u><b>Ezince soğan gibi kokmuyorsa yeme.</b></u>"],["Yerse","Saatler sonra kusma, ishal ve organ hasarı başlar: belirti olmasa da 114'ü ara."]]},
 {n:"Tatula ve banotu",s:"Datura, Hyoscyamus",lv:"x",k:"halüsinasyon, ölüm",ph:["x_datura:0","x_hyoscy:0"],r:[["Tanı","Tatula: büyük beyaz-mor boru çiçek, dikenli ceviz büyüklüğünde meyve. Banotu: mor damarlı soluk sarı çiçek, yapışkan tüylü kötü kokulu yaprak."],["Nerede","Çöp kenarı, ahır çevresi, bozulmuş arazi."],["Yerse","Ağız kuruluğu, göz bebeklerinde büyüme, ateş ve sayıklama olur. <b>112'yi ara.</b>"]]},
 {n:"Ak çöpleme",s:"Veratrum album",lv:"x",k:"yayla çayırı",ph:["x_veratrum:0"],r:[["Tanı","Yüksek çayırlarda, belirgin paralel damarlı geniş katlanmış yapraklar."],["Benzediği","Genç hâli yenilebilir bitkilere benzer."],["Yerse","Kusma, nabız yavaşlaması ve tansiyon düşmesi olur. <b>112'yi ara.</b>"]]},
 {n:"Üzerlik",s:"Peganum harmala",lv:"x",k:"bozkırda yaygın",ph:["x_peganum:0"],r:[["Tanı","Bozkırda kümeler hâlinde, ince parçalı yapraklı, beyaz çiçekli, küçük yuvarlak kapsüllü çalımsı bitki."],["Kural","Yalnızca tütsü olarak kullanılır; <u>hiçbir şekilde ağızdan alma.</u>"]]},
 {n:"Sütleğen",s:"Euphorbia",lv:"x",k:"özsuyu yakar",ph:["x_euphorbia:0"],r:[["Tanı","Sarı-yeşil çiçek kümeleri; kırınca <b>beyaz süt</b> akar."],["Temas","Özsuyu deriyi yakar, gözü kör edebilir. Yalnızca eldivenle dokun. Deriye değerse 20 dakika akan suyla yıka; göze kaçtıysa gözü 20 dakika yıka ve hastaneye git."]]},
 {n:"Bodur mürver",s:"Sambucus ebulus",lv:"x",k:"siyah meyve",ph:["x_sambucus:0"],r:[["Tanı","1–2 m otsu bitki, yukarı bakan siyah meyve kümeleri, kötü kokulu yapraklar."],["Kural","<u>Tanımadığın siyah meyve kümelerini yeme.</u>"]]},
 {n:"Yılan yastığı",s:"Arum",lv:"x",k:"kırmızı meyve",ph:["x_arum:0"],r:[["Tanı","Ok biçimli parlak yaprak; yazın sapın ucunda <b>kırmızı meyve salkımı</b>."],["Yerse","Ağızda şiddetli yanma ve şişme olur: ağzını çalkala, soğuk su yudumla, <b>114'ü ara</b>."]]},
 {n:"Yabani mantarlar",s:"Amanita (köygöçüren)",lv:"x",k:"hepsini yasak say",ph:["x_amanita:0"],r:[["Kural","Krizde <u><b>hiçbir yabani mantarı yeme.</b></u> Ölümcül türler yenebilenlere benzer; pişirmek zehri yok etmez. Belirtiler 6–24 saat sonra başlar; o zaman karaciğer zarar görmüştür."],["Yerse","<u>Belirtilerin başlamasını bekleme</u>: hemen 114'ü ya da 112'yi ara. Kalan mantarı sakla."]]}
];
var CLOUDS=[
 {n:"Küçük pamuk bulutlar",s:"kümülüs",lv:"g",k:"devam et",ph:["c_cumulus:0"],r:[["Anlamı","Düz tabanlı, şeklini koruyan küçük bulutlar güzel havanın işaretidir."],["Yap","Planına aynen devam et. Bulutlar öğleden sonra büyüyüp kule gibi yükselirse aşağıdaki fırtına kartına bak."]]},
 {n:"Saçak bulut, kalınlaşan",s:"sirrüs → sirrostratüs",lv:"b",k:"12–24 saat",ph:["c_cirrus:0"],r:[["Anlamı","Yüksekteki ince, tüy gibi bulutlar gökyüzünü giderek kaplıyorsa bir hava cephesi geliyor demektir."],["Yap","Bugün barınağı sağlamlaştır, fazladan odun ve su topla, eşyanı ıslanmayacak bir yere koy."]]},
 {n:"Güneş veya Ay halesi",s:"sirrostratüs",lv:"b",k:"12–24 saat",ph:["c_cirrostratus:0"],r:[["Anlamı","Güneşin ya da Ay'ın çevresindeki halka, yüksekte ince bir bulut tabakası olduğunu gösterir: yağış yaklaşıyor."],["Yap","Saçak bulut kartındaki gibi hazırlan."]]},
 {n:"Sabah kuleleşen orta bulutlar",s:"altokümülüs kastellanus",lv:"b",k:"öğleden sonra fırtına",ph:["c_altocumulus:0"],r:[["Anlamı","Sabah küçük kale burçları gibi kabaran bulutlar havanın kararsız olduğunu gösterir; öğleden sonra gök gürültülü sağanak olabilir."],["Yap","Tepe ve sırt yürüyüşünü <b>öğleden önce</b> bitir; öğleden sonra alçakta, dere yatağının dışında ol."]]},
 {n:"Örs başlı dev bulut",s:"kümülonimbüs",lv:"f",k:"30 dakika",ph:["c_cumulonimbus:0"],r:[["Anlamı","Tepesi örs gibi yayılan, altı koyu dev bulut yıldırım, dolu, ani sel ve kuvvetli rüzgâr getirir."],["Yap","Hemen tepeden ve açık alandan in, kuru dere yatağından çık, tek başına duran ağaçtan uzaklaş. Şimşekle gök gürültüsü arasında 30 saniyeden az varsa <a href='#/g/yildirim'>Yıldırım</a> sayfasındakileri uygula."]]},
 {n:"Kalın gri yağmur bulutu",s:"nimbostratüs",lv:"b",k:"saatlerce yağış",ph:["c_nimbostratus:0"],r:[["Yap","Saatlerce yağmur ya da kar yağacak. Yola çıkacaksan kuru takımını su geçirmez torbada sakla; mümkünse barınakta kal."]]},
 {n:"Alçak gri tabaka, sis",s:"stratüs / sis",lv:"b",k:"görüş düşük",ph:["c_stratus:0","c_fog:0"],r:[["Anlamı","Çisenti, kışın kar ve düşük görüş getirir. Vadideki sis, soğuk havanın vadide toplandığını gösterir."],["Yap","Önünü göremiyorsan <b>dur</b>; pusulayla ve adım sayarak ilerle ya da bekle. <u>Kampı vadi tabanına kurma.</u>"]]},
 {n:"Mercek bulut",s:"lentikülaris",lv:"b",k:"kuvvetli rüzgâr",ph:["c_lenticular:0"],r:[["Yap","Dağın üstünde mercek gibi duran bulut, yüksekte kuvvetli rüzgâr olduğunu gösterir. <u>Sırtta kamp kurma</u>; brandayı alçak ve sağlam ger."]]},
 {n:"Sabah kızıllığı",s:"",lv:"b",k:"nem yüksek",ph:["c_redsky:0"],r:[["Kural","Sabah gökyüzü kızılsa hava bozabilir. Akşam kızıllığı genellikle açık havanın işaretidir."]]}
];

var SEA=[
 {n:"Denizanası",s:"Rhopilema, Pelagia ve diğerleri",lv:"d",k:"yakıcı",g:"d",yer:"k",ph:[],r:[
  ["Tanı","Şeffaf, şemsiye biçimli gövde ve uzun dokunaçlar. Akdeniz'deki göçmen denizanası iri ve çok yakıcıdır."],
  ["Nerede","Yazın kıyıya yakın sularda, özellikle sıcak ve sakin günlerde. Kumda ölü olanlar da yakar."],
  ["Uzak dur","<u>Denizanası görülen yerde denize girme; kıyıya vurmuş olana çıplak elle dokunma.</u>"],
  ["Yakarsa","Bölgeyi <b>deniz suyuyla</b> durula (tatlı su yanmayı artırabilir). Kalan dokunaçları eldivenle ya da sert bir kartla sıyır; <u>bölgeyi ovma, üstüne kum sürme.</u> Nefes darlığı ya da vücuda yayılan döküntü başlarsa veya kişi bayılırsa <b>112'yi ara</b>."]]},
 {n:"Trakonya ve iskorpit",s:"Trachinus, Scorpaena",lv:"d",k:"zehirli diken",g:"d",yer:"k",ph:[],r:[
  ["Tanı","Trakonya kuma gömülü yatan küçük bir balıktır, sırt yüzgecinde zehirli dikenler vardır. İskorpit kayalık dipte, kayaya benzer."],
  ["Nerede","Kumlu ve kayalık sığ kıyılarda; trakonyaya genellikle basılır."],
  ["Uzak dur","Sığ kumda ve kayalıkta deniz ayakkabısıyla yürü; <u>balığı çıplak elle tutma.</u>"],
  ["Batarsa","Şiddetli ağrı olur. Diken kaldıysa çıkar, yarayı yıka. Bölgeyi <b>yakmayacak kadar sıcak</b> suda tut (sıcaklığı sağlam elinle kontrol et); zehir ısıyla azalır. Şişlik yayılırsa, nefes darlığı başlarsa ya da kişi bayılırsa <b>112'yi ara</b>."]]},
 {n:"Deniz kestanesi",s:"Paracentrotus, Arbacia",lv:"d",k:"diken batması",g:"d",yer:"k",ph:[],r:[
  ["Tanı","Kayalara yapışık, siyah veya mor, top biçimli dikenli canlı."],
  ["Nerede","Kayalık ve sığ kıyılarda."],
  ["Batarsa","Görünen dikenleri cımbızla çıkar, yarayı sabun ve suyla yıka. Kızarıklık, şişlik, ateş olursa ya da diken eklem yakınında kaldıysa sağlık kuruluşuna git."]]},
 {n:"Balon balığı",s:"Lagocephalus sceleratus",lv:"x",k:"asla yeme",g:"d",yer:"k:ae",ph:[],r:[
  ["Tanı","Gümüş renkli, sırtı koyu benekli; tehlike anında şişer. Güçlü dişleriyle olta ve ağı keser."],
  ["Nerede","Akdeniz ve Ege kıyılarında yayılan istilacı bir tür."],
  ["Kural","Eti ve organları ölümcül zehir taşır; <b>pişirmek zehri yok etmez</b>. <u>Bu balığı avlama, satın alma, yeme</u>; avlanması ve satışı yasaktır."],
  ["Yendiyse","Ağızda ve dilde uyuşma, kusma ya da kas güçsüzlüğü başlarsa hemen <b>112'yi ara</b>. Ulusal Zehir Danışma Merkezi'nin (UZEM) numarası <b>114</b>."]]}
];
function set(id,h){var g=H.guide.filter(function(x){return x.id===id})[0];if(g)g.h=h}
(function(){
 /* İlinde bulunanlar önce; diğerleri katlanır listede. Memeliler "Başıboş köpek" kartından başlar. */
 var mi=-1;ANIMALS.forEach(function(a,k){if(mi<0&&/köpek/.test(a.n))mi=k});
 ANIMALS.forEach(function(a,k){if(!a.g)a.g=k<mi?"s":"m"});
 var ALL=ANIMALS.concat(SEA),il=H.il&&H.il(),GR=[["s","Sürüngen ve böcekler"],["m","Memeliler"],["d","Deniz"]];
 var bu=ALL.filter(function(a){return H.ilVar(a.yer)}),diger=ALL.filter(function(a){return !H.ilVar(a.yer)});
 function grup(list){return GR.map(function(g){var l=list.filter(function(a){return a.g===g[0]});return l.length?"<h2>"+g[1]+"</h2>"+H.spCards(l):""}).join("")}
 var h=cd("warn","<b>3 kural:</b> <u>Elini göremediğin yere sokma.</u> <u>Hiçbir hayvana yaklaşma; hayvanı besleme, köşeye sıkıştırma.</u> Isırık ve sokmada ilk yardım için: "+BITE+".")+"<p class='mut' style='font-size:.85em'>Karta dokun: nasıl tanınır, nerede yaşar, ondan nasıl uzak durulur, ısırır ya da sokarsa ne yapılır.</p>";
 if(il)h+="<p><b>"+il.ad+"</b> ve çevresinde bulunabilecekler önce gösterilir.</p>"+grup(bu)+(diger.length?"<details class='draw'><summary>Türkiye'nin diğer bölgelerinde ("+diger.length+")</summary>"+grup(diger)+"</details>":"");
 else h+=cd("info","İlini seçersen önce ilinde bulunanlar gösterilir: <a href='#/il'>İl seç</a>.")+grup(ALL);
 h+="<p class='mut' style='font-size:.85em'>Yayılış bilgisi bölge düzeyindedir; bir türün ilinde kaydı olmaması orada hiç olmadığı anlamına gelmez.</p>";
 set("hayvan",h)})();
set("bitkiyen",cd("warn","<b>Kural:</b> Yalnızca %100 tanıdığın bitkiyi ye; önce eğitimli biriyle sahada gör. <u>Yol kenarından, ilaçlanmış tarladan ve hayvan otlağından toplama.</u> Yeni bir bitkiyi önce az ye ve 8 saat bekle. <u>Şemsiye çiçekli bitkileri ve mantarları hiç yeme.</u>")+H.spCards(EDIBLE));
set("bitkizehir",cd("warn","<b>Krizde şunları <u>hiç yeme</u>:</b> beyaz şemsiye (tabak) biçimli çiçeği olan bitkiler, beyaz sütlü özsu veren bitkiler (bilinen istisnalar dışında), acı ya da badem kokulu yapraklar, tanımadığın kırmızı ya da siyah meyveler, tüm mantarlar.")+H.spCards(POISON)+cd("info","Biri zehirli bitki yuttuysa <u>kişiyi kusturma</u>. Ağzını çalkala, bitkiden bir parça sakla ve Ulusal Zehir Danışma Merkezi'ni (UZEM) <b>114</b>'ten ara."));
set("hava",cd("info","Buluta bak, <b>ne yapacağını</b> kartta bul. Bulutlar 1 saat içinde değişiyorsa hava da değişiyor demektir.")+H.spCards(CLOUDS)+"<h2>Diğer işaretler</h2><ul><li>Kuru ve sabit esen rüzgâr yön değiştirir ya da birden durursa yağış yaklaşıyor demektir.</li><li>Çam kozalakları kapanıyorsa, inekler yatıyorsa, kuşlar alçaktan uçuyorsa nem artıyor demektir.</li><li>Hava her 300 m yükseklikte ~2 °C soğur: yüksekteki yaylalar ve dağ köyleri kentten soğuktur⟦06: (Ankara'da Çamlıdere ilçesi gibi)⟧.</li><li>Açık, rüzgârsız gecede soğuk hava vadiye akar: vadi tabanı gecenin en soğuk yeridir.</li></ul>");
H.ANIMALS=ANIMALS;
})();
