'use strict';

/**
 * Module dependencies.
 */

const co = require('co');
const views = require('co-views');
const Router = require('koa-router');

/**
 * Specifying Swig view engine.
 */

const render = views('src/views', {
  map: {
    html: 'swig'
  }
});

/**
 * Load routes.
 */

const api = require('./api');

/**
 * Create router.
 */

let router = new Router();

/**
 * Index page
 */

router.get('/', co.wrap(function* (ctx, next) {
  let top = ctx.query['top-text'] || '';
  let bottom = ctx.query['bottom-text'] || '';
  let image = ctx.query['image'] || '';
  ctx.body = yield render('index', {
    top: top.toUpperCase(),
    image: image,
    bottom: bottom.toUpperCase()
  });
}));

/**
 * Register memes routes.
 */

router.use(api.routes());

/**
 * Expose `router`.
 */

module.exports = router;
