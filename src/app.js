const routes = require('./routes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

class App {
  constructor () {
    this.server = express();

    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares () {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes () {
    this.server.use(routes);
  }

  database() {
    mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser:true,
      useUnifiedTopology: true
    });
  }
}

module.exports = new App().server;
