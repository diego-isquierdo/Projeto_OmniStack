const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const incidents = await connection('incidents').select('*');

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value} = request.body;

        //cabeçalho da requisição - recebe dados diversos como dados de autenticação p exemplo
        //ong_id recebendo o valor de 'authorization' passado via cabeçalho da requisição
        const ong_id = request.headers.authorization;

        //o id de 'incidents' eh gerado direto no banco
        //o retorno da function será um array e a usando [id] p receber a posição [0]
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        
        return response.json({id});
    }
}