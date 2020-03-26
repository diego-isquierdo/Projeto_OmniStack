const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        //trabalhando paginação - mastrar os resutados em grupos
        //request.query - receber os parâmetros vindos via url - '?name=nome&value=valor
        const {page = 1} = request.query;
        //por default exibe a pag 1

        //contando o número de registros
        const [count] = await connection('incidents').count();
        console.log(count);

        const incidents = await connection('incidents')
            //add na solicitação os dados da ong relacionada com o id do incident
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            //limitando a busca em 5 registros
            .limit(5)
            //calculando alternar 5 em 5 registros
            .offset((page-1) *5)
            //confeccionando um array com as solicitações
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        //add o numerod de registros ao cabeçalho da resposta
        response.header('X-total-Count', count['count(*)']);

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