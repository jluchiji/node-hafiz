/**
 * test/substitute.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const subst        = dofile('substitute');


describe('substitute(obj)', function() {

  it('should substitute envar values within the object', function() {
    process.env.FOO = 'bar';
    process.env.HERP = 'derp';
    process.env.HELLO = 'world';

    const actual = subst({
      foo: '$FOO',
      bar: '$$BAR',
      a: { b: { hello: '$HELLO, world!!' }, herp: '$HERP' }
    });

    expect(actual)
      .to.deep.equal({
        foo: 'bar',
        bar: '$BAR',
        a: {
          b: { hello: 'world, world!!' },
          herp: 'derp'
        }
      });
  });

});
