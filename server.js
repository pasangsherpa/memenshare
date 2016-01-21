'use strict';

/**
 * Allow application-level modules to be required as if
 * they were installed into the node_modules directory.
 */

require('app-module-path').addPath(__dirname);

/**
 * Module dependencies.
 */
const requireDir = require('require-directory');
const config = require('config');
const convert = require('koa-convert');
const bodyParser = require('koa-body');
const compress = require('koa-compress');
const error = require('koa-error');
const mongoose = require('mongoose');
const thunkify = require('thunkify');
const logger = require('lib/logger');
const fs = require('fs');
const co = require('co');
const Koa = require('koa');
const app = new Koa();

/**
 * Environment variables.
 */

let env = config.util.getEnv('NODE_ENV');
let port = config.get('API.port');
let dbUrl = config.get('DB.url');

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

  // error handler
  app.use(convert(error()));

  // routing
  let router = require('src/routes/');
  app.use(router.routes());

}

/**
 * Init.
 */

co(function* init() {
  // connect to db
  let connect = thunkify(mongoose.connect).bind(mongoose);
  yield connect(dbUrl);

  // load db models
  requireDir(module, './src/models');

  setupMiddlewares();
}).then(() => {
  // error handler
  app.on('error', (err) => {
    if (env === 'production') {
      // TODO: report err to cloud (ELK)
    } else {
      console.log(err.stack);
    }
  });

  // start server
  app.listen(port);
}, err => {
  console.log(err.stack)
});
