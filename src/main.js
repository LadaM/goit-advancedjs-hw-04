'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Spinner } from 'spin.js';
import { spinnerOptions } from './js/spinner-options';
import { getImagesByKeyword as getImagesByKeywords } from './js/pixabay-service';

const elements = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  loader: document.getElementById('loader'),
  spinner: new Spinner(spinnerOptions),
  lightbox: new SimpleLightbox('.gallery a', {}),
  contentLoader: document.getElementById('content-loader'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

elements.form.addEventListener('submit', onSearch);

const gallery = {
  page: 1,
  per_page: 40,
  query: '',
  max_size: 0,
  loadedImages: 0,
};

const observerOptions = {
  root: null,
  rootMargin: '0px 0px 300px 0px',
  threshold: 1.0,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImages().then(response => {
        const images = response.hits;
        renderImages(images);
        if (gallery.loadedImages >= gallery.max_size) {
          observer.unobserve(elements.contentLoader); // stop observing if max size reached
          iziToast.info({
            message:
              "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
        }
      });
    }
  });
}, observerOptions);

async function onSearch(event) {
  event.preventDefault();
  elements.gallery.innerHTML = ''; // reset gallery content
  gallery.page = 1;
  gallery.query = elements.form.elements.searchQuery.value;
  gallery.loadedImages = 0; // reset loaded images count

  try {
    elements.spinner.spin(elements.loader);
    elements.submitBtn.setAttribute('disabled', 'disabled');
    const response = await loadImages();
    const images = response.hits;
    if (response.totalHits === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      gallery.max_size = response.totalHits;
      renderImages(images);
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${response.totalHits} images.`,
        position: 'topRight',
      });
      if (gallery.loadedImages < gallery.max_size) {
        observer.observe(elements.contentLoader);
      }
    }
  } catch (error) {
    showError(error.message);
  } finally {
    elements.spinner.stop();
    elements.submitBtn.removeAttribute('disabled');
    elements.form.reset();
  }
}

function showError(message) {
  iziToast.error({
    message: message,
    position: 'topRight',
  });
}

async function loadImages(
  searchQuery = gallery.query,
  page = gallery.page,
  per_page = gallery.per_page
) {
  elements.spinner.spin(elements.gallery);
  elements.submitBtn.setAttribute('disabled', 'disabled');
  return getImagesByKeywords(searchQuery, page, per_page)
    .then(response => {
      gallery.page += 1;
      gallery.loadedImages += response.hits.length; // update loaded images count
      return response;
    })
    .catch(error => {
      if (gallery.page == 1) {
        // when the rist call failed, we expect onSearch() to handle it
        throw new Error(error);
      } else {
        // when any sunsequent call failed, we handle the error ourselves
        showError(error.message);
      }
    })
    .finally(() => {
      elements.spinner.stop();
      elements.submitBtn.removeAttribute('disabled');
    });
}

function renderImages(images) {
  let galleryContainer = document.querySelector('.gallery-container');

  // creating gallery container if it doesn't exist
  if (!galleryContainer) {
    galleryContainer = document.createElement('ul');
    galleryContainer.classList.add('gallery-container');
    elements.gallery.appendChild(galleryContainer);
  }

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
    .map(card => `<li class="gallery-item">${card}</li>`)
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', photoCards);
  elements.lightbox.refresh();
}

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
