export function createMarkup(photos) {
  return photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        comments,
        views,
        likes,
        downloads,
        tags,
      }) => {
        return `
          <li class="gallery-item">
            <a
              href="${largeImageURL}"
            >
              <img
                src="${webformatURL}"
                width="190"
                loading="lazy"
                alt="${tags}"
            /></a>
            <div class="gallery-info">
              <p class="photo-card-info">
                <span class="bold">Likes:</span> <br />
               ${likes}
              </p>

              <p class="photo-card-info">
              <span class="bold">Views: </span>
                <br />
                ${views}
              </p>

              <p class="photo-card-info">
              <span class="bold">Comments:</span>
                 <br />
                ${comments}
              </p>

              <p class="photo-card-info">
              <span class="bold">Downloads: </span>
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
