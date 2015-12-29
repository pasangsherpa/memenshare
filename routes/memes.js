'use strict';

const R = require('ramda');
const Router = require('koa-router');

const memes = new Router({
  prefix: '/memes'
});

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

memes.get('/', ctx => {
  ctx.body = {
    memes: list
  }
});

memes.get('/:id', ctx => {
  let id = R.propEq('id', +ctx.params.id);
  let meme = R.find(id, list);
  ctx.body = meme;
});

module.exports = memes;
