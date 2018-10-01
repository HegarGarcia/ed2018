const Stack = require('../stacks');

function toInfix(expression = '') {
  expression = expression.replace(/\s/g, '');
  const validExpression =
    expression && typeof expression === 'string' && expression !== '';

  if (!validExpression) {
    throw new Error('Expression invalid');
  }

  const prefix = expression.replace(/\(/g, '').match(/^(\+|-|\*|\\)+?/);
  const postfix = expression.replace(/\)/g, '').match(/(\+|-|\*|\\)+?$/);

  const expressionLength = expression.length;
  const expressionStack = new Stack(expressionLength, 'string');

  if (!prefix && !postfix) {
    return expression;
  }

  expression = prefix ? [...expression].reverse().join('') : expression;

  for (const value of expression) {
    if (value.match(/\+|\*|-|\/|\(|\)|&&|<=>|\|\||==|=>|<=|!=|!|~|>|<|\^/g)) {
      const firstOperand = expressionStack.pop();
      const secondOperand = expressionStack.pop();
      const operator = value;
      const result = postfix
        ? `(${secondOperand}${operator}${firstOperand})`
        : `(${firstOperand}${operator}${secondOperand})`;
      expressionStack.push(result);
    } else {
      expressionStack.push(value);
    }
  }

  return expressionStack.pop();
}

module.exports = { toInfix };
