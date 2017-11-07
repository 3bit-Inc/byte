var Recipes = {};

var knex = require('./knexSetup')

Recipes.getUsers = (data) => {
  return knex.select().from('users')
}

Recipes.getRecipes = (data) => {
  return knex.select().from('recipes')
}

Recipes.getUsersRecipes = (data) => {
  console.log('USER RECIPES');
  return knex.select().from('user_recipes');
}

module.exports = Recipes;
