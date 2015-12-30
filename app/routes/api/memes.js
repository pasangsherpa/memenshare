'use strict';

/**
 * Module dependencies.
 */

const Router = require('koa-router');

/**
 * Load controllers.
 */

const memeController = require('app/controllers/meme');

/**
 * Create memes router.
 */

let memes = new Router({
  prefix: '/memes'
});

/**
 * GET all memes. `/api/memes`
 */

memes.get('/', memeController.getMemes);

/**
 * GET meme by :id. `/api/memes/:id`
 */

memes.get('/:id', memeController.getMemeById);

/**
 * POST meme. `/api/memes`
 */

memes.post('/', memeController.createMeme);

/**
 * PUT meme by :id. `/api/memes/:id`
 */

memes.put('/:id', memeController.updateMeme);

/**
 * DELETE meme by :id. `/api/memes/:id`
 */

memes.delete('/:id', memeController.deleteMeme);

/**
 * Expose `memes`.
 */

module.exports = memes;
