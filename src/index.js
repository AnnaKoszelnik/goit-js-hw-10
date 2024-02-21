import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'

new SlimSelect({
  select: '#selectElement'
})
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');

try {
  loader.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
  errorText.classList.remove('hidden');
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  loader.classList.add('hidden');
}

breedSelect.addEventListener('change', e => {
  loader.classList.remove('hidden');
  fetchCatByBreed(e.target.value).then(data => renderCat(data[0])).catch(error => {
    console.log(error);
   
    errorText.classList.remove('hidden');
  });
});

function renderCat(catData) {
  catInfo.innerHTML = '';

  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
        <h2>${name}</h2>
        <img src="${url}" alt="${name}" class="cat-image" width="60%" height="auto" />
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
    </div>`
  );
  loader.classList.add('hidden');
}
