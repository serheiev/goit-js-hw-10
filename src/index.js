import './css/styles.css';
import Notiflix from 'notiflix';
import _debounce from 'debounce';
import _, { debounce } from 'lodash';
const DEBOUNCE_DELAY = 300;
import { getCountries } from './js/restCountriesAPI';

const searchInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const country = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  e.preventDefault();
  getCountries(e.target.value).then(createCountryCard);
}

function createCountryCard(response) {
  list.innerHTML = '';
  country.innerHTML = '';

  if (response.length > 2) {
    list.innerHTML = '';
    for (let key of response) {
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="item">
        <div><img class="item__img" src='${key.flags.svg}' width = 70 height = 40/>
        <p class="item__name">${key.name}</p></div>
        
       
       </li>`
      );
    }
  } else {
    const { flags, name, population, languages, capital } = response[0];
    list.innerHTML = '';
    country.innerHTML = `
    <div class="card">
    <div class = "card__title"> <img src='${
      flags.svg
    }' width = 70 height = 40/> <h3>${name}</h3></div>
    <p><span>Capital: </span>${capital}</p>
    <p><span>Population: </span>${population}</p>
    <p>
    <span>Languages: </span>${languages
      .map(a => {
        return `${a.name}`;
      })
      .join(', ')}

      </p></div>;
    `;
  }
}
