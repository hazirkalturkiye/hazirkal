/* Ek çizimler: iki kişilik el koltuğu, Rentek manevrası, taş balık kapanı, ilmek tuzağı.
   art.js ve art2.js araçlarıyla, aynı üslupta; renkler CSS değişkeninden (gece modunda kırmızı). */
(function(){
var H=window.HK,A=H.art,L=A.lab,AR=A.arrow,P=A.person,poly=A.poly,line=A.line,dot=A.dot,limb=A.limb;
function fig(svg,cap,vb){return '<figure class="fig">'+A.svg(svg,vb)+(cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>'}
function bg(w,h){return '<rect width="'+w+'" height="'+h+'" fill="var(--pbg)"/>'}
function lead(x1,y1,x2,y2){return A.lead(x1,y1,x2,y2)}
var F=H.fig=H.fig||{};

/* ---------- İki kişilik el koltuğu: önden görünüş + üstten el tutuşu ---------- */
(function(){
 var g=bg(330,190)+'<rect x="0" y="172" width="210" height="18" fill="var(--earth)"/>';
 /* taşıyıcılar birbirine dönük, yaralı ortada ellerin üstünde oturuyor */
 g+=P({h:[54,42],n:[57,56],p:[54,114],aN:[[80,92],[100,114]],aF:[[74,96],[96,118]],lN:[[62,142],[64,172]],lF:[[48,142],[44,172]],c:"var(--rs)",armLate:true});
 g+=P({h:[156,42],n:[153,56],p:[156,114],aN:[[130,92],[110,114]],aF:[[136,96],[114,118]],lN:[[148,142],[146,172]],lF:[[162,142],[166,172]],c:"var(--rs)",armLate:true});
 g+=P({h:[105,40],n:[105,54],p:[105,108],aN:[[84,50],[62,58]],aF:[[126,50],[148,58]],lN:[[98,130],[96,152]],lF:[[112,130],[114,152]],c:"var(--pt)"});
 g+='<rect x="92" y="110" width="26" height="12" rx="4" fill="none" stroke="var(--ac)" stroke-width="2.4"/>';
 g+=L(105,186,"dört el kenetli oturak",{s:10})+lead(105,176,105,124);
 g+=L(30,22,"taşıyıcı",{s:9.5})+L(180,22,"taşıyıcı",{s:9.5})+L(105,20,"kollarını omuzlara atar",{s:9.5});
 /* üstten: el tutuşu (her el bir bileği tutar) */
 var x0=228,y0=58,s=60,c1="var(--rs)",c2="var(--r2)";
 g+='<rect x="'+(x0-8)+'" y="'+(y0-30)+'" width="'+(s+30)+'" height="'+(s+70)+'" rx="8" fill="none" stroke="var(--line)" stroke-width="1.5"/>';
 g+=L(x0+s/2,y0-16,"üstten",{s:10,b:1});
 g+=limb([[x0-6,y0+6],[x0+s,y0]],9,c1)+dot(x0+s,y0,5.5,"var(--skin)","var(--pbg)");          /* A sağ kol → B'nin bileği */
 g+=limb([[x0+s+6,y0+s-6],[x0,y0+s]],9,c2)+dot(x0,y0+s,5.5,"var(--skin)","var(--pbg)");      /* B sol kol → A'nın bileği */
 g+=limb([[x0-6,y0+s+10],[x0+2,y0+8]],9,c1)+dot(x0+2,y0+8,5.5,"var(--skin)","var(--pbg)");   /* A sol el kendi bileğinde */
 g+=limb([[x0+s+6,y0-10],[x0+s-2,y0+s-8]],9,c2)+dot(x0+s-2,y0+s-8,5.5,"var(--skin)","var(--pbg)");
 g+=L(x0-2,y0+s+28,"A",{s:12,b:1,c:"var(--tx)"})+L(x0+s+4,y0+s+28,"B",{s:12,b:1,c:"var(--tx)"});
 g+=L(x0+s/2,y0+s+46,"her el bir bileği tutar",{s:9});
 F.koltuk=fig(g,"İki kişilik el koltuğu: her taşıyıcı sol eliyle kendi sağ bileğini, sağ eliyle karşısındakinin sol bileğini tutar. Bilinci açık, yürüyemeyen yaralı içindir.","0 0 330 190");
})();

/* ---------- Rentek (Rautek) manevrası ---------- */
(function(){
 var g=bg(240,190)+'<rect x="0" y="172" width="240" height="18" fill="var(--earth)"/>';
 /* araç: kapı boşluğu ve koltuk */
 g+='<path d="M8 168V54Q14 30 44 26H118" fill="none" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/>';
 g+='<rect x="54" y="118" width="62" height="12" rx="4" fill="var(--s2)" stroke="var(--line)" stroke-width="1.5"/>';
 g+=L(30,44,"araç",{s:9.5});
 /* yaralı: koltukta, sola (direksiyona) dönük */
 g+=P({h:[84,62],n:[88,75],p:[102,118],aN:[[94,100],[108,94]],aF:[[90,104],[82,112]],lN:[[72,122],[60,156]],lF:[[78,126],[66,160]],c:"var(--pt)"});
 /* kurtarıcı: arkasında, çömelmiş; bir el çenede, öbür el ön kolda */
 g+=P({h:[124,52],n:[126,66],p:[150,118],aN:[[116,98],[108,96]],aF:[[106,84],[84,72]],lN:[[168,132],[178,170]],lF:[[146,140],[156,170]],c:"var(--rs)",armLate:true});
 g+=AR([[176,94],[220,94]]);
 g+=L(198,86,"geri geri çek",{s:9.5});
 g+=L(46,14,"bir el çenede: baş oynamaz",{s:9.5,a:"start"})+lead(84,18,84,68);
 g+=L(176,154,"öbür el ön kolunda",{s:9.5})+lead(150,148,110,98);
 F.rentek=fig(g,"Rentek manevrası: kurtarıcı yaralının arkasındadır. Bir kolunu koltuk altından geçirip çeneyi tutar, öbür koluyla yaralının göğsünün önündeki ön kolunu kavrar. Baş, boyun ve gövde bir arada tutularak yaralı geri geri çekilir.","0 0 240 190");
})();

/* ---------- Taş balık kapanı (üstten) ---------- */
(function(){
 var g=bg(320,180);
 g+='<path d="M0 34Q160 20 320 36V146Q160 160 0 144Z" fill="var(--blue)" opacity=".28"/>';
 g+='<path d="M0 34Q160 20 320 36M0 144Q160 160 320 146" fill="none" stroke="var(--blue)" stroke-width="2"/>';
 function stone(x,y,r){return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+r+'" ry="'+(r*0.78)+'" fill="var(--mut)" stroke="var(--pbg)" stroke-width="1.5"/>'}
 function row(x1,y1,x2,y2,n){var s="";for(var i=0;i<=n;i++){var t=i/n;s+=stone(x1+(x2-x1)*t,y1+(y2-y1)*t,6+((i*7)%3))}return s}
 /* huni: geniş ağız akıntıya karşı, dar ucu havuza */
 g+=row(70,42,178,82,9)+row(70,138,178,98,9);
 /* havuz */
 var cx=222,cy=90,r=32,s="";for(var i=0;i<16;i++){var a=Math.PI*(0.18+1.64*i/15);s+=stone(cx-Math.cos(a)*r,cy-Math.sin(a)*r,7)}g+=s;
 function fish(x,y,ang){return '<g transform="translate('+x+' '+y+') rotate('+(ang||0)+')"><ellipse cx="0" cy="0" rx="10" ry="4" fill="var(--ac)"/><path d="M-9 0L-16 -5V5Z" fill="var(--ac)"/></g>'}
 g+=fish(212,84,10)+fish(232,98,-15)+fish(120,90,0);
 g+=AR([[14,90],[50,90]],"var(--blue)")+L(30,80,"akıntı",{s:9.5,c:"var(--blue)"});
 g+=L(110,26,"taşlardan huni (V)",{s:10})+lead(110,30,118,56);
 g+=L(186,170,"dar ağız",{s:10})+lead(186,160,186,92);
 g+=L(262,26,"taş havuz",{s:10})+lead(258,30,240,62);
 F.taskapan=fig(g,"Taş kapan (üstten görünüş): akıntıyla gelen balık huniden havuza girer, dar ağızdan geri çıkmayı bulamaz.","0 0 320 180");
})();

/* ---------- İlmek tuzağı (yandan) ---------- */
(function(){
 var g=bg(320,180)+'<rect x="0" y="150" width="320" height="30" fill="var(--earth)"/>';
 function grass(x){return '<path d="M'+x+' 150l-4 -18M'+(x+3)+' 150l1 -22M'+(x+6)+' 150l5 -16" stroke="var(--leaf2)" stroke-width="2" stroke-linecap="round"/>'}
 for(var x=10;x<300;x+=26){if(x<120||x>200)g+=grass(x)}
 /* iki dal ve aradaki ilmek */
 g+=A.stick(132,154,128,84,4)+A.stick(196,154,200,84,4);
 g+='<circle cx="164" cy="112" r="24" fill="none" stroke="var(--r1)" stroke-width="2.6"/>';
 g+=line([[164,88],[150,70],[110,54],[54,50]],"var(--r1)",2.2)+line([[154,86],[150,92]],"var(--r1)",2)+line([[174,86],[178,92]],"var(--r1)",2);
 /* bağlandığı dal */
 g+=A.stick(48,154,52,30,6)+L(30,22,"sağlam dala ya da kazığa bağla",{s:9.5,a:"start"});
 /* tavşan */
 g+='<g fill="var(--mut)"><ellipse cx="262" cy="134" rx="26" ry="14"/><circle cx="238" cy="124" r="10"/><ellipse cx="236" cy="104" rx="3.5" ry="12" transform="rotate(-12 236 104)"/><ellipse cx="243" cy="105" rx="3.5" ry="12" transform="rotate(8 243 105)"/><circle cx="286" cy="130" r="5"/></g>';
 g+=AR([[226,140],[200,140]])+L(262,170,"tavşan patikası",{s:9.5});
 /* ölçüler */
 g+=line([[206,136],[206,150]],"var(--lbl)",1)+L(236,74,"yumruk büyüklüğünde ilmek",{s:9.5})+lead(214,78,186,100);
 g+=L(98,148,"yerden 8–10 cm",{s:9.5})+lead(124,144,140,138)+line([[140,136],[140,150]],"var(--lbl)",1);
 /* kayan ilmek ayrıntısı */
 g+='<rect x="244" y="10" width="70" height="44" rx="6" fill="none" stroke="var(--line)" stroke-width="1"/>'+'<circle cx="262" cy="30" r="6" fill="none" stroke="var(--r1)" stroke-width="2"/>'+line([[250,30],[256,30]],"var(--r1)",2)+line([[268,30],[306,26]],"var(--r1)",2)+line([[260,24],[268,36]],"var(--r1)",2);
 g+=L(279,48,"ip küçük halkadan geçer",{s:7.5});
 F.ilmek=fig(g,"İlmek tuzağı: ilmek patikanın üstünde, iki dal arasında dik durur. Hayvan başını sokup ilerleyince ilmek daralır.","0 0 320 180");
})();
})();
