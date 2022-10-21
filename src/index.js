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
        return `
          <li class="gallery-item">
            <a
              href="${largeImageURL}"
            >
              <img
                src="${webformatURL}"
                alt="tags"
                width="190"
                loading="lazy"
                alt="tags"
            /></a>
            <div class="gallery-info">
              <p class="photo-card-info">
                Лайків: <br />
               ${likes}
              </p>

              <p class="photo-card-info">
                Переглядів: <br />
                ${views}
              </p>

              <p class="photo-card-info">
                Коментарів: <br />
                ${comments}
              </p>

              <p class="photo-card-info">
                Завантажень: <br />
                ${downloads}
              </p>
            </div>
          </li>
        `;
      }
    )
    .join('');
}
