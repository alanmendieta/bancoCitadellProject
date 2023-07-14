document.addEventListener('DOMContentLoaded', function() {
  let verificationPopup = document.getElementById('verification-popup');
  let verificationForm = document.getElementById('verification-form');
  verificationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name-input').value;
    let surname = document.getElementById('surname-input').value;
    let dni = parseInt(document.getElementById('dni-input').value);
    let age = parseInt(document.getElementById('age-input').value);

    let lettersRegex = /^[A-Za-z]+$/;

    if (!name || !lettersRegex.test(name)) {
      alert("Por favor, ingrese un nombre válido.");
      return;
    }

    if (!surname || !lettersRegex.test(surname)) {
      alert("Por favor, ingrese un apellido válido.");
      return;
    }

    if (isNaN(dni) || dni.toString().length !== 8) {
      alert("Por favor, ingrese un número de DNI válido (8 dígitos).");
      return;
    }

    if (isNaN(age)) {
      alert("Por favor, ingrese una edad válida.");
      return;
    }

    if (age >= 18) {
      alert("Bienvenido al sitio web oficial del Banco Citadell");
      alert("Por favor, navegue con responsabilidad y nunca proporcione datos a ninguna persona.");
      verificationPopup.classList.remove('show');

      localStorage.setItem('name', name);
      localStorage.setItem('surname', surname);
      localStorage.setItem('dni', dni.toString());
      localStorage.setItem('age', age.toString());

      // Proporcionar modificacion del DOM para mostrar estos datos almacenados
      document.getElementById('name-output').textContent = name;
      document.getElementById('surname-output').textContent = surname;
      document.getElementById('dni-output').textContent = dni.toString();
      document.getElementById('age-output').textContent = age.toString();
    } else {
      alert("Siendo menor de edad no puedes acceder a esta sección, busca permiso de tu padre/madre o tutor legal y contáctanos.");
      window.location.href = "https://www.google.com";
    }
  });
  verificationPopup.classList.add('show');
});

// LOAN
let loanData = [];

// Función para agregar préstamo
function addLoan() {
  let name = document.getElementById('loan-name').value;
  let surname = document.getElementById('loan-surname').value;
  let email = document.getElementById('loan-email').value;
  let province = document.getElementById('loan-province').value;
  let city = document.getElementById('loan-city').value;
  let amount = document.getElementById('loan-amount').value;
  let term = document.getElementById('loan-selector-term-options').value;
  let customerType = document.getElementById('loan-selector-customerType-options').value;

  let interestRate = 0;
  if (term === '6') {
    interestRate = 0.2;
  } else if (term === '12') {
    interestRate = 0.37;
  } else if (term === '18') {
    interestRate = 0.48;
  } else if (term === '24') {
    interestRate = 0.75;
  }

  if (customerType === '2') {
    interestRate -= (interestRate * 0.15);
  } else if (customerType === '3') {
    interestRate -= (interestRate * 0.26);
  } else if (customerType === '4') {
    interestRate -= (interestRate * 0.55);
  }

  let totalAmount = parseFloat(amount) + (parseFloat(amount) * interestRate);

  let loan = {
    name: name,
    surname: surname,
    email: email,
    province: province,
    city: city,
    amount: amount,
    term: term,
    totalAmount: totalAmount
  };

  loanData.push(loan);
  clearTextFields();

  document.getElementById('loan-result').textContent = '$' + totalAmount.toFixed(2);

  // Almacenar datos en el Storage
  localStorage.setItem('loanData', JSON.stringify(loanData));
}

// Recuperar datos del Storage al cargar la página
window.addEventListener('DOMContentLoaded', function() {
  let storedLoanData = localStorage.getItem('loanData');
  if (storedLoanData) {
    loanData = JSON.parse(storedLoanData);
  }
});

// Agregar evento de click al botón de préstamo
let loanButton = document.getElementById('loan-buttom');
loanButton.addEventListener('click', addLoan);

// Función para limpiar los campos de texto
function clearTextFields() {
  document.getElementById('loan-name').value = '';
  document.getElementById('loan-surname').value = '';
  document.getElementById('loan-email').value = '';
  document.getElementById('loan-province').value = '';
  document.getElementById('loan-city').value = '';
  document.getElementById('loan-amount').value = '';
  document.getElementById('loan-result').textContent = '';
}

let nameInput = document.getElementById('loan-name');
let surnameInput = document.getElementById('loan-surname');
let emailInput = document.getElementById('loan-email');
let provinceInput = document.getElementById('loan-province');
let cityInput = document.getElementById('loan-city');

nameInput.addEventListener('input', validateTextInput);
surnameInput.addEventListener('input', validateTextInput);
emailInput.addEventListener('input', validateEmailInput);
provinceInput.addEventListener('input', validateTextInput);
cityInput.addEventListener('input', validateTextInput);

function validateTextInput(event) {
  let input = event.target;
  let inputValue = input.value;
  let validText = /^[A-Za-z\s]+$/.test(inputValue);

  if (!validText) {
    input.value = inputValue.slice(0, -1);
  }
}

function validateEmailInput(event) {
  let input = event.target;
  let inputValue = input.value;
  let validEmail = /^[A-Za-z\s@]+$/.test(inputValue);

  if (!validEmail) {
    input.value = inputValue.slice(0, -1);
  }
}

document.getElementById('loan-name').addEventListener('focus', function() {
  console.log('El campo de nombre ha recibido el foco.');
});

document.getElementById('loan-email').addEventListener('blur', function() {
  console.log('El campo de correo electrónico ha perdido el foco.');
});

document.getElementById('loan-province').addEventListener('change', function() {
  let selectedProvince = this.value;
  console.log('Se ha seleccionado la provincia: ' + selectedProvince);
});

document.getElementById('loan-amount').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    console.log('Se ha presionado la tecla Enter en el campo de cantidad de préstamo.');
  }
});

document.getElementById('loan-buttom').addEventListener('mouseenter', function() {
  console.log('El puntero del mouse ha ingresado al botón de préstamo.');
});

document.getElementById('loan-buttom').addEventListener('mouseleave', function() {
  console.log('El puntero del mouse ha salido del botón de préstamo.');
});

// INVESTMENTS

function saveData(key, value) {
  localStorage.setItem(key, value);
}


function getData(key) {
  return localStorage.getItem(key);
}


window.addEventListener('load', function() {

  const storedAmount = getData('investmentsAmount');
  const storedTerm = getData('investmentsTerm');
  const storedPercentage = getData('investmentsPercentage');
  const storedResult = getData('investmentsResult');

  if (storedAmount) {
    document.getElementById('investments-amount').value = storedAmount;
  }
  if (storedTerm) {
    document.getElementById('investments-selector-term-options').value = storedTerm;
  }
  if (storedPercentage) {
    document.getElementById('investments-percentage').value = storedPercentage;
  }
  if (storedResult) {
    document.getElementById('investments-result').textContent = storedResult;
  }
});

function handleInvestments() {
  event.preventDefault();

  const amount = parseFloat(document.getElementById('investments-amount').value);
  const term = parseInt(document.getElementById('investments-selector-term-options').value);
  const percentageInput = document.getElementById('investments-percentage');
  const percentage = percentageInput.value.replace(/[^0-9,]/g, '');

  let rate = 0;
  switch (term) {
    case 3:
      rate = 11;
      break;
    case 6:
      rate = 24;
      break;
    case 9:
      rate = 36;
      break;
    case 12:
      rate = 49;
      break;
    default:
      rate = 0;
      break;
  }

  const totalAmount = amount * (1 + (parseFloat(percentage.replace(',', '.')) / 100)) * (1 + (rate / 100));

  document.getElementById('investments-result').textContent = '$' + totalAmount.toFixed(2);

  saveData('investmentsAmount', amount);
  saveData('investmentsTerm', term);
  saveData('investmentsPercentage', percentageInput.value);
  saveData('investmentsResult', '$' + totalAmount.toFixed(2));
}
document.getElementById('investments-button').addEventListener('click', handleInvestments);

document.getElementById('investments-percentage').addEventListener('input', function(event) {
  let input = event.target;
  let inputValue = input.value;
  let validText = /^[0-9,]+$/.test(inputValue);

  if (!validText) {
    input.value = inputValue.slice(0, -1);
  }
});