// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const fechaNacimientoInput = document.getElementById('fechaNacimiento');
  const edadInput = document.getElementById('edad');
  const preguntaSiNoSelect = document.getElementById('preguntaSiNo');
  const otrasPreguntasSelect = document.getElementById('otrasPreguntas');
  const saveAndRateButton = document.getElementById('saveAndRateButton');
  const statusDiv = document.getElementById('status');

  // Cargar las preferencias guardadas al abrir el popup
  function loadPreferences() {
    chrome.storage.sync.get(['fechaNac', 'edad', 'pregunta1', 'otrasPreguntas'], function(items) {
      if (items.fechaNac) {
        fechaNacimientoInput.value = items.fechaNac;
      }
      if (items.edad) {
        edadInput.value = items.edad;
      }
      if (items.pregunta1) {
        preguntaSiNoSelect.value = items.pregunta1;
      }
      if (items.otrasPreguntas) {
        otrasPreguntasSelect.value = items.otrasPreguntas;
      }
    });
  }

  // Guardar las preferencias cuando se cambian los valores
  function savePreferences() {
    chrome.storage.sync.set({
      fechaNac: fechaNacimientoInput.value,
      edad: edadInput.value,
      pregunta1: preguntaSiNoSelect.value,
      otrasPreguntas: otrasPreguntasSelect.value
    });
  }

  // Escuchar cambios en los inputs para guardar automáticamente
  fechaNacimientoInput.addEventListener('change', savePreferences);
  edadInput.addEventListener('change', savePreferences);
  preguntaSiNoSelect.addEventListener('change', savePreferences);
  otrasPreguntasSelect.addEventListener('change', savePreferences);

  // Acción al hacer clic en el botón
  saveAndRateButton.addEventListener('click', function() {
    savePreferences(); // Asegurarse de que los últimos cambios se guarden

    const dataToSend = {
      fechaNac: fechaNacimientoInput.value,
      edad: edadInput.value,
      pregunta1: preguntaSiNoSelect.value,
      otrasPreguntas: otrasPreguntasSelect.value
    };

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs.length === 0) {
        setStatus('No hay pestañas activas.', 'error');
        return;
      }
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "autoRate",
        data: dataToSend
      }, function(response) {
        if (response && response.status) {
          setStatus(response.status, 'success');
        } else if (response && response.error) {
          setStatus('Error: ' + response.error, 'error');
        } else {
          // Si no hay respuesta o es nula/indefinida
          setStatus('Estado desconocido: Revisa la consola para errores.', 'warning');
        }
      });
    });
  });

  function setStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + 'status-' + type; // Añade la clase para el estilo
  }

  // Cargar las preferencias al iniciar el popup
  loadPreferences();
});