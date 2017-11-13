var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var Recipes = require('../database-mysql/knexRecipes.js')
var Users = require('../database-mysql/knexUsers.js')
var UsersRecipes = require('../database-mysql/knexUsersRecipes.js')
var Ingredients = require('../database-mysql/knexIngredients.js')
var UsersIngredients = require('../database-mysql/knexUsersIngredients.js')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(session({
  secret: 'keyboard cat'
}));

app.get('/', function(req, res) {
  console.log(req.session);//currently the HTML for index.html
  res.end();
});

app.get('/users', function (req, res) {
  Users.getUsers()
    .then((data) => {//data is an array of users and their passwords
      res.json(data)
    })
    .catch((err) => {
      console.log('Something went wrong while retrieving users: ', err)
      res.status(500).end()
    })
});

app.get('/recipes', function(req, res) {
  Recipes.getRecipes()
    .then((data) => {
      res.json(data)
    })
    .catch( (err) => {
      console.log('Something went wrong while retrieving recipes: ', err);
      res.status(500).end()
    })
});

app.get('/users_recipes', function(req, res) {
  UsersRecipes.getUsersRecipes()
  .then((data) => {
    res.json(data)
  })
  .catch( (err) => {
    console.log('User_Recipes error: ', err);
    res.status(500).end()
  })
});

app.get('/favorites', function(req, res) {
  // Get users favorites
  UsersRecipes.getFavorites()
});

app.post('/useringredients', (req, res) => {
  console.log('USER INGREDIENT ID: ', req.body);
  Ingredients.getIngredientByUser(req.body)
  .then( (data) =>{
    console.log('INGREDIENTS ROUTE: ', data);
    res.send(data).status(201)
  })
  .catch( (err) => {
    console.log('USER INGREDIENT ERROR: ', err);
    res.status(500).end();
  })
})

app.post('/removeIngredient', (req, res) => {
  console.log('REMOVE INGREDIENT ROUTE: ', req.body);
  Ingredients.removeIngredient(req.body)
  .then( (data) => {
    res.status(204).end()
  })
  .catch((err) => {
    console.log('Remove Ingredient Error: ', err)
    res.status(500).end()
  })
})

app.post('/login', function(req, res, next) {
  Users.getUser(req.body)
    .then((data) => {
      res.send(data).status(201);
    })
    .catch( (err) => {
      console.log('USER DB ERROR: ', err);
      res.status(500).end();
    })
  // req.session.username = req.body.username;
  // req.session.password = req.body.password;
  // res.send(req.session.username);
  //201 is successfull post request

});

app.post('/signup', function(req, res) {
  Users.addUser(req.body)
    .then((data) => {
      res.status(201).send(data)
    })
    .catch((err) => {
      console.log('SIGN UP error: ', err);
      res.status(500).end()
    })
});

app.post('/favorites', function(req, res, next) {
  console.log(req.body);
  console.log('DETECTED IN APP.POST', req.body);
  Recipes.addRecipe(req.body)
    .then((data) => {
      res.send(data).status(201);
    })
    .catch((err) => {
      console.log('Recipe error', err);
      res.status(500).end()
    })
})

app.post('/ingredients', (req, res) => {
  console.log('Ingredient request: ', req.body);
  Ingredients.addIngredient(req.body)
  .then( (data) => {//data is the ingredient id in the ingredients DB table
    UsersIngredients.addUserIngredient({userid:req.body.userid,ingredientid:data})
    .then((data) => {
      console.log('SUCCESS ADD USERINGREDIENT: ', data);
      res.status(201).end()
    })
  })
  .catch( (err) => {
    console.log('Ingredient add error: ', err);
    res.status(500).end()
  })
})

var PORT = process.env.PORT || 3000

app.listen(PORT, function() {
  console.log('listening on port: ', PORT);
});
