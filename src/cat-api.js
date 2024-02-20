import axios from 'axios';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_U3cCxZ8YG2bh6qDji97kJEdEqKFbkyVGnxtRn8QQImAjKRSU7DizWD4xksaqUKDH';

  return axios.get(`https://api.thecatapi.com/v1/breeds`).then(res => res.data);
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
};