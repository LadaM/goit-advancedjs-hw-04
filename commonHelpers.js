import{a as m,S as g,b as f,i as d}from"./assets/vendor-04f30708.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}})();const y={lines:13,length:38,width:17,radius:45,scale:1,corners:1,color:"#000",fadeColor:"transparent",speed:1,rotate:0,animation:"spinner-line-fade-quick",direction:1,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:"0 0 1px transparent",position:"absolute"},h="44510981-dcecc8b47662a7959e520ee44",b="https://pixabay.com/api/",w=100;async function v(s,e=1,a=40){if(s.length>w)throw new Error("Keyword is too long");if(!s)throw new Error("Keyword is required");const r=s.trim().split(/\s+/).join("+");return m.get(`${b}?key=${h}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${a}`).then(({data:i})=>i)}const o={gallery:document.querySelector(".gallery"),form:document.querySelector("#search-form"),loader:document.getElementById("loader"),spinner:new g(y),lightbox:new f(".gallery a",{}),contentLoader:document.getElementById("content-loader"),submitBtn:document.querySelector('button[type="submit"]')};o.form.addEventListener("submit",x);const n={page:1,per_page:10,query:"",max_size:0,loadedImages:0},L={root:null,rootMargin:"0px 0px 300px 0px",threshold:1},I=new IntersectionObserver((s,e)=>{s.forEach(a=>{a.isIntersecting&&u().then(t=>{const r=t.hits;p(r),n.loadedImages>=n.max_size&&(e.unobserve(o.contentLoader),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))})})},L);async function x(s){s.preventDefault(),o.gallery.innerHTML="",n.page=1,n.query=o.form.elements.searchQuery.value,n.loadedImages=0;try{o.spinner.spin(o.loader),o.submitBtn.setAttribute("disabled","disabled");const e=await u(),a=e.hits;e.totalHits===0?c("Sorry, there are no images matching your search query. Please try again."):(n.max_size=e.totalHits,p(a),d.success({title:"Success",message:`Hooray! We found ${e.totalHits} images.`,position:"topRight"}),n.loadedImages<n.max_size&&I.observe(o.contentLoader))}catch(e){c(e.message)}finally{o.spinner.stop(),o.submitBtn.removeAttribute("disabled"),o.form.reset()}}function c(s){d.error({message:s,position:"topRight"})}async function u(s=n.query,e=n.page,a=n.per_page){return o.spinner.spin(o.gallery),o.submitBtn.setAttribute("disabled","disabled"),v(s,e,a).then(t=>(n.page+=1,n.loadedImages+=t.hits.length,t)).catch(t=>{if(n.page==1)throw new Error(t);c(t.message)}).finally(()=>{o.spinner.stop(),o.submitBtn.removeAttribute("disabled")})}function p(s){let e=document.querySelector(".gallery-container");e||(e=document.createElement("ul"),e.classList.add("gallery-container"),o.gallery.appendChild(e));const a=s.map(t=>`<a href="${t.largeImageURL}">
        <div class="photo-card">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy"/>
        <div class="info">
        <p class="info-item">
        <b>Likes</b>
        ${t.likes}
        </p>
        <p class="info-item">
        <b>Views</b>
        ${t.views}
        </p>
        <p class="info-item">
        <b>Comments</b>
        ${t.comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>
        ${t.downloads}
        </p>
        </div>
        </div>
        </a>`).map(t=>`<li class="gallery-item">${t}</li>`).join("");e.insertAdjacentHTML("beforeend",a),o.lightbox.refresh()}const{height:E}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:E*2,behavior:"smooth"});
//# sourceMappingURL=commonHelpers.js.map
