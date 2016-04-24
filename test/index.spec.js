/**
 * test/index.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const Chai         = require('chai');
Chai.use(require('sinon-chai'));
Chai.use(require('chai-properties'));
Chai.use(require('chai-as-promised'));

const _            = require('lodash');
const Path         = require('path');
const Root         = require('app-root-path');
Root.setPath(Path.resolve(__dirname, '../src'));

const root         = Path.resolve(__dirname, './fixtures');

/*!
 * Setup global stuff here.
 */
global.dofile      = Root.require;
global.expect      = Chai.expect;
global.Sinon       = require('sinon');

/*!
 * Start tests.
 */
require('./paths.spec.js');
require('./files.spec.js');
require('./substitute.spec.js');

describe('Util', function() {
  require('./util/envar.spec.js');
  require('./util/strsub.spec.js');
});

/*!
 * Putting everything together.
 */
process.env.CONFIG_PATH = '';
const hafiz = dofile('index');

describe('load(options)', function() {

  it('should use append/glob options', function() {
    hafiz.load(root, { append: [ '.' ], glob: '*.json' });
    const actual = hafiz();

    expect(_.omit(actual, '_', '$0'))
      .to.deep.equal({
        test: {
          foo: 'bar',
          env: process.env.NODE_ENV
        }
      });
  });

});

describe('get(path, def)', function() {

  it('should use custom property separators', function() {

    hafiz.load(root, { separator: /[\|]/, append: [ '.' ] });
    const actual = hafiz('a|c|d|e|greeting');

    expect(actual)
      .to.equal('hello');
  });

  it('should use default value when provided and necessary', function() {

    hafiz.load(root);
    const actual = hafiz('no.such.config', 'default');

    expect(actual)
      .to.equal('default');
  });

  it('should throw when config is undefined and there is no default', function() {
    hafiz.load(root);
    expect(() => hafiz('no.such.config'))
      .to.throw('Config option \'no.such.config\' does not exist.');
  });

});

describe('set(path, value)', function() {

  it('should set the property value', function() {
    hafiz.load(root);
    hafiz.set('foo', { herp: 'Derp!!' });

    const actual = hafiz('foo.herp');

    expect(actual)
      .to.equal('Derp!!');
  });

  it('should substitute entire store if path is not set', function() {
    hafiz.load(root);
    hafiz.set('foo', 'bar');
    hafiz.set(null, { foo: 'baz' });

    const actual = hafiz('foo');

    expect(actual)
      .to.equal('baz');
  });

});

describe('env(name)', function() {

  beforeEach(function() { process.env.NODE_ENV = 'test'; });

  it('should support string name', function() {
    expect(hafiz.env('test'))
      .to.be.true;
    expect(hafiz.env('tes'))
      .to.be.true;
    expect(hafiz.env('test1'))
      .to.be.false;
  });

  it('should support RegExp name', function() {
    expect(hafiz.env(/test/))
      .to.be.true;
    expect(hafiz.env(/TEST/i))
      .to.be.true;
    expect(hafiz.env(/dev/))
      .to.be.false;
  });

});
