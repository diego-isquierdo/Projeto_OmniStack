//conts >> utilizado para importar no JS
const express = require('express');

const app = express();

//definindo que o app trabalhará com JSON || Informação deve vir antes das rotas
app.use(express.json());


//1o param > enderco da rota > mapeando pedidos GET na rota raiz '/' >> http://localhost:3333/
//2o param > function() q passa como param request e response


/**metodos HTTP
 * GET - buscar uma informação no backend || inveiar uma informação na url
 * POST - Criar uma informalçao no backend
 * PUT - alterar uma informação no backend
 * DELETE - deleta uma informação no backend
 */


/**
 * Tipos de Parâmetros:
 * 
 * Query parms: Parâmetros nomeados e enviados na rota - ? indica 1o param e & add mais params
 *      - GET -> ?parametro=valor&outroParam=valor
 * 
 * Route params: params p identificar recursos (Rotas)
 *      - app.get('/users/:id') -> indica q será passado um parâmetro 'id'
 *      - localhost:3333/users/1    >> passado id=1 como parâmetro
 * 
 * Request body: corpo da requisição utilizado para criar ou alterar recursos
 */

/**
 * BD
 * SQL > MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL > MongoDB, CouchDB, etc
 * 
 * Para comunicar com o Banco:
 * 
 * Driver do Banco: SELECT * FROM users
 * Query Builder: table('user').select('*') .where()
 * 
 */

app.post('/users', (request,response)=>{
    //.send() faz anvio de texto como response
    //return response.send("Hello World!");

    //id recebendo o params da request || parâmetro 'params' >> (/users/:id)
    //const id = request.params;
    //console.log(id);

    //recebendo request via body - post >> request body (JSON)
     const body = request.body;
     console.log(body);

    
    //params recebe o query da request || via parâmetro 'query' > (?name='valor')
    //os parametro recebidos via query são em forma de json
    //const params = request.query;
    //console.log(params);

    return response.json({
        "evento": 'Semana Omnistack 11.0',
        "nome": "Diego Mesquita"
    });
});
//      (request, response)

//app 'ouvindo'/cpnfig a aplicação p a porta 3333
app.listen(3333);