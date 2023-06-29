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