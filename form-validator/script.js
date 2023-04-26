const form = document.querySelector('#form');
const password1El = document.querySelector('#password1');
const password2El = document.querySelector('#password2');
const messageContainer = document.querySelector('.message-container');
const message = document.querySelector('#message');

let isValid = false;
let passwordMatch = false;

function processFormData(e) {
  e.preventDefault();
  // Validate Form
  validateForm() ? storeFormData() : null;
}

function validateForm() {
  isValid = form.checkValidity();
  // Style main message for an error
  if (!isValid) {
    message.textContent = 'Please fill out all the fields';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return false;
  }
  // Check to see if passwords match
  if (password1El.value === password2El.value) {
    passwordMatch = true;
    password1El.style.borderColor = 'green';
    password2El.style.borderColor = 'green';
  } else {
    passwordMatch = false;
    message.textContent = 'Make sure passwords match.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
  }
  // If form is valid and passwords match
  if (isValid && passwordMatch) {
    message.textContent = 'Succesfuly Registered!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
    return true;
  }
  return false;
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  console.log(user);
}

// Event Listener
form.addEventListener('submit', processFormData);
