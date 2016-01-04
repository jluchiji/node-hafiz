/**
 * util/strsub.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Envar = require('./envar');


/*!
 * Performs envar substitution on the given string value.
 * 	- $ENVAR -> value of $ENVAR
 * 	- $$ -> $
 */
function strsub(str) {

  /* If the entire string is the substitution pattern, replace entirely */
  if (/^\$(\?)?[A-Z0-9_]+$/.test(str)) { return Envar(str); }

  /* Otherwise, substitute */
  return str
    .replace(/\$(\?)?[A-Z0-9_]+/g, Envar)
    .replace(/\$\$/g, '$');
}


module.exports = strsub;
