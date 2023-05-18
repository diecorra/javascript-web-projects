const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal-container');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');
const tooltipHandle = document.querySelector('.tooltip-info');
const tooltip = document.querySelector('#tooltip');
const errorContainer = document.querySelector('#error-container');
const modalConfirmContainer = document.querySelector(
  '.modal-confirm-container'
);
const confirmBtn = document.querySelector('#confirm');
const cancelBtn = document.querySelector('#cancel');
let bookmarks = [];
let urlToDelete;

modalShow.addEventListener('click', showModal);

modalClose.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);

window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
  const displayTooltip = getComputedStyle(document.documentElement)
    .getPropertyValue('--tooltip-display')
    .trim();
  if (
    e.target !== tooltipHandle &&
    e.target !== tooltip &&
    displayTooltip === 'block'
  ) {
    document.documentElement.style.setProperty('--tooltip-display', 'none');
  }
});

bookmarkForm.addEventListener('submit', storeBookmark);
tooltipHandle.addEventListener('click', showTooltip);
cancelBtn.addEventListener('click', hideModalConfirm);

fetchBookmarks();
