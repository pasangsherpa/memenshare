'use strict';

/**
 * Module dependencies.
 */

const co = require('co');
const Serializer = require('lib/serializer');

/**
 * Adapter class to perform db operations
 */

class Adapter {
  constructor(model) {
    this.model = model;
  }

  find(opts) {
    let model = this.model;
    return co(function* (opts) {
      let data = yield model.find(opts).lean().exec();
      return Serializer.serialize(data, model);
    });
  }

  findById(id) {
    let model = this.model;
    return co(function* (opts) {
      let data = yield model.findById(id).lean().exec();
      return Serializer.serialize(data, model);
    });
  }

  findByIdAndUpdate(id, data) {
    let model = this.model;
    return co(function* (opts) {
      let savedData = yield model.findByIdAndUpdate(id, data);
      return Serializer.serialize(savedData.toObject(), model);
    });
  }

  create(data) {
    let model = this.model;
    return co(function* (opts) {
      let obj = yield Serializer.deSerialize(data);
      let savedData = yield model.create(obj);
      return Serializer.serialize(savedData.toObject(), model);
    });
  }

  delete(id) {
    let model = this.model;
    return co(function* (opts) {
      return yield model.findByIdAndRemove(id)
    });
  }
}

/**
 * Expose `Adapter`
 */

module.exports = Adapter;
