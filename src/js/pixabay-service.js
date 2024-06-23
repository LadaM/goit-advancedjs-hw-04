'use strict';
import axios from 'axios';

const API_KEY = '44510981-dcecc8b47662a7959e520ee44';
const BASE_URL = 'https://pixabay.com/api/';
const MAX_KEYWORD_LENGTH = 100;

async function getImagesByKeyword(searchString, page = 1, per_page = 40) {
  if (searchString.length > MAX_KEYWORD_LENGTH) {
    throw new Error('Keyword is too long');
  }

  if (!searchString) {
    throw new Error('Keyword is required');
  }

  const keywords = searchString.split(/\s+/);
  const searchQuery = keywords.join('+');

  const { data } = await axios(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  
  return data;
}

export { getImagesByKeyword };
