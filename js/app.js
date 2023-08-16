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

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.loans.push(loan);
      return fetch('data.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    })
    .then(() => clearTextFields())
    .catch(error => console.error('Error al guardar datos en el archivo JSON:', error));
}

// Recuperar datos del Storage al cargar la página
window.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    loanData = data.loans;
    let storedLoanData = localStorage.getItem('loanData');
    if (storedLoanData) {
      loanData = JSON.parse(storedLoanData);
    }
  } catch (error) {
    console.error('Error al cargar datos desde el archivo JSON:', error);
  }

  const consultationHistory = JSON.parse(localStorage.getItem('consultationHistory')) || [];

  function updateConsultationHistory() {
    const historyList = document.getElementById('consultation-history-list');
    historyList.innerHTML = '';

    consultationHistory.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Consulta ${index + 1}: ${item}`;
      historyList.appendChild(listItem);
    });
  }

  updateConsultationHistory();

  loanButton.addEventListener('click', async function () {
    consultationHistory.push('Consulta de préstamo');
    localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
    updateConsultationHistory();
  });

  investmentsButton.addEventListener('click', async function () {
    consultationHistory.push('Consulta de inversiones');
    localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
    updateConsultationHistory();
  });
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

async function fetchConsultationHistory() {
  try {
    const data = await ajaxRequest('GET', 'data.json');
    return data.consultationHistory;
  } catch (error) {
    throw new Error('Error en la solicitud de historial de consultas:', error);
  }
}

function addToConsultationHistory(type, name, amount, result) {
  const newEntry = {
    type: type,
    name: name,
    amount: amount,
    result: result
  };

  const consultationHistory = JSON.parse(localStorage.getItem('consultationHistory')) || [];
  consultationHistory.push(newEntry);

  localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
}

const type = 'loan';
const name = 'Juan Perez';
const amount = '10000';
const result = '12370';
addToConsultationHistory(type, name, amount, result);

function loadConsultationHistory() {
  const consultationHistory = JSON.parse(localStorage.getItem('consultationHistory')) || [];
}

window.addEventListener('load', loadConsultationHistory);