/* Çizimler: saf SVG, renkler CSS değişkeninden (gece modunda otomatik kırmızı) */
window.HK = window.HK || {};
(function(){
var S='stroke="var(--tx)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"';
var A='stroke="var(--ac)" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"';
var R='stroke="var(--red)" stroke-width="2.4" fill="none" stroke-linecap="round"';
var T=function(x,y,t,o){return '<text x="'+x+'" y="'+y+'" font-size="'+((o&&o.s)||11)+'" fill="'+((o&&o.c)||"var(--mut)")+'" text-anchor="'+((o&&o.a)||"middle")+'">'+t+'</text>'};
function fig(svg,cap,vb){return '<figure class="fig"><svg viewBox="'+(vb||"0 0 320 200")+'">'+svg+'</svg>'+(cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>'}
var F={};

F.rule3 = fig(
 [["3 dk","hava / ağır kanama","var(--red)"],["3 saat","ısı (soğuk/sıcak)","var(--ac)"],["3 gün","su","var(--blue)"],["3 hafta","yiyecek","var(--ac2)"]].map(function(r,i){var y=22+i*44;return '<rect x="10" y="'+y+'" width="'+(70+i*60)+'" height="30" rx="4" fill="'+r[2]+'" opacity=".85"/>'+T(18,y+20,r[0],{a:"start",c:"#000",s:13})+T(90+i*60,y+20,r[1],{a:"start",c:"var(--tx)",s:12})}).join(""),
 "3'ler kuralı öncelik sırasını gösterir. Yiyecek en son gelir; ısı kaybı, susuzluktan önce öldürür.");

F.stop = fig(
 [["S","Stop","DUR"],["T","Think","DÜŞÜN"],["O","Observe","GÖZLE"],["P","Plan","PLANLA"]].map(function(w,i){var x=12+i*76;return '<rect x="'+x+'" y="42" width="66" height="66" rx="33" fill="none" stroke="var(--ac)" stroke-width="2.4"/>'+T(x+33,85,w[0],{c:"var(--ac)",s:30})+T(x+33,126,w[1],{s:10})+T(x+33,148,w[2],{s:14,c:"var(--tx)"})+(i<3?'<path d="M'+(x+68)+' 75h6" '+S+'/>':'')}).join("")+T(160,24,"İlk 15 dakikada en büyük tehlike paniktir. Otur, su iç, nefes al.",{s:10.5,c:"var(--tx)"})+T(160,176,"Ne var? Ne eksik? En büyük tehlike ne? Hava kaç saat sonra kararıyor?",{s:9.5}),
 "STOP: kaybolduğunda ya da kriz başladığında ilk iş olarak bunu yap. Harfler, küçük yazılmış İngilizce sözcüklerin baş harfleridir; altlarındaki büyük yazı Türkçeleridir.");

F.recovery = fig(
 '<path d="M40 140h240" stroke="var(--line)" stroke-width="2"/>'+
 '<circle cx="78" cy="112" r="14" '+S+'/><path d="M92 118c30 6 70 6 100 0" '+S+' stroke-width="14" stroke="var(--s2)"/><path d="M92 118c30 6 70 6 100 0" '+S+'/>'+
 '<path d="M190 118l40 6 30 14" '+S+'/><path d="M190 120l20 18h20" '+A+'/>'+
 '<path d="M110 118l-10 20h-26" '+S+'/><path d="M80 100c-6-8-2-16 6-16" '+A+'/>'+
 T(78,80,"baş geride, ağız aşağı",{s:10,c:"var(--ac)"})+T(225,160,"üstteki diz 90° bükük",{s:10,c:"var(--ac)"})+T(160,30,"Nefes alıyor ama bilinçsiz → yan yatır",{s:12,c:"var(--tx)"}),
 "Derlenme (koma) pozisyonu: hava yolu açık kalır, kusmuk akar. Her dakika nefesi kontrol et.");

F.cpr = fig(
 '<path d="M30 150h260" stroke="var(--line)" stroke-width="2"/><circle cx="60" cy="130" r="16" '+S+'/><path d="M76 132h180" stroke="var(--s2)" stroke-width="22"/><path d="M76 122h180M76 142h180" '+S+'/>'+
 '<path d="M140 120V40M150 120V40" '+A+'/><rect x="128" y="112" width="34" height="10" rx="3" fill="var(--ac)"/>'+
 '<path d="M110 60l20 0M190 60h-20" '+R+'/><path d="M145 20v14" '+R+'/><path d="M139 30l6 6 6-6" '+R+'/>'+
 T(225,70,"kollar düz, omuzlar",{s:10,c:"var(--tx)"})+T(225,84,"göğsün tam üstünde",{s:10,c:"var(--tx)"})+T(145,170,"göğüs kemiğinin alt yarısı · 5–6 cm · dakikada 100–120",{s:10.5,c:"var(--ac)"})+T(160,190,"30 bası : 2 nefes (nefes veremiyorsan sadece bası)",{s:10}),
 "Kalp masajı: Bilinç yok + normal nefes yok = hemen başla, 112'yi aratarak.");

F.tq = fig(
 '<path d="M60 40c-10 30-10 110 0 150M110 40c10 30 10 110 0 150" '+S+'/>'+
 '<rect x="52" y="70" width="66" height="14" rx="3" fill="var(--red)" opacity=".9"/><path d="M118 77h30l10-10" '+R+'/><path d="M150 60v34" stroke="var(--ac)" stroke-width="5"/>'+
 '<circle cx="85" cy="150" r="7" fill="var(--red)"/>'+T(92,154,"yara",{a:"start",s:10,c:"var(--red)"})+
 T(170,60,"Yaranın 5–7 cm ÜSTÜ",{a:"start",s:11,c:"var(--tx)"})+T(170,76,"(eklemin üstüne değil)",{a:"start",s:10})+T(170,100,"Kanama durana kadar çevir",{a:"start",s:11,c:"var(--tx)"})+T(170,116,"SAATİ alnına/turnikeye yaz",{a:"start",s:11,c:"var(--ac)"})+T(170,140,"Asla gevşetme — hastanede",{a:"start",s:10})+T(170,154,"açılır.",{a:"start",s:10}),
 "Turnike sadece kol/bacakta, doğrudan baskıyla durmayan hayati kanamada. Doğaçlama: 4 cm geniş bez + çubuk.");

F.heimlich = fig(
 '<circle cx="120" cy="40" r="14" '+S+'/><path d="M120 54v70M120 70l-24 30M120 124l-14 50M120 124l12 50" '+S+'/>'+
 '<circle cx="168" cy="44" r="13" '+S+' stroke="var(--mut)"/><path d="M164 58c-6 30-6 60 0 116M164 80c-20 4-34 14-40 22" stroke="var(--mut)" stroke-width="2" fill="none"/>'+
 '<circle cx="126" cy="100" r="7" fill="var(--ac)"/><path d="M126 100l-14-10" '+A+'/>'+
 T(220,60,"1) 5 kez sırtına",{a:"start",s:11,c:"var(--tx)"})+T(220,74,"kürek kemikleri arası",{a:"start",s:10})+T(220,100,"2) 5 kez karına",{a:"start",s:11,c:"var(--tx)"})+T(220,114,"göbek üstü, içe-yukarı",{a:"start",s:10})+T(220,140,"Tekrar et. Bilinç",{a:"start",s:11,c:"var(--ac)"})+T(220,154,"giderse → KPR",{a:"start",s:11,c:"var(--ac)"}),
 "Boğulma: Öksürebiliyorsa öksürt. Konuşamıyor/nefes alamıyorsa 5 sırt + 5 karın.");

F.lean = fig(
 '<path d="M10 170h300" stroke="var(--line)" stroke-width="2"/>'+
 '<path d="M60 170V90M260 170V90M50 92h220" '+S+'/><path d="M60 92 30 170M260 92l-30 78" stroke="var(--dim)" stroke-width="1.5"/>'+
 '<path d="M55 92 120 170M265 92 200 170" stroke="none"/><path d="M50 92l60 78h120l40-78z" fill="var(--ac2)" opacity=".25"/><path d="M50 92l60 78M270 92l-40 78M50 92h220M110 170h120" '+A+'/>'+
 '<path d="M10 120h30M20 112l-10 8 10 8" '+R+'/>'+T(28,108,"rüzgâr",{s:10,c:"var(--red)"})+
 '<path d="M150 186h40" stroke="var(--ac)" stroke-width="3"/>'+T(170,198,"ateş + yansıtıcı",{s:9})+T(160,40,"Branda tek eğim (lean-to): sırt rüzgâra",{s:12,c:"var(--tx)"}),
 "Hızlı, ateşle ısınır. Rüzgâr yön değiştirirse çökertir; ağır yağış/karda A-çatı yap.");

F.aframe = fig(
 '<path d="M10 170h300" stroke="var(--line)" stroke-width="2"/><path d="M30 90h260" '+S+'/><path d="M40 90V60M280 90V60" stroke="var(--dim)"/>'+
 '<path d="M160 90 70 170h180z" fill="var(--ac2)" opacity=".25"/><path d="M160 90 70 170M160 90l90 80" '+A+'/>'+
 '<path d="M90 172h140" stroke="var(--blue)" stroke-width="5" opacity=".7"/>'+T(160,190,"zemin: yaprak/dal/köpük ≥ 15 cm — toprak ısını emer",{s:10,c:"var(--blue)"})+T(160,40,"A-çatı: yağmur ve kar için",{s:12,c:"var(--tx)"})+T(40,80,"ip",{s:10}),
 "İpi iki ağaç arasına bel hizasında ger; brandanın kenarlarını kazık/taşla sabitle.");

F.debris = fig(
 '<path d="M10 170h300" stroke="var(--line)" stroke-width="2"/><path d="M40 170 270 110" stroke="var(--tx)" stroke-width="4"/><path d="M270 110v60" stroke="var(--tx)" stroke-width="4"/>'+
 '<path d="M60 168 250 116M80 170 250 128M110 170l130-38" stroke="var(--dim)"/><path d="M40 170c40-60 160-80 240-66v66z" fill="var(--ac)" opacity=".2"/><path d="M40 170c40-60 160-80 240-66" '+A+'/>'+
 T(170,60,"Yaprak/ot yığını: en az 60–90 cm kalınlık",{s:11,c:"var(--tx)"})+T(270,186,"giriş: rüzgâr altı",{s:9}),
 "Brandasız barınak (Kochanski). İçi vücut kadar dar olmalı; büyük barınak ısınmaz.");

F.fire = fig(
 '<path d="M10 170h300" stroke="var(--line)" stroke-width="2"/>'+
 '<path d="M30 170l25-60 25 60M40 170l15-45 15 45" '+A+'/><circle cx="55" cy="160" r="6" fill="var(--red)"/>'+T(55,190,"çadır (hızlı)",{s:10})+
 '<path d="M120 165h60M120 150h60M125 170v-30M175 170v-30M120 135h60" '+A+'/><circle cx="150" cy="158" r="6" fill="var(--red)"/>'+T(150,190,"kütük ev (kalıcı)",{s:10})+
 '<path d="M220 170v-50h30v50M262 170l-12-40" '+S+'/><path d="M262 170h30" '+S+'/><path d="M215 120h40" stroke="var(--line)"/><circle cx="235" cy="160" r="6" fill="var(--red)"/>'+T(255,190,"Dakota çukuru (gizli)",{s:10})+
 T(160,40,"Kav → çıra (kurşun kalem) → başparmak → bilek kalınlığı",{s:11,c:"var(--tx)"})+T(160,58,"Her boyuttan bir kucak hazırla, sonra çak.",{s:10}),
 "Dakota: 30 cm çukur + yan hava tüneli. Az duman, az ışık, rüzgârda yanar, az odun yer.");

F.shadow = fig(
 '<path d="M20 160h280" stroke="var(--line)" stroke-width="2"/><path d="M160 160V70" stroke="var(--tx)" stroke-width="3"/>'+
 '<path d="M160 160 90 120M160 160l70-30" stroke="var(--dim)" stroke-dasharray="4 4"/><circle cx="90" cy="120" r="5" fill="var(--ac)"/><circle cx="230" cy="130" r="5" fill="var(--ac)"/>'+
 '<path d="M90 120 230 130" '+A+'/>'+T(80,110,"1. gölge ucu",{s:10})+T(244,122,"2. (15 dk sonra)",{s:10})+T(90,140,"BATI",{s:12,c:"var(--ac)"})+T(232,150,"DOĞU",{s:12,c:"var(--ac)"})+
 '<path d="M160 120v-80M154 50l6-10 6 10" '+R+'/>'+T(178,46,"KUZEY",{s:11,c:"var(--red)",a:"start"})+T(160,190,"İki işareti birleştiren çizgi batı-doğu, ona dik çizgi kuzey-güneydir.",{s:10}),
 "Gölge çubuğu yöntemi güneş olan her saatte çalışır; pusula olmadan yön bulmanı sağlar.");

F.stars = fig(
 '<rect width="320" height="220" fill="#000"/>'+
 [[40,150],[70,145],[95,155],[120,150],[150,140],[160,110],[128,112]].map(function(p,i){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(i>3?3.2:2.6)+'" fill="var(--tx)"/>'}).join("")+
 '<path d="M40 150 70 145 95 155 120 150 150 140 160 110 128 112 120 150" stroke="var(--dim)" fill="none"/>'+
 '<path d="M150 140 160 110 186 30" stroke="var(--ac)" stroke-dasharray="4 4" fill="none"/><circle cx="186" cy="30" r="5" fill="var(--ac)"/>'+T(200,28,"KUTUP YILDIZI: KUZEY",{a:"start",s:10,c:"var(--ac)"})+
 T(90,180,"Büyükayı (Kepçe)",{s:10})+T(186,82,"×5",{s:11,c:"var(--ac)",a:"start"})+
 [[250,90],[265,72],[282,88],[298,70],[312,86]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.6" fill="var(--tx)"/>'}).join("")+'<path d="M250 90 265 72 282 88 298 70 312 86" stroke="var(--dim)" fill="none"/>'+T(282,115,"Kraliçe (W)",{s:10})+'<path d="M276 82 196 36" stroke="var(--blue)" stroke-dasharray="2 4"/>',
 "Kepçenin ucundaki iki yıldızın arasındaki uzaklığı 5 kez uzat. Kepçe ufkun altındaysa W biçimindeki Kraliçe takımyıldızını bul ve ortasından başlayarak bak (çizimdeki mavi kesik çizgi). Türkiye'de Kutup Yıldızı ufkun 36–42° üstündedir (bulunduğun enlem kadar).");

F.watch = fig(
 '<circle cx="110" cy="110" r="80" '+S+'/>'+[0,30,60,90,120,150,180,210,240,270,300,330].map(function(a){return '<path d="M'+(110+Math.sin(a*Math.PI/180)*70)+' '+(110-Math.cos(a*Math.PI/180)*70)+'L'+(110+Math.sin(a*Math.PI/180)*78)+' '+(110-Math.cos(a*Math.PI/180)*78)+'" '+S+'/>'}).join("")+
 '<path d="M110 110 L180 70" stroke="var(--ac)" stroke-width="4"/><circle cx="208" cy="54" r="12" fill="var(--ac)"/>'+T(208,30,"GÜNEŞ",{s:10,c:"var(--ac)"})+
 '<path d="M110 110 L150 41" stroke="var(--tx)" stroke-width="2" stroke-dasharray="3 3"/>'+T(150,34,"saat 1",{s:10})+
 '<path d="M110 110 L172 46" stroke="var(--red)" stroke-width="2.4"/>'+T(240,120,"Akrebi güneşe tut.",{a:"start",s:10,c:"var(--tx)"})+T(240,136,"Akrep ile '1' arasının",{a:"start",s:10,c:"var(--tx)"})+T(240,150,"ortası GÜNEYDİR",{a:"start",s:11,c:"var(--red)"})+T(240,176,"(Türkiye saatinde",{a:"start",s:9})+T(240,188,"12 yerine 1'i kullan)",{a:"start",s:9}),
 "Kadranlı (akrepli) saat yöntemi. Öğleden önce kadranın sol yanındaki açıyı, öğleden sonra sağ yanındaki açıyı ikiye böl. Hata payı ±15° kadardır; ara sıra gölge çubuğuyla doğrula.","0 0 340 220");

F.g2a = fig(
 [["V","Yardım lazım"],["X","Tıbbi yardım lazım"],["N","Hayır"],["Y","Evet"],["→","Bu yöne gittik"],["LL","Her şey yolunda"]].map(function(r,i){var x=10+(i%3)*104,y=20+Math.floor(i/3)*90;return '<rect x="'+x+'" y="'+y+'" width="96" height="78" rx="6" fill="none" stroke="var(--line)"/>'+T(x+48,y+44,r[0],{s:32,c:"var(--ac)"})+T(x+48,y+68,r[1],{s:10,c:"var(--tx)"})}).join(""),
 "Yer-hava işaretleri: her işareti en az 3 m boyunda ve zeminle zıt renkte yap. Taş, dal, kazılmış toprak ya da kar üstünde iz kullanabilirsin.","0 0 320 200");

F.hand = fig(
 '<path d="M10 170h300" stroke="var(--ac2)" stroke-width="2"/>'+T(290,186,"ufuk",{s:10})+
 '<rect x="90" y="70" width="70" height="100" rx="10" fill="var(--s2)" stroke="var(--tx)"/>'+[0,1,2,3].map(function(i){return '<path d="M90 '+(95+i*25)+'h70" stroke="var(--dim)"/>'}).join("")+
 '<circle cx="125" cy="45" r="16" fill="var(--ac)"/>'+T(200,100,"1 parmak ≈ 15 dk",{a:"start",s:12,c:"var(--tx)"})+T(200,120,"1 el ≈ 1 saat",{a:"start",s:12,c:"var(--ac)"})+T(200,140,"→ batışa kalan süre",{a:"start",s:10}),
 "Kolunu tam ileri uzat; avucun sana dönük olsun.");

/* Düğümler */
F.bowline = fig(
 '<path d="M40 20v60c0 20 20 30 40 30s40-10 40-30-20-28-40-28c-14 0-22 8-22 18" '+A+'/>'+
 '<path d="M80 110v70" '+A+'/><path d="M58 70c0 20 40 24 50 10s-8-28-20-24" stroke="var(--tx)" stroke-width="3" fill="none"/>'+
 '<path d="M40 20c0-10 0-10 0-10" '+A+'/>'+T(220,50,"Kazık (Bowline)",{s:13,c:"var(--tx)"})+T(220,74,"Kaymayan sabit ilmek.",{s:10})+T(220,92,"\"Tavşan delikten çıkar,",{s:10})+T(220,106,"ağacın etrafından döner,",{s:10})+T(220,120,"deliğe geri girer.\"",{s:10})+T(220,148,"Kurtarma, belden bağlama,",{s:10,c:"var(--ac)"})+T(220,162,"branda köşesi.",{s:10,c:"var(--ac)"}),"","0 0 320 190");
F.clove = fig(
 '<rect x="20" y="80" width="280" height="24" rx="12" fill="var(--s2)" stroke="var(--dim)"/>'+
 '<path d="M110 20v58c0 30 30 30 30 0s30-30 30 0v30" '+A+'/><path d="M110 104c0 10 0 70 0 70" '+A+'/><path d="M170 108c0 30 20 40 40 66" '+A+'/>'+
 T(160,192,"Kazık bağı (Clove hitch): direğe hızlı bağlama, iki tur + çapraz",{s:10}),"","0 0 320 200");
F.taut = fig(
 '<rect x="10" y="20" width="18" height="160" fill="var(--s2)" stroke="var(--dim)"/>'+'<path d="M28 100h170" '+A+'/><path d="M198 100c20 0 20 30 0 30H150" '+A+'/>'+
 [0,1].map(function(i){return '<ellipse cx="'+(165+i*10)+'" cy="115" rx="5" ry="18" stroke="var(--tx)" stroke-width="2.5" fill="none"/>'}).join("")+'<ellipse cx="135" cy="115" rx="5" ry="18" stroke="var(--tx)" stroke-width="2.5" fill="none"/><path d="M130 130v40" stroke="var(--tx)" stroke-width="2.5"/>'+
 '<rect x="250" y="160" width="14" height="30" fill="var(--ac2)"/>'+'<path d="M198 130l52 40" stroke="var(--dim)" stroke-dasharray="3 3"/>'+T(240,60,"Gergi düğümü",{s:13,c:"var(--tx)"})+T(240,80,"İpi kaydırarak gerilir,",{s:10})+T(240,94,"yük altında kilitlenir.",{s:10})+T(240,112,"Çadır/branda ipleri.",{s:10,c:"var(--ac)"}),"İçe 2 tur, dışa 1 tur.","0 0 320 200");
F.reef = fig(
 '<path d="M20 70h100c30 0 30 50 60 50h120" '+A+'/><path d="M20 120h100c30 0 30-50 60-50h120" stroke="var(--tx)" stroke-width="3" fill="none"/>'+
 T(160,30,"Camadan (Reef) — sağ üstüne sol, sol üstüne sağ",{s:11,c:"var(--tx)"})+T(160,160,"Sadece bandaj/sargı ve paket için. Yük taşımaz, kayar!",{s:10,c:"var(--red)"})+T(160,180,"İki ipi eklemek için → Ağ düğümü (sheet bend)",{s:10}),"","0 0 320 190");
F.sheet = fig(
 '<path d="M30 90h120c20 0 20-40 0-40h-20v70h30" '+A+'/><path d="M290 80H170c-20 0-30 10-30 20s10 20 20 20h10c10 0 10-30-10-30" stroke="var(--tx)" stroke-width="3" fill="none"/>'+
 T(160,170,"Ağ düğümü (Sheet bend): farklı kalınlıkta iki ipi ekler",{s:10.5,c:"var(--tx)"}),"Kalın iple U yap; ince ip alttan girer, sarar, kendi altından geçer.","0 0 320 190");
F.prusik = fig(
 '<path d="M160 10v180" stroke="var(--tx)" stroke-width="5"/>'+[0,1,2].map(function(i){return '<ellipse cx="160" cy="'+(70+i*16)+'" rx="18" ry="6" stroke="var(--ac)" stroke-width="3" fill="none"/>'}).join("")+'<path d="M150 112c-10 30-10 50 10 60M170 112c10 30 10 50-10 60" '+A+'/>'+
 T(250,70,"Prusik",{s:13,c:"var(--tx)"})+T(250,90,"Kayar; yük gelince",{s:10})+T(250,104,"sıkışır. Halat",{s:10})+T(250,118,"tırmanma, makara.",{s:10}),"","0 0 320 200");

F.filter = fig(
 '<path d="M110 20h100l-20 160h-60z" '+S+'/>'+
 [["bez / çorap",30,"var(--mut)"],["ince kum",62,"#b9a58a"],["odun kömürü (ateşten)",94,"#555"],["ince kum",126,"#b9a58a"],["çakıl",150,"var(--dim)"]].map(function(r){return '<rect x="'+(116+r[1]/14)+'" y="'+r[1]+'" width="'+(88-r[1]/7)+'" height="26" fill="'+r[2]+'" opacity=".6"/>'+T(225,r[1]+17,r[0],{a:"start",s:10,c:"var(--tx)"})}).join("")+
 '<path d="M160 190v20" stroke="var(--blue)" stroke-width="4"/>'+T(60,100,"SONRA",{s:12,c:"var(--red)"})+T(60,116,"KAYNAT",{s:12,c:"var(--red)"}),
 "Kum-kömür filtresi bulanıklığı azaltır, mikropları ÖLDÜRMEZ. Mutlaka kaynat veya klorla.","0 0 320 220");

F.layers = fig(
 [["İç katman","yün/sentetik; teri uzaklaştırır. PAMUK GİYME.","var(--blue)"],["Orta katman","polar ya da yün kazak; havayı hapseder.","var(--ac2)"],["Dış katman","rüzgâr ve su geçirmez kabuk.","var(--ac)"]].map(function(r,i){return '<rect x="'+(20+i*14)+'" y="'+(20+i*14)+'" width="'+(280-i*28)+'" height="'+(160-i*28)+'" rx="10" fill="none" stroke="'+r[2]+'" stroke-width="2.5"/>'+T(160,46+i*14+i*34,r[0]+": "+r[1],{s:10,c:"var(--tx)"})}).join("")+T(160,170,"Islak pamuk, ısının ~%90'ını kaybettirir: \"Pamuk öldürür\"",{s:10,c:"var(--red)"}),
 "Katmanlı giyinme: terlemeden önce bir kat çıkar, durunca hemen giy.","0 0 320 200");

window.HK.fig = F;
})();
