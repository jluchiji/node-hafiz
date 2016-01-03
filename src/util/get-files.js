/**
 * util/get-files.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const Glob = require('glob');
const Path = require('path');
const Debug = require('debug')('hafiz:getfiles');

const PropName = require('./propname');

/*!
 * Gets a list of files for loading.
 */
module.exports = function getFiles(paths, glob) {
  const files = paths
    .map(p => ({
      root: p,
      files: Glob.sync(Path.join(p, glob))
    }))
    .reduce((mem, i) => mem
      .concat(i.files
        .map(f => ({
          path: f,
          name: PropName(f, i.root)
        })))
    , []);

  Debug(files);
  return files;
};
