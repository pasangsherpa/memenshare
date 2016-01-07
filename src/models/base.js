'use strict';

/**
 * Module dependecies.
 */
const utils = require('lib/utils');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Base Schema.
 */

function BaseSchema() {
  Schema.apply(this, arguments);

  this.add({
    updatedAt: String,
    createdAt: Date
  });

  /**
   * toJSON method.
   */

  this.method('toJSON', function () {
    let data = this.toObject();
    data.id = data._id;
    delete data._id;
    delete data.__v;
    return data;
  });

  /**
   * JSONAPI Schema for serialization
   * https://github.com/SeyZ/jsonapi-serializer#documentation
   */

  this.method('getBaseJSONAPISchema', function () {
    return {
      keyForAttribute: 'camelCase',
      id: '_id'
    }
  });

  /**
   * Pre save hook.
   */

  this.pre('save', function (next) {
    this.createdAt = this.createdAt || Date.now();
    this.updatedAt = this.createdAt;
    next();
  });

  /**
   * Pre findOneAndUpdate hook.
   */

  this.pre('findOneAndUpdate', function () {
    this.findOneAndUpdate({}, {
      updatedAt: Date.now()
    });
  });
}

utils.inherits(BaseSchema, Schema);

/**
 * Expose `BaseSchema`.
 */

module.exports = BaseSchema;
