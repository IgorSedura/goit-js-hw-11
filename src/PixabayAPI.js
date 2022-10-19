export class PixabayAPI {
  getPhotos(query) {
    const url = `https://pixabay.com/api/?key=30651133-37623b4f3852317d355011ed5&q=${query}&image_type=photo&pretty=true&orientation=horizantal&safesearch=true&per_page=12`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
