'use strict';

/**
 * Module dependecies.
 */

const R = require('ramda');
const mongoose = require('mongoose');
const BaseSchema = require('app/models/base');

/**
 * Factory class to create mongoose model
 */

class ModelFactory {

  /**
   * Create
   */

  create(opts) {
    let modelName = opts.modelName;
    let collectionName = opts.collectionName;
    let mongooseSchema = opts.mongooseSchema;
    let jsonApiSchema = opts.jsonApiSchema;

    let schema = new BaseSchema(mongooseSchema);

    /**
     * Utility function to return schema info
     */

    schema.methods.getInfo = () => {
      return {
        modelName: modelName,
        collectionName: collectionName
      }
    }

    /**
     * Get JSON API schema
     * https://github.com/SeyZ/jsonapi-serializer#documentation
     */

    schema.methods.getJSONAPISchema = function () {
      let isExposed = (path) => path !== '__v';
      let getAttributes = R.compose(R.filter(isExposed), R.keys);
      jsonApiSchema.attributes = jsonApiSchema.attributes || getAttributes(schema.paths);
      return Object.assign(jsonApiSchema, this.getBaseJSONAPISchema());
    }

    /**
     * Register schema for model
     */

    mongoose.model(modelName, schema, collectionName);
  }
}

/**
 * Expose `ModelFactory`
 */

module.exports = ModelFactory;
