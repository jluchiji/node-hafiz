/**
 * test/paths.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const paths        = dofile('paths');


describe('paths(base, more)', function() {

  it('should split an PATH-like path string', function() {
    const base = '/foo/bar:/hello/world:./test';
    const actual = paths('/my/app', base);

    expect(actual)
      .to.deep.equal([
        '/foo/bar',
        '/hello/world',
        '/my/app/test'
      ]);
  });

  it('should append {more} to paths', function() {
    const actual = paths('/my/app', null, [ './config', './test' ]);

    expect(actual)
      .to.deep.equal([
        '/my/app/config',
        '/my/app/test'
      ]);
  });

  it('should generate empty array for empty base/more', function() {
    const actual = paths('/my/app', null, null);

    expect(actual)
      .to.deep.equal([ ]);
  });

});
