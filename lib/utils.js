'use strict';

/**
 * Module dependencies.
 */

const config = require('config');
const R = require('ramda');
const Maybe = require('ramda-fantasy').Maybe;

/**
 * Expose utils.
 */

let utils = module.exports = {

  /**
   * Generate absolute url of the resource.
   */

  generateResourceUrl(path, id) {
    return `${config.get('API.url')}/${path}/${id}`;
  },

  /**
   * Format error with consistent properties and hide
   * unwanted messages.
   */

  formatError(err) {
    switch (err.name) {
      case 'ValidationError':
        err.errors = R.values(R.pluck('message', err.errors));
        break;
      case 'SyntaxError':
        err.status = 400;
        err.message = 'Problems parsing JSON';
        break;
      default:
        break;
    }
  }
}
