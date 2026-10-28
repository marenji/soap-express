const express = require('express');
const logger = require('./middleware/logger');
const soapRoutes = require('./routes/soap.routes');

const app = express();

app.use(logger);          // se ejecuta antes de las rutas SOAP
app.use('/', soapRoutes);

module.exports = app;
