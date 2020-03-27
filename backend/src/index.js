const express = require('express');
//cors - gerenciamento de acesso
const cors = require('cors');

//importando o arquivo routes > usando ./ para diferenciar como arquivo > . mesma pasta | .. volta 1
const routes = require('./routes');
const app = express();

//em produção, pode ser informado o endereço da aplicação front - cros(http://endereco.com) 
//restringindo asism o acesso ao backend
app.use(cors());
app.use(express.json());
//app passando a utilizar as rotas importadas
app.use(routes);

app.listen(3333);