'use strict';

/**
 * Module dependencies.
 */

const co = require('co');
const mongoose = require('mongoose');
const Meme = mongoose.model('Meme');

/**
 * Get all memes.
 */

exports.getMemes = co.wrap(function* (ctx, next) {
  let memes;

  try {
    memes = yield Meme.find().exec();
    ctx.body = {
      memes: memes
    };
  } catch (err) {
    ctx.throw(err);
  }
});

/**
 * Get meme by id.
 */

exports.getMemeById = co.wrap(function* (ctx, next) {
  let id = ctx.params.id;

  try {
    let meme = yield Meme.findById(id).exec();
    ctx.assert.notEqual(meme, null, 404, 'Meme not found');

    ctx.body = meme;
  } catch (err) {
    ctx.throw(err);
  }
});

/**
 * Create meme.
 */

exports.createMeme = co.wrap(function* (ctx, next) {
  let body = ctx.request.body;
  ctx.assert.notEqual(body, null, 400, 'The body is empty');

  try {
    let data = JSON.parse(body);
    let meme = new Meme(data);
    yield meme.save();

    ctx.status = 201;
    ctx.body = {
      id: meme.id
    };
  } catch (err) {
    ctx.throw(err);
  }
});
