'use strict';

/**
 * Default configurations.
 */

module.exports = {
  API: {
    port: process.env.PORT || 3000,
    url: 'localhost:3000/api'
  },
  DB: {
    name: 'memenshare',
    url: process.env.DB_URL || 'mongodb://localhost:27017/memenshare'
  }
}