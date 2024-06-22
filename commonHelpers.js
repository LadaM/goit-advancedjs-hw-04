import{a as l,S as f,i as c}from"./assets/vendor-c493984e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(r){if(r.ep)return;r.ep=!0;const t=e(r);fetch(r.href,t)}})();const u="44510981-dcecc8b47662a7959e520ee44",d="https://pixabay.com/api/",m=100;async function p(o){if(o.length>m)throw new Error("Keyword is too long");if(!o)throw new Error("Keyword is required");const e=o.trim().split(/\s+/).join("+");return l.get(`${d}?key=${u}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`).then(({data:i})=>i)}const n={gallery:document.querySelector(".gallery"),form:document.querySelector("#search-form")},y=new f(".gallery a",{});n.form.addEventListener("submit",g);async function g(o){o.preventDefault(),n.gallery.innerHTML="";const s=n.form.elements.searchQuery.value;try{const e=await p(s),i=e.hits;i.length===0?c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(console.log(e),c.success({title:"Success",message:`Hooray! We found ${e.totalHits} images.`,position:"topRight"}),h(i))}catch(e){c.error({title:"Error",message:e.message,position:"topRight"})}finally{n.form.reset()}}function h(o){const s=o.map(e=>`<a href="${e.largeImageURL}">
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
        </a>`).map(e=>`<li class="gallery-item">${e}</li>`).join("");n.gallery.insertAdjacentHTML("beforeend",`<ul class="gallery-container">${s}</ul>`),y.refresh()}
//# sourceMappingURL=commonHelpers.js.map
