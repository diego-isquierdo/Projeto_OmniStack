//Arquivo q concentra a config de conexão com  o BD

//importanto o knex - conecta com o BD
const knex = require('knex');
//importando o arquivo com as configurações do knex
const configuration = require('../../knexfile');

//escolhendo a config de conexão de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;