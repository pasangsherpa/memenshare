'use strict';

/**
 * Module dependencies.
 */

const Router = require('koa-router');

/**
 * Load controllers.
 */

const memeController = require('../controllers/meme');

// create memes router
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
 * Expose `memes`.
 */

module.exports = memes;
