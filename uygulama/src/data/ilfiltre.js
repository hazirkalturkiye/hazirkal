/* İle göre metin: tüm içerik yüklendikten sonra bir kez çalışır.
   ⟦06:…⟧ yalnızca bu il plakasında, ⟦!06:…⟧ diğerlerinde; ⟦b:KD,DA:…⟧ bölgede; ⟦k:…⟧ kıyı ilinde;
   ⟦il:…⟧ il seçiliyse, ⟦!il:…⟧ seçili değilse. {IL} il adı, {BOLGE} bölge adı. İl değişince sayfa yeniden yüklenir.
   İle göre hesaplanan değerler: {SAPMA} manyetik sapma (tam derece), {OGLE} güneşin tam güneyde olduğu saat aralığı,
   {KIBLE} ve {CANAK} kıble ve Türksat uydu çanağı yönü ("güneye" gibi, yönelme hâlinde). */
(function(){
var H=window.HK,I=H.il(),K=I?I.kod:0;
function ok(neg,c){var r;
 if(c==="il")r=!!I;
 else if(/^\d\d$/.test(c))r=(K===+c);
 else if(c.indexOf("b:")===0)r=!!I&&c.slice(2).split(",").indexOf(I.bolge)>-1;
 else if(c==="k")r=!!I&&!!I.kiyi;
 else r=false;
 return neg?!r:r}
var RD=Math.PI/180;
function yon(a){return a<158?"güneydoğuya":a<172?"güney-güneydoğuya":a<188?"güneye":"güney-güneybatıya"}
function brg(la1,lo1,la2,lo2){var y=Math.sin((lo2-lo1)*RD)*Math.cos(la2*RD),x=Math.cos(la1*RD)*Math.sin(la2*RD)-Math.sin(la1*RD)*Math.cos(la2*RD)*Math.cos((lo2-lo1)*RD);return (Math.atan2(y,x)/RD+360)%360}
function saat(m){m=Math.round(m/5)*5;return Math.floor(m/60)+"."+("0"+m%60).slice(-2)}
/* Güneşin tam güneyde olduğu an: 12.00 + (45° − boylam) × 4 dk, zaman denklemi yıl içinde −16…+14 dk oynatır (UTC+3). */
var EK=I?{SAPMA:String(Math.round(I.sapma||6)),OGLE:saat(720+(45-I.lon)*4-16)+"–"+saat(720+(45-I.lon)*4+14),
  KIBLE:yon(brg(I.lat,I.lon,21.42,39.83)),CANAK:yon((180+Math.atan(Math.tan((I.lon-42)*RD)/Math.sin(I.lat*RD))/RD+360)%360)}
 :{SAPMA:"6",OGLE:"12.00–13.30 arası (doğuda erken, batıda geç)",KIBLE:"güneydoğu ile güney arasına",CANAK:"güneye ya da güney-güneydoğuya"};
function T(s){if(typeof s!=="string"||s.indexOf("⟦")<0&&s.indexOf("{")<0)return s;
 for(var n=0,p;n<4&&p!==s;n++){p=s;s=s.replace(/⟦(!?)((?:b:[A-Z,]+)|\d\d|il|k):([^⟦⟧]*)⟧/g,function(m,ng,c,t){return ok(ng==="!",c)?t:""})} /* içten dışa: iç içe koşullar */
 return s.replace(/\{IL\}/g,I?I.ad:"İlin").replace(/\{BOLGE\}/g,I?I.bolgeAd:"").replace(/\{(SAPMA|OGLE|KIBLE|CANAK)\}/g,function(m,k){return EK[k]})}
function walk(o,d){if(d>6||!o)return o;
 if(typeof o==="string")return T(o);
 if(Array.isArray(o)){for(var i=0;i<o.length;i++)o[i]=walk(o[i],d+1);return o}
 if(typeof o==="object"){for(var k in o)if(Object.prototype.hasOwnProperty.call(o,k)&&typeof o[k]!=="function")o[k]=walk(o[k],d+1);return o}
 return o}
["guide","plans","lists","cats","smsTpl","rallyDef","uyg"].forEach(function(k){if(H[k])H[k]=walk(H[k],0)});
if(typeof H.codeDef==="string")H.codeDef=T(H.codeDef);
H.ilMetin=T;H.ilEk=EK;
})();
