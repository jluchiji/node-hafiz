/**
 * test/index.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const Chai         = require('chai');
Chai.use(require('sinon-chai'));
Chai.use(require('chai-as-promised'));

/*!
 * Setup global stuff here.
 */
global.co          = require('bluebird').coroutine;
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
