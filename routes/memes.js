'use strict';

/**
 * Module dependencies.
 */

const R = require('ramda');
const Router = require('koa-router');

// dummy db
let list = [{
  id: 1,
  name: 'cat'
}, {
  id: 2,
  name: 'dog'
}, {
  id: 3,
  name: 'foo'
}]

// create memes router
let memes = new Router({
  prefix: '/memes'
});

/**
 * GET all memes.
 */

memes.get('/', ctx => {
  ctx.body = {
    memes: list
  }
});

/**
 * GET meme by :id.
 */

memes.get('/:id', ctx => {
  let id = R.propEq('id', +ctx.params.id);
  let meme = R.find(id, list);
  ctx.body = meme;
});

/**
 * Expose `memes`.
 */

module.exports = memes;
