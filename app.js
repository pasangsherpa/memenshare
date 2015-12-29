'use strict';

/**
 * Module dependencies.
 */

const compress = require('koa-compress');
const convert = require('koa-convert');
const requireDir = require('require-directory');
const mongoose = require('mongoose');
const thunkify = require('thunkify');
const co = require('co');
const Koa = require('koa');
const app = new Koa();

/**
 * Load routes.
 */

const api = require('./routes/api');

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
    app.use(co.wrap(function* (ctx, next) {
      let start = new Date;
      yield next();

      let ms = new Date - start;
      console.log(
        `${ctx.method} ${ctx.url} - ${ms}ms - ${ctx.response.status}[${ctx.response.message}]`
      );
    }));
  }

  // compression
  app.use(convert(compress()));

  // routing
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
  requireDir(module, './models');

  setupMiddlewares();

}).then(() => {
  app.listen(port);
}, err => {
  console.log(err.stack)
});
