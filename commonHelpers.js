import{a as g,S as f,b as y,i as d}from"./assets/vendor-04f30708.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const h={lines:13,length:38,width:17,radius:45,scale:1,corners:1,color:"#000",fadeColor:"transparent",speed:1,rotate:0,animation:"spinner-line-fade-quick",direction:1,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:"0 0 1px transparent",position:"absolute"},b="44510981-dcecc8b47662a7959e520ee44",w="https://pixabay.com/api/",v=100;async function x(s,t=1,a=40){const e=s.trim();if(e.length>v)throw new Error("Keyword is too long");if(!e)throw new Error("Keyword is required");const n=e.split(/\s+/).join("+");return g.get(`${w}?key=${b}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${a}`).then(({data:l})=>l)}const r={gallery:document.querySelector(".gallery"),form:document.querySelector("#search-form"),loader:document.getElementById("loader"),spinner:new f(h),lightbox:new y(".gallery a",{}),contentLoader:document.getElementById("content-loader"),submitBtn:document.querySelector('button[type="submit"]')};r.form.addEventListener("submit",_);const i={next_page:1,per_page:40,query:"",max_size:0,loadedImages:0},L={root:null,rootMargin:"0px 0px 300px 0px",threshold:1},u=new IntersectionObserver((s,t)=>{s.forEach(a=>{a.isIntersecting&&p().then(e=>{const o=e.hits;m(o),i.loadedImages>=i.max_size&&(t.unobserve(r.contentLoader),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))})})},L);async function _(s){s.preventDefault(),r.gallery.innerHTML="",u.unobserve(r.contentLoader),i.next_page=1,i.query=r.form.elements.searchQuery.value,i.loadedImages=0;try{r.spinner.spin(r.loader),r.submitBtn.setAttribute("disabled","disabled");const t=await p(),a=t.hits;t.totalHits===0?c("Sorry, there are no images matching your search query. Please try again."):(i.max_size=t.totalHits,m(a),d.success({title:"Success",message:`Hooray! We found ${t.totalHits} images.`,position:"topRight"}),u.observe(r.contentLoader))}catch(t){c(t.message)}finally{r.spinner.stop(),r.submitBtn.removeAttribute("disabled"),r.form.reset()}}function c(s){d.error({message:s,position:"topRight"})}async function p(s=i.query,t=i.next_page,a=i.per_page){return r.spinner.spin(r.gallery),r.submitBtn.setAttribute("disabled","disabled"),x(s,t,a).then(e=>(i.next_page+=1,i.loadedImages+=e.hits.length,e)).catch(e=>{if(i.next_page==1)throw new Error(e);c(e.message)}).finally(()=>{r.spinner.stop(),r.submitBtn.removeAttribute("disabled")})}function m(s){let t=document.querySelector(".gallery-container");t||(t=document.createElement("ul"),t.classList.add("gallery-container"),r.gallery.appendChild(t)),i.next_page==2&&E();const a=s.map(e=>`<a href="${e.largeImageURL}">
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
        </a>`).map(e=>`<li class="gallery-item">${e}</li>`).join("");t.insertAdjacentHTML("beforeend",a),r.lightbox.refresh()}function E(){const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
