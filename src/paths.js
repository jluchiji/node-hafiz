/**
 * util/get-paths.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const Path = require('path');
const Root = require('app-root-path');
const Debug = require('debug')('hafiz:paths');

/*!
 * Checks CONFIG_PATH and finalizes all config paths.
 */
function paths(root) {

  /* Map paths to their absolute equivalents */
  const path = (process.env.CONFIG_PATH || '')
    .split(':')
    .concat(root)
    .map(i => Path.resolve(Root.toString(), i));

  Debug(path);
  return path;
}


module.exports = paths;
