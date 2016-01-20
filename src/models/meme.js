'use strict';

/**
 * Module dependecies.
 */

const config = require('config');
const ModelFactory = require('lib/modelFactory');
const API = config.get('API.url');

/**
 * Variables
 */

const modelName = 'Meme';
const collectionName = 'memes';

/**
 * Meme Schema
 */

let schema = {
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: [String]
};

/**
 * Schema used for serializing model to JSON API spec compliant
 * https://github.com/SeyZ/jsonapi-serializer#documentation
 */

let jsonApiSchema = {
  topLevelLinks: {
    self: `${API}/${collectionName}`
  },
  dataLinks: {
    self: function (data) {
      return `${API}/${collectionName}/${data._id}`
    }
  }
}

/**
 * Create Meme model
 */

new ModelFactory().create({
  modelName: modelName,
  collectionName: collectionName,
  mongooseSchema: schema,
  jsonApiSchema: jsonApiSchema
});
