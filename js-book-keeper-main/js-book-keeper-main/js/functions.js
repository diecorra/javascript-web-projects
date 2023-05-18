function showTooltip() {
  const displayTooltip = getComputedStyle(document.documentElement)
    .getPropertyValue('--tooltip-display')
    .trim();
  if (displayTooltip === 'none') {
    document.documentElement.style.setProperty('--tooltip-display', 'block');
  } else {
    document.documentElement.style.setProperty('--tooltip-display', 'none');
  }
}

function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  // no values entered
  if (!nameValue || !urlValue) {
    setError('ERROR: enter values first!');
    setTimeout(() => {
      clearSetError();
    }, 3000);
    return false;
  }
  // name already exists
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (let bookmark of bookmarks) {
    if (bookmark.name === nameValue) {
      setError('ERROR: name already exists!');
      setTimeout(() => {
        clearSetError();
      }, 3000);
      return false;
    }
  }
  // url already exists
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (let bookmark of bookmarks) {
    if (bookmark.url === urlValue) {
      setError('ERROR: url already exists!');
      setTimeout(() => {
        clearSetError();
      }, 3000);
      return false;
    }
  }
  // url not valid
  if (!urlValue.match(regex)) {
    setError('ERROR: enter a valid url!');
    setTimeout(() => {
      clearSetError();
    }, 3000);
    return false;
  }
  // Valid
  return true;
}

function setError(errorMessage) {
  errorContainer.classList.add('error-container-class');
  errorContainer.textContent = errorMessage;
}

function clearSetError() {
  errorContainer.classList.remove('error-container-class');
  errorContainer.textContent = '';
}

// Build Boomarks DOM
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarkContainer.textContent = '';
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close container
    const closeContainer = document.createElement('div');
    closeContainer.classList.add('close-container');
    // Close icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-trash', 'fa-xs');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `closeIconFunction(this)`);
    closeIcon.setAttribute('data-delete', false);
    closeIcon.setAttribute('data-url', url);
    confirmBtn.setAttribute('onclick', `deleteBookmark()`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    const linkInfoName = document.createElement('a');
    linkInfoName.classList.add('link-info-name');
    linkInfoName.setAttribute('href', `${url}`);
    linkInfoName.setAttribute('target', '_blank');
    linkInfoName.textContent = url;
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('span');
    link.textContent = name;
    // Append to boomarks container
    closeContainer.append(closeIcon);
    linkInfo.append(favicon, link);
    item.append(closeContainer, linkInfo, linkInfoName);
    bookmarkContainer.appendChild(item);
  });
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (
    localStorage.getItem('bookmarks') &&
    localStorage.getItem('bookmarks') !== '' &&
    localStorage.getItem('bookmarks') !== '[]'
  ) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    buildBookmarks();
  } else {
    // Remove all bookmark elements
    bookmarkContainer.textContent = '';
    // Create paragraph an alert
    const paragraph = document.createElement('p');
    paragraph.classList.add('no-bookmarks');
    paragraph.textContent = 'NO BOOKMARKS SAVED AT THE MOMENT';
    bookmarkContainer.appendChild(paragraph);
  }
}

function closeIconFunction(closeIcon) {
  modalConfirmContainer.classList.remove('display-none');
  closeIcon.setAttribute('data-delete', 'true');
}

// Hide modal confirm
function hideModalConfirm() {
  modalConfirmContainer.classList.add('display-none');
  document
    .querySelector('[data-delete="true"]')
    .setAttribute('data-delete', 'false');
}

// Delete Bookmark
function deleteBookmark() {
  const url = document
    .querySelector('[data-delete="true"]')
    .getAttribute('data-url');
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  modalConfirmContainer.classList.add('display-none');
}

function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }
  if (localStorage.getItem('bookmarks') && !validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
  // closing modal
  modal.classList.remove('show-modal');
}
