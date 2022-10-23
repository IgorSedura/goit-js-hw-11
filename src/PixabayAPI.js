import axios from 'axios';
export class PixabayAPI {
  #page = 1;
  #searchQuery = '';
  #totalPages = 0;
  async getPhotos() {
    const { data } =
      await axios.get(`https://pixabay.com/api/?key=30651133-37623b4f3852317d355011ed5&q=${
        this.searchQuery
      }
    &image_type=photo&pretty=true&orientation=horizantal&safesearch=true&per_page=12&page=${
      this.#page
    }`);

    return data;
  }

  set searchQuery(newQuery) {
    this.#searchQuery = newQuery;
  }

  get searchQuery() {
    return this.#searchQuery;
  }

  incrementPage() {
    this.#page += 1;
  }
  resetPage() {
    this.#page = 1;
  }
  calculeteTotalPages(total) {
    this.#totalPages = Math.ceil(total / 12);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
