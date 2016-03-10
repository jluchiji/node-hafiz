/**
 * files.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const FS           = require('fs');
const Glob         = require('glob');
const Path         = require('path');
const Debug        = require('debug')('hafiz:files');

const PropName = require('./propname');

/*!
 * Converts a directory path into a list of files for loading.
 */
function search(path, glob) {
  let stat = null;
  try {
    stat = FS.statSync(path);
  } catch (err) {
    Debug(`Hafiz: could not stat ${path}`);
  }

  /* If this is a file, we will load it directly */
  if (stat && stat.isFile()) {
    return { root: path, files: [ path ] };
  }

  /* Otherwise, glob the directory */
  const pattern = Path.join(path, glob);
  Debug(pattern);
  return { root: path, files: Glob.sync(pattern) };
}


/*!
 * Reduce function.
 * Resolves file paths to absolute file paths for loading, and their respective
 * property paths for config.
 */
function resolve(list, dir) {
  const flist = dir
    .files
    .map(f => ({ path: f, name: PropName(f, dir.root) }));
  Debug(flist);
  return list.concat(flist);
}


/*!
 * Globs a list of directories for specified files, then returns their file paths
 * along with their respective config property paths.
 */
function files(paths, glob) {
  const list = paths
    .map(d => search(d, glob))
    .reduce(resolve, []);

  Debug(list);
  return list;
}


/*!
 * Export files()
 */
module.exports = files;
