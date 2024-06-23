import{a as f,S as g,b as y,i as d}from"./assets/vendor-04f30708.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const h={lines:13,length:38,width:17,radius:45,scale:1,corners:1,color:"#000",fadeColor:"transparent",speed:1,rotate:0,animation:"spinner-line-fade-quick",direction:1,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:"0 0 1px transparent",position:"absolute"},b="44510981-dcecc8b47662a7959e520ee44",w="https://pixabay.com/api/",x=100;async function v(s,t=1,i=40){if(s.length>x)throw new Error("Keyword is too long");if(!s)throw new Error("Keyword is required");const o=s.split(/\s+/).join("+"),{data:a}=await f(`${w}?key=${b}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${i}`);return a}const r={gallery:document.querySelector(".gallery"),form:document.querySelector("#search-form"),loader:document.getElementById("loader"),spinner:new g(h),lightbox:new y(".gallery a",{}),contentLoader:document.getElementById("content-loader"),submitBtn:document.querySelector('button[type="submit"]')};r.form.addEventListener("submit",_);const n={next_page:1,per_page:40,query:"",max_size:0,loadedImages:0},L={root:null,rootMargin:"0px 0px 300px 0px",threshold:1},u=new IntersectionObserver((s,t)=>{s.forEach(i=>{i.isIntersecting&&(n.loadedImages<n.max_size&&p().then(({hits:e})=>{m(e)}),n.loadedImages>=n.max_size&&(t.unobserve(r.contentLoader),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})))})},L);async function _(s){s.preventDefault(),r.gallery.innerHTML="",u.unobserve(r.contentLoader),n.next_page=1,n.query=r.form.elements.searchQuery.value.trim(),n.loadedImages=0;try{r.spinner.spin(r.loader),r.submitBtn.setAttribute("disabled","disabled");const{hits:t,totalHits:i}=await p();i===0?c("Sorry, there are no images matching your search query. Please try again."):(n.max_size=i,m(t),d.success({title:"Success",message:`Hooray! We found ${i} images.`,position:"topRight"}),u.observe(r.contentLoader))}catch(t){c(t.message)}finally{r.spinner.stop(),r.submitBtn.removeAttribute("disabled"),r.form.reset()}}function c(s){d.error({message:s,position:"topRight"})}async function p(s=n.query,t=n.next_page,i=n.per_page){r.spinner.spin(r.gallery),r.submitBtn.setAttribute("disabled","disabled");try{const e=await v(s,t,i);return n.next_page+=1,n.loadedImages+=e.hits.length,e}catch(e){if(n.next_page==1)throw new Error(e);c(e.message)}finally{r.spinner.stop(),r.submitBtn.removeAttribute("disabled")}}function m(s){let t=document.querySelector(".gallery-container");t||(t=document.createElement("ul"),t.classList.add("gallery-container"),r.gallery.appendChild(t)),n.next_page==2&&I();const i=s.map(e=>`<a href="${e.largeImageURL}">
        <div class="photo-card">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
        <div class="info">
        <p class="info-item">
        <b>Likes</b>
        ${e.likes}
        </p>
        <p class="info-item">
        <b>Views</b>
        ${e.views}
        </p>
        <p class="info-item">
        <b>Comments</b>
        ${e.comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>
        ${e.downloads}
        </p>
        </div>
        </div>
        </a>`).map(e=>`<li class="gallery-item">${e}</li>`).join("");t.insertAdjacentHTML("beforeend",i),r.lightbox.refresh()}function I(){const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
