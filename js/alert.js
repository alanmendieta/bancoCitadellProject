let mensaje = "Este sitio web es un banco nacional, solo gente mayor de edad puede consultar este apartado.";
let confirmacion = confirm(mensaje);

if (confirmacion) {
  let nombre = prompt("Ingrese su nombre:");
  let apellido = prompt("Ingrese su apellido:");
  let dni = prompt("Ingrese su DNI:");
  dni = parseInt(dni);

  let edad = prompt("Por nuestra seguridad ingrese su edad:");
  edad = parseInt(edad);

  if (!isNaN(dni) && !isNaN(edad)) {
    if (edad >= 18) {
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