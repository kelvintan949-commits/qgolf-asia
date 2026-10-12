'use strict';
const appMedia=window.matchMedia('(max-width:800px)');
const appPaths={home:'<path d="m3 10 9-7 9 7v10H6V10m3 10v-7h6v7"/>',flag:'<path d="M5 21V3m0 1c5-4 9 4 15 0v10c-6 4-10-4-15 0"/>',card:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h4"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v5m10-5v5M3 11h18m-13 5h3"/>',plus:'<path d="M12 4v16M4 12h16"/>',bookmark:'<path d="M6 3.5h12v17l-6-4-6 4z"/>'};
$$('[data-app-icon]').forEach(el=>el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${appPaths[el.dataset.appIcon]||''}</svg>`);
const courseTitle=$('#courses .section-heading h2').innerHTML;
const courseSubtitle=$('#courses .section-heading p').innerHTML;
let mobileView='home';
const viewFromHash=()=>({'#courses':'courses','#saved':'saved','#membership':'membership','#qaccess':'qaccess','#experience':'story'}[location.hash]||'home');
function applyAppView(view,{scroll=true}={}){
  const previousView=mobileView;
  mobileView=view;
  if(!appMedia.matches){document.body.removeAttribute('data-mobile-view');$('#courses').classList.remove('is-saved-view');$('#courses .section-heading h2').innerHTML=courseTitle;$('#courses .section-heading p').innerHTML=courseSubtitle;return;}
  document.body.dataset.mobileView=view;
  $('#courses').classList.toggle('is-saved-view',view==='saved');
  $('#courses .section-heading h2').innerHTML=view==='saved'?'Your saved<br><em>fairways.</em>':courseTitle;
  $('#courses .section-heading p').innerHTML=view==='saved'?'The places you want to play. All together, ready for your next round.':courseSubtitle;
  if(view==='saved'){if(previousView!==view){query='';$('#course-query').value='';}setFilter('saved');}else if(view==='courses'&&filter==='saved')setFilter('all');
  $$('.app-bottom-nav [data-app-view]').forEach(a=>{const active=a.dataset.appView===(view==='story'?'home':view==='qaccess'?'membership':view);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  closeMobileNav();
  if(scroll)window.scrollTo({top:0,behavior:'instant'});
  $$('.app-saved-count').forEach(el=>el.dataset.empty=saved.size===0);
}
function goToAppView(view,hash){if(!appMedia.matches)return;const target=hash||({home:'#home',courses:'#courses',membership:'#membership',saved:'#saved',qaccess:'#qaccess',story:'#experience'}[view]);if(location.hash!==target)history.pushState(null,'',target);applyAppView(view);}
document.addEventListener('click',e=>{
  if(!appMedia.matches)return;
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  const hash=a.getAttribute('href');const view=({'#':'home','#home':'home','#discover':'home','#main':'home','#courses':'courses','#membership':'membership','#saved':'saved','#qaccess':'qaccess','#experience':'story'})[hash];
  if(!view)return;e.preventDefault();e.stopImmediatePropagation();goToAppView(view,hash==='#'?'#home':hash);
},true);
$$('.app-plan-shortcut').forEach(b=>b.addEventListener('click',()=>{closeMobileNav();showPlanner(currentPlan?.course||courses[currentSlide].id,currentPlan);}));
$('#round-search').addEventListener('submit',()=>{if(appMedia.matches)goToAppView('courses');});
$('.saved-shortcut').addEventListener('click',()=>{if(appMedia.matches)goToAppView('saved');});
$('#course-grid').addEventListener('click',e=>{if(e.target.closest('#reset-courses')&&appMedia.matches)goToAppView('courses');$$('.app-saved-count').forEach(el=>el.dataset.empty=saved.size===0);});
window.addEventListener('hashchange',()=>applyAppView(viewFromHash()));
window.addEventListener('popstate',()=>applyAppView(viewFromHash()));
appMedia.addEventListener('change',()=>applyAppView(viewFromHash(),{scroll:false}));
// Give mobile comparisons readable cards rather than a wide desktop table.
new MutationObserver(()=>{
 const container=$('#detail-content'),body=$('.compare-body',container);
 if(!body||$('.mobile-comparison',body))return;
 const cards=document.createElement('div');cards.className='mobile-comparison';
 cards.innerHTML=Object.entries(memberships).map(([id,m])=>`<article class="compare-card"><h3>${m.name}</h3><strong>${money(citizenship==='indonesian'?m.price:m.international)}</strong><p>${m.benefits.join('. ')}.</p><button class="button button-dark" data-mobile-join="${id}">Explore ${m.name} <span>↗</span></button></article>`).join('');
 $('.comparison-scroll',body).after(cards);
 cards.addEventListener('click',e=>{const b=e.target.closest('[data-mobile-join]');if(b){$('#detail-dialog').close();showJoin(b.dataset.mobileJoin);}});
}).observe($('#detail-content'),{childList:true});
applyAppView(viewFromHash(),{scroll:false});
let swipeStart=null;
$('.hero').addEventListener('pointerdown',e=>{if(appMedia.matches&&e.pointerType==='touch'&&!e.target.closest('a,button'))swipeStart={x:e.clientX,y:e.clientY};});
$('.hero').addEventListener('pointerup',e=>{if(!swipeStart)return;const dx=e.clientX-swipeStart.x,dy=e.clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>55&&Math.abs(dy)<45)changeSlide((currentSlide+(dx<0?1:courses.length-1))%courses.length);});
$('.hero').addEventListener('pointercancel',()=>{swipeStart=null;});
if(window.visualViewport){
  const syncVisibleHeight=()=>{document.documentElement.style.setProperty('--app-visible-height',`${window.visualViewport.height}px`);document.body.classList.toggle('app-keyboard-open',appMedia.matches&&window.innerHeight-window.visualViewport.height>150&&/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName||''));};
  window.visualViewport.addEventListener('resize',syncVisibleHeight);document.addEventListener('focusout',()=>document.body.classList.remove('app-keyboard-open'));syncVisibleHeight();
}
