import Notiflix from 'notiflix';
const baseURL = 'https://restcountries.com/v2/name/';
const options = 'name,capital,population,flags,languages';
export function getCountries(name) {
  return fetch(`${baseURL}${name}?fields=${options}`)
    .then(data => {
      if (!data.ok) {
        throw new Error();
      } else {
        return data.json();
      }
    })
    .then(resp => {
      if (resp.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        return resp;
      }
    })
    .catch(err => {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
}

//Notiflix.Notify.warning('Memento te hominem esse') yellow
//Notiflix.Notify.failure('Qui timide rogat docet negare'); red
