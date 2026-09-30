/* REDLINE 03 / shared, defensive, dependency-free primitives. */
(() => {
'use strict';
const storage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
const q=new URLSearchParams(location.search);
const savedTheme=storage.get('redline-theme');
const state={lang:[q.get('lang'),storage.get('redline-lang'),'en'].find(v=>['en','fa'].includes(v)),theme:[q.get('theme'),savedTheme].find(v=>['dark','light'].includes(v))||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'),motion:storage.get('redline-motion')!=='off'&&!matchMedia('(prefers-reduced-motion:reduce)').matches};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=v=>typeof v==='object'&&v!==null?(v[state.lang]||v.en||''):String(v??'');
const t=k=>text(window.REDLINE_CONTENT.ui[k]);
const assetBase=document.body.dataset.assetBase||'';
const home=document.body.dataset.home??'';
const locale=()=>state.lang==='fa'?'fa-IR':'en-GB';
const number=n=>new Intl.NumberFormat(locale()).format(n);
const safeURL=v=>{try{const u=new URL(v,location.href);return ['https:','http:','mailto:'].includes(u.protocol)?esc(v):''}catch{return ''}};
const ext=(url,label,cl='')=>`<a class="${cl}" href="${safeURL(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
const caseURL=id=>assetBase+'work/'+id+'.html';
const img=(src,alt,{eager=false,cl='',small=false}={})=>`<img class="${cl}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'%3E%3C/svg%3E" data-media="${assetBase}assets/media/${esc(src.replace('.webp',small&&innerWidth<850?'-small.json':'.json'))}" data-eager="${eager}" alt="${esc(alt)}" width="1600" height="1000" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high"':''} decoding="async">`;
const label=(n,title)=>`<div class="section-label"><span class="mono">${String(n).padStart(2,'0')} /</span><span>${esc(title)}</span></div>`;
const heading=(title,body)=>`<div class="section-heading reveal"><h2>${esc(text(title)).replace(/\n/g,'<br>')}</h2>${body?`<p>${esc(text(body))}</p>`:''}</div>`;
const tags=items=>`<ul class="tags" aria-label="${state.lang==='fa'?'فناوری‌ها':'Technologies'}">${items.map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`;
const arrow=()=>state.lang==='fa'?'↖':'↗';
const pipeline=(p,interactive=false)=>`<ol class="pipeline" dir="${state.lang==='fa'?'rtl':'ltr'}">${p.nodes.map((v,i)=>`<li ${interactive?'class="flow-node"':''}><span class="mono">${String(i+1).padStart(2,'0')}</span><strong>${esc(text(v))}</strong></li>`).join('')}</ol>`;
function prefs(){const html=document.documentElement;html.lang=state.lang;html.dir=state.lang==='fa'?'rtl':'ltr';html.dataset.theme=state.theme;html.dataset.motion=state.motion?'on':'off';storage.set('redline-lang',state.lang);storage.set('redline-theme',state.theme)}
window.R={state,storage,esc,text,t,assetBase,home,locale,number,safeURL,ext,caseURL,img,label,heading,tags,arrow,pipeline,prefs,$:(s,r=document)=>r.querySelector(s),$$:(s,r=document)=>[...r.querySelectorAll(s)],L:(en,fa)=>({en,fa})};
prefs();
})();
