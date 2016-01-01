'use strict';

const JSONAPISerializer = require('jsonapi-serializer');
const config = require('config');
const API = config.get('API.url');

module.exports = {

  /**
   * Common opts for serialization
   * https://github.com/SeyZ/jsonapi-serializer
   */

  _getCommonOptions(collection) {
    return {
      keyForAttribute: 'camelCase',
      id: '_id',
      topLevelLinks: {
        self: `${API}/${collection}`
      },
      dataLinks: {
        self: function (data) {
          return `${API}/${collection}/${data._id}`
        }
      }
    }
  },

  /**
   * Serialize into JSON API specification
   * http://jsonapi.org/examples/
   */

  _serialize(collection, data, opts) {
    let commonOptions = this._getCommonOptions(collection);
    Object.assign(opts, commonOptions);
    return new JSONAPISerializer(collection, data, opts);
  },

  /**
   * Serialize Meme.
   */

  serializeMeme(data) {
    let opts = {
      attributes: ['title', 'author', 'createdAt', 'updatedAt']
    }
    return this._serialize('memes', data, opts);
  }
}
