/**
 * test/files.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const Path         = require('path');
const Root         = require('app-root-path');
const files        = dofile('files');

/* Utility function to resolve relative paths to absolute */
function r(path) {
  return Path.resolve(Root.toString(), path);
}


describe('files(paths, glob)', function() {

  it('should glob files in the specified paths', function() {
    const paths = [ r('../test/fixtures') ];
    const actual = files(paths, '**/*.json');

    expect(actual)
      .to.deep.equal([ {
        path: r('../test/fixtures/a/aaa.json'),
        name: 'a.aaa'
      }, {
        path: r('../test/fixtures/a/b/bbb.json'),
        name: 'a.b.bbb'
      }, {
        path: r('../test/fixtures/a/c/d/e.json'),
        name: 'a.c.d.e'
      }, {
        path: r('../test/fixtures/test.json'),
        name: 'test'
      } ]);
  });

  it('should not glob a file path', function() {
    const paths = [ r('../test/fixtures/test.json') ];
    const actual = files(paths, '**/*.json');

    expect(actual)
      .to.deep.equal([ {
        path: r('../test/fixtures/test.json'),
        name: ''
      } ]);
  });

  it('should treat path as directory if stat fails', function() {
    const paths = [ r('../test/fixtures/no-such-file.json') ];
    const actual = files(paths, '**/*.json');

    expect(actual)
      .to.deep.equal([ ]);
  });

});
