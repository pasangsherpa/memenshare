'use strict';

/**
 * Module dependencies.
 */

const pkgJson = require('../package');
const Router = require('koa-router');

const api = new Router({
  prefix: '/api'
});

/**
 * Load routes.
 */

const memes = require('./memes');

// api health check
api.get('/', ctx => {
  ctx.body = {
    version: pkgJson.version,
    name: pkgJson.name
  }
});

// register memes routes
api.use(memes.routes());

/**
 * Expose `api`.
 */

module.exports = api;
