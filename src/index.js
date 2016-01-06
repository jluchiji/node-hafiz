/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const _ = require('lodash');
const Root = require('app-root-path');
const Yargs = require('yargs');
const Debug = require('debug')('hafiz');
const GetPaths = require('./paths');
const GetFiles = require('./files');
const Substitute = require('./substitute');

/*!
 * Actual object that stores the config data.
 */
let store = null;


/*!
 * Property path separators.
 */
let separator = /[\.\:\/\\]/;


/*!
 * Getter function, returns the specified config option.
 * Throws an error if config option does not exist, and default is not specified.
 */
function get(path, def) {

  /* If path is not specified, return entire store */
  if (!path) { return store; }

  /* Otherwise, find the property with the specified path */
  const value = _.get(store, path.split(separator));
  if (typeof value === 'undefined') {
    if (typeof def === 'undefined') {
      throw new Error(`Config option '${path}' does not exist.`);
    }
    return def;
  }
  return value;
}


/*!
 * Initializer function
 */
function init(options = { }) {

  /* Default options */
  _.defaults(options, {
    append: [
      './config',
      `./config/$${process.env.NODE_ENV}`
    ],
    glob: '**/*.json'
  });

  /* Create the config data store object */
  store = Object.create(null);
  if (options.separator) { separator = options.separator; }

  /* Find all config files */
  const paths = GetPaths(Root.toString(), process.env.CONFIG_PATH, options.append);
  const files = GetFiles(paths, options.glob);

  /* Load all config files */
  files
    .map(f => _.set({ }, f.name, require(f.path)))
    .concat(Yargs.argv)
    .map(Substitute)
    .reduce((mem, i) => _.merge(mem, i), store);

  Debug(JSON.stringify(store, null, 2));
  return module.exports;
}


/*!
 * Export the init() function.
 */
get.init = init;
module.exports = exports = get;


/*!
 * Initialize on require()
 * Can only be initialized once due to Node.js require() caching
 */
init();
