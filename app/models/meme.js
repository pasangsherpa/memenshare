'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema
 */

let memeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date,
  meta: {
    likes: {
      type: Number,
      default: 0
    }
  },
  tags: [String]
});

/**
 * toJSON method.
 */

memeSchema.method('toJSON', function () {
  let meme = this.toObject();
  meme.id = meme._id;
  delete meme._id;
  delete meme.__v;
  return meme;
});

/**
 * Pre save hook.
 */

memeSchema.pre('save', function (next) {
  this.createdAt = this.createdAt || Date.now();
  this.updatedAt = Date.now();
  next();
});

/**
 * Pre findOneAndUpdate hook.
 */

memeSchema.pre('findOneAndUpdate', function () {
  this.findOneAndUpdate({}, {
    updatedAt: Date.now()
  });
});

// model creation
mongoose.model('Meme', memeSchema, 'Memes');
