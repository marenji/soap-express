# Servicios SOAP con Express y WSDL

Aplicación en Node.js y Express que expone dos servicios web SOAP, cada uno con su contrato WSDL y dos operaciones. Incluye un middleware que registra cada petición y un Router que separa las rutas del archivo principal.

## Requisitos

- Node.js 18 o superior
- npm
- curl (en Windows se usa `curl.exe`, que ya viene incluido) o Postman/SoapUI

## Instalación

```bash
git clone git clone https://github.com/marenji/soap-express.git 
cd soap-express
npm install
```

## Ejecución

```bash
npm start
```

El servidor queda disponible en `http://localhost:3000`. Para detenerlo, presiona `Ctrl + C`.

## Estructura del proyecto

```
src/
  server.js                      Arranque del servidor
  app.js                         Configuración de la app (middleware y Router)
  middleware/logger.js           Registro de peticiones
  routes/soap.routes.js          Registro de los servicios SOAP
  services/                      Lógica de las operaciones
  wsdl/                          Contratos WSDL
pruebas/                         Peticiones XML de prueba
evidencias/                      Capturas de las pruebas
```

## Endpoints y contratos WSDL

| Servicio | Endpoint | WSDL |
| --- | --- | --- |
| ConversionesService | `http://localhost:3000/soap/conversiones` | `http://localhost:3000/soap/conversiones?wsdl` |
| GeometriaService | `http://localhost:3000/soap/geometria` | `http://localhost:3000/soap/geometria?wsdl` |

## Operaciones

| Servicio | Operación | Entrada | Resultado |
| --- | --- | --- | --- |
| ConversionesService | CelsiusAFahrenheit | celsius | fahrenheit |
| ConversionesService | KilometrosAMillas | kilometros | millas |
| GeometriaService | AreaRectangulo | base, altura | area |
| GeometriaService | PerimetroRectangulo | base, altura | perimetro |

## Cómo reproducir las pruebas

Con el servidor en ejecución, abre una segunda terminal en la carpeta del proyecto. Cada petición lee su XML desde la carpeta `pruebas/`.

### 1. CelsiusAFahrenheit (25 °C, esperado: 77)

```bash
curl.exe -X POST http://localhost:3000/soap/conversiones -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://example.com/conversiones/CelsiusAFahrenheit" --data-binary "@pruebas/celsius.xml"
```

### 2. KilometrosAMillas (10 km, esperado: 6.21371)

```bash
curl.exe -X POST http://localhost:3000/soap/conversiones -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://example.com/conversiones/KilometrosAMillas" --data-binary "@pruebas/kilometros.xml"
```

### 3. AreaRectangulo (base 8, altura 5, esperado: 40)

```bash
curl.exe -X POST http://localhost:3000/soap/geometria -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://example.com/geometria/AreaRectangulo" --data-binary "@pruebas/area.xml"
```

### 4. PerimetroRectangulo (base 8, altura 5, esperado: 26)

```bash
curl.exe -X POST http://localhost:3000/soap/geometria -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://example.com/geometria/PerimetroRectangulo" --data-binary "@pruebas/perimetro.xml"
```

En Linux o macOS usa `curl` en lugar de `curl.exe`. Cada respuesta es un sobre SOAP en XML con el resultado dentro.

## Middleware de registro

Cada petición se imprime en la consola del servidor con este formato:

```
[fecha] MÉTODO URL -> código de estado (tiempo en ms)
```

Registra tanto la consulta de los WSDL como la invocación de las operaciones.

## Evidencias

La carpeta `evidencias/` contiene las capturas de los dos contratos WSDL, las cuatro respuestas SOAP y el registro del middleware.