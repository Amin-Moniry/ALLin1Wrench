/* REDLINE — dependency-free progressive enhancement. No API keys belong in the browser. */
(() => {
'use strict';
const D = window.PORTFOLIO;
if (!D || !Array.isArray(D.sections)) return;
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storage = {get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{/* Private browsing remains fully usable. */}}};
const qs = new URLSearchParams(location.search);
let lang = [qs.get('lang'),storage.get('redline-lang'),D.defaultLanguage].find(x=>['en','fa'].includes(x)) || 'en';
let theme = [qs.get('theme'),storage.get('redline-theme')].find(x=>['dark','light'].includes(x)) || (matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover:hover) and (pointer:fine)');
let observers=[], countTimer, toastTimer, lastFocus, heroRAF=0, countdownVisible=true;
const text = value => typeof value==='object' && value!==null ? value[lang] || value.en || '' : value || '';
const t = key => text(D.ui[key]);
const lines = value => text(value).split('\n').map((line,i)=>`<span class="line">${line.split(' ').map((word,j)=>`<span class="word" style="--delay:${(i*3+j)*.07}s">${esc(word)}</span>`).join(' ')}</span>`).join('');
const titleLines = value => text(value).split('\n').map(esc).join('<br>');
const arrow = lang==='fa'?'↖':'↗';
function safeUrl(value, email=false){
 try{const u=new URL(value, location.href);return ['http:','https:'].includes(u.protocol)||(email&&u.protocol==='mailto:')?esc(value):''}catch{return ''}
}
function picture(image=0, alt='', eager=false){
 const obj=typeof image==='object' && image!==null ? image : {src:`assets/images/field-${Number(image)||0}-1600.webp`,webp:`assets/images/field-${Number(image)||0}-1600.webp`,avif:`assets/images/field-${Number(image)||0}-1600.avif`,small:`assets/images/field-${Number(image)||0}-640.webp`,smallAvif:`assets/images/field-${Number(image)||0}-640.avif`,blur:`assets/images/blur-${Number(image)||0}.webp`,width:1600,height:1100};
 // Only relative assets and HTTP(S) images are accepted. No data-script URLs or markup.
 const asset=v=>(window.REDLINE_ASSETS||{})[v]||(/^(?:https?:\/\/|assets\/|\.\/|\/)/i.test(v||'')?esc(v):'');
 const src=asset(obj.src||obj.webp);const blur=asset(obj.blur);
 const w=Number(obj.width)||1600,h=Number(obj.height)||1100;
 return `<div class="image-wrap" ${blur?`style="background-image:url('${blur}')"`:''}><picture>${obj.avif?`<source type="image/avif" srcset="${obj.smallAvif?asset(obj.smallAvif)+' 640w, ':''}${asset(obj.avif)} 1600w" sizes="(max-width:800px) 90vw, 55vw">`:''}${obj.webp?`<source type="image/webp" srcset="${obj.small?asset(obj.small)+' 640w, ':''}${asset(obj.webp)} 1600w" sizes="(max-width:800px) 90vw, 55vw">`:''}<img src="${src}" alt="${esc(text(obj.alt)||alt)}" width="${w}" height="${h}" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high"':''} decoding="async"></picture></div>`;
}
const sectionLabel=(n,label)=>`<div class="section-label"><span class="number">${String(n).padStart(2,'0')} /</span><span class="eyebrow">${esc(text(label))}</span></div>`;
function hero(s){return `<section id="${esc(s.id)}" class="hero wrap"><div class="hero-topline"><span class="eyebrow">${esc(text(s.eyebrow))}</span><span class="status"><i></i>${esc(text(D.owner.location))}</span></div><div class="hero-grid"><div class="hero-manifesto"><span class="hero-kicker micro">AMIN MONIRY / CODE × AI × NETWORKS</span><h1>${lines(s.title)}</h1><div class="hero-description"><span class="hero-star" aria-hidden="true">+</span><p class="intro">${esc(text(s.body))}</p></div><div class="hero-actions"><a class="button button-primary magnetic" href="#projects">${esc(t('explore'))}<span aria-hidden="true">${arrow}</span></a><a class="text-link" href="#contact">${esc(t('chat'))}<span aria-hidden="true">${arrow}</span></a></div></div><div class="hero-art"><div class="signal-frame">${picture(0,t('preview'),true)}<div class="art-top"><span class="micro">REDLINE / OBJECT 001</span><span aria-hidden="true">+</span></div><div class="art-bottom"><span class="micro">${esc(t('noTemplate'))}</span><span class="art-number" aria-hidden="true">R—02</span></div></div><a class="hero-project-chip" href="#projects"><span class="chip-dot" aria-hidden="true"></span><span><small class="micro">${esc(t('selectedTag'))}</small><b>ALLin1wrench</b></span><span aria-hidden="true">${arrow}</span></a></div></div><div class="hero-bottom"><span class="eyebrow">${esc(text(s.note))}</span><a href="#about" class="scroll-mark"><span aria-hidden="true">↓</span><small class="micro">${esc(t('heroCue'))}</small></a><span class="coords mono micro">REDLINE / EST. 2026</span></div><div class="red-ticker" aria-hidden="true"><span>DESIGN WITH INTENT</span><i>+</i><span>BUILD WITHOUT LIMITS</span><i>+</i><span>REDLINE / AM</span><i>+</i><span>DESIGN WITH INTENT</span></div></section>`}
function about(s,n){return `<section class="section" id="${esc(s.id)}"><div class="wrap">${sectionLabel(n,s.nav||s.title)}<div class="about-grid"><h2 class="reveal">${titleLines(s.title)}</h2><div class="about-copy reveal"><p>${esc(text(s.body))}</p><span class="sample-note">${esc(t('sample'))}</span></div></div><div class="bento">${(s.cards||[]).map((c,i)=>`<article class="bento-card reveal tilt"><span class="eyebrow">${esc(text(c.label))}</span><span class="bento-symbol" aria-hidden="true">${i?'+':'↗'}</span><h3>${esc(text(c.title))}</h3><p>${esc(text(c.body))}</p></article>`).join('')}</div></div></section>`}
function skills(s,n){const set=(hidden=false)=>`<div class="marquee-set" ${hidden?'aria-hidden="true"':''}>${(s.items||[]).map(x=>`<span>${esc(text(x))}</span><i aria-hidden="true">+</i>`).join('')}</div>`;return `<section class="section" id="${esc(s.id)}"><div class="wrap">${sectionLabel(n,s.nav||s.title)}<div class="section-heading reveal"><h2>${esc(text(s.title))}</h2><p>${esc(text(s.body))}</p></div><div class="marquee"><div class="marquee-track">${set()}${set(true)}</div></div><div class="skill-groups">${(s.groups||[]).map(g=>`<article class="skill-group reveal"><h3>${esc(text(g.title))}</h3><ul>${g.items.map(x=>`<li>${esc(text(x))}</li>`).join('')}</ul></article>`).join('')}</div></div></section>`}
function mockup(p){return `<div class="mockup" aria-hidden="true"><div class="mockup-bar"><span class="mockup-dots"><i></i><i></i><i></i></span><span>${esc(p.title.toLowerCase())} / concept</span></div><div class="mockup-content"><div class="mockup-text">${esc(p.title)}<small>ONE INTERFACE. EVERY POSSIBILITY.</small><span class="mockup-rule"></span><span class="mockup-copy">DESIGNED TO WORK.<br>BUILT TO FEEL DIFFERENT.</span></div><div class="mockup-lines"><i><b>01</b><span>CREATE</span></i><i><b>02</b><span>CONVERT</span></i><i><b>03</b><span>EXPLORE</span></i><i><b>↗</b><span>OPEN TOOL</span></i></div></div></div>`}
function projects(s,n){return `<section class="section" id="${esc(s.id)}"><div class="wrap">${sectionLabel(n,s.nav||s.title)}<div class="section-heading reveal"><h2>${esc(text(s.title))}</h2><p>${esc(text(s.body))}</p></div><div class="work-toolbar"><span class="micro">${esc(t('indexTag'))}</span><div class="project-filters" role="group" aria-label="${esc(text(s.nav))}">${[['all','all'],['product','products'],['study','studies']].map(([key,label])=>`<button class="filter-button" data-filter="${key}" aria-pressed="${key==='all'}">${esc(t(label))}</button>`).join('')}</div></div><div class="project-grid">${(s.items||[]).map((p,i)=>`<article class="project-card reveal" data-kind="${esc(p.kind||'study')}"><div class="project-info"><span class="project-index" aria-hidden="true">0${i+1}</span><span class="eyebrow">${esc(text(p.category))}</span><h3>${esc(p.title)}</h3><p>${esc(text(p.description))}</p><div class="project-tags">${(p.tags||[]).map(x=>`<span class="tag">${esc(text(x))}</span>`).join('')}</div><button class="text-link" data-project="${esc(p.id)}">${esc(t('openProject'))}<span aria-hidden="true">${arrow}</span></button></div><button class="project-cover" data-project="${esc(p.id)}" aria-label="${esc(t('openProject')+': '+p.title)}">${picture(p.image,p.title+' — '+t('preview'))}${mockup(p)}<span class="cover-arrow" aria-hidden="true">${arrow}</span><span class="project-cover-label micro">${esc(t('preview'))} / 0${i+1}</span></button></article>`).join('')}</div></div></section>`}
function experience(s,n){return `<section class="section" id="${esc(s.id)}"><div class="wrap">${sectionLabel(n,s.nav||s.title)}<div class="section-heading reveal"><h2>${titleLines(s.title)}</h2><p>${esc(text(s.body))}</p></div><div class="timeline">${(s.items||[]).map(x=>`<article class="timeline-row reveal"><span class="eyebrow">${esc(text(x.period))}</span><div><h3>${esc(text(x.title))}</h3><span class="org">${esc(text(x.org))}</span></div><p>${esc(text(x.body))}</p></article>`).join('')}</div></div></section>`}
const lock=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/></svg>`;
function comingCard(s,i){return `<article id="${esc(s.id)}" class="coming-card reveal"><div class="construction" aria-hidden="true"></div><div class="coming-top"><span class="micro">0${i+1} / ${esc(t('locked'))}</span><span class="lock" aria-hidden="true">${lock}</span></div><h3>${esc(text(s.title))}</h3><p>${esc(text(s.body))}</p><div class="countdown" data-countdown="${esc(s.id)}" role="timer" aria-label="${esc(t('undated'))}"></div><div class="date-label">${esc(s.illustrativeDate?t('target'):Number.isFinite(Date.parse(s.launchAt||''))?new Intl.DateTimeFormat(lang==='fa'?'fa-IR':'en-GB',{dateStyle:'medium',timeZone:'Asia/Tehran'}).format(new Date(s.launchAt)):t('undated'))}</div><form class="newsletter" data-section="${esc(s.id)}"><label class="sr-label" for="email-${esc(s.id)}">${esc(t('email'))}</label><div class="newsletter-row"><input id="email-${esc(s.id)}" type="email" name="email" autocomplete="email" placeholder="you@domain.com" maxlength="254" required><button type="submit">${esc(t('notify'))}</button></div><label class="consent"><input type="checkbox" name="consent" required>${esc(t('consent'))}</label><p class="form-message" aria-live="polite"></p></form></article>`}
function future(list){return `<section class="future"><div class="wrap"><div class="section-label"><span class="eyebrow">${esc(t('futureLabel'))}</span></div><div class="future-head reveal"><h2>${esc(t('future'))}</h2><span class="status"><i></i>${esc(t('building'))}</span></div><div class="future-grid">${list.map(comingCard).join('')}</div></div></section>`}
function contact(s,n){return `<section class="section contact" id="${esc(s.id)}"><div class="contact-mesh" aria-hidden="true"></div><div class="wrap">${sectionLabel(n,s.nav||s.title)}<div class="contact-grid"><div class="contact-copy reveal"><h2>${titleLines(s.title)}</h2><p>${esc(text(s.body))}</p>${D.owner.email?`<div class="contact-email"><a href="${safeUrl('mailto:'+D.owner.email,true)}">${esc(D.owner.email)}</a><button class="icon-button" id="copy-email" aria-label="${esc(t('copy'))}">⧉</button></div>`:`<span class="sample-note">${esc(t('draft'))}</span>`}</div><form class="contact-form reveal"><div class="field"><label for="contact-name">${esc(t('name'))}</label><input id="contact-name" name="name" autocomplete="name" required maxlength="100"></div><div class="field"><label for="contact-email">${esc(t('email'))}</label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="254" dir="ltr"></div><div class="field"><label for="contact-message">${esc(t('message'))}</label><textarea id="contact-message" name="message" required maxlength="5000" rows="3"></textarea></div><button class="button button-primary magnetic" type="submit">${esc(t('send'))}</button><p class="form-message" aria-live="polite"></p></form></div></div></section>`}
function generic(s,n){return `<section class="section custom-section" id="${esc(s.id)}"><div class="wrap">${sectionLabel(n,s.nav||s.title)}<h2>${esc(text(s.title))}</h2><p>${esc(text(s.body))}</p>${(s.items||[]).length?`<div class="bento">${s.items.map(x=>`<article class="bento-card"><h3>${esc(text(x.title))}</h3><p>${esc(text(x.body))}</p></article>`).join('')}</div>`:''}</div></section>`}
const renderers={hero,about,skills,projects,experience,contact,content:generic};
function render(){
 observers.forEach(o=>o.disconnect());observers=[];clearInterval(countTimer);
 const html=document.documentElement;html.lang=lang;html.dir=lang==='fa'?'rtl':'ltr';html.dataset.theme=theme;
 document.title=lang==='fa'?'امین منیری — ALLin1Wrench / ردلاین':'Amin Moniry — ALLin1Wrench / REDLINE';
 $('.skip').textContent=t('skip');$('#load-label').textContent=t('loading');
 $('#header').innerHTML=`<div class="header-inner wrap"><a class="brand" href="#home" aria-label="AM / Redline"><span class="brand-icon" aria-hidden="true"></span>AM<span aria-hidden="true">.</span><small>REDLINE<br>EDITION / 02</small></a><nav class="nav" id="main-nav" aria-label="${esc(t('menu'))}">${D.sections.filter(s=>s.nav).map(s=>`<a href="#${esc(s.id)}">${esc(text(s.nav))}</a>`).join('')}</nav><div class="header-controls"><button id="command-open" class="command-launch" aria-label="${esc(t('command'))}"><span aria-hidden="true">⌘</span><kbd>K</kbd></button><button class="icon-button lang-button" id="language" aria-label="${esc(t('language'))}">${esc(t('language'))}</button><button class="icon-button" id="theme" aria-label="${esc(t('theme'))}" aria-pressed="${theme==='dark'}"><span aria-hidden="true">${theme==='dark'?'☼':'◐'}</span></button><button class="icon-button menu-button" id="menu" aria-label="${esc(t('menu'))}" aria-expanded="false" aria-controls="main-nav"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button></div></div>`;
 let n=0,futureDone=false;
 $('#main').innerHTML=D.sections.map(s=>{if(s.type==='coming'){if(futureDone)return '';futureDone=true;return future(D.sections.filter(x=>x.type==='coming'))}return (renderers[s.type]||generic)(s,s.type==='hero'?0:++n)}).join('');
 $('#footer').innerHTML=`<div class="wrap site-footer"><span class="footer-brand">AM / REDLINE</span><p>${esc(t('footer'))}</p><div class="footer-links">${D.owner.github&&safeUrl(D.owner.github)?`<a href="${safeUrl(D.owner.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`:''}<a href="#home">${esc(t('footerTop'))}</a></div><span class="mono micro">© ${new Date().getFullYear()} AM</span></div>`;
 $$('.project-cover .image-wrap').forEach(x=>x.classList.add('reveal'));
 initImages();initMotion();initCountdown();initTilt();
 // Shared metadata copy is localized; deploy-specific absolute URLs belong in index.html.
 $('meta[name="description"]').content=text(D.sections.find(s=>s.type==='hero')?.body);
 document.body.classList.toggle('motion-ready',!motion.matches);
}
function initImages(root=document){
 $$('img',root).forEach(img=>{const wrapper=img.closest('.image-wrap');if(!wrapper)return;
 const ready=()=>wrapper.classList.add('is-loaded');
 const fail=()=>{img.hidden=true;wrapper.classList.add('is-loaded','image-failed');wrapper.style.backgroundImage='var(--signature)';wrapper.setAttribute('role','img');wrapper.setAttribute('aria-label',img.alt||t('preview'));};
 img.addEventListener('load',ready,{once:true});img.addEventListener('error',fail,{once:true});if(img.complete){if(img.naturalWidth)ready();else fail();}
 });
}
function initMotion(){
 if(motion.matches){$$('.reveal').forEach(el=>el.classList.remove('pending'));return;}
 if('IntersectionObserver' in window){
 const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');reveal.unobserve(e.target)}}),{threshold:.06});
 $$('.reveal').forEach(el=>{el.classList.add('pending');reveal.observe(el)});observers.push(reveal);
 const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){$$('.nav a').forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}),{rootMargin:'-15% 0px -60% 0px',threshold:0});
 $$('main>section[id]').forEach(el=>navObserver.observe(el));observers.push(navObserver);
 }
}
function tick(){
 if(document.hidden)return;
 $$('[data-countdown]').forEach(el=>{
 const s=D.sections.find(s=>s.id===el.dataset.countdown);const date=Date.parse(s?.launchAt||'');
 if(!Number.isFinite(date)){el.innerHTML=`<span class="micro">${esc(t('undated'))}</span>`;return}
 let seconds=Math.max(0,Math.floor((date-Date.now())/1000));
 if(!seconds){el.innerHTML=`<span class="micro">${esc(t('ready'))}</span>`;el.setAttribute('aria-label',t('ready'));return}
 const vals=[Math.floor(seconds/86400),Math.floor(seconds%86400/3600),Math.floor(seconds%3600/60),seconds%60];
 const keys=['days','hours','minutes','seconds'];
 el.setAttribute('aria-label',`${vals[0]} ${t('days')}, ${vals[1]} ${t('hours')}, ${vals[2]} ${t('minutes')}`);
 if(!el.querySelector('.count-unit'))el.innerHTML=keys.map(k=>`<div class="count-unit"><strong></strong><span>${esc(t(k))}</span></div>`).join('');
 $$('strong',el).forEach((x,i)=>{const value=String(vals[i]).padStart(2,'0');if(x.textContent!==value)x.textContent=value});
 });
}
function initCountdown(){tick();countTimer=setInterval(tick,1000)}
function initTilt(){
 if(motion.matches||!fine.matches)return;
 $$('.tilt,.magnetic').forEach(el=>{
 let frame=0;
 el.addEventListener('pointermove',e=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=el.classList.contains('tilt')?`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`:`translate(${x*8}px,${y*8}px)`;});});
 el.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;el.style.transform='';});
 });
}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4000)}
function switchPreference(key){const y=scrollY;if(key==='language'){lang=lang==='en'?'fa':'en';storage.set('redline-lang',lang)}else{theme=theme==='dark'?'light':'dark';storage.set('redline-theme',theme)}render();requestAnimationFrame(()=>{window.scrollTo({top:y,behavior:'instant'});$('#'+key)?.focus({preventScroll:true});});}
function findProject(id){return D.sections.filter(s=>s.type==='projects').flatMap(s=>s.items||[]).find(p=>p.id===id)}
function openProject(id,trigger){
 const p=findProject(id);if(!p)return;
 const dialog=$('#project-dialog');lastFocus=trigger;dialog.className='project-dialog';
 const gallery=p.gallery?.length?p.gallery:[p.image,(Number(p.image)+1)%3,(Number(p.image)+2)%3];
 dialog.innerHTML=`<div class="dialog-head"><span class="eyebrow">${esc(t('preview'))}</span><button class="icon-button" id="close-project" autofocus aria-label="${esc(t('close'))}">×</button></div><div class="dialog-body"><span class="eyebrow">${esc(text(p.category))}</span><h2 class="dialog-title" id="project-title">${esc(p.title)}</h2><p>${esc(text(p.description))}</p><div class="dialog-hero">${picture(p.image,p.title+' — '+t('preview'),true)}</div><h3>${esc(t('scope'))}</h3><p>${esc(text(p.brief))}</p>${p.url&&safeUrl(p.url)?`<a class="button button-primary" href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer">${esc(t('projectUrl'))}</a>`:''}<h3>${esc(t('gallery'))}</h3><p class="gallery-caption">${esc(t('galleryHelp'))}</p><div class="gallery" tabindex="0" aria-label="${esc(t('gallery'))}">${gallery.map((img,i)=>`<div class="gallery-item">${picture(img,p.title+' — '+t('preview')+' '+(i+1))}</div>`).join('')}</div><div class="gallery-actions"><span class="micro">${esc(t('drag'))}</span><button class="text-link" id="next-project" data-next-from="${esc(p.id)}">${esc(t('nextProject'))} ${arrow}</button></div></div>`;
 dialog.showModal();document.body.style.overflow='hidden';initImages(dialog);initGallery($('.gallery',dialog));
 if(!motion.matches)dialog.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'});
}
function closeProject(){const d=$('#project-dialog');if(d.open){d.close();document.body.style.overflow='';if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});}}
$('#project-dialog').addEventListener('cancel',e=>{e.preventDefault();closeProject();});
$('#project-dialog').addEventListener('close',()=>{if($('#project-dialog').open)return;document.body.style.overflow='';lastFocus?.focus({preventScroll:true});});
function initGallery(el){
 let dragging=false,startX=0,startScroll=0;
 el.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;dragging=true;startX=e.clientX;startScroll=el.scrollLeft;el.setPointerCapture(e.pointerId);el.classList.add('is-grabbing');});
 el.addEventListener('pointermove',e=>{if(dragging)el.scrollLeft=startScroll-(e.clientX-startX)});
 const end=()=>{dragging=false;el.classList.remove('is-grabbing')};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
 el.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();el.scrollBy({left:(e.key==='ArrowRight'?1:-1)*el.clientWidth*.75,behavior:motion.matches?'instant':'smooth'})}});
}
// Native, focus-preserving scrolling: no scroll hijacking and no runtime libraries.
document.addEventListener('click',async e=>{
 const el=e.target.closest('button,a');if(!el)return;
 if(el.id==='command-open'){openCommand();return}
 if(el.id==='next-project'){const list=D.sections.filter(s=>s.type==='projects').flatMap(s=>s.items||[]);const i=list.findIndex(p=>p.id===el.dataset.nextFrom);const trigger=lastFocus;closeProject();openProject(list[(i+1)%list.length].id,trigger);return}
 if(el.dataset.filter){$$('.filter-button').forEach(b=>b.setAttribute('aria-pressed',String(b===el)));$$('.project-card').forEach(card=>{card.hidden=el.dataset.filter!=='all'&&card.dataset.kind!==el.dataset.filter});return}
 if(el.id==='language'||el.id==='theme'){switchPreference(el.id);return}
 if(el.id==='menu'){const open=el.getAttribute('aria-expanded')!=='true';el.setAttribute('aria-expanded',String(open));$('#main-nav').classList.toggle('is-open',open);return}
 if(el.id==='close-project'){closeProject();return}
 if(el.dataset.project){openProject(el.dataset.project,el);return}
 if(el.id==='copy-email'){try{await navigator.clipboard.writeText(D.owner.email);toast(t('copied'))}catch{toast(t('copyError'))}return}
 if(el.matches('.nav a')){$('#main-nav').classList.remove('is-open');$('#menu')?.setAttribute('aria-expanded','false')}
 if(el.tagName==='A'&&el.hash&&el.getAttribute('href')?.startsWith('#')){const target=document.getElementById(el.hash.slice(1));if(target){target.setAttribute('tabindex','-1');setTimeout(()=>target.focus({preventScroll:true}),motion.matches?0:500);}}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#project-dialog').open){e.preventDefault();closeProject();return}if(e.key==='Escape'&&$('#command-dialog').open){e.preventDefault();$('#command-dialog').close();return}if(e.key==='Escape'&&$('#main-nav')?.classList.contains('is-open')){$('#main-nav').classList.remove('is-open');$('#menu').setAttribute('aria-expanded','false');$('#menu').focus()}});
$('#project-dialog').addEventListener('click',e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeProject();});
async function send(form,kind){
 const output=$('.form-message',form),submit=$('button[type="submit"]',form);
 if(!form.checkValidity()){form.reportValidity();output.textContent=t('invalid');return}
 const endpoint=D.integrations[kind==='newsletter'?'newsletterEndpoint':'contactEndpoint'];
 if(!endpoint){output.textContent=t(kind==='newsletter'?'unconfigured':'contactOff');return}
 // Only same-origin endpoints. Avoid leaking personal data to arbitrary third parties.
 let url;try{url=new URL(endpoint,location.href);if(url.origin!==location.origin||!['http:','https:'].includes(url.protocol))throw Error('Invalid endpoint')}catch{output.textContent=t('error');return}
 const body=Object.fromEntries(new FormData(form));body.language=lang;if(kind==='newsletter'){body.section=form.dataset.section;body.consent=true}
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);submit.disabled=true;output.textContent=t('sending');
 try{const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal,credentials:'same-origin'});if(!response.ok)throw Error('Delivery failed');output.textContent=t('success');form.reset()}catch{output.textContent=t('error')}finally{clearTimeout(timeout);submit.disabled=false}
}
document.addEventListener('submit',e=>{if(e.target.matches('.newsletter,.contact-form')){e.preventDefault();send(e.target,e.target.matches('.newsletter')?'newsletter':'contact')}});
// Scroll-driven hero parallax, only while visible. All visual work uses transforms.
window.addEventListener('scroll',()=>{if(motion.matches||heroRAF)return;heroRAF=requestAnimationFrame(()=>{heroRAF=0;const hero=$('.hero');const img=$('.signal-frame img');if(hero&&img){const r=hero.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)img.style.transform=`translateY(${Math.min(scrollY*.08,50)}px) scale(1.1)`;}})},{passive:true});
function initCursor(){
 const cursor=$('#cursor');if(!fine.matches||motion.matches){cursor.hidden=true;return}cursor.hidden=false;
 let frame=0,x=-100,y=-100,cx=-100,cy=-100;
 const move=()=>{cx+=(x-cx)*.35;cy+=(y-cy)*.35;cursor.style.transform=`translate(${cx-24}px,${cy-24}px) scale(var(--cursor-scale))`;if(Math.abs(cx-x)+Math.abs(cy-y)>.2)frame=requestAnimationFrame(move);else frame=0};
 document.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!frame)frame=requestAnimationFrame(move);const target=e.target.closest('a,button,.gallery');cursor.classList.toggle('is-hover',!!target);cursor.classList.toggle('is-drag',!!e.target.closest('.gallery'));$('span',cursor).textContent=e.target.closest('.gallery')?'↔':'↗'});
 document.addEventListener('pointerleave',()=>{cursor.style.opacity='0'});document.addEventListener('pointerenter',()=>{cursor.style.opacity='1'});
}
// Konami is intentionally optional; it never blocks ordinary keyboard input.
const konami=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];let eggIndex=0,logoClicks=0,logoTime=0;
document.addEventListener('keydown',e=>{if(e.target instanceof Element&&e.target.closest('input,textarea'))return;eggIndex=e.key===konami[eggIndex]?eggIndex+1:(e.key===konami[0]?1:0);if(eggIndex===konami.length){eggIndex=0;document.body.classList.toggle('easter-mode');toast(t('egg'))}});
document.addEventListener('click',e=>{if(!e.target.closest('.brand'))return;const now=Date.now();logoClicks=now-logoTime<900?logoClicks+1:1;logoTime=now;if(logoClicks===5){logoClicks=0;document.body.classList.toggle('easter-mode');toast(t('egg'))}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick()});
motion.addEventListener('change',()=>{render();$('#cursor').hidden=motion.matches||!fine.matches});
async function preload(){
 if(motion.matches)return;
 const loader=$('#preloader');loader.hidden=false;
 let done=0;const jobs=[document.fonts.ready,new Promise(resolve=>{const img=$('.signal-frame img');if(!img||img.complete){resolve();return}img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true})})];
 const total=jobs.length;
 const tracked=jobs.map(p=>Promise.resolve(p).catch(()=>{}).then(()=>{done++;$('#load-percent').textContent=Math.round(done/total*100)+'%';$('.load-track i').style.transform=`scaleX(${done/total})`}));
 await Promise.race([Promise.all(tracked),new Promise(resolve=>setTimeout(resolve,1800))]);
 loader.classList.add('is-done');$('.hero')?.classList.add('hero-entrance');setTimeout(()=>loader.hidden=true,650);
}
// Searchable, fully local command palette. No tracking, no remote calls.
let commandFocus=null,commandItems=[],commandIndex=0;
function openCommand(){
 if($('#project-dialog').open)return;
 const modal=$('#command-dialog');commandFocus=document.activeElement;
 modal.innerHTML=`<div class="command-heading"><label for="command-input">${esc(t('command'))}</label><button class="icon-button" id="command-close" aria-label="${esc(t('close'))}">×</button></div><input id="command-input" type="search" placeholder="${esc(t('commandPlaceholder'))}" autocomplete="off" aria-controls="command-results"><div id="command-results"></div><p class="command-help micro">${esc(t('searchHelp'))}</p>`;
 modal.showModal();updateCommand('');$('#command-input').focus();$('#command-input').addEventListener('input',e=>updateCommand(e.target.value));
}
function updateCommand(query){
 const q=query.trim().toLocaleLowerCase();
 const sections=D.sections.filter(s=>s.nav).map(s=>({label:text(s.nav),sub:text(s.title),id:s.id,type:'section'}));
 const projects=D.sections.filter(s=>s.type==='projects').flatMap(s=>s.items||[]).map(p=>({label:p.title,sub:text(p.category),id:p.id,type:'project'}));
 commandItems=[...sections,...projects].filter(x=>(x.label+' '+x.sub).toLocaleLowerCase().includes(q));commandIndex=0;
 $('#command-results').innerHTML=commandItems.length?commandItems.map((x,i)=>`<button class="command-item" data-command-index="${i}"><span>${esc(x.label)}<small>${esc(x.sub.replace(/\n/g,' '))}</small></span><span aria-hidden="true">${x.type==='project'?'↗':'↓'}</span></button>`).join(''):`<p class="command-empty">${esc(t('emptySearch'))}</p>`;
 setCommandIndex(0);
}
function setCommandIndex(index){commandIndex=index;$$('.command-item').forEach((b,i)=>b.classList.toggle('selected',i===index));}
function runCommand(index){const x=commandItems[index];if(!x)return;$('#command-dialog').close();if(x.type==='project'){openProject(x.id,commandFocus)}else{const section=document.getElementById(x.id);section?.scrollIntoView({behavior:motion.matches?'instant':'smooth'});section?.setAttribute('tabindex','-1');section?.focus({preventScroll:true})}}
$('#command-dialog').addEventListener('close',()=>commandFocus?.focus({preventScroll:true}));
$('#command-dialog').addEventListener('click',e=>{const b=e.target.closest('[data-command-index]');if(b)runCommand(Number(b.dataset.commandIndex));if(e.target.closest('#command-close'))$('#command-dialog').close();});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#command-dialog').open?$('#command-dialog').close():openCommand();return}if($('#command-dialog').open&&commandItems.length){if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setCommandIndex((commandIndex+(e.key==='ArrowDown'?1:-1)+commandItems.length)%commandItems.length);$$('.command-item')[commandIndex]?.focus();}else if(e.key==='Enter'&&e.target.id==='command-input'){e.preventDefault();runCommand(commandIndex)}}});
try{render();initCursor();preload()}catch(error){console.error('Portfolio rendering failed:',error);$('#main').textContent='Portfolio content could not load. Check data.js and reload. / بارگذاری محتوا انجام نشد؛ فایل داده را بررسی کنید.';$('#preloader').hidden=true}
})();
