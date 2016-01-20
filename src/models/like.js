'use strict';

/**
 * Module dependecies.
 */

const config = require('config');
const mongoose = require('mongoose');
const ModelFactory = require('lib/modelFactory');
const API = config.get('API.url');

/**
 * Variables
 */

const modelName = 'Like';
const collectionName = 'likes';

/**
 * Like Schema
 */

let schema = {
  meme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemeSchema',
    required: true
  },
  author: {
    type: String,
    required: true
  }
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
  },
  attributes: ['meme', 'author']
}

/**
 * Create Like model
 */

new ModelFactory().create({
  modelName: modelName,
  collectionName: collectionName,
  mongooseSchema: schema,
  jsonApiSchema: jsonApiSchema
});
