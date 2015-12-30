'use strict';

/**
 * Module dependencies.
 */

const convert = require('koa-convert');
const bodyParser = require('koa-body');
const compress = require('koa-compress');
const requireDir = require('require-directory');
const mongoose = require('mongoose');
const thunkify = require('thunkify');
const logger = require('./lib/logger');
const co = require('co');
const Koa = require('koa');
const app = new Koa();

/**
 * Environment variables.
 */

let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || 3000;
let dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/memenshare';

/**
 * Setup middlewares.
 */

function setupMiddlewares() {
  // logging
  if (env !== 'production') {
    app.use(logger());
  }

  // parse body
  app.use(convert(bodyParser()));

  // compression
  app.use(convert(compress()));

  // routing
  let api = require('./app/routes/api');
  app.use(api.routes());
}

/**
 * Init.
 */

co(function* init() {
  // connect to db
  let connect = thunkify(mongoose.connect).bind(mongoose);
  yield connect(dbUrl);

  // load db models
  requireDir(module, './app/models');

  setupMiddlewares();

}).then(() => {
  app.listen(port);
}, err => {
  console.log(err.stack)
});
