import { get } from './get';

describe('get', () => {
  it('should work with nested object', () => {
    const data = { a: { b: { c: 3 } } };

    const res = get(data, 'a.b.c');

    expect(res).toStrictEqual(3);
  });

  it('should work with array inside object', () => {
    const data = { a: { b: [{ c: 3 }] } };

    const res = get(data, 'a.b[0].c');

    expect(res).toStrictEqual(3);
  });

  it('should work with nested array', () => {
    const data = [[{ foo: 'bar' }]];

    const res = get(data, '[0][0].foo');

    expect(res).toStrictEqual('bar');
  });

  it('should work with proxy', () => {
    const ctx = new Map();
    ctx.set('lorem', 'ipsum');

    const $ = new Proxy(ctx, {
      get(target, name) {
        return target.get(name);
      },
    });

    const res = get({ $ }, '$.lorem');

    expect(res).toStrictEqual('ipsum');
  });

  it('should work with Map', () => {
    const ctx = new Map();
    ctx.set('lorem', 'ipsum');

    const res = get({ ctx }, 'ctx.lorem');

    expect(res).toStrictEqual('ipsum');
  });
});
