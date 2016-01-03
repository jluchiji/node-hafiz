/**
 * util/propname.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Path = require('path');


module.exports = function propname(path, root) {
  const name = Path.relative(root, path);
  const ext = Path.extname(name);
  return name
    .substr(0, name.length - ext.length)
    .replace(/\./g, '_')
    .replace(/\//g, '.');
};
