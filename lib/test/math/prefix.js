const assert = require('assert');
const { toPrefix } = require('../../src/math');

describe('Prefix', () => {
  it("Convert expression  'A * B + C / D' to prefix", () => {
    const expression = toPrefix('A * B + C / D');
    assert.equal(expression, '+*AB/CD');
  });

  it("Convert expression  'A + B * C' to prefix", () => {
    const expression = toPrefix('A + B * C');
    assert.equal(expression, '+A*BC');
  });

  it("Convert expression  'A + B + C + D' to prefix", () => {
    const expression = toPrefix('A + B + C + D');
    assert.equal(expression, '+++ABCD');
  });
});
