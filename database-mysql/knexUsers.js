var Users = {};

var knex = require('./knexSetup')

Users.getUser = (data) => {
  console.log('DB User :', data);
  // var user = knex.select().from('users').where('name',data.username)
  return knex('users').where('name', data.username);
}

Users.getUsers = (data) => {
  console.log('DB User :', data);
  // var user = knex.select().from('users').where('name',data.username)
  return knex('users')
}

Users.addUser = (data) => {
  return knex('users').insert({name: data.username, password: data.password})
}

Users.getRecipes = (data) => {
  return knex.select().from('recipes')
}

module.exports = Users;
