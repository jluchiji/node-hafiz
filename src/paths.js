/**
 * util/get-paths.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const Path = require('path');
const Debug = require('debug')('hafiz:paths');

/*!
 * Checks CONFIG_PATH and finalizes all config paths.
 */
function paths(root, base, more) {
  Debug(base);
  Debug(more);

  /* Map paths to their absolute equivalents */
  const path = (base || '')
    .split(Path.delimiter)
    .concat(more || [ ])
    .map(i => i ? Path.resolve(root, i) : null)
    .filter(i => i);

  Debug(path);
  return path;
}


module.exports = paths;
