import{a as u,S as g,b as f,i as l}from"./assets/vendor-04f30708.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const y={lines:13,length:38,width:17,radius:45,scale:1,corners:1,color:"#000",fadeColor:"transparent",speed:1,rotate:0,animation:"spinner-line-fade-quick",direction:1,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:"0 0 1px transparent",position:"absolute"},h="44510981-dcecc8b47662a7959e520ee44",b="https://pixabay.com/api/",w=100;async function L(i,e=1,a=40){if(i.length>w)throw new Error("Keyword is too long");if(!i)throw new Error("Keyword is required");const s=i.trim().split(/\s+/).join("+");return u.get(`${b}?key=${h}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${a}`).then(({data:n})=>n)}const t={gallery:document.querySelector(".gallery"),form:document.querySelector("#search-form"),loader:document.getElementById("loader"),spinner:new g(y),lightbox:new f(".gallery a",{}),contentLoader:document.getElementById("content-loader"),submitBtn:document.querySelector('button[type="submit"]')};t.form.addEventListener("submit",v);const o={page:1,per_page:10,query:"",max_size:0,loadedImages:0};async function v(i){i.preventDefault(),t.gallery.innerHTML="",o.page=1,o.query=t.form.elements.searchQuery.value,o.loadedImages=0;try{t.spinner.spin(t.loader),t.submitBtn.setAttribute("disabled","disabled");const e=await p(),a=e.hits;e.totalHits===0?l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(o.max_size=e.totalHits,m(a),l.success({title:"Success",message:`Hooray! We found ${e.totalHits} images.`,position:"topRight"}),o.loadedImages<o.max_size&&c.observe(t.contentLoader))}catch(e){l.error({title:"Error",message:e.message,position:"topRight"})}finally{t.spinner.stop(),t.submitBtn.removeAttribute("disabled"),t.form.reset()}}async function p(i=o.query,e=o.page,a=o.per_page){return t.spinner.spin(t.gallery),t.submitBtn.setAttribute("disabled","disabled"),L(i,e,a).then(r=>(o.page+=1,o.loadedImages+=r.hits.length,o.loadedImages>=o.max_size&&c.unobserve(t.contentLoader),r)).catch(r=>{if(o.page==1)throw new Error(r);l.error({title:"Error",message:r.message,position:"topRight"})}).finally(()=>{t.spinner.stop(),t.submitBtn.removeAttribute("disabled")})}function m(i){let e=document.querySelector(".gallery-container");e||(e=document.createElement("ul"),e.classList.add("gallery-container"),t.gallery.appendChild(e));const a=i.map(r=>`<a href="${r.largeImageURL}">
        <div class="photo-card">
        <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy"/>
        <div class="info">
        <p class="info-item">
        <b>Likes</b>
        ${r.likes}
        </p>
        <p class="info-item">
        <b>Views</b>
        ${r.views}
        </p>
        <p class="info-item">
        <b>Comments</b>
        ${r.comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>
        ${r.downloads}
        </p>
        </div>
        </div>
        </a>`).map(r=>`<li class="gallery-item">${r}</li>`).join("");e.insertAdjacentHTML("beforeend",a),t.lightbox.refresh()}const c=new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&o.loadedImages<o.max_size&&(c.unobserve(t.contentLoader),p().then(a=>{m(a.hits),o.loadedImages<o.max_size&&c.observe(t.contentLoader)}))})},{root:null,rootMargin:"0px 0px 300px 0px",threshold:1});
//# sourceMappingURL=commonHelpers.js.map
