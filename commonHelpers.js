import{a as u,S as g,b as f,i as l}from"./assets/vendor-04f30708.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const y={lines:13,length:38,width:17,radius:45,scale:1,corners:1,color:"#000",fadeColor:"transparent",speed:1,rotate:0,animation:"spinner-line-fade-quick",direction:1,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:"0 0 1px transparent",position:"absolute"},h="44510981-dcecc8b47662a7959e520ee44",b="https://pixabay.com/api/",w=100;async function L(i,e=1,a=40){if(i.length>w)throw new Error("Keyword is too long");if(!i)throw new Error("Keyword is required");const o=i.trim().split(/\s+/).join("+");return u.get(`${b}?key=${h}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${a}`).then(({data:n})=>n)}const t={gallery:document.querySelector(".gallery"),form:document.querySelector("#search-form"),loader:document.getElementById("loader"),spinner:new g(y),lightbox:new f(".gallery a",{}),contentLoader:document.getElementById("content-loader"),submitBtn:document.querySelector('button[type="submit"]')};t.form.addEventListener("submit",v);const s={page:1,per_page:10,query:"",max_size:0,loadedImages:0};async function v(i){i.preventDefault(),t.gallery.innerHTML="",s.page=1,s.query=t.form.elements.searchQuery.value,s.loadedImages=0;try{t.spinner.spin(t.loader),t.submitBtn.setAttribute("disabled","disabled");const e=await p(),a=e.hits;e.totalHits===0?l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(s.max_size=e.totalHits,m(a),l.success({title:"Success",message:`Hooray! We found ${e.totalHits} images.`,position:"topRight"}),s.loadedImages<s.max_size&&c.observe(t.contentLoader))}catch(e){l.error({title:"Error",message:e.message,position:"topRight"})}finally{t.spinner.stop(),t.submitBtn.removeAttribute("disabled"),t.form.reset()}}async function p(i=s.query,e=s.page,a=s.per_page){t.spinner.spin(t.gallery),t.submitBtn.setAttribute("disabled","disabled");try{const r=await L(i,e,a);return s.page+=1,s.loadedImages+=r.hits.length,s.loadedImages>=s.max_size&&c.unobserve(t.contentLoader),r}catch(r){l.error({title:"Error",message:r.message,position:"topRight"}),reject(r)}finally{t.spinner.stop(),t.submitBtn.removeAttribute("disabled")}}function m(i){let e=document.querySelector(".gallery-container");e||(e=document.createElement("ul"),e.classList.add("gallery-container"),t.gallery.appendChild(e));const a=i.map(r=>`<a href="${r.largeImageURL}">
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
        </a>`).map(r=>`<li class="gallery-item">${r}</li>`).join("");e.insertAdjacentHTML("beforeend",a),t.lightbox.refresh()}const c=new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&s.loadedImages<s.max_size&&(c.unobserve(t.contentLoader),p().then(a=>{m(a.hits),s.loadedImages<s.max_size&&c.observe(t.contentLoader)}))})},{root:null,rootMargin:"0px 0px 300px 0px",threshold:1});
//# sourceMappingURL=commonHelpers.js.map
