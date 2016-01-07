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

  /**
   * opts = {
   *   criteria: criteria
   *   limit: limit,
   *   sort: sort,
   *   select: select
   * }
   *
   * example:
   * adapter.find({
   *   criteria: {
   *     title: 'foo is the bar',
   *     author: 'foo bar'
   *   },
   *   limit: 10,
   *   sort: {
   *     title: -1
   *   },
   *   select: {
   *     author: 1
   *   }
   * });
   */

  find(opts) {
    let model = this.model;
    return co(function* () {
      opts = opts || {};
      let criteria = opts.criteria;
      let limit = opts.limit;
      let sort = opts.sort;
      let select = opts.select;

      let data = yield model.find(criteria)
        .limit(limit)
        .sort(sort)
        .select(select)
        .lean()
        .exec();
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
