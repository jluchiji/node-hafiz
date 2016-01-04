/**
 * test/util/envar.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const envar = require('../../lib/util/envar');


describe('envar(match)', function() {

  it('should find an existing envar', function() {
    const expected = process.env.ENVAR_TEST_01 = 'foobarbaz';
    const actual = envar('$ENVAR_TEST_01');

    expect(actual)
      .to.equal(expected);
  });

  it('should find an existing envar (optional)', function() {
    const expected = process.env.ENVAR_TEST_02 = 'helloworld';
    const actual = envar('$?ENVAR_TEST_02');

    expect(actual)
      .to.equal(expected);
  });

  it('should throw when required envar is missing', function() {
    expect(() => envar('$ENVAR_TEST_03'))
      .to.throw('Missing environment variable: ENVAR_TEST_03');
  });

  it('should return empty string when optional envar is missing', function() {
    const expected = '';
    const actual = envar('$?ENVAR_TEST_04');

    expect(actual)
      .to.equal(expected);
  });

  it('should parse number when possible', function() {
    process.env.ENVAR_TEST_05 = '12345';
    const actual = envar('$ENVAR_TEST_05');

    expect(actual)
      .to.be.a('number')
      .to.equal(12345);
  });

  it('should parse booleans when possible', function() {
    process.env.ENVAR_TEST_06A = 'TRUE';
    const actual1 = envar('$ENVAR_TEST_06A');

    expect(actual1)
      .to.be.a('boolean')
      .to.be.true;

    process.env.ENVAR_TEST_06B = 'NO';
    const actual2 = envar('$ENVAR_TEST_06B');

    expect(actual2)
      .to.be.a('boolean')
      .to.be.false;
  });

  it('should perform no substitution if match is escaped $', function() {
    const actual = envar('$$NODE_ENV');

    expect(actual)
      .to.equal('$NODE_ENV');
  });

  it('should perform no substitution if envar name is empty', function() {
    const actual = envar('$');

    expect(actual)
      .to.equal('$');
  });

});
