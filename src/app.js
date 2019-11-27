const routes = require('./routes');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');

class App {
  constructor () {
    this.server = express();

    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares () {
    this.server.use(express.json());
  }

  routes () {
    this.server.use(routes);
  }

  database() {
    mongoose.connect('mongodb+srv://admin:l1n0s1st3m4s@cluster0-aed7u.mongodb.net/rsxp?retryWrites=true&w=majority',{
      useNewUrlParser:true,
      useUnifiedTopology: true
    });
  }
}

module.exports = new App().server;
