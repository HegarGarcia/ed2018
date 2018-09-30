const Stack = require('../stacks');
const { operators, getPriority } = require('./lib');

function toPostfix(expression = '') {
  expression = expression.replace(/\s/g, '');
  const validExpression =
    expression && typeof expression === 'string' && expression !== '';

  if (!validExpression) {
    throw new Error('Expression invalid');
  }

  const expressionLength = expression.length;
  const expressionStack = new Stack(expressionLength, 'string');
  const isAlpha = /^[a-z0-9]+$/i;
  let result = '';

  for (const character of expression) {
    if (character === '(') {
      expressionStack.push(character);
    } else if (character === ')') {
      let current = expressionStack.pop();

      while (current !== '(') {
        result += current;
        current = expressionStack.pop();
      }
    } else if (isAlpha.test(character)) {
      result += character;
    } else if (operators.includes(character)) {
      let operator;
      let topIndex = expressionStack.top - 1;
      const priority = getPriority(expressionStack.stack[topIndex], character);

      while (
        expressionStack.top > 0 &&
        operators.includes(expressionStack.stack[topIndex]) &&
        ['<', '='].includes(priority)
      ) {
        operator = expressionStack.pop();
        topIndex = expressionStack.top - 1;
        result += operator;
      }
      expressionStack.push(character);
    } else {
      expressionStack.push(character);
    }
  }

  while (expressionStack.top > 0) {
    result += expressionStack.pop();
  }

  return result;
}

module.exports = { toPostfix };
