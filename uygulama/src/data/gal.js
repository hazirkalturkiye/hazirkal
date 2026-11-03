/* Fotoğraf galerisi: küçük önizleme şeridi, dokununca tam ekran. Fotoğraflar Wikimedia Commons (serbest lisans). */
(function(){
var H=window.HK=window.HK||{};
H.GALS=[];
function src(f,big){var M=window.HKIMG;if(M)return M[(big?"":"t/")+f]||M[f]||"";return "img/"+(big?"":"t/")+f+".webp"}
H.imgSrc=src;
/* spec: ["a_vammo","a_wolf:0",...]  -> tüm veya belirli fotoğraflar */
H.gal=function(spec,title,opt){opt=opt||{};var items=[];
  spec.forEach(function(s){var p=s.split(":"),k=p[0],arr=(H.PH||{})[k]||[];if(p.length>1){var x=arr[+p[1]];if(x)items.push(x)}else items=items.concat(arr)});
  if(!items.length)return "";
  var g=H.GALS.length;H.GALS.push(items);
  var h='<div class="gal'+(opt.steps?' steps':'')+'">'+(title?'<div class="gal-h">'+title+'<small> · dokun, büyüt</small></div>':'')+'<div class="gal-r">';
  items.forEach(function(x,i){var lab=opt.steps?(i+1):(x.c.split(/[:(.]/)[0]);
    h+='<button type="button" class="gi" data-g="'+g+'" data-i="'+i+'"><img loading="lazy" decoding="async" alt="" src="'+src(x.f,false)+'"><span>'+lab+'</span></button>'});
  return h+'</div></div>';
};
/* Resimli adımlar: her adımın kendi çizimi. steps: [[resimNo|null, "metin"], ...] */
H.ist=function(key,steps,red){var arr=(H.PH||{})[key]||[],g=H.GALS.length;H.GALS.push(arr);
  return steps.map(function(s,n){var i=s[0],x=(i!=null)?arr[i]:null;
    return '<div class="step'+(red?" r":"")+'"><div class="n">'+(n+1)+'</div><div class="f">'+(x?'<button type="button" class="gi si" data-g="'+g+'" data-i="'+i+'"><img loading="lazy" decoding="async" alt="" width="'+x.w+'" height="'+x.h+'" src="'+src(x.f,true)+'"></button>':'')+s[1]+'</div></div>'}).join("")};
/* Tek resim (kart içinde) */
H.ione=function(key,i){var arr=(H.PH||{})[key]||[],x=arr[i||0];if(!x)return "";var g=H.GALS.length;H.GALS.push([x]);return '<button type="button" class="gi si" data-g="'+g+'" data-i="0"><img loading="lazy" alt="" width="'+x.w+'" height="'+x.h+'" src="'+src(x.f,true)+'"></button>'};
/* Lightbox */
var LB=null,cur=null;
function open(g,i){cur={g:g,i:i};if(!LB){LB=document.createElement("div");LB.id="lb";LB.innerHTML='<button class="lb-x" aria-label="Kapat">✕</button><div class="lb-im"><img alt=""></div><div class="lb-c"><b></b><small></small></div><div class="lb-n"><button data-d="-1">‹</button><span></span><button data-d="1">›</button></div>';document.body.appendChild(LB);
   LB.addEventListener("click",function(e){var t=e.target;if(t.classList.contains("lb-x")||t===LB){close();return}var d=t.getAttribute&&t.getAttribute("data-d");if(d)show(cur.i+(+d))});
   var sx=null;LB.addEventListener("touchstart",function(e){sx=e.touches[0].clientX},{passive:true});LB.addEventListener("touchend",function(e){if(sx==null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(cur.i+(dx<0?1:-1));sx=null});
   document.addEventListener("keydown",function(e){if(!LB||!LB.classList.contains("on"))return;if(e.key==="Escape")close();if(e.key==="ArrowRight")show(cur.i+1);if(e.key==="ArrowLeft")show(cur.i-1)});}
  LB.classList.add("on");show(i)}
function show(i){var it=H.GALS[cur.g],n=it.length;i=(i+n)%n;cur.i=i;var x=it[i];
  LB.querySelector("img").src=src(x.f,true);LB.querySelector(".lb-c b").textContent=x.c;LB.querySelector(".lb-c small").textContent=x.u?("Foto: "+x.a+" · Wikimedia Commons"):"Çizim: Hazırkal";LB.querySelector(".lb-n span").textContent=(i+1)+" / "+n;
  LB.querySelector(".lb-n").style.display=n>1?"":"none"}
function close(){if(LB){LB.classList.remove("on");LB.querySelector("img").removeAttribute("src")}}
H.lbClose=close;
document.addEventListener("click",function(e){var b=e.target.closest?e.target.closest(".gi"):null;if(!b)return;open(+b.getAttribute("data-g"),+b.getAttribute("data-i"))});
window.addEventListener("hashchange",close);
})();
