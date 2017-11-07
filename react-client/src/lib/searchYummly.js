import $ from 'jquery';

var searchYummly = (options, callback) => {
  $.get('http://api.yummly.com/v1/api/recipes?_app_id=6dc42c37&_app_key=4c35e386c8a9c936f0c5c16e72eb841a',
    {
      q: '',
      allowedIngredient: options.ingredients,
      maxResult: 9,
      excludedIngredient: '*'
      // facetField: ['jelly']
    })
    .done((data) => {
        callback(data.matches);
      }
    )
    .fail( function(error){
        console.error(err);
    })
}

var getRecipe = (recipeId, callback) => {
  var query = 'http://api.yummly.com/v1/api/recipe/' + recipeId + '?_app_id=6dc42c37&_app_key=4c35e386c8a9c936f0c5c16e72eb841a';
  $.get(query)
    .done((data) => {
      callback(data);
    })
    .fail( function(error){
        console.error(error);
    })
}

export {searchYummly};
export {getRecipe};

// q: This is the search phrase. Use space to separate words (url-encoded as either + or %20).
// To search for “Onion Soup” recipes append &q=onion+soup or &q=onion%20soup
// For example: http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
