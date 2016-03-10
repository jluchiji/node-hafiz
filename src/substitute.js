/**
 * envar.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const _            = require('lodash');
const StrSub       = require('./util/strsub');

/*!
 * Recursively checks the object and substitutes all envars in string values.
 */
function envar(obj) {
  _.forEach(obj, (v, k) => {
    if (typeof v === 'string') { obj[k] = StrSub(v); }
    if (typeof v === 'object') { envar(v); }
  });
  return obj;
}


module.exports = envar;
