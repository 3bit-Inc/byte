# Byte
[![Waffle.io - Columns and their card count](https://badge.waffle.io/80a914d46b5bfb2b1f52e16fd9c246f0fb12991aecefdc4cb1c430a9f5128487.svg?columns=all)](https://waffle.io/cgoss95/hratx30-greenfield)

> Enter ingredients from your pantry and retrieve recipes you can make from those ingredients. See the potential in your pantry. What's in your pantry?

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Search for recipes to use with the ingredients you have on hand

## Requirements

- Node 0.10.x
- React
- bcrypt
- jquery
- mysql
- knex


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running webpack and server

```sh
npm run react-dev
npm run server-dev
```

### Recreating schema

To recreate schema that sets the database and its tables, run the following:

```sh
mysql -u root -p < schema.sql
```

To make SQL queries within the database, run:
``` sh
mysql -u root -p
```

Password is specific to your machine for the "root" user
insert this password into database-mysql/knexSetup.js line 6

### Roadmap

View the project waffle https://waffle.io/cgoss95/hratx30-greenfield

## Team
  - __Product Owner__: Ross Salge
  - __Scrum Master__: Ceci Goss
  - __Development Team Members__: Tim Ninan


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
