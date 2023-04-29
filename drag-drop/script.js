const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.querySelector('#backlog-list');
const progressList = document.querySelector('#progress-list');
const completeList = document.querySelector('#complete-list');
const onHoldList = document.querySelector('#on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

let draggedItem;
let currentColumn;

// Drag Functionality

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

getSavedColumns();
updateSavedColumns();

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((name, index) => {
    localStorage.setItem(`${name}Items`, JSON.stringify(listArrays[index]));
  });
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  });
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((backlogItem, index) => {
    createItemEl(progressList, 0, backlogItem, index);
  });
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((backlogItem, index) => {
    createItemEl(completeList, 0, backlogItem, index);
  });
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((backlogItem, index) => {
    createItemEl(onHoldList, 0, backlogItem, index);
  });
  // Run getSavedColumns only once, Update Local Storage
}

function drag(e) {
  draggedItem = e.target;
}

function allowDrop(e) {
  e.preventDefault();
}

function dragEnter(column) {
  listColumns[column].classList.add('over');
  currentColumn = column;
}

function drop(e) {
  e.preventDefault();
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });
  // Add item to column
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
}

updateDOM();
