var UsersIngredients = {};

var knex = require('./knexSetup')

UsersIngredients.addUserIngredient = (data) => {
  console.log('UsersIngredients: ', data);
  return knex('users_ingredients').insert({user_id:data.userid, ingredient_id:data.ingredientid})
}




module.exports = UsersIngredients;
