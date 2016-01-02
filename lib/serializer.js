'use strict';

const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeSerializer = require('jsonapi-serializer').Deserializer;

module.exports = {

  /**
   * Serialize into JSON API spec compliant
   * http://jsonapi.org/examples/
   */

  serialize(data, model) {
    let jsonApiSchema = model.schema.methods.getJSONAPISchema();
    let collectionName = model.schema.methods.getInfo().collectionName;
    return new JSONAPISerializer(collectionName, data, jsonApiSchema);
  },

  /**
   * Deserialize into regular mongoose schema
   */

  deSerialize(data) {
    return new JSONAPIDeSerializer(data);
  }
}
