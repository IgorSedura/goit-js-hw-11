import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './PixabayAPI';
import { createMarkup } from './createMarkup';
import { refs } from './refs';

const pixabay = new PixabayAPI();
const lightbox = new SimpleLightbox('.gallery a');

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    Notify.failure('Введіть дані для пошуку!');
    return;
  }

  pixabay.searchQuery = query;
  clearPage();
  pixabay
    .getPhotos()
    .then(({ hits, total }) => {
      if (hits.length === 0) {
        Notify.info(`За вашим запитом ${query} зображень не знайденно`);
      }
      const markup = createMarkup(hits);
      refs.list.insertAdjacentHTML('beforeend', markup);
      pixabay.calculeteTotalPages(total);
      if (pixabay.isShowLoadMore) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
      lightbox.refresh();
      refs.pixabayLogo.classList.add('is-hidden');
    })
    .catch(error => {
      Notify.failure(error.massege, 'Щось пішло не так');
      clearPage();
    });

  // refs.form.reset();
};

const onLoadMore = () => {
  pixabay.incrementPage();
  pixabay
    .getPhotos()
    .then(({ hits }) => {
      const markup = createMarkup(hits);
      refs.list.insertAdjacentHTML('beforeend', markup);
      if (!pixabay.isShowLoadMore) {
        refs.loadMoreBtn.classList.add('is-hidden');
      }
      lightbox.refresh();
    })
    .catch(error => {
      Notify.failure(error.massege, 'Щось пішло не так');
      clearPage();
    });
};

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function clearPage() {
  pixabay.resetPage();
  refs.list.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
