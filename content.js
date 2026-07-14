// content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "autoRate" && request.data) {
    try {
      const { fechaNac, edad, pregunta1, otrasPreguntas } = request.data;

      // 1. Rellenar Fecha de Nacimiento
      const fechaNacInput = document.getElementById('cphContenido_txtFechaNac');
      if (fechaNacInput) {
        fechaNacInput.value = fechaNac;
        fechaNacInput.dispatchEvent(new Event('input', { bubbles: true }));
        fechaNacInput.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        console.warn('Campo de Fecha de Nacimiento no encontrado.');
      }

      // 2. Rellenar Edad
      const edadInput = document.getElementById('cphContenido_txtEdad');
      if (edadInput) {
        edadInput.value = edad;
        edadInput.dispatchEvent(new Event('input', { bubbles: true }));
        edadInput.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        console.warn('Campo de Edad no encontrado.');
      }

      // 3. Rellenar Pregunta 1 (Sí/No)
      const rbl0Selector = `cphContenido_Rbl0_${pregunta1 === '5' ? '0' : '1'}`;
      const rbl0Input = document.getElementById(rbl0Selector);
      if (rbl0Input) {
        rbl0Input.checked = true;
        rbl0Input.dispatchEvent(new Event('click', { bubbles: true }));
        rbl0Input.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        console.warn(`Radio button para Pregunta 1 con valor ${pregunta1} no encontrado.`);
      }

      // 4. Rellenar Preguntas 2 a 15 (Escala)
      // El valor del preset (5=Sobresaliente, 4=Bueno, etc.) nos da el sufijo del ID
      let suffix = '';
      switch(otrasPreguntas) {
        case '5': suffix = '0'; break; // Sobresaliente
        case '4': suffix = '1'; break; // Bueno
        case '3': suffix = '2'; break; // Satisfactorio
        case '2': suffix = '3'; break; // Regular
        case '1': suffix = '4'; break; // Deficiente
        default: console.warn('Valor de calificación para preguntas 2-15 no válido.'); break;
      }

      if (suffix !== '') {
        for (let i = 1; i <= 14; i++) { // Itera de Rbl1 a Rbl14 (14 preguntas)
          const rblSelector = `cphContenido_Rbl${i}_${suffix}`;
          const rblInput = document.getElementById(rblSelector);
          if (rblInput) {
            rblInput.checked = true;
            rblInput.dispatchEvent(new Event('click', { bubbles: true }));
            rblInput.dispatchEvent(new Event('change', { bubbles: true }));
          } else {
            console.warn(`Radio button para Pregunta ${i+1} con valor ${otrasPreguntas} no encontrado.`);
          }
        }
      }

      sendResponse({ status: "Calificación aplicada exitosamente. Por favor, revisa antes de enviar." });

    } catch (error) {
      console.error("Error al aplicar la calificación:", error);
      sendResponse({ error: "Ocurrió un error al aplicar la calificación. Revisa la consola para más detalles." });
    }
  }
});