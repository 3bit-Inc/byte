var Users = {};

var knex = require('./knexSetup')

Users.getUsers = (data) => {
  return knex.select().from('users')
}

Users.getRecipes = (data) => {
  return knex.select().from('recipes')
}

module.exports = Users;
