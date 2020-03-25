const express = require('express');

//concentrando o modulo de rotas do express
const routes = express.Router();

routes.post('/users', (request,response)=>{
    
    const data = request.body;
     console.log(data);

    return response.json();
});

//disponibilizando as rotas para uso da aplicação
module.exports = routes;