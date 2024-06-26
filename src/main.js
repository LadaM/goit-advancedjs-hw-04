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
  next_page: 1,
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
      if(gallery.loadedImages < gallery.max_size) {
        loadImages().then(({hits: images}) => {
          renderImages(images);
        });
      }
      if (gallery.loadedImages >= gallery.max_size) {
        observer.unobserve(elements.contentLoader); // stop observing if max size reached
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  });
}, observerOptions);

async function onSearch(event) {
  event.preventDefault();
  elements.gallery.innerHTML = ''; // reset gallery content
  observer.unobserve(elements.contentLoader); // stop observing if new search request to prevent double loading
  gallery.next_page = 1;
  gallery.query = elements.form.elements.searchQuery.value.trim();
  gallery.loadedImages = 0; // reset loaded images count

  try {
    elements.spinner.spin(elements.loader);
    elements.submitBtn.setAttribute('disabled', 'disabled');
    const { hits: images, totalHits } = await loadImages();
    if (totalHits === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      gallery.max_size = totalHits;
      renderImages(images);
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${totalHits} images.`,
        position: 'topRight',
      });
      observer.observe(elements.contentLoader);
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
  page = gallery.next_page,
  per_page = gallery.per_page
) {
  elements.spinner.spin(elements.gallery);
  elements.submitBtn.setAttribute('disabled', 'disabled');

  try {
    const data  = await getImagesByKeywords(searchQuery, page, per_page);
    gallery.next_page += 1;
    gallery.loadedImages += data.hits.length; // update loaded images count
    return data;
  } catch (error) {
    if (gallery.next_page == 1) {
      // when the first call failed, we expect onSearch() to handle it
      throw new Error(error);
    } else {
      // when any subsequent call failed, we handle the error ourselves
      showError(error.message);
    }
  } finally {
    elements.spinner.stop();
    elements.submitBtn.removeAttribute('disabled');
  }
}

function renderImages(images) {
  let galleryContainer = document.querySelector('.gallery-container');

  // creating gallery container if it doesn't exist
  if (!galleryContainer) {
    galleryContainer = document.createElement('ul');
    galleryContainer.classList.add('gallery-container');
    elements.gallery.appendChild(galleryContainer);
  }

  // adjust scroll position for the first page
  if (gallery.next_page == 2) {
    adjustScrollPosition();
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

function adjustScrollPosition() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
