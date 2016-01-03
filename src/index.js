/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const _ = require('lodash');
const Debug = require('debug')('hafiz:core');
const GetPaths = require('./util/get-paths');
const GetFiles = require('./util/get-files');

/*!
 * Symbol to hide config data
 */
const $$data = Symbol();


/*!
 * Initializer function
 */
function init(options = { }) {

  /* Create the config data store object */
  init[$$data] = Object.create(null);

  /* Find all config files */
  const paths = GetPaths(options.append);
  const files = GetFiles(paths, '**/*.json');

  /* Load all config files */
  files
    .map(f => _.set({ }, f.name, require(f.path)))
    .concat(require('yargs').argv)
    .reduce((mem, i) => _.merge(mem, i), init[$$data]);

  Debug(JSON.stringify(init[$$data], null, 2));
}


/*!
 * Export the init() function.
 */
module.exports = init;
