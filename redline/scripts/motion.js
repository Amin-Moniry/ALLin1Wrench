/* Motion is progressive: nothing is hidden until observers are ready. */
(() => {
'use strict';
let cleanups=[],frames=new Set();
const media=matchMedia('(prefers-reduced-motion:reduce)');
const fine=matchMedia('(pointer:fine) and (hover:hover)');
function stop(){window.MATRIX_FX?.stop();cleanups.splice(0).forEach(fn=>fn());frames.forEach(cancelAnimationFrame);frames.clear();R.$$('.reveal').forEach(el=>el.classList.remove('is-pending'));R.$('.object-art img')?.style.removeProperty('transform')}
function init(){stop();const enabled=R.state.motion&&!media.matches;document.documentElement.dataset.motion=enabled?'on':'off';
 const progress=R.$('#read-progress');let raf=0;
 const update=()=>{raf=0;const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;if(enabled&&fine.matches){const art=R.$('.object-art img');if(art&&scrollY<innerHeight*1.3)art.style.transform=`translateY(${Math.min(scrollY*.09,70)}px) scale(1.06)`}};
 const scroll=()=>{if(!raf)raf=requestAnimationFrame(update)};addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});update();cleanups.push(()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(raf)});
 if('IntersectionObserver' in window){
  const reveal=new IntersectionObserver(entries=>{for(const en of entries)if(en.isIntersecting){en.target.classList.remove('is-pending');reveal.unobserve(en.target)}},{threshold:.035});
  if(enabled){R.$$('.reveal').forEach(el=>{el.classList.add('is-pending');reveal.observe(el)});cleanups.push(()=>reveal.disconnect())}
  const nav=new IntersectionObserver(entries=>{for(const en of entries)if(en.isIntersecting){R.$$('.desktop-nav a').forEach(a=>{if(a.hash==='#'+en.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}},{rootMargin:'-10% 0px -65% 0px'});R.$$('main > section[id]').forEach(el=>nav.observe(el));cleanups.push(()=>nav.disconnect());
 }
 if(enabled&&fine.matches){R.$$('.magnetic').forEach(el=>{let raf=0;const move=ev=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${((ev.clientX-r.left)/r.width-.5)*8}px,${((ev.clientY-r.top)/r.height-.5)*8}px)`})};const leave=()=>{cancelAnimationFrame(raf);el.style.transform=''};el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);leave()})})}
 window.MATRIX_FX?.init();
}
media.addEventListener('change',()=>{R.state.motion=R.storage.get('redline-motion')!=='off'&&!media.matches;init();R.$('#motion-toggle')?.setAttribute('aria-pressed',String(R.state.motion));window.REDLINE_INTERACTIONS?.resetSignal()});
window.REDLINE_MOTION={init,stop};
})();
