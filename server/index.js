var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var pantry = require('../database-mysql');
var Recipes = require('../database-mysql/knexRecipes.js')
var Users = require('../database-mysql/knexUsers.js')

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
      console.log('THIS is the USER data: ', data);
      res.json(data)
    })
    .catch((err) => {
      console.log('Something went wrong: ', err)
      res.status(500).end()
    })
});

app.get('/recipes', function(req, res) {
  Recipes.getRecipes()
    .then((data) => {
      console.log('RECIPES: ', data);
      res.json(data)
    })
    .catch( (err) => {
      console.log('Recipes error: ', err);
      res.status(500).end()
    })
});

app.get('/users_recipes', function(req, res) {
  Recipes.getUsersRecipes()
  .then((data) => {
    res.json(data)
  })
  .catch( (err) => {
    console.log('User_Recipes error: ', err);
    res.staus(500).end()
  })
});

app.post('/login', function(req, res, next) {
  console.log('POST: login');
  console.log(req.body);
  req.session.username = req.body.username;
  req.session.password = req.body.password;
  res.send(req.session.username);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
