/* Adım adım çizimler: çizim araçları + düğümler. Saf SVG, renkler CSS değişkenlerinden (gece modunda kırmızı). */
(function(){
var H=window.HK=window.HK||{};
var A=H.art={};

/* ---------- Catmull-Rom yolu: alt parçalar aynı eğriyi izler (üst/alt geçişler için) ---------- */
function cr(pts,a,b){
  a=a||0;b=(b==null)?pts.length-1:b;
  var g=function(i){return pts[Math.max(0,Math.min(pts.length-1,i))]};
  var d="M"+f(g(a)[0])+","+f(g(a)[1]);
  for(var i=a;i<b;i++){var p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2);
    d+="C"+f(p1[0]+(p2[0]-p0[0])/6)+","+f(p1[1]+(p2[1]-p0[1])/6)+" "+f(p2[0]-(p3[0]-p1[0])/6)+","+f(p2[1]-(p3[1]-p1[1])/6)+" "+f(p2[0])+","+f(p2[1]);}
  return d;
}
function f(n){return Math.round(n*10)/10}
A.cr=cr;

/* ---------- Halat: zemin + üst geçiş parçaları ---------- */
var RC={1:["var(--r1)","var(--r1d)"],2:["var(--r2)","var(--r2d)"]};
function layers(d,c,w,cap){var col=RC[c||1];w=w||10;cap=cap||"butt";
  return '<path d="'+d+'" fill="none" stroke="var(--pbg)" stroke-width="'+(w+6)+'" stroke-linecap="'+cap+'" stroke-linejoin="round"/>'+
  '<path d="'+d+'" fill="none" stroke="'+col[1]+'" stroke-width="'+(w+2)+'" stroke-linecap="'+cap+'" stroke-linejoin="round"/>'+
  '<path d="'+d+'" fill="none" stroke="'+col[0]+'" stroke-width="'+(w-1)+'" stroke-linecap="'+cap+'" stroke-linejoin="round"/>'+
  '<path d="'+d+'" fill="none" stroke="'+col[1]+'" stroke-width="'+(w-1)+'" stroke-dasharray="1.6 4.4" stroke-linecap="butt" opacity=".5"/>';}
/* rope(pts,{c,w,n:görünen nokta sayısı,over:[[a,b]],tip:true}) -> {b:zemin,o:üst} */
A.rope=function(pts,o){o=o||{};var n=o.n==null?pts.length:Math.min(o.n,pts.length),P=pts.slice(0,n);
  var base=layers(cr(P),o.c,o.w,"round"),ov="";
  (o.over||[]).forEach(function(r){var a=r[0],b=Math.min(r[1],n-1);if(b>a)ov+=layers(cr(P,a,b),o.c,o.w,"butt")});
  if(o.tip!==false){var e=P[n-1],q=P[n-2]||e,ang=Math.atan2(e[1]-q[1],e[0]-q[0]);ov+=tipMark(e,ang,o.w||10)}
  return {b:base,o:ov};
};
function tipMark(p,ang,w){ /* uç: açık renk bant */ var x=p[0]-Math.cos(ang)*3,y=p[1]-Math.sin(ang)*3,dx=-Math.sin(ang)*(w/2+1),dy=Math.cos(ang)*(w/2+1);
  return '<path d="M'+f(x+dx)+','+f(y+dy)+'L'+f(x-dx)+','+f(y-dy)+'" stroke="var(--tipc)" stroke-width="3"/>';}
A.ropes=function(list){var b="",o="";list.forEach(function(r){b+=r.b;o+=r.o});return b+o};

/* ---------- Ok, etiket, panel ---------- */
A.arrow=function(pts,col){col=col||"var(--arw)";var n=pts.length,e=pts[n-1],q=pts[n-2],ang=Math.atan2(e[1]-q[1],e[0]-q[0]),L=9;
  var h=[[e[0]+Math.cos(ang)*2,e[1]+Math.sin(ang)*2],[e[0]-Math.cos(ang-0.5)*L,e[1]-Math.sin(ang-0.5)*L],[e[0]-Math.cos(ang+0.5)*L,e[1]-Math.sin(ang+0.5)*L]];
  return '<path d="'+cr(pts)+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-dasharray="6 4" stroke-linecap="round"/><path d="M'+h.map(function(p){return f(p[0])+","+f(p[1])}).join("L")+'z" fill="'+col+'"/>';};
A.lab=function(x,y,t,o){o=o||{};return '<text x="'+x+'" y="'+y+'" font-size="'+(o.s||10.5)+'" fill="'+(o.c||"var(--lbl)")+'" text-anchor="'+(o.a||"middle")+'" font-weight="'+(o.b?700:400)+'" style="paint-order:stroke" stroke="var(--pbg)" stroke-width="3">'+t+'</text>';};
A.lead=function(x1,y1,x2,y2){return '<path d="M'+x1+','+y1+'L'+x2+','+y2+'" stroke="var(--lbl)" stroke-width="1" opacity=".6"/>'};
A.svg=function(inner,vb){return '<svg viewBox="'+(vb||"0 0 240 180")+'">'+inner+'</svg>'};
/* ahşap direk: yatay (h) veya dikey */
A.pole=function(x,y,w,h,vert){var g=vert?'<path d="M'+(x+w*0.3)+','+y+'v'+h+'M'+(x+w*0.65)+','+y+'v'+h+'" stroke="var(--woodd)" stroke-width="1.2" opacity=".6"/>':'<path d="M'+x+','+(y+h*0.3)+'h'+w+'M'+x+','+(y+h*0.68)+'h'+w+'" stroke="var(--woodd)" stroke-width="1.2" opacity=".6"/>';
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(vert?w/2.6:h/2.6)+'" fill="var(--wood)" stroke="var(--woodd)" stroke-width="1.5"/>'+g;};
A.hidden=function(pts,c){return '<path d="'+cr(pts)+'" fill="none" stroke="'+RC[c||1][0]+'" stroke-width="3" stroke-dasharray="3 4" opacity=".75"/>'};

/* ---------- Adım gösterici ---------- */
H.steps=function(id,title,note){var s=H.stp[id];if(!s)return "";
  var h='<!--S-->'+'<div class="stp" data-n="'+s.length+'"><div class="stp-h"><b>'+title+'</b><button class="stp-all" type="button">Hepsi</button></div>';
  s.forEach(function(x,i){h+='<div class="stp-s'+(i?"":" on")+'">'+x.s+'<div class="stp-c"><span class="stp-k">'+(i+1)+'/'+s.length+'</span>'+x.c+'</div></div>'});
  h+='<div class="stp-b"><button type="button" data-d="-1" aria-label="Önceki adım">‹ Geri</button><span class="stp-d">'+s.map(function(_,i){return '<i'+(i?"":' class="on"')+'></i>'}).join("")+'</span><button type="button" data-d="1" aria-label="Sonraki adım">İleri ›</button></div>'+(note?'<p class="stp-note">'+note+'</p>':'')+'</div><!--/S-->';
  return h;};
H.stp={};
var R=A.rope,RS=A.ropes,AR=A.arrow,L=A.lab,S=A.svg;

/* =================================================================
   KAZIK DÜĞÜMÜ (BOWLINE)
   ================================================================= */
(function(){
var P=[[120,2],[120,22],[120,40],[120,52],[120,64],[132,70],[141,84],[136,99],[120,105],[104,99],[98,84],[104,68],[118,58],[134,54],[150,62],[158,82],[160,108],[154,134],[138,156],[118,164],[98,156],[86,134],[88,114],
 [100,114],[107,100],[110,84],[110,68],[112,50],[116,40],[124,35],[134,40],[134,48],[128,62],[126,78],[124,94],[122,112],[122,130]];
var OV=[[1,3],[11,13],[7,10],[24,27],[30,33]];
function k(n,extra,cap){return {s:S(RS([R(P,{n:n,over:OV})])+(extra||"")),c:cap}}
var lab0=L(140,14,"ana halat",{a:"start"})+L(60,150,"ilmek",{a:"middle"});
H.stp.bowline=[
 k(23,lab0+L(172,64,"tavşan deliği",{a:"start"})+A.lead(170,62,146,70)+AR([[86,120],[96,110],[104,100]]),"Ana halatta küçük bir göz yap: uca giden kısım ana halatın <b>üstünden</b> geçsin. Altta istediğin büyüklükte ilmek bırak."),
 k(28,AR([[118,36],[124,30],[132,33]]),"<b>Tavşan delikten çıkar:</b> ucu gözün içinden <b>alttan yukarı</b> geçir."),
 k(31,AR([[134,46],[130,58],[128,72]]),"<b>Ağacın arkasından dolaş:</b> ucu ana halatın <b>arkasından</b> geçir."),
 k(37,"","<b>Deliğe geri gir:</b> ucu aynı gözden <b>yukarıdan aşağı</b> geri geçir. Uç, ilmeğin içinde kalmalı."),
 k(37,AR([[120,34],[120,16],[120,2]])+AR([[106,150],[104,166],[104,178]])+L(176,120,"uç ≥ 10×",{a:"start"})+L(176,132,"halat kalınlığı",{a:"start"}),"Ucu ve ilmeği birlikte tut, ana halatı çekerek sık. Uç kısmı en az 10 halat kalınlığı uzun bırak.")
];
})();

/* =================================================================
   KAZIK BAĞI (CLOVE HITCH) — dikey direk
   ================================================================= */
(function(){
var post=A.pole(106,8,28,166,true);
var a=R([[10,84],[40,84],[70,84],[100,84],[120,84],[137,84]],{tip:false});
var dg=[[104,120],[112,108],[120,96],[128,84],[137,72]];
var b=[[104,106],[118,106],[150,106],[180,106],[214,106]];
var h1=A.hidden([[134,86],[124,96],[110,112]]),h2=A.hidden([[134,74],[124,86],[110,102]]);
function base(){return post}
H.stp.clove=[
 {s:S(post+RS([a])+h1+RS([R([[104,118],[96,122],[88,126]])])+AR([[86,134],[110,110],[146,66]])+L(30,74,"ana halat")),c:"Halatı direğin <b>önünden</b> geçir, arkadan dolaştır; uç soldan aşağıda çıksın."},
 {s:S(post+RS([a,R(dg,{tip:false})])+h1+h2+RS([R([[104,106],[96,108],[88,112]])])+AR([[86,120],[140,120],[200,112]])),c:"Ucu <b>çapraz yukarı</b>, birinci turun üstünden geçir ve direğin arkasından tekrar dolaştır."},
 {s:S(post+RS([a,R(b),R(dg,{tip:false})])+h1+h2),c:"Uç soldan çıkınca çaprazın <b>altından</b> sağa geçir. Önde X görünür."},
 {s:S(post+RS([a,R(b),R(dg,{tip:false})])+AR([[40,94],[12,94]])+AR([[180,118],[222,118]])+L(30,74,"ana halat")+L(205,96,"uç")),c:"İki ucu zıt yönlere çekerek sık. Hızlı bağlanır ama sallantıda gevşeyebilir: kalıcı bağda ucuna bir yarım bağ ekle."}
];
})();

/* =================================================================
   VOLTA + İKİ YARIM BAĞ (ROUND TURN & TWO HALF HITCHES)
   ================================================================= */
(function(){
var pole=A.pole(14,48,212,28);
var st=[[88,178],[88,170],[88,160],[88,150],[88,138],[88,128],[88,118],[88,108],[88,96],[88,84],[88,76]];
var stOv=[[1,3],[5,7]];
var w1=[[88,77],[94,62],[100,47]],w2=[[104,77],[110,62],[116,47]];
var hid=A.hidden([[101,48],[104,62],[104,76]])+A.hidden([[117,48],[118,62],[118,76]]);
var E=[[118,76],[120,86],[121,98],[118,110],[106,118],[88,119],[74,115],[70,104],[78,96],[88,95],[100,96],[112,98],[121,99],[132,102],[138,112],[138,126],[136,140],[130,152],[112,160],[88,161],[74,157],[70,146],[78,138],[88,137],[100,138],[116,139],[136,141],[150,146],[156,160],[154,176]];
var eOv=[[8,10],[22,24],[1,3],[15,17]];
function k(n,extra,cap){return {s:S(pole+RS([R(st,{over:stOv,tip:false}),R(w1,{tip:false}),R(w2,{tip:false}),R(E,{n:n,over:eOv})])+hid+(extra||"")),c:cap}}
H.stp.roundturn=[
 k(4,L(60,172,"yük",{})+AR([[118,112],[104,122],[90,124],[72,118]]),"Ucu direğin üstünden <b>iki kez</b> dolaştır (volta). Yükü volta taşır, düğüm yalnızca kilitler."),
 k(16,AR([[138,128],[120,160],[88,166]]),"<b>1. yarım bağ:</b> ucu ana halatın arkasından dolaştır, önden geçip kendi altından çıkar."),
 k(30,"","<b>2. yarım bağ:</b> aynısını aynı yönde, birincinin altında tekrarla."),
 k(30,AR([[150,128],[150,100],[150,82]])+L(186,120,"yukarı",{a:"start"})+L(186,132,"kaydır, sık",{a:"start"}),"Yarım bağları direğe doğru kaydır ve sık. İki yarım bağ, ana halat üstünde bir kazık bağı oluşturur.")
];
})();

/* =================================================================
   GERGİ DÜĞÜMÜ (TAUT-LINE HITCH) — üstten görünüş
   ================================================================= */
(function(){
var stake='<circle cx="205" cy="95" r="9" fill="var(--wood)" stroke="var(--woodd)" stroke-width="2"/><circle cx="205" cy="95" r="3" fill="var(--woodd)"/>';
var P=[[4,60],[30,60],[52,60],[58,60],[64,60],[76,60],[90,60],[104,60],[110,60],[116,60],[132,60],[138,60],[144,60],[164,60],[186,61],[202,66],[216,80],[218,100],[212,118],[198,128],[180,130],[150,130],[124,130],[106,128],
 /*24 yükseliş*/[97,118],[96,100],[96,84],[96,72],[96,60],[96,48],[102,42],[110,48],[110,60],[111,72],[117,77],[124,70],[124,60],[124,48],[130,42],[138,48],[138,60],[140,72],
 /*42 dönüş*/[140,82],[134,92],[118,98],[96,99],[84,96],[79,86],[77,74],[76,60],[74,48],[66,42],[58,46],[58,60],[60,72],[69,79],[79,82],[88,81]];
/* üstte kalan parçalar */
var OV=[[2,4],[7,9],[10,12],[27,29],[35,37],[43,45],[46,49],[45,48]];
var lbl=L(30,48,"çadıra",{})+L(205,120,"kazık",{})+AR([[24,72],[6,72]]);
function k(n,extra,cap){return {s:S(stake+RS([R(P,{n:n,over:OV})])+lbl+(extra||"")),c:cap}}
H.stp.taut=[
 k(24,AR([[100,124],[96,104],[96,82]]),"Halatı kazığın etrafından dolaştır, ucu ana halata doğru geri getir."),
 k(34,AR([[112,74],[120,74],[124,66]]),"<b>1. tur:</b> ucu ana halatın üstünden geçirip altından dolaştır (kazığa doğru, ilmeğin içinde)."),
 k(42,AR([[140,78],[120,96],[90,96]]),"<b>2. tur:</b> aynı yönde, birincinin yanına ikinci bir tur at."),
 k(58,"","<b>Dış yarım bağ:</b> ucu iki turun üstünden çadır tarafına geçir, ana halatı bir kez dola ve kendi altından çıkar."),
 k(58,AR([[60,30],[96,30]])+AR([[140,30],[104,30]])+L(100,22,"kaydırarak ger",{}),"Düğümü ana halat boyunca kazıktan uzağa, çadıra doğru kaydırınca halat gerilir; yük gelince kilitlenir. Çadır ve branda iplerini germek için kullan.")
];
})();

/* =================================================================
   CAMADAN (REEF) — iki renk
   ================================================================= */
(function(){
/* adım 1–3: uçlarla bağlama (ayakkabı bağı gibi) */
var A1=[[14,172],[50,160],[84,140],[104,124],[120,112],[136,100],[150,84],[160,64]],B1=[[226,172],[190,160],[156,140],[136,124],[120,112],[104,100],[90,84],[80,64]];
var A2=[[14,172],[52,160],[86,146],[108,136],[124,130],[136,122],[134,110],[120,104],[106,100],[96,88],[90,70],[88,50]],B2=[[226,172],[188,160],[154,146],[132,136],[116,130],[104,122],[106,110],[120,104],[134,100],[144,88],[150,70],[152,50]];
var A3=[[14,172],[52,162],[86,150],[108,142],[124,138],[136,132],[134,122],[120,116],[106,112],[98,100],[100,86],[112,78],[124,74],[136,66],[138,54],[126,48],[112,52],[104,40],[100,22]],
    B3=[[226,172],[188,162],[154,150],[132,142],[116,138],[104,132],[106,122],[120,116],[134,112],[142,100],[140,86],[128,78],[116,74],[104,66],[102,54],[114,48],[128,52],[136,40],[140,22]];
/* son hâl: iç içe iki kıvrım */
var Af=[[6,64],[40,66],[80,74],[108,80],[134,80],[150,84],[156,92],[150,100],[134,104],[108,104],[80,110],[40,118],[6,120]],
    Bf=[[234,64],[200,66],[160,74],[132,78],[106,80],[90,84],[84,92],[90,100],[106,104],[132,106],[160,110],[200,118],[234,120]];
H.stp.reef=[
 {s:S(RS([R(B1,{c:2}),R(A1,{over:[[3,5]]})])+L(30,150,"A")+L(210,150,"B")),c:"İki ucu çaprazla: <b>sol uç (A) sağdakinin (B) üstünden</b> geçsin."},
 {s:S(RS([R(A2,{over:[[3,5]]}),R(B2,{c:2,over:[[6,8]]})])+AR([[88,46],[110,30],[140,34]])),c:"A'yı B'nin altından dolaştırıp yukarı çıkar (ilk yarım düğüm, ayakkabı bağının ilk adımı gibi)."},
 {s:S(RS([R(A3,{over:[[3,5],[10,12],[16,18]]}),R(B3,{c:2,over:[[6,8],[13,15]]})])+L(60,30,"şimdi sağdaki",{a:"middle"})+L(60,42,"soldakinin üstünden",{a:"middle"})),c:"<b>Bu kez tersine:</b> sağdaki uç soldakinin üstünden geçsin ve altından dolaşsın."},
 {s:S(RS([R(Af,{over:[[2,4]]}),R(Bf,{c:2,over:[[8,10]]})])+L(40,56,"uç A")+L(200,56,"uç B")+L(40,136,"ana A")+L(200,136,"ana B")+AR([[30,92],[8,92]])+AR([[210,92],[232,92]])),c:"Düğümü sık. Doğru bağlandıysa her halatın ucu ve ana kısmı <b>aynı taraftadır</b>, iki kıvrım iç içe geçer. Uçlar çapraz duruyorsa yanlış bir düğüm (nine düğümü) olmuştur: çöz ve yeniden bağla."}
];
})();

/* =================================================================
   AĞ DÜĞÜMÜ (SHEET BEND) — kalın mavi + ince sarı
   ================================================================= */
(function(){
var Bl=[[6,72],[40,72],[70,72],[90,72],[100,72],[110,72],[124,72],[140,72],[150,75],[158,84],[160,94],[156,104],[146,108],[132,108],[120,108],[108,108],[98,108],[88,108],[60,108],[6,108]];
var bOv=[[9,11],[3,5],[15,17]];
var T=[[232,96],[206,96],[184,95],[170,94],[160,94],[150,93],[144,92],[138,80],[134,72],[132,58],[118,52],[104,60],[100,72],[99,90],[98,108],[100,122],[116,126],[126,116],[128,108],[130,98],[140,88],[150,80],[156,74]];
var tOv=[[16,19],[6,9]];
function k(n,extra,cap){return {s:S(RS([R(Bl,{c:2,w:13,over:bOv,tip:false}),R(T,{n:n,w:8,over:tOv})])+L(30,64,"kalın halat",{})+L(214,86,"ince",{})+(extra||"")),c:cap}}
H.stp.sheet=[
 k(4,AR([[176,104],[160,104],[146,98]]),"Kalın halatla bir <b>kıvrım (U)</b> yap. İnce halatı yanına getir."),
 k(9,AR([[134,56],[118,46],[100,56]]),"İnce ucu kıvrımın içinden <b>alttan yukarı</b> geçir."),
 k(17,AR([[118,128],[128,110],[136,92]]),"Kıvrımın iki bacağının <b>arkasından</b> dolaştır."),
 k(23,AR([[214,108],[234,108]])+AR([[26,90],[6,90]]),"Ucu <b>kendi altından</b> (ama kıvrımın üstünden) geçir ve sık. Farklı kalınlıkta iki halatı ekler; ıslakken de çözülür.")
];
})();

/* =================================================================
   PRUSİK
   ================================================================= */
(function(){
var main=R([[120,0],[120,60],[120,120],[120,180]],{c:2,w:12,tip:false});
function wrap(y){return [R([[104,y+8],[120,y],[136,y-8]],{w:6,tip:false}),R([[104,y+15],[120,y+7],[136,y-1]],{w:6,tip:false})]}
function legs(y){return R([[117,y],[112,y+22],[108,y+44],[114,y+60],[124,y+62],[132,y+58],[132,y+40],[127,y+20],[124,y]],{w:6,tip:false})}
var loopBack='<path d="M60,92 C60,76 180,76 180,92 C180,108 60,108 60,92z" fill="none" stroke="var(--r1d)" stroke-width="9"/><path d="M60,92 C60,76 180,76 180,92 C180,108 60,108 60,92z" fill="none" stroke="var(--r1)" stroke-width="6"/>';
H.stp.prusik=[
 {s:S(loopBack+RS([main])+L(64,70,"kordon halkası",{})+L(150,14,"ana halat",{a:"start"})+AR([[180,112],[150,124],[126,112]])),c:"Kısa kordon halkasını (≈1,5 m kordonu balıkçı düğümüyle bağla) ana halatın <b>arkasına</b> yatay koy."},
 {s:S(RS([main].concat(wrap(80)).concat([legs(94)]))+AR([[150,150],[160,110],[150,70]])+L(176,100,"halkanın içinden",{a:"start"})+L(176,112,"tekrar dola",{a:"start"})),c:"Bir ucu ana halatın etrafından dolayıp <b>halkanın kendi içinden</b> geçir: ilk tur."},
 {s:S(RS([main].concat(wrap(52),wrap(72),wrap(92)).concat([legs(106)]))+L(152,72,"3 tur",{a:"start"})),c:"Aynısını <b>3 kez</b> yap. Turlar düzgün ve yan yana olsun, birbirinin üstüne binmesin; bacaklar ortadan çıksın."},
 {s:S(RS([main].concat(wrap(52),wrap(72),wrap(92)).concat([legs(106)]))+AR([[160,120],[160,166]])+L(166,140,"yük →",{a:"start"})+L(166,152,"kilitlenir",{a:"start"})+AR([[60,160],[60,110]])+L(20,176,"gevşek → kayar",{a:"start"})),c:"Yük gelince sıkıca tutar; yük kalkınca düğümü elinle itip kaydırabilirsin. Halata tırmanma, yük kaldırma, emniyet için."}
];
})();

/* =================================================================
   SEKİZ DÜĞÜMÜ (STOPPER)
   ================================================================= */
(function(){
var P=[[4,118],[30,118],[56,118],[80,118],[96,118],[112,114],[132,100],[142,80],[134,62],[114,56],[96,64],[90,82],[96,100],[100,118],[100,134],[92,148],[76,150],[66,138],[70,122],[86,112],[106,104],[126,104],[146,112],[170,122],[200,128]];
var OV=[[11,14],[3,5],[19,21]];
H.stp.eight=[
 {s:S(RS([R(P,{n:13,over:OV})])+L(30,108,"ana halat",{})+AR([[96,100],[98,130],[90,150]])),c:"Uçla bir göz yap; uç, ana halatın <b>üstünden</b> geçsin."},
 {s:S(RS([R(P,{n:17,over:OV})])+AR([[72,148],[64,128],[80,114]])),c:"Ucu ana halatın <b>arkasından</b> dolaştır."},
 {s:S(RS([R(P,{n:25,over:OV})])),c:"Ucu ilk gözün içinden <b>önden</b> geçir: 8 şekli oluşur."},
 {s:S(RS([R(P,{n:25,over:OV})])+AR([[40,140],[8,140]])+AR([[196,140],[230,140]])+L(120,170,"halatın ucundan kaçmasını önler",{})),c:"İki ucu çekerek sık. Halat ucunun makaradan/delikten kaçmasını önler; yük altında bile kolay çözülür."}
];
})();

})();
