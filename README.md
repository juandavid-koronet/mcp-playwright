# Komet Sales E2E Testing with Playwright

Este proyecto contiene pruebas automatizadas end-to-end para la aplicación Komet Sales usando Playwright.

## Prerequisitos

- Node.js (versión 18 o superior)
- npm o yarn

## Instalación

```bash
npm install
```

## Configuración

Las pruebas están configuradas para ejecutarse contra el ambiente de testing:
- URL: https://e2e-testing.kometsales-noprod.com
- Usuario: adam
- Compañía: Aflorar

## Ejecución de Pruebas

### Ejecutar todas las pruebas
```bash
npx playwright test
```

### Ejecutar pruebas específicas
```bash
npx playwright test tests/komet-sales-order-creation.spec.ts
```

### Ejecutar pruebas en modo debug
```bash
npx playwright test --debug
```

### Ejecutar pruebas en modo headful (con navegador visible)
```bash
npx playwright test --headed
```

### Ejecutar pruebas y generar reporte
```bash
npx playwright test --reporter=html
```

## Estructura de Pruebas

### `tests/komet-sales-order-creation.spec.ts`
Contiene las pruebas principales para el flujo de creación de órdenes:

1. **`should create an order with customer Juan Vanegas and carrier Armellini`**
   - Prueba completa del flujo de creación de orden
   - Navegación a Order Entry
   - Selección de location Miami
   - Búsqueda y selección de cliente "Juan Vanegas"
   - Selección de carrier "Armellini"
   - Guardado de la orden
   - Verificación del éxito

2. **`should handle customer autocomplete correctly`**
   - Prueba específica del funcionamiento del autocomplete
   - Verificación de la funcionalidad de búsqueda por cliente
   - Validación de navegación con teclado

3. **`should have all required form fields`**
   - Verificación de que todos los campos requeridos están presentes
   - Validación de opciones de carrier
   - Verificación de botones de acción

## Características Especiales

### Búsqueda de Cliente
La prueba implementa el flujo específico requerido para la búsqueda de cliente:
1. Hace clic en el campo de cliente
2. Ingresa 3 espacios en blanco
3. Escribe "juan" letra por letra para activar el autocomplete
4. Usa las teclas de flecha para navegar
5. Presiona Enter para seleccionar

### Verificaciones
- Verificación de elementos de UI
- Validación de valores seleccionados
- Confirmación de mensajes de éxito
- Verificación de información de la orden creada

## Configuración de Playwright

El archivo `playwright.config.ts` incluye:
- Configuración para múltiples navegadores (Chrome, Firefox, Safari)
- Timeouts apropiados para la aplicación
- Captura de screenshots en caso de fallo
- Grabación de video en caso de fallo
- Trazas para debugging

## Debugging

Para hacer debugging de las pruebas:

1. Usar el modo debug: `npx playwright test --debug`
2. Revisar screenshots y videos en `test-results/`
3. Usar el Playwright Inspector para step-by-step debugging
4. Revisar las trazas en caso de fallo

## Notas Importantes

- Las pruebas asumen que el usuario ya está logueado como 'adam' con la compañía 'Aflorar'
- Si se necesita login automático, descomentar las líneas correspondientes en la prueba
- La aplicación puede tener timeouts específicos, ajustar según sea necesario
- Algunos elementos pueden requerir esperas adicionales dependiendo de la velocidad de la red

## Troubleshooting

### Error: "Element not found"
- Verificar que los selectores corresponden a los elementos actuales
- Aumentar timeouts si es necesario
- Verificar que la página esté completamente cargada

### Error: "Timeout waiting for element"
- Aumentar el timeout en la configuración
- Verificar que el elemento se hace visible correctamente
- Usar `waitForSelector` si es necesario

### Error de autenticación
- Verificar que las credenciales sean correctas
- Descomentar y configurar el flujo de login si es necesario
