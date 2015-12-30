'use strict';

/**
 * Module dependencies.
 */

const config = require('config');

/**
 * Expose utils.
 */

let utils = module.exports = {

  /**
   * Generate absolute url of the resource.
   */

  generateResourceUrl(path, id) {
    return `${config.get('API.url')}/${path}/${id}`;
  }
}
