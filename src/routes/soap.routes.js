const express = require('express');
const fs = require('fs');
const path = require('path');
const soap = require('soap');

const conversiones = require('../services/conversiones.service');
const geometria = require('../services/geometria.service');

const router = express.Router();

const leerWsdl = (archivo) =>
  fs.readFileSync(path.join(__dirname, '../wsdl', archivo), 'utf8');

soap.listen(router, '/soap/conversiones', conversiones, leerWsdl('conversiones.wsdl'));
soap.listen(router, '/soap/geometria', geometria, leerWsdl('geometria.wsdl'));

module.exports = router;