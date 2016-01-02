'use strict';

/**
 * Module dependencies.
 */

const config = require('config');
const R = require('ramda');
const mongoose = require('mongoose');
const Maybe = require('ramda-fantasy').Maybe;

// Regular expression that checks for hex value
let checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

/**
 * Expose utils.
 */

let utils = module.exports = {

  /**
   * Checks if a value is a valid bson ObjectId
   *
   * @return {boolean} return true if the value is a valid bson ObjectId,
   * return false otherwise.
   */

  isValidId(id) {
    if (id === null) return false;

    if (typeof id === 'number')
      return true;
    if (typeof id === 'string') {
      return id.length === 12 || (id.length === 24 && checkForHexRegExp.test(
        id));
    }
    return false;
  },

  /**
   * Generate url of the resource
   *
   * @return {String} url of the resource.
   */

  generateResourceUrl(path, id) {
    return `${config.get('API.url')}/${path}/${id}`;
  },

  /**
   * Format error with consistent properties and hide
   * unwanted messages
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
  },

  /**
   * Inherit the prototype methods from one constructor into another.
   *
   * @param {function} ctor Constructor function which needs to inherit the
   *     prototype.
   * @param {function} superCtor Constructor function to inherit prototype from.
   * @throws {TypeError} Will error if either constructor is null, or if
   *     the super constructor lacks a prototype.
   */
  inherits(ctor, superCtor) {
    if (ctor === undefined || ctor === null)
      throw new TypeError('The constructor to "inherits" must not be ' +
                          'null or undefined');

    if (superCtor === undefined || superCtor === null)
      throw new TypeError('The super constructor to "inherits" must not ' +
                          'be null or undefined');

    if (superCtor.prototype === undefined)
      throw new TypeError('The super constructor to "inherits" must ' +
                          'have a prototype');

    ctor.super_ = superCtor;
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
  }
}
