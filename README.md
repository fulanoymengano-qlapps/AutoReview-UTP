# AutoReview-UTP

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-v3-34A853)
![UTP](https://img.shields.io/badge/UTP-AutoReview-0F9D58)

AutoReview-UTP es una extensión de Chrome pensada para hacer más rápida y cómoda la parte repetitiva de calificar profesores en la plataforma de la UTP.

La idea es simple: guardar un preset con tus valores más usados y aplicarlo con un clic para llenar automáticamente los campos que normalmente se repiten en cada evaluación.

## ¿Qué hace?

- Guarda tus preferencias en el popup de la extensión.
- Rellena campos como fecha de nacimiento y edad.
- Selecciona respuestas de sí/no para la primera pregunta.
- Aplica una calificación repetida para las demás preguntas del formulario.
- Reduce el tiempo que se pierde navegando un formulario que suele ser largo y repetitivo.

## ¿Cómo funciona?

1. Abre la extensión desde Chrome.
2. Configura tu preset en el popup.
3. Entra a la página de calificación de la UTP.
4. Haz clic en **Guardar y Calificar**.
5. La extensión aplica los valores directamente en el formulario para que solo revises antes de enviar.

## Instalación

### Opción manual

1. Descarga o clona este repositorio.
2. Abre Chrome y entra a `chrome://extensions`.
3. Activa el modo desarrollador.
4. Haz clic en **Cargar descomprimida**.
5. Selecciona la carpeta del proyecto.

## Uso

El popup incluye estos controles:

- Fecha de nacimiento.
- Edad.
- Respuesta para la primera pregunta de sí/no.
- Preset para las preguntas restantes.

La extensión trabaja sobre la página de la UTP y rellena los campos identificados en el formulario automáticamente.

## Alcance

Esta herramienta no reemplaza tu revisión final. Su objetivo es agilizar la parte mecánica de la evaluación, no enviar respuestas por ti sin supervisión.

## Privacidad

- Tus valores se guardan en `chrome.storage.sync` para que estén disponibles entre sesiones.
- La extensión solo funciona en `https://matricula.utp.ac.pa/*`.
- No está pensada para recopilar ni enviar datos a terceros.

## Nota

Si la UTP cambia los IDs del formulario o la estructura de la página porfavor avisarme para actualizar la extensión
