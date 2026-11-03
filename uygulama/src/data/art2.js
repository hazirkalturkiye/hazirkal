/* Sahne çizimleri: barınak, ateş, ilk yardım. art.js'ten sonra yüklenir. */
(function(){
var H=window.HK,A=H.art,R=A.rope,RS=A.ropes,AR=A.arrow,L=A.lab,S=A.svg,cr=A.cr;
function f(n){return Math.round(n*10)/10}
function pl(pts){return pts.map(function(p){return f(p[0])+","+f(p[1])}).join(" ")}
function poly(pts,fill,st,sw,op){return '<polygon points="'+pl(pts)+'" fill="'+fill+'"'+(st?' stroke="'+st+'" stroke-width="'+(sw||1.5)+'" stroke-linejoin="round"':'')+(op?' opacity="'+op+'"':'')+'/>'}
function line(pts,col,w,dash,op){return '<path d="M'+pts.map(function(p){return f(p[0])+","+f(p[1])}).join("L")+'" fill="none" stroke="'+col+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round"'+(dash?' stroke-dasharray="'+dash+'"':'')+(op?' opacity="'+op+'"':'')+'/>'}
function curve(pts,col,w,dash){return '<path d="'+cr(pts)+'" fill="none" stroke="'+col+'" stroke-width="'+(w||2)+'" stroke-linecap="round"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'}
function limb(pts,w,col){var d="M"+pts.map(function(p){return f(p[0])+","+f(p[1])}).join("L");
  return '<path d="'+d+'" fill="none" stroke="var(--pbg)" stroke-width="'+(w+3)+'" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function dot(x,y,r,col,st){return '<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+r+'" fill="'+col+'"'+(st?' stroke="'+st+'" stroke-width="1.5"':'')+'/>'}
A.poly=poly;A.line=line;A.limb=limb;A.dot=dot;

/* ---------- Doğa ---------- */
function ground(y,w){y=y||150;var g='<rect x="0" y="'+y+'" width="'+(w||240)+'" height="'+(200-y)+'" fill="var(--earth)"/>';
  for(var x=6;x<(w||240);x+=17){g+='<path d="M'+x+','+y+'l2,-5M'+(x+3)+','+y+'l3,-7M'+(x+7)+','+y+'l-1,-4" stroke="var(--leaf2)" stroke-width="1.2" opacity=".7"/>'}return g}
function tree(x,y,h,r){h=h||110;r=r||30;return '<rect x="'+(x-5)+'" y="'+(y-h)+'" width="10" height="'+h+'" fill="var(--wood)" stroke="var(--woodd)"/>'+dot(x,y-h-4,r,"var(--leaf)")+dot(x-r*0.55,y-h+r*0.35,r*0.7,"var(--leaf)")+dot(x+r*0.55,y-h+r*0.3,r*0.7,"var(--leaf)")+dot(x-4,y-h-10,r*0.5,"var(--leaf2)",null)}
function stake(x,y,ang){ang=ang||0;var dx=Math.sin(ang)*16,dy=Math.cos(ang)*16;return line([[x,y-4],[x+dx,y+dy-4]],"var(--wood)",4)}
function wind(x,y){return AR([[x,y],[x+30,y]],"var(--r2)")+AR([[x+6,y+12],[x+36,y+12]],"var(--r2)")+L(x+18,y-8,"rüzgâr",{c:"var(--r2)",s:9.5})}
function dim(x1,y1,x2,y2,t,ox,oy){return line([[x1,y1],[x2,y2]],"var(--lbl)",1)+line([[x1-3,y1],[x1+3,y1]],"var(--lbl)",1)+line([[x2-3,y2],[x2+3,y2]],"var(--lbl)",1)+L((x1+x2)/2+(ox||0),(y1+y2)/2+(oy||0),t,{s:9.5})}
function leafPile(pts){return poly(pts,"var(--leaf2)","var(--leaf)",2)+(function(){var s="";for(var i=0;i<38;i++){var a=pts[0],b=pts[pts.length-1];var t=i/38,x=a[0]+(b[0]-a[0])*t,yy=pts.reduce(function(m,p){return Math.min(m,p[1])},999);s+='<path d="M'+f(x+((i*37)%11)-5)+','+f(yy+12+((i*53)%40))+'l5,-2" stroke="var(--leaf)" stroke-width="2" opacity=".8"/>'}return s})()}
function rain(x0,x1,y0,y1){var s="";for(var x=x0;x<x1;x+=14){s+=line([[x,y0+((x*7)%12)],[x-4,y0+((x*7)%12)+12]],"var(--r2)",1.5,null,.8)}return s}
function flame(x,y,s){s=s||1;return '<path d="M'+x+','+y+' c'+(-10*s)+','+(-6*s)+' '+(-8*s)+','+(-20*s)+' '+(-2*s)+','+(-30*s)+' c'+(0)+','+(10*s)+' '+(6*s)+','+(8*s)+' '+(6*s)+','+(16*s)+' c'+(3*s)+','+(-6*s)+' '+(2*s)+','+(-12*s)+' '+(6*s)+','+(-16*s)+' c'+(4*s)+','+(10*s)+' '+(6*s)+','+(22*s)+' '+(-10*s)+','+(30*s)+'z" fill="var(--fire)"/><path d="M'+x+','+(y-2*s)+' c'+(-4*s)+','+(-4*s)+' '+(-3*s)+','+(-10*s)+' '+(0)+','+(-14*s)+' c'+(1*s)+','+(5*s)+' '+(5*s)+','+(6*s)+' '+(2*s)+','+(14*s)+'z" fill="#ffd27a" opacity=".9"/>'}
function stick(x1,y1,x2,y2,w){return line([[x1,y1],[x2,y2]],"var(--woodd)",(w||3)+2)+line([[x1,y1],[x2,y2]],"var(--wood)",w||3)}
function heat(pts){return AR(pts,"var(--fire)")}
A.ground=ground;A.tree=tree;A.flame=flame;A.stick=stick;

/* ---------- İnsan: yandan görünüş ---------- */
/* o: {h:baş, n:boyun, p:kalça, aN:[dirsek,el], aF:[dirsek,el], lN:[diz,ayak], lF:[diz,ayak], c:renk, s:omuz(ops.)} */
function person(o){var c=o.c||"var(--pt)",sk="var(--skin)",sh=o.s||[o.n[0]+(o.p[0]-o.n[0])*0.1,o.n[1]+(o.p[1]-o.n[1])*0.1];var g="";
  function arm(a){return a?limb([sh,a[0],a[1]],8,c)+dot(a[1][0],a[1][1],4.6,sk):""}
  function leg(l){return l?limb([o.p,l[0],l[1]],11,c==="var(--pt)"?"var(--ptl)":"var(--rsl)")+dot(l[1][0],l[1][1],5,"var(--shoe)"):""}
  g+=arm(o.aF)+leg(o.lF)+limb([o.n,o.p],20,c)+leg(o.lN)+(o.armLate?"":arm(o.aN));
  g+=dot(o.h[0],o.h[1],9.5,sk,"var(--pbg)")+'<path d="M'+f(o.h[0]-9)+','+f(o.h[1]-1)+'a9.5,9.5 0 0 1 '+(o.hairR?'18,0':'18,0')+'" fill="var(--hair)" transform="rotate('+(o.hr||0)+' '+o.h[0]+' '+o.h[1]+')"/>';
  if(o.armLate)g+=arm(o.aN);
  return g}
function hand(x,y,ang,col){ /* kol yen + el; ang derece: kolun geldiği yön */ var a=ang*Math.PI/180,ex=x+Math.cos(a)*40,ey=y+Math.sin(a)*40;
  return limb([[ex,ey],[x,y]],9,col||"var(--rs)")+dot(x,y,5.5,"var(--skin)","var(--pbg)")}
A.person=person;A.hand=hand;

/* ---------- İnsan: üstten görünüş (yatan) ---------- */
function topBody(o){ /* o:{hd:[x,y], sh:[[x,y],[x,y]] omuzlar, hp:[[x,y],[x,y]] kalçalar, a1,a2:[dirsek,el], l1,l2:[diz,ayak], side:bool} */
  var c="var(--pt)",sk="var(--skin)",g="";
  function arm(s,a){return limb([s,a[0],a[1]],9,c)+dot(a[1][0],a[1][1],5,sk)}
  function leg(h,l){return limb([h,l[0],l[1]],12,"var(--ptl)")+dot(l[1][0],l[1][1],5.5,"var(--shoe)")}
  var order=o.order||["l1","l2","t","a1","a2"];
  var t=poly([o.sh[0],o.sh[1],o.hp[1],o.hp[0]],c,"var(--pbg)",3);
  order.forEach(function(k){if(k==="t")g+=t;else if(k==="l1")g+=leg(o.hp[0],o.l1);else if(k==="l2")g+=leg(o.hp[1],o.l2);else if(k==="a1")g+=arm(o.sh[0],o.a1);else if(k==="a2")g+=arm(o.sh[1],o.a2);else if(k==="h")g+=head()});
  function head(){return dot(o.hd[0],o.hd[1],11,sk,"var(--pbg)")+dot(o.hd[0]-(o.hf||5),o.hd[1],7,"var(--hair)")}
  if(order.indexOf("h")<0)g+=head();
  return g}
A.topBody=topBody;
function kneel(o){o=o||{};var x=o.x||0;return person({h:[92+x,44],n:[84+x,58],p:[68+x,118],aN:o.aN||[[100+x,86],[116+x,68]],aF:o.aF||[[66+x,92],[58+x,104]],lN:[[100+x,96],[104+x,140]],lF:[[60+x,150],[30+x,150]],c:'var(--rs)',armLate:true})}
A.kneel=kneel;
var BG=function(){return '<rect width="240" height="180" fill="var(--pbg)"/>'};
function mat(){return '<rect x="8" y="150" width="224" height="22" rx="4" fill="var(--earth)"/>'}

/* =================================================================
   BARINAKLAR
   ================================================================= */
/* A-çatı branda */
(function(){
var g=ground(150),T=tree(26,150,120,24)+tree(214,150,120,24);
var ridge=line([[30,92],[210,92]],"var(--r1)",2.5);
var side='<rect x="58" y="92" width="124" height="54" fill="var(--tarp)" stroke="var(--pbg)" stroke-width="1"/>'+line([[58,92],[182,92]],"var(--r1)",2.5)+line([[120,92],[120,146]],"var(--pbg)",1,"3 3",.5);
H.stp.aframe=[
 {s:S(g+T+ridge+dim(222,92,222,150,"~1 m",-16)+L(120,122,"sırt ipi: iki ağaç arası, bel hizası",{})+L(44,74,"kazık bağı",{s:9})+L(196,74,"gergi düğümü",{s:9})),c:"İki ağaç arasına <b>bel hizasında</b> (~1 m) sırt ipini ger. Bir uçta kazık bağı, diğerinde gergi düğümü (Düğümler)."},
 {s:S(g+T+side+L(120,124,"branda ortalanmış",{})+L(120,166,"yan görünüş",{s:9})),c:"Brandayı ipin üstüne <b>ortadan</b> as. İki yan eşit sarksın."},
 {s:S(ground(150)+poly([[120,70],[40,150],[200,150]],"var(--tarp)","var(--pbg)",2)+poly([[120,70],[100,150],[140,150]],"var(--pbg)",null,0,.55)+line([[40,150],[26,160]],"var(--r1)",1.5)+line([[200,150],[214,160]],"var(--r1)",1.5)+stake(24,160,0.7)+stake(216,160,-0.7)+dot(120,70,3,"var(--r1)")+dim(120,70,120,150,"",0,0)+dim(40,172,200,172,"taban ≈ 2 × yükseklik",0,-4)+L(120,60,"önden görünüş",{s:9})+L(36,112,"kenarlar 45°",{s:9})+L(214,112,"kazık 40°,",{s:9})+L(214,123,"dışa yatık",{s:9})),c:"Köşeleri kazıkla gerdir: kenarlar dışa doğru, <b>45°</b> açıyla. Dik açı yağmuru akıtır; çok basık açı suyu biriktirir."},
 {s:S(rain(10,230,8,40)+ground(150)+poly([[120,70],[40,150],[200,150]],"var(--tarp)","var(--pbg)",2)+poly([[120,76],[52,146],[188,146]],"#0d0d0a")+'<rect x="68" y="134" width="104" height="12" fill="var(--leaf2)"/>'+topSleeper(84,126)+L(120,160,"zemin yalıtımı ≥ 15 cm (yaprak, dal, mat)",{s:9.5})+AR([[70,58],[54,82]],"var(--r2)")+AR([[170,58],[186,82]],"var(--r2)")),c:"Altına <b>en az 15 cm</b> kuru yaprak/çam dalı/mat ser: toprak, havadan çok daha hızlı ısı çeker. Rüzgâr tarafındaki ağzı alçalt veya çantayla kapat."}
];
function topSleeper(x,y){return '<ellipse cx="'+(x+38)+'" cy="'+(y+2)+'" rx="34" ry="8" fill="var(--pt)"/>'+dot(x+2,y,7,"var(--skin)")}
})();

/* Tek eğim (lean-to) + yansıtıcı ateş */
(function(){
var T=tree(32,150,118,22)+tree(208,150,118,22);
function bar(){return stick(28,86,212,86,5)}
function poles(n){var s="";for(var i=0;i<n;i++){var x=44+i*24;s+=stick(x,86,x+68,150,3)}return s}
function cover(){var s="";for(var r=0;r<5;r++){var y=146-r*13;var x=118+r*-12;s+=poly([[40+r*0,86+0],[40,86],[0,0]],"none")}
  /* yan görünüşte çatı üçgeni: ön kenar (bar) → arka zemin */
  return poly([[34,84],[210,84],[232,150],[112,150]],"var(--leaf)","var(--pbg)",1)+(function(){var q="";for(var i=0;i<6;i++){var t=i/6;q+=line([[34+t*78,84+t*66],[210+t*22,84+t*66]],"var(--leaf2)",3)}return q})()}
H.stp.leanto=[
 {s:S(ground(150)+T+bar()+dim(20,86,20,150,"1–1,2 m",14)+L(120,76,"çapraz sırık, iki ağaca bağlı",{})),c:"İki ağaca, <b>1–1,2 m</b> yüksekliğe sağlam bir sırık bağla (volta + iki yarım bağ)."},
 {s:S(ground(150)+T+bar()+poles(7)+wind(196,40)+L(150,170,"sırt rüzgâra",{s:9.5})+L(80,170,"45–60°",{s:9.5})),c:"Sırığa, arkası <b>rüzgâra bakacak</b> şekilde 45–60° eğimle uzun dallar daya. Rüzgâr yönünü önceden kontrol et."},
 {s:S(ground(150)+T+cover()+bar()+L(150,170,"alttan yukarı, kiremit gibi",{s:9.5})+AR([[130,140],[90,104]])),c:"Üstünü <b>alttan yukarıya</b>, kiremit gibi üst üste çam dalı, yaprak veya branda ile kapla. Kalın örtü = sıcak ve kuru."},
 {s:S(ground(150)+'<g transform="translate(-10,0)">'+poly([[44,84],[120,84],[150,150],[74,150]],"var(--leaf)","var(--pbg)",1)+stick(40,84,124,84,5)+'</g>'+'<ellipse cx="100" cy="146" rx="26" ry="5" fill="var(--pt)"/>'+dot(76,143,6,"var(--skin)")+'<g>'+stick(156,150,160,140,4)+flame(168,150,0.9)+'</g>'+(function(){var s="";for(var i=0;i<4;i++)s+=stick(196,150-i*9,226,150-i*9,7);return s})()+stick(194,150,194,112,3)+stick(228,150,228,112,3)+heat([[176,128],[192,124]])+heat([[190,134],[130,136]])+L(206,104,"yansıtıcı duvar",{s:9})+L(166,172,"~1 m",{s:9.5})+L(98,170,"yalıtım",{s:9.5})),c:"Önüne, 1 m mesafede uzun bir ateş yak; ateşin arkasına kütüklerden <b>yansıtıcı duvar</b> kur. Isı barınağa geri yansır."}
];
})();

/* Yaprak kulübe (debris hut) */
(function(){
var stump='<rect x="40" y="112" width="18" height="38" fill="var(--wood)" stroke="var(--woodd)"/>';
function ridge(){return stick(44,108,214,150,5)}
function ribs(n){var s="";for(var i=0;i<n;i++){var t=(i+0.5)/n,x=50+t*150,y=110+t*39;s+=stick(x,y,x-6,150,2.5)+stick(x,y,x+14,150,2.5)}return s}
function lattice(){var s="";for(var i=0;i<4;i++){var y=126+i*6;s+=line([[44,y+i*0],[200,y+ (150-y)*0.6]],"var(--wood)",1.8)}return s}
function pile(th){return poly([[30,150],[34,118],[46,98-th],[90,104-th*0.7],[150,122-th*0.4],[214,146],[226,150]],"var(--leaf2)","var(--leaf)",2)}
H.stp.debris=[
 {s:S(ground(150)+stump+ridge()+'<ellipse cx="128" cy="146" rx="60" ry="5" fill="var(--pt)" opacity=".85"/>'+dot(66,143,6,"var(--skin)")+dim(30,108,30,150,"kalça",-2)+L(130,96,"sırık: boyun + 30 cm",{})+L(130,172,"önce yat, ölç",{s:9.5})),c:"Boyundan ~30 cm uzun, kalın bir sırığı bir ucu kütük/çatal üstünde (<b>kalça yüksekliği</b>), diğeri yerde olacak şekilde koy. Yanına yat, ölç: içeride sadece dönebilecek kadar yer olsun."},
 {s:S(ground(150)+stump+ribs(9)+ridge()+L(130,96,"iki yana sık kaburgalar",{})),c:"Sırığın iki yanına sık aralıklarla dal (kaburga) daya. İç genişlik: omuzların + bir karış. Büyük barınak ısınmaz."},
 {s:S(ground(150)+stump+ribs(9)+ridge()+lattice()+L(130,96,"ince dallarla ağ ör",{})),c:"Kaburgaların üstüne ince dallarla <b>ağ</b> ör; yapraklar içeri dökülmesin."},
 {s:S(ground(150)+pile(30)+dim(26,72,26,108,"60–90 cm",-4)+L(150,96,"kuru yaprak/ot yığını",{})+L(150,108,"kol boyu kalınlık",{s:9.5})),c:"Üstüne kuru yaprak, ot, çam iğnesi yığ: <b>en az 60–90 cm</b> (kolunun boyu). Elini sokunca kolunun tamamı gömülmeli. Üstüne dal koy ki rüzgâr savurmasın."},
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+ground(150)+poly([[20,150],[60,60],[100,60],[140,60],[180,60],[220,150]],"var(--leaf2)","var(--leaf)",2)+poly([[70,148],[120,80],[170,148]],"var(--wood)")+poly([[78,148],[120,90],[162,148]],"#0d0d0a")+'<rect x="80" y="132" width="80" height="16" fill="var(--leaf)"/>'+'<ellipse cx="120" cy="124" rx="22" ry="9" fill="var(--pt)"/>'+dot(102,122,6,"var(--skin)")+L(120,46,"kesit",{s:9})+L(30,96,"dış yaprak",{a:"start",s:9})+L(30,107,"60–90 cm",{a:"start",s:9})+L(186,172,"içi de yaprakla dolu",{s:9})+L(56,172,"altı ≥ 20 cm",{s:9})),c:"İçini de kuru yaprakla doldur, altına <b>20–30 cm</b> ser ve içine gömül. Girişi bir yaprak dolu çantayla tıka. Doğru yapılırsa tulumsuz bile sıcak tutar."}
];
})();

/* =================================================================
   ATEŞ
   ================================================================= */
(function(){
function nest(x,y){var s='<ellipse cx="'+x+'" cy="'+y+'" rx="16" ry="9" fill="#a8935a"/>';for(var i=0;i<10;i++){var a=i*0.63;s+=line([[x+Math.cos(a)*14,y+Math.sin(a)*7],[x-Math.cos(a)*12,y-Math.sin(a)*6]],"#cdb77a",1.2)}return s}
function pile(x,y,n,w,len){var s="";for(var i=0;i<n;i++){s+=stick(x-len/2+((i*7)%5),y-i*(w+1),x+len/2-((i*5)%6),y-i*(w+1)-((i%2)?2:-1),w)}return s}
function teepee(x,y,h,n){var s="";for(var i=0;i<n;i++){var t=i/(n-1),bx=x-26+t*52;if(Math.abs(bx-x)<7)continue;s+=stick(bx,y,x+(bx-x)*0.08,y-h,2.6)}return s}
function ring(){var s='<ellipse cx="120" cy="140" rx="46" ry="14" fill="var(--ash)" opacity=".6"/>';for(var i=0;i<12;i++){var a=i/12*Math.PI*2;s+=dot(120+Math.cos(a)*46,140+Math.sin(a)*14,6,"#6b6b62","var(--pbg)")}return s}
H.stp.firebuild=[
 {s:S(ground(150)+'<ellipse cx="120" cy="158" rx="112" ry="14" fill="none" stroke="var(--lbl)" stroke-dasharray="4 4"/>'+nest(46,110)+pile(120,112,5,2,46)+pile(194,112,4,5,58)+L(46,84,"KAV",{b:1})+L(46,96,"yumruk kadar",{s:9})+L(120,84,"ÇIRA",{b:1})+L(120,96,"kibrit → kalem",{s:9})+L(194,84,"YAKIT",{b:1})+L(194,96,"başparmak → bilek",{s:9})+L(120,176,"3 m çapında temizlenmiş alan",{s:9.5})),c:"Çakmaktan <b>önce</b> hazırlık: yumruk büyüklüğünde kav, iki kucak çıra (kibrit → kalem kalınlığı), bir kucak yakıt (başparmak → bilek). Alanı 3 m çapında kuru ottan temizle."},
 {s:S(ground(150)+ring()+nest(120,138)+teepee(120,140,52,9)+wind(20,40)+AR([[64,120],[92,132]])+L(64,108,"kapı rüzgâra",{s:9.5})),c:"Kavı ortaya koy, çırayı üstüne <b>çadır gibi</b> daya. Rüzgâr tarafında küçük bir <b>kapı</b> bırak."},
 {s:S(ground(150)+ring()+nest(120,138)+teepee(120,140,52,9)+flame(116,140,0.5)+H.art.kneel({x:-20,aN:[[90,110],[100,134]],aF:[[60,104],[80,130]]})+'<rect x="98" y="128" width="7" height="11" rx="2" fill="#c44"/>'+wind(2,30)+L(150,30,"sırtın rüzgâra,",{s:9.5})+L(150,42,"vücudunla kalkan yap",{s:9.5})),c:"Kavı kapıdan, <b>alttan</b> tutuştur (alev yukarı yanar). Sırtını rüzgâra dön, elinle kapat."},
 {s:S(ground(150)+ring()+flame(120,140,1.4)+teepee(120,140,52,7)+stick(70,148,110,118,5)+stick(170,148,130,118,5)+AR([[60,80],[96,110]])+L(56,70,"kademeli kalınlaştır",{s:9.5})+L(200,70,"boğma:",{s:9.5})+L(200,82,"hava kalsın",{s:9.5})),c:"Alev çırayı sarınca yakıtı <b>kademeli</b> kalınlaştırarak ekle. Fazla odun ateşi boğar: odunlar arasında hava kalsın. Üfle: alçaktan, yavaş."}
];
H.stp.firelays=[
 {s:S(ground(150)+nest(120,140)+teepee(120,142,64,11)+L(120,40,"ÇADIR (teepee)",{b:1})+L(120,170,"hızlı tutuşur, çok ısı, çok odun yer",{s:9.5})),c:"<b>Çadır:</b> en kolay tutuşan. Su kaynatmak ve ilk ateş için."},
 {s:S(ground(150)+nest(120,138)+teepee(120,140,30,7)+(function(){var s="";for(var i=0;i<5;i++){var y=146-i*9;if(i%2==0){s+=stick(82,y,158,y,6)}else{s+=stick(90,y+3,92,y-2,6)+stick(150,y+3,148,y-2,6)}}return s})()+L(120,40,"KÜTÜK EV (log cabin)",{b:1})+L(120,170,"düzenli yanar, kor yapar, pişirme",{s:9.5})),c:"<b>Kütük ev:</b> çadırın etrafına çapraz kat kat odun. Uzun süre düzenli yanar, iyi kor yapar: pişirme ve gece."},
 {s:S(ground(150)+flame(120,144,0.8)+stick(30,148,108,142,7)+stick(210,148,132,142,7)+stick(80,170,114,146,7)+stick(166,170,126,146,7)+AR([[44,128],[80,134]])+L(120,40,"YILDIZ",{b:1})+L(120,108,"yandıkça odunu içeri it",{s:9.5})),c:"<b>Yıldız:</b> uzun kütüklerin uçları ortada yanar; yandıkça içeri itilir. Az odunla bütün gece, balta gerekmez."},
 {s:S(ground(150)+stick(60,142,190,142,12)+nest(120,132)+(function(){var s="";for(var i=0;i<6;i++){s+=stick(100+i*8,148,96+i*8,116,2.5)}return s})()+wind(20,60)+L(120,40,"DAYAMA (lean-to)",{b:1})+L(120,170,"kütük rüzgâr kesici olur",{s:9.5})),c:"<b>Dayama:</b> rüzgâr tarafına kalın bir kütük koy, kavı dibine, çırayı kütüğe yasla. Rüzgârlı bozkırda işe yarar."},
 {s:S('<rect x="0" y="80" width="240" height="100" fill="var(--earth)"/>'+poly([[60,80],[100,80],[100,150],[60,150]],"#0d0d0a")+poly([[150,80],[170,80],[120,150],[100,150]],"#0d0d0a")+flame(80,148,0.8)+AR([[176,60],[150,96],[112,140]],"var(--r2)")+'<path d="M80,96 q4,-20 -2,-40 M86,92 q6,-24 0,-44" stroke="var(--ash)" stroke-width="2" fill="none"/>'+dim(44,80,44,150,"30 cm",-14)+L(150,40,"DAKOTA ÇUKURU (kesit)",{b:1})+L(176,52,"hava tüneli",{s:9.5})+L(190,170,"az duman, az ışık",{s:9.5})),c:"<b>Dakota çukuru:</b> 30 cm derin çukur + rüzgâr tarafından açılan hava tüneli. Rüzgârda söner, az duman ve ışık verir, az odun yer."}
];
/* Yay matkabı */
var board='<rect x="70" y="140" width="130" height="12" fill="var(--wood)" stroke="var(--woodd)"/>';
H.stp.bowdrill=[
 {s:S(ground(160)+board+stick(30,60,170,60,4)+curve([[30,60],[100,52],[170,60]],"var(--r1)",2)+'<rect x="120" y="70" width="10" height="64" rx="4" fill="var(--wood)" stroke="var(--woodd)"/>'+'<rect x="104" y="20" width="42" height="14" rx="5" fill="#6b6b62"/>'+L(100,50,"yay (kol boyu, hafif eğri)",{s:9.5})+L(174,100,"mil: başparmak kalın,",{s:9.5})+L(174,112,"20 cm, düz, kuru",{s:9.5})+L(125,14,"yatak (taş/sert odun)",{s:9.5})+L(135,172,"taban: 2 cm kalın yumuşak kuru odun",{s:9.5})),c:"<b>Parçalar:</b> yay, mil, taban tahtası, yatak. Mil ve taban aynı yumuşak, ölü ve kuru ağaçtan olsun (söğüt, ıhlamur, kavak, ardıç)."},
 {s:S('<rect x="20" y="70" width="200" height="40" fill="var(--wood)" stroke="var(--woodd)"/>'+'<circle cx="120" cy="80" r="12" fill="#2a1d10"/>'+poly([[114,92],[126,92],[124,110],[116,110]],"#0d0d0a")+'<rect x="100" y="112" width="40" height="22" fill="#a8935a"/>'+L(120,52,"üstten görünüş",{s:9})+L(120,148,"çentiğin altına kuru yaprak/kabuk",{s:9.5})+L(185,62,"yanık çukur",{s:9.5})+L(185,124,"çentik: pastanın 1/8'i,",{s:9.5})+L(185,136,"çukurun merkezine kadar",{s:9.5})),c:"Mili tabanda önce biraz döndürüp <b>yanık çukur</b> aç. Sonra çukurun merkezine kadar V çentik kes (pastanın 1/8'i). Altına kor tutacak kuru yaprak koy."},
 {s:S(ground(150)+board+'<rect x="117" y="66" width="8" height="74" rx="3" fill="var(--wood)" stroke="var(--woodd)"/>'+'<rect x="108" y="56" width="26" height="11" rx="3" fill="#6b6b62"/>'+person({h:[92,40],n:[86,54],p:[66,116],aN:[[104,80],[116,62]],aF:[[66,88],[52,104]],lN:[[98,96],[102,140]],lF:[[56,148],[26,150]],c:"var(--rs)",armLate:true})+stick(48,104,206,104,3)+curve([[50,102],[118,100],[121,106],[204,102]],"var(--r1)",1.5)+L(176,30,"bilek baldıra kilitli,",{s:9.5})+L(176,42,"yatak sabit",{s:9.5})+L(176,124,"ayak tabanı tutar",{s:9.5})+AR([[180,90],[150,90]])+AR([[194,90],[226,90]])),c:"Sol ayağınla tabanı bas, sol bileğini sol baldırına kilitle ve yatağı sabit tut. Mil dik dursun. Yayı <b>uzun, düzenli</b> hareketlerle it-çek."},
 {s:S('<rect x="40" y="90" width="160" height="16" fill="var(--wood)" stroke="var(--woodd)"/>'+'<rect x="108" y="40" width="12" height="54" rx="4" fill="var(--wood)"/>'+poly([[108,106],[132,106],[136,126],[104,126]],"#1a1208")+dot(120,118,6,"var(--fire)")+'<path d="M110,90 q-6,-20 4,-40 M126,90 q8,-24 -2,-48" stroke="var(--ash)" stroke-width="3" fill="none" opacity=".8"/>'+L(120,148,"bol duman + koyu toz = kor",{s:10})+L(120,162,"yavaşla, 10 tur daha, dur",{s:9.5})),c:"Koyu toz çentikte birikir ve kendi kendine dumanlanırsa <b>kor</b> oluşmuştur. Hızlanma, 10 tur daha çek, mili dikkatle kaldır."},
 {s:S(nest(120,110)+'<ellipse cx="120" cy="110" rx="30" ry="18" fill="none" stroke="#cdb77a" stroke-width="3"/>'+dot(120,110,5,"var(--fire)")+hand(84,118,160)+hand(156,118,20)+AR([[120,40],[120,86]],"var(--r2)")+L(120,30,"hafif, sürekli üfle",{s:9.5})+L(120,160,"kavı kapat, sar, alev çıkınca ateşe koy",{s:9.5})),c:"Koru yaprakla birlikte <b>kav yuvasına</b> aktar, yuvayı hafifçe kapat ve yukarıya kaldırarak alçaktan sürekli üfle. Alev çıkınca hazırladığın ateşin altına koy."}
];
H.stp.ferro=[
 {s:S(nest(140,140)+stick(60,150,138,132,6)+'<rect x="56" y="140" width="14" height="22" rx="3" fill="#333"/>'+L(120,40,"çubuğun ucu kavın içinde",{s:10})+L(80,175,"çubuk",{s:9.5})),c:"Ateş çubuğunun ucunu kavın <b>içine, dibine</b> daya. Kav olarak vazelinli pamuk, kuru ot ya da ince kabuk talaşı kullanabilirsin."},
 {s:S(nest(140,140)+stick(60,150,138,132,6)+line([[96,128],[120,148]],"#bbb",4)+hand(108,124,250)+AR([[80,166],[56,174]])+L(52,160,"çubuğu geri çek",{s:9.5})+(function(){var s="";for(var i=0;i<14;i++){var a=i*0.4;s+=line([[120,140],[128+Math.cos(a)*12+i,142+Math.sin(a)*6]],"#ffd27a",1.5)}return s})()+L(150,100,"kazıyıcı sabit, 45°",{s:9.5})),c:"Kazıyıcıyı (ya da bıçağın sırtını) sabit tut, <b>çubuğu geriye çek</b>. Böylece kavı dağıtmazsın, kıvılcım kavın tam içine düşer. Ateş çubuğu ıslakken bile çalışır."}
];
})();

/* =================================================================
   İLK YARDIM
   ================================================================= */
(function(){
var fl=ground(150);
/* sırtüstü yatan hasta (yandan) */
function supine(o){o=o||{};return person({h:[36,134],n:[52,138],p:[122,140],aN:o.aN||[[86,142],[116,146]],aF:o.aF||[[86,138],[112,140]],lN:[[164,140],[206,142]],lF:[[164,138],[204,138]],c:"var(--pt)",hr:-90})}
/* diz çökmüş kurtarıcı (hastanın arkasında) */
function rescuerK(cx,o){o=o||{};var hx=cx,hy=o.hy||48;return person({h:[hx,hy],n:[hx,hy+14],p:[hx+8,o.py||118],aN:o.aN,aF:o.aF,lN:[[hx+40,o.ky||132],[hx+54,148]],lF:[[hx+36,o.ky||130],[hx+50,146]],c:"var(--rs)",armLate:true})}

/* ---- KPR ---- */
H.stp.cpr=[
 {s:S(fl+supine()+dot(36,134,13,"none","var(--arw)")+hand(40,122,-60)+hand(22,146,170)+L(120,40,"Omuzlardan dokun, seslen:",{s:10})+L(120,54,"\"İyi misin?\" → 112",{s:10,b:1})+AR([[70,112],[48,126]])+L(156,110,"alından bastır,",{s:9.5})+L(156,122,"çeneyi kaldır",{s:9.5})),c:"Yanıt yoksa 112'yi aratır. Alından bastır, çeneyi kaldır; <b>10 saniye</b> bak-dinle-hisset. Normal nefes yoksa (hıçkırık gibi nefes = yok) hemen KPR."},
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+poly([[70,30],[170,30],[180,150],[60,150]],"var(--pt)","var(--pbg)",2)+dot(120,18,16,"var(--skin)")+line([[120,50],[120,112]],"var(--lbl)",2,"3 3")+dot(102,74,3,"var(--lbl)")+dot(138,74,3,"var(--lbl)")+'<ellipse cx="120" cy="92" rx="16" ry="11" fill="var(--skin)" stroke="var(--pbg)" stroke-width="2"/><ellipse cx="120" cy="88" rx="14" ry="10" fill="var(--skin)" stroke="var(--pbg)" stroke-width="2" opacity=".9"/>'+line([[108,88],[132,88]],"var(--pbg)",1.2)+L(194,90,"göğsün",{a:"start",s:9.5})+L(194,102,"ortası",{a:"start",s:9.5})+L(56,124,"kemiğin alt",{a:"end",s:9.5})+L(56,136,"yarısı",{a:"end",s:9.5})+L(120,170,"avuç kökü, eller kenetli, parmaklar kalkık",{s:9.5})),c:"Elinin <b>avuç kökünü</b> göğsün ortasına (göğüs kemiğinin alt yarısı) koy, diğer elini üstüne kenetle. Parmaklar göğse bastırmasın."},
 {s:S(fl+rescuerK(84,{hy:34,py:110,aN:[[86,72],[86,126]],aF:[[82,72],[84,126]]})+supine()+line([[86,52],[86,126]],"var(--lbl)",1,"3 3")+AR([[60,96],[60,124]])+AR([[60,124],[60,98]])+L(40,90,"5–6 cm",{s:10,b:1})+L(170,40,"100–120/dk",{s:12,b:1})+L(170,56,"kollar düz,",{s:9.5})+L(170,68,"omuzlar ellerin",{s:9.5})+L(170,80,"tam üstünde",{s:9.5})),c:"<b>30 bası:</b> kollar düz, omuzlar ellerin üstünde, gövdenle bastır. 5–6 cm, dakikada 100–120. Her basıdan sonra göğsün geri gelmesine izin ver."},
 {s:S(fl+person({h:[44,108],n:[56,104],p:[80,132],aN:[[40,122],[30,128]],aF:[[52,124],[44,132]],lN:[[104,140],[128,148]],lF:[[100,138],[124,146]],c:"var(--rs)",hr:40,armLate:true})+supine()+AR([[178,108],[150,128]])+L(186,98,"göğüs kalkıyor mu?",{s:9.5})+L(60,40,"burnu kapat,",{s:9.5})+L(60,52,"ağzı kapat, 1 sn üfle",{s:9.5})),c:"<b>2 nefes:</b> başı geri, burnu kıstır, ağzını kapat, göğsü kaldıracak kadar 1 saniyede üfle. İstemiyor/yapamıyorsan nefessiz, kesintisiz bası yap."}
];

/* ---- Derlenme (koma) pozisyonu — üstten ---- */
var sh=[[64,72],[64,108]],hp=[[126,78],[126,102]];
H.stp.recovery=[
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+topBody({hd:[42,90],sh:sh,hp:hp,a1:[[92,64],[118,70]],a2:[[66,140],[40,142]],l1:[[168,80],[208,80]],l2:[[168,100],[208,100]]})+L(120,170,"üstten görünüş · sen alttasın",{s:9})+AR([[96,150],[72,140]])+L(110,160,"yakın kol dik açıyla, avuç yukarı",{s:9.5})),c:"Yanına diz çök. <b>Sana yakın kolu</b> gövdeye dik açıyla, dirsek bükük, avuç yukarı koy."},
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+topBody({hd:[42,90],sh:sh,hp:hp,a1:[[86,96],[48,102]],a2:[[66,140],[40,142]],l1:[[168,80],[208,80]],l2:[[168,100],[208,100]]})+hand(50,108,90)+L(150,40,"uzak elin sırtı yakın yanağına",{s:9.5})),c:"<b>Uzak eli</b> göğsünün üstünden getir, elinin sırtını sana yakın yanağına daya ve orada tut."},
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+topBody({hd:[42,90],sh:sh,hp:hp,a1:[[86,96],[48,102]],a2:[[66,140],[40,142]],l1:[[160,74],[150,96]],l2:[[168,100],[208,100]],order:["l2","t","l1","a1","a2"]})+hand(154,100,80)+L(186,60,"uzak diz yukarı,",{s:9.5})+L(186,72,"taban yerde",{s:9.5})),c:"Diğer elinle <b>uzak dizi</b> yukarı kaldır; ayak tabanı yerde olsun."},
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+topBody({hd:[44,108],sh:[[66,82],[66,106]],hp:[[126,86],[126,104]],a1:[[64,118],[48,118]],a2:[[70,140],[44,146]],l1:[[150,134],[176,134]],l2:[[168,100],[208,104]],hf:-5,order:["l2","t","l1","a2","a1"]})+AR([[200,60],[200,120]])+L(206,50,"dizden",{s:9.5})+L(206,62,"kendine çek",{s:9.5})+L(120,170,"yan yattı: üst diz dik açıda öne",{s:9.5})),c:"Dizden kendine doğru çekerek onu sana dönük <b>yan yatır</b>. Üstteki bacak kalça ve dizden dik açıda kalsın."},
 {s:S(fl+'<path d="M40,136 a12,12 0 1 1 0.1,0" fill="var(--skin)"/>'+person({h:[40,128],n:[54,130],p:[124,134],aN:[[60,146],[44,140]],aF:[[78,146],[66,148]],lN:[[154,120],[164,146]],lF:[[164,142],[206,146]],c:"var(--pt)",hr:-80})+AR([[24,108],[30,122]])+L(40,96,"baş geride, ağız yere bakar",{s:9.5})+L(170,100,"her dakika nefes kontrolü",{s:9.5})),c:"Başı hafifçe geriye eğ: ağız yere baksın, kusmuk dışarı aksın. Üstünü ört, <b>her dakika</b> nefesi kontrol et."}
];

/* ---- Basınçlı sargı (önkol yakın plan) ---- */
function forearm(){return limb([[10,96],[150,92],[196,90]],30,"var(--skin)")+dot(206,90,16,"var(--skin)")+line([[214,80],[230,76]],"var(--skin)",7)+line([[216,90],[234,90]],"var(--skin)",7)+line([[214,100],[230,104]],"var(--skin)",7)+'<rect x="0" y="76" width="22" height="40" fill="var(--pt)"/>'}
function wound(){return '<ellipse cx="110" cy="92" rx="14" ry="5" fill="var(--blood)"/>'+line([[110,98],[108,112]],"var(--blood)",2.5)}
function pad(x){return '<rect x="'+((x||94)-0)+'" y="76" width="34" height="32" rx="3" fill="#e9e5d7" stroke="#999"/>'}
function wraps(n,x0){var s="";for(var i=0;i<n;i++){var x=(x0||70)+i*13;s+=poly([[x,74],[x+14,72],[x+20,112],[x+6,114]],"#d8d2c2","#9a9383",1)}return s}
H.stp.pressure=[
 {s:S(forearm()+wound()+pad(94)+hand(112,80,-70)+hand(122,84,-110)+AR([[112,30],[112,60]])+L(160,30,"sertçe bastır",{s:10,b:1})+L(160,44,"en az 3–5 dk",{s:9.5})),c:"Temiz gazlı bez/bez katlayıp yaraya koy, <b>avuçla sertçe bastır</b>. Kaldırıp bakma."},
 {s:S(forearm()+pad(94)+wraps(6,64)+AR([[62,130],[150,130]])+L(110,150,"bezin üstünden sıkı, üst üste sar",{s:9.5})),c:"Bandajı pedin <b>üstünden</b> sıkıca sar; her tur bir öncekinin yarısını örtsün. Pedi tamamen kapat."},
 {s:S(forearm()+pad(94)+wraps(6,64)+'<ellipse cx="110" cy="90" rx="10" ry="6" fill="var(--blood)" opacity=".8"/>'+'<rect x="92" y="56" width="38" height="20" rx="3" fill="#e9e5d7" stroke="#999"/>'+AR([[110,30],[110,52]])+L(170,40,"ilk bezi ÇIKARMA,",{s:9.5,b:1})+L(170,54,"üstüne yenisini ekle",{s:9.5})),c:"Kan sızarsa ilk bezi <b>çıkarma</b>. Üstüne yeni ped koy, tekrar sar ve bastır. Durmuyorsa ve kol/bacaksa → turnike."},
 {s:S(forearm()+pad(94)+wraps(6,64)+hand(220,74,-60)+dot(232,92,9,"none","var(--arw)")+L(150,140,"parmak ucuna bas: renk 2 sn'de",{s:9.5})+L(150,154,"geri gelmeli. Gelmiyorsa biraz gevşet",{s:9.5})),c:"Dolaşımı kontrol et: tırnağa bas, renk <b>2 saniyede</b> geri gelmeli. Parmaklar morarır, uyuşursa sargıyı hafifçe gevşet."}
];

/* ---- Turnike (uyluk yakın plan) ---- */
function thigh(){return limb([[0,90],[150,94],[236,100]],44,"var(--ptl)")+'<ellipse cx="190" cy="98" rx="14" ry="20" fill="var(--ptl)" stroke="var(--pbg)" stroke-width="2"/>'+L(190,138,"diz",{s:9})}
function tq(x,tight){return '<rect x="'+x+'" y="70" width="18" height="52" rx="3" fill="#2a2a2a" stroke="#000"/>'+(tight?line([[x+9,58],[x+9,134]],"#555",6):line([[x-4,96],[x+22,96]],"#555",6))+'<rect x="'+(x-2)+'" y="'+(tight?60:90)+'" width="22" height="12" rx="2" fill="#c33"/>'}
var tw=thigh()+'<ellipse cx="150" cy="94" rx="10" ry="6" fill="var(--blood)"/>'+line([[150,100],[148,118]],"var(--blood)",3);
H.stp.tourniquet=[
 {s:S(tw+'<rect x="86" y="70" width="18" height="52" rx="3" fill="#2a2a2a" stroke="#000"/>'+dim(95,140,150,140,"5–7 cm",0,-6)+L(60,40,"yaranın ÜSTÜ",{s:10,b:1})+L(60,54,"eklemin üstüne değil",{s:9.5})+L(150,60,"yara",{s:9.5})),c:"Turnikeyi yaranın <b>5–7 cm üstüne</b> (kalbe yakın taraf) sar. Diz/dirsek ekleminin üstüne takma. Emin değilsen: uzvun mümkün olduğunca yukarısı."},
 {s:S(tw+tq(86,false)+AR([[60,150],[120,150]])+L(60,40,"kayışı sıkıca çek, yapıştır",{s:10})),c:"Kayışı <b>sıkıca</b> çek ve cırtla yapıştır. Arasına en fazla 1–2 parmak sığmalı."},
 {s:S(tw+tq(86,true)+'<path d="M80,46 a18,18 0 1 1 30,0" fill="none" stroke="var(--arw)" stroke-width="2.4" stroke-dasharray="5 4"/>'+L(170,40,"kanama durana",{s:10,b:1})+L(170,54,"kadar çevir",{s:10,b:1})+L(170,74,"çok acıtır: normal",{s:9.5})),c:"Çubuğu (kol) <b>kanama durana kadar</b> çevir. Çok acıtır, bu normaldir. Dizden aşağısında nabız kaybolmalı."},
 {s:S(tw+tq(86,true)+'<rect x="20" y="20" width="96" height="30" rx="4" fill="#e9e5d7"/>'+'<text x="68" y="41" font-size="16" text-anchor="middle" font-weight="700" fill="#111">T 14:32</text>'+L(170,40,"kilitle, saati yaz",{s:10,b:1})+L(170,54,"gevşetme",{s:9.5})+L(170,66,"sağlıkçıya teslim",{s:9.5})),c:"Çubuğu klipsine kilitle. <b>Saati</b> turnikeye veya alnına yaz. Üstünü örtme; kendin gevşetme, sağlıkçıya teslim et."}
];

/* ---- Kol askısı (üçgen sargı, önden) ---- */
function torso(){return poly([[70,40],[170,40],[176,170],[64,170]],"var(--pt)","var(--pbg)",2)+dot(120,22,18,"var(--skin)","var(--pbg)")+limb([[166,46],[188,110],[188,170]],18,"var(--pt)")}
function injArm(){return limb([[74,46],[60,108],[150,104]],18,"var(--pt)")+dot(156,102,8,"var(--skin)")}
H.stp.sling=[
 {s:S(torso()+poly([[176,44],[50,96],[176,168]],"#e9e5d7","#999",1.5)+injArm()+L(40,90,"tepe →",{s:9.5})+L(40,102,"dirsek",{s:9.5})+L(210,40,"üst uç",{s:9.5})+L(210,52,"sağlam omza",{s:9.5})),c:"Üçgen sargıyı kolun <b>altına</b> yerleştir: tepe dirseğin arkasına, üst uç sağlam taraftaki omza."},
 {s:S(torso()+poly([[176,44],[50,96],[176,168]],"#e9e5d7","#999",1.5)+injArm()+poly([[176,168],[160,110],[86,44],[72,52]],"#e0dbcc","#999",1.5)+AR([[170,150],[110,80],[84,52]])),c:"Alt ucu kolun <b>önünden</b> yukarı, yaralı taraftaki omza getir."},
 {s:S(torso()+poly([[176,44],[50,96],[176,168]],"#e9e5d7","#999",1.5)+injArm()+poly([[176,168],[160,110],[86,44],[72,52]],"#e0dbcc","#999",1.5)+dot(80,44,7,"#d8d2c2","#999")+L(40,30,"köprücük kemiği",{s:9.5})+L(40,42,"çukurunda bağla",{s:9.5})+L(196,92,"el dirsekten",{s:9.5})+L(196,104,"biraz yukarı",{s:9.5})),c:"Uçları boyun yanında, köprücük kemiği çukurunda <b>camadan</b> ile bağla. El dirsekten biraz yukarıda dursun."},
 {s:S(torso()+poly([[176,44],[54,96],[150,112],[176,168]],"#e9e5d7","#999",1.5)+injArm()+dot(56,98,5,"#999")+dot(160,102,8,"var(--skin)")+L(30,124,"dirseği",{s:9.5})+L(30,136,"kıvırıp tuttur",{s:9.5})+L(196,120,"parmaklar",{s:9.5})+L(196,132,"açıkta",{s:9.5})),c:"Dirsekteki tepeyi kıvır, iğne veya düğümle tuttur. Parmak uçlarını açıkta bırak; renk ve hissi kontrol et."}
];

/* ---- Atel (bacak) ---- */
function leg2(){return limb([[0,100],[120,100],[230,100]],34,"var(--ptl)")+'<rect x="222" y="80" width="16" height="40" rx="5" fill="var(--shoe)"/>'+line([[118,86],[126,114]],"var(--blood)",2,"3 3")+L(122,74,"kırık",{s:9.5})}
function boards(){return '<rect x="20" y="74" width="196" height="9" rx="2" fill="var(--wood)" stroke="var(--woodd)"/><rect x="20" y="117" width="196" height="9" rx="2" fill="var(--wood)" stroke="var(--woodd)"/>'}
function tie(x){return '<rect x="'+x+'" y="70" width="10" height="60" rx="2" fill="#e9e5d7" stroke="#999"/>'+dot(x+5,70,4,"#d8d2c2","#999")}
H.stp.splint=[
 {s:S(leg2()+boards()+L(120,30,"altındaki VE üstündeki eklemi geçsin",{s:10})+L(120,160,"ped: bez, giysi, ot (kemik çıkıntılarına)",{s:9.5})),c:"İki sert parçayı (tahta, baton, kalın dal) uzvun iki yanına koy. Atel, kırığın <b>altındaki ve üstündeki eklemi</b> geçsin. Araya yumuşak dolgu koy."},
 {s:S(leg2()+boards()+tie(40)+tie(82)+tie(160)+tie(196)+L(120,30,"kırığın üstü ve altından bağla",{s:10})+L(120,160,"kırığın tam üstüne bağ yok",{s:9.5,b:1})),c:"Kırığın <b>üstünden ve altından</b> bağla, tam üstüne değil. Düğümler atelin üstünde olsun, sıkı ama kan kesmeyecek kadar."},
 {s:S(leg2()+boards()+tie(40)+tie(82)+tie(160)+tie(196)+dot(232,100,12,"none","var(--arw)")+L(120,30,"her 15 dk: renk, ısı, his",{s:10,b:1})+L(120,160,"morarma/uyuşma → bağları gevşet",{s:9.5})),c:"Her 15 dakikada parmak/ayak ucu renk, ısı ve hissini kontrol et. Ateli yoksa: <b>sağlam bacağa</b> bağla (bacak bacağa)."}
];

/* ---- Doğaçlama sedye ---- */
H.stp.stretcher=[
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+stick(20,60,220,60,6)+stick(20,120,220,120,6)+poly([[60,62],[110,62],[110,118],[60,118]],"var(--rs)","var(--pbg)",2)+poly([[120,62],[170,62],[170,118],[120,118]],"var(--pt)","var(--pbg)",2)+L(120,40,"2 sırık (≈2 m) + 2–3 mont/ceket",{s:10})+L(120,150,"montların fermuarını kapat, kolları içe",{s:9.5})+L(120,162,"sırıkları kollardan geçir",{s:9.5})),c:"İki sağlam sırık (≈2 m) ve 2–3 mont: fermuarları kapat, <b>kolları içe</b> çevir, sırıkları kolların içinden geçir."},
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+poly([[30,40],[210,40],[210,140],[30,140]],"#5a5a4a")+stick(90,30,90,150,6)+stick(150,30,150,150,6)+AR([[60,90],[110,90]])+AR([[190,90],[130,90]])+L(120,166,"battaniye: üçe katla, ağırlık kilitler",{s:9.5})),c:"Battaniye ile: battaniyeyi ser, sırıkları 1/3 ve 2/3'e koy, kenarları <b>üçe katla</b>. Hastanın ağırlığı katları kilitler."},
 {s:S(ground(160)+stick(30,112,210,112,5)+'<ellipse cx="120" cy="104" rx="64" ry="9" fill="var(--pt)"/>'+dot(186,102,8,"var(--skin)")+person({h:[28,40],n:[30,56],p:[32,104],aN:[[34,82],[36,110]],aF:[[30,82],[30,110]],lN:[[38,132],[40,160]],lF:[[26,132],[22,160]],c:"var(--rs)"})+person({h:[212,40],n:[210,56],p:[208,104],aN:[[206,82],[206,110]],aF:[[210,82],[210,110]],lN:[[214,132],[218,160]],lF:[[202,132],[198,160]],c:"var(--rs)"})+AR([[60,30],[100,30]])+L(90,20,"ayaklar önde",{s:9.5})),c:"Önce sağlam biriyle dene. Hasta <b>ayakları önde</b> taşınır (yokuş yukarıda baş önde). Mümkünse 4 kişi, tek komutla kaldırın."}
];

/* ---- Heimlich ---- */
function choking(x){return person({h:[x,40],n:[x+2,54],p:[x+8,112],aN:[[x+14,76],[x+6,64]],aF:[[x+10,74],[x+2,62]],lN:[[x+10,140],[x+12,168]],lF:[[x+2,140],[x-2,168]],c:"var(--pt)"})}
H.stp.heimlich=[
 {s:S(ground(170)+person({h:[96,64],n:[104,74],p:[132,118],aN:[[118,96],[112,112]],aF:[[114,94],[106,108]],lN:[[134,144],[136,170]],lF:[[126,144],[124,170]],c:"var(--pt)"})+person({h:[160,40],n:[160,54],p:[166,112],aN:[[148,72],[124,80]],aF:[[154,78],[140,90]],lN:[[168,140],[170,170]],lF:[[160,140],[158,170]],c:"var(--rs)",armLate:true})+L(60,30,"öne eğ",{s:10,b:1})+L(60,44,"5 sert vuruş,",{s:9.5})+L(60,56,"kürek kemikleri arası",{s:9.5})+AR([[110,40],[120,66]])),c:"Konuşamıyor, nefes alamıyorsa: öne eğ, avuç köküyle kürek kemikleri arasına <b>5 sert vuruş</b>."},
 {s:S('<rect width="240" height="180" fill="var(--pbg)"/>'+poly([[70,20],[170,20],[180,170],[60,170]],"var(--pt)","var(--pbg)",2)+dot(120,112,5,"var(--pbg)")+line([[120,20],[120,72]],"var(--lbl)",1.5,"3 3")+'<rect x="104" y="80" width="32" height="22" rx="9" fill="var(--skin)" stroke="var(--pbg)" stroke-width="2"/>'+hand(132,92,10)+L(200,70,"göğüs kemiği altı",{s:9.5})+L(200,120,"göbek üstü",{s:9.5})+L(120,150,"yumruk, başparmak içe",{s:10})),c:"Arkasına geç. Yumruğunu <b>göbeğin üstüne, göğüs kemiğinin altına</b> koy (başparmak tarafı karna); diğer elinle kavra."},
 {s:S(ground(170)+choking(100)+person({h:[150,40],n:[146,54],p:[142,112],aN:[[126,84],[112,94]],aF:[[132,80],[114,92]],lN:[[150,140],[156,170]],lF:[[134,140],[130,170]],c:"var(--rs)",armLate:true})+AR([[70,100],[100,96],[112,78]])+L(48,120,"içe ve yukarı",{s:10,b:1})+L(48,134,"5 ani bası",{s:9.5})+L(190,150,"5 sırt + 5 karın,",{s:9.5})+L(190,162,"bilinç giderse KPR",{s:9.5})),c:"Hızla <b>içeri ve yukarı</b> 5 kez çek. Çıkmazsa 5 sırt + 5 karın olarak devam. Bilincini kaybederse yere yatır, 112, KPR."}
];
})();
})();

/* ---- İyot ile su arıtma ---- */
(function(){
var H=window.HK,A=H.art,L=A.lab,S=A.svg,AR=A.arrow,poly=A.poly,line=A.line,dot=A.dot;
function bottle(x,y,lvl,tint,cap,inv){var w=50,h=96,g='<g'+(inv?' transform="rotate(180 '+(x+w/2)+' '+(y+h/2)+')"':'')+'>';
  g+='<rect x="'+x+'" y="'+(y+16)+'" width="'+w+'" height="'+(h-16)+'" rx="10" fill="#1a1f24" stroke="#8aa0b0" stroke-width="2"/>';
  g+='<rect x="'+(x+3)+'" y="'+(y+16+(h-16)*(1-lvl))+'" width="'+(w-6)+'" height="'+Math.max(0,(h-16)*lvl-3)+'" rx="7" fill="'+(tint||"#3a6f9a")+'" opacity=".85"/>';
  g+='<rect x="'+(x+14)+'" y="'+(y+4)+'" width="22" height="14" fill="#1a1f24" stroke="#8aa0b0" stroke-width="2"/>';
  if(cap)g+='<rect x="'+(x+11)+'" y="'+(y-4)+'" width="28" height="11" rx="2" fill="#c33"/>';
  return g+'</g>'}
function clock(cx,cy,r,m){var a=m/60*Math.PI*2-Math.PI/2;return dot(cx,cy,r,"#1a1f24","#8aa0b0")+line([[cx,cy],[cx,cy-r*0.7]],"var(--lbl)",2)+line([[cx,cy],[cx+Math.cos(a)*r*0.85,cy+Math.sin(a)*r*0.85]],"var(--ac)",2.5)+'<path d="M'+cx+','+(cy-r+3)+' A'+(r-3)+','+(r-3)+' 0 '+(m>30?1:0)+' 1 '+(cx+Math.cos(a)*(r-3))+','+(cy+Math.sin(a)*(r-3))+'" fill="none" stroke="var(--ac)" stroke-width="5" opacity=".45"/>'}
H.stp.iodine=[
 {s:S(bottle(60,50,0.0)+'<path d="M40,30 h70 l-14,30 h-42z" fill="#c9b27a" opacity=".9"/>'+line([[75,20],[75,30]],"#6a8aa0",3)+line([[85,60],[85,120]],"#6a8aa0",3,"2 4")+bottle(150,50,0.75,"#6e7a52")+L(170,40,"bulanık su",{s:9.5})+L(75,170,"bezden süz / çökelt",{s:10})+L(170,170,"önce berraklaştır",{s:9.5})),c:"Bulanık suyu önce <b>dinlendirip çökelt ya da bir bezden süz</b>. Çamur ve yaprak iyodu tüketir, mikrobu korur."},
 {s:S(bottle(95,60,0.8)+'<path d="M112,10 h16 v26 l-8,10 l-8,-10z" fill="#7a3a12" stroke="#c97a3a"/>'+dot(120,52,3,"#c97a3a")+L(120,170,"%2 tentürdiyot",{s:10,b:1})+L(196,70,"berrak: 5 damla / L",{s:10})+L(196,86,"bulanık/soğuk:",{s:10})+L(196,100,"10 damla / L",{s:10,b:1})+L(40,80,"yalnız %2",{s:9.5})+L(40,92,"için geçerli",{s:9.5})),c:"Litre başına <b>5 damla %2'lik tentürdiyot</b> damlat (bulanık ya da çok soğuk suda 10 damla). Etiketi kontrol et: bu dozlar yalnızca %2'lik tentürdiyot içindir. Tablet kullanıyorsan prospektüsteki talimata uy."},
 {s:S(bottle(30,60,0.8,"#8a7a3a",true)+clock(140,70,26,30)+clock(204,70,26,59)+L(140,118,"ılık, berrak",{s:9.5})+L(140,132,"30 dk",{s:12,b:1})+L(204,118,"soğuk (0–5 °C)",{s:9.5})+L(204,132,"2–3 saat",{s:12,b:1})+L(120,168,"hafif sarı renk: doz yeterli",{s:10})),c:"Kapağı kapat, çalkala, <b>bekle</b>: ılık ve berrak suda 30 dakika, soğuk suda <b>2–3 saat</b>. Kışın su ısınsın diye şişeyi montunun içinde taşı."},
 {s:S(bottle(40,26,0.8,"#8a7a3a",true,true)+AR([[66,22],[66,8]])+L(66,150,"kapağı gevşet, ters çevir:",{s:9.5})+L(66,162,"yivler de yıkansın",{s:9.5})+bottle(150,40,0.8,"#3a6f9a")+'<rect x="196" y="22" width="24" height="12" rx="3" fill="#e8b23a"/>'+L(208,16,"C vit.",{s:9.5})+L(176,150,"tat için C vitamini",{s:9.5})+L(176,162,"YALNIZCA bekledikten sonra",{s:9.5,b:1})),c:"Bekleme bitince kapağı gevşetip şişeyi ters çevir: <b>ağız ve yivler</b> de arınsın (tek damla arıtılmamış su bile hasta eder). Tadı düzeltmek için C vitamini ya da toz içecek eklemek istersen bunu ancak <b>bekleme süresi bittikten sonra</b> yap."}
];
})();
