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
    },

    async delete(request, response){
        //recebendo o parametro vindo pela url via params
        const {id} = request.params;
        //confirmando o 'ong_id' para validação da operação > ong q criou pode deletar
        const ong_id = request.headers.authorization;
        
              //pega o primeiro resultado - pelo filtro id e ong_id, retornará apenas 01 resultado
        const incident = await connection('incidents').where('id', id).select('ong_id').first();
        

            if(incident.ong_id != ong_id){
                //ong_id não != ong_id do 'incidents' retorna status 401 (permisão negada)
                return response.status(401).json({error: 'Operation not permited.'});
            }

            //validado a query a ser deleta.. efetuar o delete
            await connection('incidents').where('id', id).delete();

            //delete ok, retorna resposta http 204 - (no content) - fo
            return response.status(204).send();
    }
};