const express = require('express');

//importando pacote de criptografia node, 
//utilizado na criação do 'id' da table 'ongs'
const crypto = require('crypto');

//importando as config de conexão com o BD
const connection = require('./database/connection');

//concentrando o modulo de rotas do express
const routes = express.Router();

//Listar todas as ongs do BD
routes.get('/ongs', async(request, response)=>{
    //await faz o cod aguardar >> a function eh async
    //ongs recebe um 'array'
    const ongs = await connection('ongs').select('*');

    //retorna 'ongs' já no formato JSON
    return response.json(ongs);
})



//Rota para CADASTRAR ongs
                    //função assíncrona
routes.post('/ongs', async (request,response)=>{
    
    //importa os dados do json direto p as respesctivas variáveis
    const {name, email, whatsapp, city, uf} = request.body;
    
    //cria um cod de 4bytes e converte para string
    const id = crypto.randomBytes(4).toString('HEX');

    //fazendo a inserção das informações no BD 
    //await >> faz com q a execução aguarde o término da inserção para fazer o 'return' da função 
    await connection('ongs').insert({
        id,
        email,
        name,
        whatsapp,
        city,
        uf
    })

    //o 'id' eh importando para a identificação única da ong
    //como ele foi gerado aleatóriamente, há a necessidade de armazenar esse 'id'
    return response.json({id});
});

//disponibilizando as rotas para uso da aplicação
module.exports = routes;