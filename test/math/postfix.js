const assert = require('assert');
const { toPostfix } = require('../../src/math');

describe('Postfix', () => {
  it("Convert expression  'X + Z * W' to postfix", () => {
    const expression = toPostfix(' X + Z * W');
    assert.equal(expression, 'XZW*+');
  });

  it("Convert expression  '(X + Z) * W / T ^ Y - V' to postfix", () => {
    const expression = toPostfix('(X + Z) * W / T ^ Y - V');
    assert.equal(expression, 'XZ+W*TY^/V-');
  });
});
