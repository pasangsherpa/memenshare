'use strict';

/**
 * Module dependencies.
 */

const co = require('co');
const mongoose = require('mongoose');
const utils = require('lib/utils');
const Adapter = require('lib/adapter');
const Meme = mongoose.model('Meme');
const memeAdapter = new Adapter(Meme);

/**
 * Get all memes.
 * /api/memes?limit=10&select=author,title&sort=-author,title
 */

exports.getMemes = co.wrap(function* (ctx, next) {
  try {
    let opts = utils.convertToDbParams(ctx.query);
    let memes = yield memeAdapter.find(opts);
    ctx.body = memes;
  } catch (err) {
    ctx.throw(err);
  }
});

/**
 * Get meme by id.
 */

exports.getMemeById = co.wrap(function* (ctx, next) {
  let id = ctx.params.id;
  ctx.assert(utils.isValidId(id), 404, 'Invalid meme id');

  try {
    let meme = yield memeAdapter.findById(id);
    ctx.assert(meme, 404, 'Meme not found');

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
  ctx.assert(body, 400, 'The body is empty');

  try {
    let data = utils.jsonParse(body);
    let meme = yield memeAdapter.create(data);

    // set Location header
    ctx.set('Location', utils.generateResourceUrl('memes', meme.id));
    ctx.body = meme;
    ctx.status = 201;
  } catch (err) {
    utils.formatError(err);
    ctx.throw(err);
  }
});

/**
 * Update meme by id.
 */

exports.updateMeme = co.wrap(function* (ctx, next) {
  let id = ctx.params.id;
  ctx.assert(utils.isValidId(id), 404, 'Invalid meme id');

  let body = ctx.request.body;
  ctx.assert(body, 400, 'The body is empty');

  try {
    let data = utils.jsonParse(body);
    let meme = yield memeAdapter.findByIdAndUpdate(id, data);
    ctx.assert(meme, 404, 'Meme not found');

    ctx.body = meme;
  } catch (err) {
    ctx.throw(err);
  }
});

/**
 * Delete meme by id.
 */

exports.deleteMeme = co.wrap(function* (ctx, next) {
  let id = ctx.params.id;
  ctx.assert(utils.isValidId(id), 404, 'Invalid meme id');

  try {
    let meme = yield memeAdapter.delete(id);
    ctx.assert(meme, 404, 'Meme not found');
  } catch (err) {
    ctx.throw(err);
  }
});
