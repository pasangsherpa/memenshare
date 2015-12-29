'use strict';

/**
 * Module dependencies.
 */

const compress = require('koa-compress');
const convert = require('koa-convert');
const requireDir = require('require-directory');
const mongoose = require('mongoose');
const co = require('co');
const Koa = require('koa');
const app = new Koa();

/**
 * Environment variables.
 */

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/memenshare';

/**
 * Load routes.
 */

const api = require('./routes/api');

/**
 * Connect to database
 */

mongoose.connect(dbUrl);
mongoose.connection.on('error', err => console.log(err));

// load mongoose models
requireDir(module, './models');

// logging
if (env !== 'production') {
  app.use(co.wrap(function* (ctx, next) {
    const start = new Date;
    yield next();

    const ms = new Date - start;
    console.log(
      `${ctx.method} ${ctx.url} - ${ms}ms - ${ctx.response.status}[${ctx.response.message}]`
    );
  }));
}

// compression
app.use(convert(compress()));

// routing
app.use(api.routes());

// start server
app.listen(port);
