const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);
// Takes values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  console.log(e);
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
