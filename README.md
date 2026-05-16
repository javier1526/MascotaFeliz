# MascotaFeliz
Landing Page sobre la tienda de mascotas "MascotaFeliz"

-----------------------------------------------------------------------------------------
# Proyecto: Panel de Gestión de Inventario - Mascota Feliz

## Descripción
Este proyecto consiste en un sistema de punto de venta y gestión de stock, aplicando manipulación avanzada del DOM, estructuras de datos (arreglos y objetos) y almacenamiento local.

## Características Principales
* **Catálogo dinámico:** Selección de productos desde una base de datos predefinida e inserción de nuevos ítems.
* **Gestión de stock:** Interfaz de divulgación progresiva para sumar, restar o fijar cantidades con validaciones lógicas para evitar inventario negativo.
* **Persistencia de datos:** Uso de API Web Storage (localStorage) para mantener el inventario y las modificaciones del catálogo tras recargar la página.
* **Seguridad:** Prevención de ataques XSS mediante el uso exclusivo de `textContent` y `createElement`, sumado a validaciones mixtas (HTML5 nativo y Expresiones Regulares en JavaScript).
* **Interactividad:** Buscador en tiempo real que filtra los arreglos de objetos dinámicamente, y cálculo automático de subtotales mediante funciones de orden superior.

---

## Documentación sobre el uso de Inteligencia Artificial (IA)

Durante el desarrollo de este proyecto, se utilizó Inteligencia Artificial como herramienta de apoyo para refactorizar el código, asegurar buenas prácticas y cumplir con los estándares de optimización exigidos en la rúbrica de evaluación.

### 1. Refactorización de Seguridad (Prevención XSS)
* **Prompt utilizado:** "Estoy haciendo un carrito de compras en JavaScript. Necesito refactorizar mi código para que el DOM se actualice de forma segura sin riesgo de ataques XSS (no usar innerHTML con datos del usuario)."
* **Mejora implementada:** Se reemplazó la inyección directa de código HTML por la creación de nodos independientes utilizando `document.createElement()` y la asignación de valores mediante `textContent`. 

### 2. Validaciones Complejas (Expresiones Regulares)
* **Prompt utilizado:** "Necesito una expresión regular para validar el nombre de los productos. Debe permitir letras, números, espacios y tildes, pero también caracteres como puntos o guiones para productos como 'Bravecto 4.5 KG', bloqueando símbolos peligrosos como <, >, o @."
* **Mejora implementada:** Se integró la expresión regular `/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\.\,\-\+\(\)]+$/`, logrando un control estricto de los datos de entrada en el formulario principal y en las ventanas modales.

### 3. Lógica de Persistencia de Datos
* **Prompt utilizado:** "Quiero que mi inventario no se borre al recargar la página. Los productos están guardados en un arreglo de objetos llamado 'items'. ¿Cómo integro esto de forma eficiente?"
* **Mejora implementada:** Se implementó `localStorage.setItem` y `getItem` junto con la serialización de datos (`JSON.parse` y `JSON.stringify`), asociando la recuperación de la información al evento `DOMContentLoaded` para inicializar el sistema correctamente.
