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

// model creation
mongoose.model('Meme', memeSchema, 'Memes');
