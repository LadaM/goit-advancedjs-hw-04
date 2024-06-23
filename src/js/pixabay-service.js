'use strict';
import axios from 'axios';

const API_KEY = '44510981-dcecc8b47662a7959e520ee44';
const BASE_URL = 'https://pixabay.com/api/';
const MAX_KEYWORD_LENGTH = 100;

async function getImagesByKeyword(searchString, page = 1, per_page = 40) {
  const searchStringTrimmed = searchString.trim();
  if (searchStringTrimmed.length > MAX_KEYWORD_LENGTH) {
    throw new Error('Keyword is too long');
  }

  if (!searchStringTrimmed) {
    throw new Error('Keyword is required');
  }

  const keywords = searchStringTrimmed.split(/\s+/);
  const searchQuery = keywords.join('+');
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
    )
    .then(({ data }) => data);
}

export { getImagesByKeyword };
