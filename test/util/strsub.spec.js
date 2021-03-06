/**
 * test/strsub.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const strsub       = dofile('util/strsub');


describe('strsub(str)', function() {

  it('should replace {str} if it is an envar expression', function() {
    process.env.STRSUB_TEST_01 = '0';
    const actual = strsub('$STRSUB_TEST_01');

    expect(actual)
      .to.be.a('number')
      .to.equal(0);
  });

  it('should replace envar expressions in {str}', function() {
    process.env.STRSUB_TEST_02 = 'derp';
    const actual = strsub('herp-$STRSUB_TEST_02');

    expect(actual)
      .to.equal('herp-derp');
  });

  it('should not replace escaped occurences', function() {
    const actual = strsub('herp-$$DERP');

    expect(actual)
      .to.equal('herp-$DERP');
  });

  it('should not replace empty envar names', function() {
    const actual = strsub('herp-$derp');

    expect(actual)
      .to.equal('herp-$derp');
  });

});
