var Ingredients = {};

var knex = require('./knexSetup')
var UserIngredients = require('./knexUsersIngredients.js')

Ingredients.addIngredient = (data) => {
  console.log('Ingredient Data: ', data);
  // UserIngredients.addUserIngredient(data)
  // .then( (data) => {
  //   console.log('successful usersIngredients add');
  // })
  // .catch( (err) => {
  //   console.log('Usrs_Ingredients Error: ', err);
  // })
  return knex('ingredients').insert({ingredient:data.ingredient,user_id:data.userid})
}

Ingredients.getIngredientByUser = (data) => {
  console.log('IN INGEDIENTS DB', data);
  return knex.select().from('ingredients').where({user_id: data.userid})
}

Ingredients.removeIngredient = (data) => {
  console.log('REOMVE DB: ', data);
  return knex('ingredients')
  .where({user_id:data.userId,id:data.ingredientId})
  .del()
}


module.exports = Ingredients;
