function ajaxRequest(method, url, data) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error('Error en la solicitud AJAX'));
        }
      };
      xhr.onerror = function() {
        reject(new Error('Error de red'));
      };
      xhr.send(JSON.stringify(data));
    });
  }
  
  // Ejemplo de cómo usar la función ajaxRequest:
  ajaxRequest('GET', 'data.json')
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error en la solicitud AJAX:', error);
    });
  