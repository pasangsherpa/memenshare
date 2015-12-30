'use strict';

/**
 * Module dependencies.
 */

const pkgJson = require('../../package');
const Router = require('koa-router');

/**
 * Load routes.
 */

const memes = require('./memes');

/**
 * Create api router.
 */

let api = new Router({
  prefix: '/api'
});

/**
 * API health check. `/api`
 */

api.get('/', ctx => {
  ctx.body = {
    version: pkgJson.version,
    name: pkgJson.name
  }
});

/**
 * Register memes routes.
 */

api.use(memes.routes());

/**
 * Expose `api`.
 */

module.exports = api;
