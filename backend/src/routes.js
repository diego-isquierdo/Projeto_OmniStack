const express = require('express');

//importando os controllers
const OngController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');

//concentrando o modulo de rotas do express
const routes = express.Router();


routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);


//disponibilizando as rotas para uso da aplicação
module.exports = routes;