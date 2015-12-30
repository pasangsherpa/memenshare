'use strict';

/**
 * Module dependencies.
 */

const co = require('co');

/**
 * Expose `logger()`.
 */

module.exports = logger;

/**
 * Log all requests.
 *
 * @return {Function}
 * @api public
 */

function logger() {
  return co.wrap(function* (ctx, next) {
    let start = Date.now();
    yield next();
    let delta = Date.now() - start;
    console.log(
      `${ctx.method} ${ctx.url} - ${delta}ms - ${ctx.response.status}[${ctx.response.message}]`
    );
  });
}
