// PROMPT
 let message = "Este sitio web es un banco nacional, solo gente mayor de edad puede consultar este apartado.";
 let confirmation = confirm(message);

 if (confirmation) {
   let name, surname, dni, age;
   const lettersRegex = /^[A-Za-z]+$/;

   do {
     name = prompt("Ingrese su nombre:");
   } while (!name || !lettersRegex.test(name));

   do {
     surname = prompt("Ingrese su apellido:");
   } while (!surname || !lettersRegex.test(surname));

   do {
     dni = prompt("Ingrese su DNI (8 dígitos):");
     dni = parseInt(dni);
   } while (isNaN(dni) || dni.toString().length !== 8);

   do {
     age = prompt("Por nuestra seguridad, ingrese su edad:");
     age = parseInt(age);
   } while (isNaN(age));

   if (age >= 18) {
     alert("Bienvenido al sitio web oficial del Banco Citadell");
     alert("Por favor, navegue con responsabilidad y nunca proporcione datos a ninguna persona.");
   } else {
     alert("Siendo menor de edad no puedes acceder a esta sección, busca permiso de tu padre/madre o tutor legal y contáctanos.");
     window.location.href = "https://www.google.com";
   }
 } else {
   alert("No has confirmado el acceso. Serás redirigido a la página principal.");
   window.location.href = "https://www.google.com";
} 

// LOAN
let loanData = [];

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
}

let loanButton = document.getElementById('loan-buttom');
loanButton.addEventListener('click', addLoan);

function clearTextFields() {
  document.getElementById('loan-name').value = '';
  document.getElementById('loan-surname').value = '';
  document.getElementById('loan-email').value = '';
  document.getElementById('loan-province').value = '';
  document.getElementById('loan-city').value = '';
  document.getElementById('loan-amount').value = '';
  document.getElementById('loan-result').textContent = '';
}

function searchLoansByEmail(email) {
  return loanData.find(function(loan) {
    return loan.email === email;
  });
}

function filtrarPrestamosPorProvincia(province) {
  return loanData.filter(function(loan) {
    return loan.province === province;
  });
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

// INVESTMENTS
document.getElementById('investments-buttom').addEventListener('click', function(event) {
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
});

document.getElementById('investments-percentage').addEventListener('input', function(event) {
  let input = event.target;
  let inputValue = input.value;
  let validText = /^[0-9,]+$/.test(inputValue);

  if (!validText) {
    input.value = inputValue.slice(0, -1);
  }
});