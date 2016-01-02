'use strict';

/**
 * Module dependecies.
 */

const mongoose = require('mongoose');
const config = require('config');
const API = config.get('API.url');
const BaseSchema = require('./base');

/**
 * Variables
 */

const modelName = 'Meme';
const collectionName = 'memes';

/**
 * Schema
 */

let memeSchema = new BaseSchema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: [String]
});

/**
 * Utility function to return schema info
 */

memeSchema.methods.getInfo = () => {
  return {
    modelName: modelName,
    collectionName: collectionName
  }
}

/**
 * Get JSON API schema
 *
 * https://github.com/SeyZ/jsonapi-serializer#documentation
 */

memeSchema.methods.getJSONAPISchema = function() {
  return Object.assign(jsonApiSchema, this.getBaseJSONAPISchema());
}

/**
 * Schema used for serializing model to JSON API spec compliant
 *
 * https://github.com/SeyZ/jsonapi-serializer#documentation
 */

let jsonApiSchema = {
  topLevelLinks: {
    self: `${API}/${collectionName}`.toLowerCase()
  },
  dataLinks: {
    self: function (data) {
      return `${API}/${collectionName}/${data._id}`
    }
  },
  attributes: ['title', 'author', 'createdAt', 'updatedAt']
}

// model creation
mongoose.model(modelName, memeSchema, collectionName);
