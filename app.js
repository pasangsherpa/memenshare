'use strict';

/**
 * Module dependencies.
 */

const compress = require('koa-compress');
const convert = require('koa-convert');
const co = require('co');
const Koa = require('koa');
const app = new Koa();

/**
 * Load routes.
 */

const memes = require('./routes/memes');

/**
 * Environment.
 */

const env = process.env.NODE_ENV || 'development';

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
app.use(memes.routes());

// start server at port 3000
app.listen(3000);
