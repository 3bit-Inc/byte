var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'pantry'
  }
});

module.exports = knex;
