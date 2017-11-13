var Recipes = {};

var knex = require('./knexSetup')

Recipes.getRecipes = (data) => {
  return knex.select().from('recipes')
}

Recipes.addRecipe = (data) => {
	console.log('Recipes.addRecipe being called', data.recipe);
	var strData = JSON.stringify(data.recipe);
	console.log('strData is ', strData);
  return knex('recipes').insert({recipe: strData, user_id: data.user_id})
  	.catch(err => {
  		console.error(err);
  	});
}

module.exports = Recipes;
