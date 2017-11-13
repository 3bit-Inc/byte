import $ from 'jquery';
import Keys from '../config/spoonacular.js';

var spoonacularTrivia = function(callback) {
    $.ajax({
       url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random",
       type: "GET",
       headers: {'X-Mashape-Key': 'DbYLQPD1ZGmshuSTypfqnBmQ3aZfp1uieQ6jsn4a0BqErZxQmz'},
       success: function(data) {
         callback(data);
       },
       error: function(err) {
         console.log('The following error occured while retrieving your trivia from Spoonacular: ', err);
       }
    });
}

export {spoonacularTrivia};
