import { weatherApi } from './api';


const localKey = 'CLOUDY.SAVED_PLACES';
// localStorage.setItem(localKey, JSON.stringify([
//   {
//     id: genUid(),
//     term: 'Provo, Utah, United States of America'
//   },
//   {
//     id: genUid()+'4',
//     term: 'San Francisco, California, United States of America'
//   }
// ]));
let savedPlaces = getPlaces();
export let forecasts = [];

export function buildForecasts() {
  if (savedPlaces.length) {
    // get 1st place
    return getForecast(savedPlaces[0].term).then(
        res => {
          forecasts.push(res);
          // get the rest of the places
          if (savedPlaces.length > 1) {
            return Promise.all(savedPlaces.slice(1).map(place => {
              return getForecast(place.term);
            }));
          } else {
            return Promise.resolve([]);
          }
        }
    ).then(
        res => {
          res.map(place => forecasts.push(place));
          return forecasts;
        }
    );
  } else {
    return Promise.resolve([]);
  }
}

function getForecast(q) {
  return weatherApi.get(`/forecast.json`, {
    params: {
      q,
      days: 10
    }
  }).then(res => res.data);
}



export function genUid() {
  return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}

export function search(q) {
  return weatherApi.get(`/search.json`, {
    params: { q }
  }).then(res => res.data);
}

function getPlaces() {
  let places = localStorage.getItem(localKey);
  if (places && places.length) {
    return JSON.parse(places);
  } else {
    return [];
  }
}

function addPlace(term) {
  let id = genUid();
  savedPlaces.push({ term, id });
  localStorage.setItem(localKey, JSON.stringify(savedPlaces));
  getForecast(term).then(
    res => savedPlaces.push(res)
  );
}