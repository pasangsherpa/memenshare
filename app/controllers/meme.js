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
  } catch (e) {
    ctx.throw(e);
  }

  ctx.body = {
    memes: memes
  }
});

/**
 * Get meme by id.
 */

exports.getMemeById = co.wrap(function* (ctx, next) {
  let id = +ctx.params.id; //convert string to int
  let meme;

  try {
    meme = yield Meme.findById(id).exec();
  } catch (e) {
    ctx.throw(e);
  }

  ctx.body = meme;
});

/**
 * Create meme.
 */

exports.createMeme = co.wrap(function* (ctx, next){
  let body = ctx.request.body;

  if (!body) {
    ctx.throw('The body is empty', 400);
  }

  try {
    let data = JSON.parse(body);
    let meme = new Meme(data);
    yield meme.save();

  } catch(e) {
    ctx.throw(e);
  }
});
