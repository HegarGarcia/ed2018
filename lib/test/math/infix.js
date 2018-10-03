const assert = require('assert');
const { toInfix } = require('../../src/math');

describe('Infix', () => {
  it("Convert expression 'XZW*+' to infix", () => {
    const expression = toInfix('XZW*+');
    assert.equal(expression, '(X+(Z*W))');
  });
  it("Convert expression  'XZ+W*TY^/V-' to infix", () => {
    const expression = toInfix('XZ+W*TY^/V-');
    assert.equal(expression, '((((X+Z)*W)/(T^Y))-V)');
  });

  it("Convert expression  '+*AB/CD' to infix", () => {
    const expression = toInfix('+*AB/CD');
    assert.equal(expression, '((A*B)+(C/D))');
  });

  it("Convert expression  '+A*BC' to prefix", () => {
    const expression = toInfix('+A*BC');
    assert.equal(expression, '(A+(B*C))');
  });

  it("Convert expression  '+++ABCD' to prefix", () => {
    const expression = toInfix('A + B + C + D');
    assert.equal(expression, 'A+B+C+D');
  });
});
