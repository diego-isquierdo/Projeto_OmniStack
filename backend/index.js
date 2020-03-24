//conts >> utilizado para importar no JS
const express = require('express');

const app = express();

//1o param > enderco da rota > mapeando pedidos GET na rota raiz '/' >> http://localhost:3333/
//2o param > function() q passa como param request e response
app.get('/', (request,response)=>{
    //.send() faz anvio de texto como response
    //return response.send("Hello World!");

    return response.json({
        evento: 'Semana Omnistack 11.0',
        nome: "Diego Isquierdo"
    });
});
//      (request, response)

//app 'ouvindo'/cpnfig a aplicação p a porta 3333
app.listen(3333);