/**
 * util/envar.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */


/*!
 * Finds the envar value given a substitution expression.
 * Examples:
 *   $NODE_ENV: returns the value of NODE_ENV, throws when not defined
 *   $?NODE_ENV: returns the value of NODE_ENV, or empty string when not defined
 */
function envar(match) {
  let optional = false;
  let varname = match.substring(1);

  /* Check if envar is optional */
  if (varname.startsWith('?')) {
    optional = true;
    varname = varname.substring(1);
  }

  const value = process.env[varname];

  /* If value is undefined and not optional, throw an error */
  if (!value) {
    if (!optional) {
      throw new Error(`Missing environment variable: ${varname}`);
    }
    return '';
  }

  /* If value is number-like, try to convert it */
  if (!Number.isNaN(Number(value))) { return Number(value); }

  /* If value is boolean-like, try to convert it */
  if (/^true|yes$/i.test(value)) { return true; }
  if (/^false|no$/i.test(value)) { return false; }

  /* Otherwise, return as is */
  return value;
}


module.exports = envar;
