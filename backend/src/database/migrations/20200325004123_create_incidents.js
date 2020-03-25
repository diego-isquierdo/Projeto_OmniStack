
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments(); //o próprio BD gera as chaves
        table.string('title').notNullable(); //nome not null
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //criando a FK de ongs
        table.foreign('ong_id').references('id').inTable('ongs'); //setando ong_id como FK
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
