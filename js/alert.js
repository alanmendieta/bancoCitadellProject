// ALERT MESSAGE PROMPT
let message = "Este sitio web es un banco nacional, solo gente mayor de edad puede consultar este apartado.";
let confirmation = confirm(message);

if (confirmation) {
  let name = prompt("Ingrese su nombre:");
  let surname = prompt("Ingrese su apellido:");
  let dni = prompt("Ingrese su DNI:");
  dni = parseInt(dni);

  let age = prompt("Por nuestra seguridad ingrese su edad:");
  age = parseInt(age);

  if (!isNaN(dni) && !isNaN(age)) {
    if (age >= 18) {
      alert("Bienvenido al sitio web oficial del Banco Citadell");
      alert("Por favor, navege con responsabilidad y nunca proporcione datos a ninguna persona.");
    } else {
      alert("Siendo menor de edad no puedes acceder a esta sección, busca permiso de tu padre/madre o tutor legal y contáctanos.");
      window.location.href = "https://www.google.com"
    }
  } else {
    alert("Ingresa números válidos en el DNI y la edad.");
  }
}