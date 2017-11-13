DROP DATABASE IF EXISTS pantry;

CREATE DATABASE pantry;

USE pantry;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE ingredients (
  id INT  NOT NULL AUTO_INCREMENT,
  ingredient TEXT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE recipes (
  id INT NOT NULL AUTO_INCREMENT,
  recipe JSON NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY(id)
);

CREATE TABLE users_ingredients (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY(id)
);

CREATE TABLE users_recipes (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  recipe_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY(id)
);

/* TEST DATA */

INSERT INTO users (name, password)
VALUES ('joshawesome12', 'butter98');

INSERT INTO users (name, password)
VALUES ('Ghostcoder8', 'h@xx');


INSERT INTO recipes (recipe, user_id)
VALUES (
  '{
  "name": "soup",
  "ingredients": ["chicken", "broth", "noodles"]
  }', 1
);

INSERT INTO recipes (recipe, user_id)
VALUES (
  '{
  "name": "chicken",
  "ingredients": ["chicken breast", "oil", "salt"]
  }', 2
);

INSERT INTO users_recipes (recipe_id, user_id)
VALUES (2, 1);

INSERT INTO users_recipes (recipe_id, user_id)
VALUES (1, 1);



/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.
 *
 *  To make queries to the database using the terminal, type:
 *    mysql -u root -p */
