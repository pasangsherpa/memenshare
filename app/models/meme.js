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
  meta: {
    likes: Number
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

// model creation
mongoose.model('Meme', memeSchema, 'Memes');
