const ulTag = document.querySelector('ul');
const totalPages = 20;

function element(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforPages = page - 1;
  let afterPages = page + 1;
  if (page > 1) {
    liTag += `<li class="btn prev" onclick="element(totalPages, ${
      page - 1
    })"><span>Prev</span></li>`;
    if (page > 2) {
      liTag += `<li class="numb " onclick="element(totalPages, 1)"><span>1</span></li>
      `;
    }
    if (page > 4) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page === totalPages) {
    beforPages = beforPages - 2;
  } else if (page === totalPages - 1) {
    beforPages = beforPages - 1;
  }
  if (page === 1) {
    aferPages = afterPages + 2;
  } else if (page === 2) {
    afterPages = afterPages + 1;
  }

  for (let pageLength = beforPages; pageLength <= afterPages; pageLength += 1) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength === 0) {
      pageLength = pageLength + 1;
    }
    if (page === pageLength) {
      activeLi = 'active';
    } else {
      activeLi = '';
    }
    liTag += ` <li class="numb ${activeLi}"  onclick="element(totalPages,${pageLength})"><span>${pageLength}</span></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="numb "onclick="element(totalPages,${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next" onclick="element(totalPages, ${
      page + 1
    })"><span>Next</span></li>`;
  }
  ulTag.innerHTML = liTag;
}
element(totalPages, 5);
