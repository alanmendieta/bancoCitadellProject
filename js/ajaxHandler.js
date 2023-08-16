async function ajaxRequest(method, url, data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud AJAX');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Consulta de datos de préstamos
async function fetchLoansData() {
  try {
    const data = await ajaxRequest('GET', 'loans.json');
    return data.loans;
  } catch (error) {
    throw new Error('Error en la solicitud de datos de préstamos:', error);
  }
}

// Consulta de datos de inversiones
async function fetchInvestmentsData() {
  try {
    const data = await ajaxRequest('GET', 'investments.json');
    return data.investments;
  } catch (error) {
    throw new Error('Error en la solicitud de datos de inversiones:', error);
  }
}

// Consulta de historial de consultas
async function fetchConsultationHistory() {
  try {
    const data = await ajaxRequest('GET', 'history.json');
    return data.consultationHistory;
  } catch (error) {
    throw new Error('Error en la solicitud de historial de consultas:', error);
  }
}