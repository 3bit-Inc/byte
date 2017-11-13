var UsersRecipes = {};

var knex = require('./knexSetup')

UsersRecipes.getUsersRecipes = (data) => {
  console.log('USER RECIPES');
  return knex('users_recipes');
}

// UsersRecipes.setUsersRecipes = (data) {
//   return knex.insert([{title: 'Great Gatsby'}, {title: 'Fahrenheit 451'}], 'id').into('books')
// }


module.exports = UsersRecipes;
