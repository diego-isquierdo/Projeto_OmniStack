const express = require('express');

//importando o arquivo routes > usando ./ para diferenciar como arquivo > . mesma pasta | .. volta 1
const routes = require('./routes');

const app = express();

app.use(express.json());
//app passando a utilizar as rotas importadas
app.use(routes);

app.listen(3333);