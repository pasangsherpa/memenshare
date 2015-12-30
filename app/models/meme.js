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
  created: Date,
  meta: {
    likes: {
      type: Number,
      default: 0
    }
  }
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
  if (!this.created) this.created = new Date;
  next();
});

// model creation
mongoose.model('Meme', memeSchema, 'Memes');
