/**
 * util/get-paths.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const _ = require('lodash');
const Path = require('path');
const Root = require('app-root-path');
const Debug = require('debug')('hafiz:getpaths');

/*!
 * Default cofnig paths to append.
 */
const defaults = [ './config', `./config/$${process.env.NODE_ENV}` ];


/*!
 * Checks CONFIG_PATH and finalizes all config paths.
 */
module.exports = function getPaths(...root) {

  /* Need to remove all falsy values since that happens sometimes */
  root = _.compact(root);

  /* Map paths to their absolute equivalents */
  const path = (process.env.CONFIG_PATH || '')
    .split(':')
    .concat(root.length ? root : defaults)
    .map(i => Path.resolve(Root.toString(), i));

  Debug(path);
  return path;
};
