'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByKeyword } from './js/pixabay-service';

const elements = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
};
const lightbox = new SimpleLightbox('.gallery a', {});
elements.form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';
  const query = elements.form.elements.searchQuery.value;
  try {
    const response = await getImagesByKeyword(query);
    const images = response.hits;
    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
    } else {
      console.log(response);
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${response.totalHits} images.`,
        position: 'topRight',
      });
      renderImages(images);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    elements.form.reset();
  }
}

function renderImages(images) {
    const photoCards = images
    .map(image => {
        return `<a href="${image.largeImageURL}">
        <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
        <div class="info">
        <p class="info-item">
        <b>Likes</b>
        ${image.likes}
        </p>
        <p class="info-item">
        <b>Views</b>
        ${image.views}
        </p>
        <p class="info-item">
        <b>Comments</b>
        ${image.comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>
        ${image.downloads}
        </p>
        </div>
        </div>
        </a>`;
    })
    .map(card => `<li class="gallery-item>${card}</li>`)
    .join('');
    elements.gallery.insertAdjacentHTML('beforeend', `<ul>${photoCards}</ul>`);
    lightbox.refresh();
}
