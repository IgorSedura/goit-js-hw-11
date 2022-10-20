import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './PixabayAPI';

const pixabay = new PixabayAPI();

const refs = {
  form: document.querySelector('.js-search-form'),
  list: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('.js-more'),
};

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const query = searchQuery.value.trim().toLowerCase();
  console.log(query);
  if (!query) {
    Notify.failure('Введіть дані для пошуку!');
    return;
  }
  pixabay.getPhotos(query).then(({ hits }) => {
    const markup = createMarkup(hits);
    console.log(markup);
    refs.list.insertAdjacentHTML('beforeend', markup);
  });
};

refs.form.addEventListener('submit', handleSubmit);

function createMarkup(photos) {
  return photos
    .map(
      ({ largeImageURL, webformatURL, comments, views, likes, downloads }) => {
        return `<li class="photo-card">
 <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="tags" width="190" loading="lazy />
  </a>
  <div class=""></div>
  <ul class="photo-card-list">
    <li class="photo-card-item">
      <p>Лайків: ${likes}</p>
    </li>
    <li class="photo-card-item">
      <p>Переглядів: ${views}</p>
    </li>
    <li class="photo-card-item">
      <p>Коментарів: ${comments}</p>
    </li>
    <li class="photo-card-item">
      <p>Завантажень: ${downloads}</p>
    </li>
  </ul>
              </li>`;
      }
    )
    .join('');
}
