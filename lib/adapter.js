'use strict';

/**
 * Module dependencies.
 */

const co = require('co');
const Serializer = require('lib/serializer');

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
      let data = yield model.findByIdAndUpdate(id, data);
      return Serializer.serialize(data, model);
    });
  }

  create(data) {
    let model = this.model;
    return co(function* (opts) {
      let obj = yield Serializer.deSerialize(json);
      return yield model.create(obj);
    });
  }

  delete(id) {
    let model = this.model;
    return co(function* (opts) {
      return yield model.findByIdAndRemove(id)
    });
  }
}

module.exports = Adapter;
