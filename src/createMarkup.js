export function createMarkup(photos) {
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
                <span class="bold">Лайків:</span> <br />
               ${likes}
              </p>

              <p class="photo-card-info">
              <span class="bold">Переглядів: </span>
                <br />
                ${views}
              </p>

              <p class="photo-card-info">
              <span class="bold">Коментарів:</span>
                 <br />
                ${comments}
              </p>

              <p class="photo-card-info">
              <span class="bold">Завантажень: </span>
                <br />
                ${downloads}
              </p>
            </div>
          </li>
        `;
      }
    )
    .join('');
}
