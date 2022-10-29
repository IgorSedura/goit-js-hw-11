const ulTag = document.querySelector('ul');
let totalPages = 20;
function element(currentPage, totalPages) {
  let liTag = '';
  let activLi;
  if (currentPage > 1) {
    liTag += `<li class="btn prev" onclick="element(${
      currentPage - 1
    }, totalPages)"><span>Prev</span></li>`;
  }
  const pages = getPages(currentPage, totalPages);
  for (let i = 0; i < pages.length; i++) {
    if (pages[i] === currentPage) {
      console.log(pages[i]);
      activLi = 'active';
      liTag += `<li class="numb ${activLi}">${pages[i]}</li>`;
    } else if (pages[i] === '...') {
      liTag += `<li class="dots"><span>...</span></li>`;
    } else {
      liTag += `<li class="numb" onclick="element(${pages[i]}, totalPages)">${pages[i]}</li>`;
      console.log(pages[i]);
    }
  }
  if (currentPage < totalPages) {
    liTag += `<li class="btn next" onclick="element(${
      currentPage + 1
    }, totalPages)"><span>Next</span></li>`;
  }
  console.log(liTag);
  ulTag.innerHTML = liTag;
}

function getPages(currentPage, totalPages) {
  let elements = [];
  const pageLimit = 5;
  const threshold = Math.ceil(pageLimit / 2);
  // если страниц меньше, чем лимит, то выводим все страницы
  if (totalPages <= pageLimit + threshold) {
    addPageRange(elements, 1, totalPages);
    return elements;
  }
  // если текущая страница близка к началу, то выводим первые страницы
  // и добавляем многоточие
  // после многоточия выводим последние страницы
  // 1 2 3 4 5 ... 10
  if (currentPage <= threshold) {
    addPageRange(elements, 1, pageLimit);
    addEllipsis(elements);
    addPageRange(elements, totalPages, totalPages);
    return elements;
  }

  // если текущая страница в середине, то выводим первую страницу
  // и добавляем многоточие
  // после многоточия выводим текущую страницу и две соседние
  // и добавляем многоточие
  // после многоточия выводим последнюю страницу
  if (currentPage > threshold && currentPage <= totalPages - threshold) {
    addPageRange(elements, 1, 1);
    addEllipsis(elements);
    addPageRange(elements, currentPage - 2, currentPage + 2);
    addEllipsis(elements);
    addPageRange(elements, totalPages, totalPages);
    return elements;
  }

  // если текущая страница близка к концу, то выводим первую страницу
  // и добавляем многоточие
  // после многоточия выводим последние страницы
  // 1 ... 6 7 8 9 10
  if (currentPage + 1 > totalPages - threshold) {
    addPageRange(elements, 1, 1);
    addEllipsis(elements);
    addPageRange(elements, totalPages - (threshold + 1), totalPages);
    return elements;
  }
}

function addPageRange(elements, start, end) {
  for (let i = start; i <= end; i++) {
    elements.push(i);
  }
}

function addEllipsis(elements) {
  elements.push('...');
}

element(5, totalPages);
