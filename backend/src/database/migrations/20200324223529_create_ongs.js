
exports.up = function(knex) {
    //criando a tabela na funtiond 'createTable' passando como parâmetro o nome da tabela 'ongs'
    //e uma funtion (table) configuranto as tuplas
  return knex.schema.createTable('ongs', function (table){
    table.string('id').primary(); //config como PK
    table.string('name').notNullable(); //nome not null
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); //passando tb o numero de caracteres q a tupla vai armazenar
  });
};


//executar casso ocorra algum problema
exports.down = function(knex) {
  return knex.schema.dropTable('ongs'); //dropar a tabela
};
