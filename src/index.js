/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const _            = require('lodash');
const Root         = require('app-root-path');
const Yargs        = require('yargs');
const Debug        = require('debug')('hafiz');
const StrSub       = require('./util/strsub');
const GetPaths     = require('./paths');
const GetFiles     = require('./files');
const Substitute   = require('./substitute');

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
 * Setter function, sets the specified config option.
 */
function set(path, value) {

  /* If path is not specified, replace entire store */
  if (!path) {
    store = Substitute(value);
  } else {
    _.set(store, path.split(separator), Substitute(value));
  }

  return this;
}


/*!
 * Loads config files from a directory
 */
function load(root, options = { }) {
  Debug('load', root, options);

  /* Default options */
  _.defaults(options, {
    separator: /[\.\:\/\\]/,
    append: [
      './config',
      `./config/$${process.env.NODE_ENV}`
    ],
    glob: '**/*.json'
  });

  /* Create the config data store object */
  store = Object.create(null);
  separator = options.separator;

  /* Find all config files */
  const paths = GetPaths(root, process.env.CONFIG_PATH, options.append);
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
 * Initializer function
 */
function init(options = { }) {
  Debug('init');

  const root = Root.toString();
  return load(root, options);
}


/*!
 * Environment check
 */
function env(name) {
  if (!(name instanceof RegExp)) {
    name = new RegExp(name);
  }
  return name.test(process.env.NODE_ENV);
}


/*!
 * Export the init() function.
 */
get.env  = env;
get.set  = set;
get.sub  = StrSub;
get.init = init;
get.load = load;
module.exports = exports = get;
