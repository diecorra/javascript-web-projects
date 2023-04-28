// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

const resultsNav = document.querySelector('#resultsNav');
const favoritesNav = document.querySelector('#favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (page === 'results') {
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }
  loader.classList.add('hidden');
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  loader.classList.remove('hidden');
  try {
    const response = await fetch(apiURL);
    resultsArray = await response.json();
    updateDOM('results');
  } catch (error) {
    console.log('Error: ' + error);
  }
}

function saveFavorite(itemUrl) {
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set favorites in localStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
  }
}

getNasaPictures();
