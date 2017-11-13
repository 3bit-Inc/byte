var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'pantry'
});

var getUsers = function(callback) {
  connection.query('SELECT * FROM users', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getRecipes = function(callback) {
  connection.query('SELECT * FROM recipes', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getUsersRecipes = function(callback) {
  connection.query('SELECT * FROM users_recipes', function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getUsers = getUsers;
module.exports.getRecipes = getRecipes;
module.exports.getUsersRecipes = getUsersRecipes;
