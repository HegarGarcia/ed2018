import Stack from '../stacks';

/**
 * Converts Expression to Infix Notations
 * @param {string} expression
 * @returns {string} Expression in infix notation
 */
export default function toInfix(expression = '', returnHistory = false) {
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
    return returnHistory ? [expression] : expression;
  }

  const history = [];
  expression = prefix ? [...expression].reverse().join('') : expression;

  for (const value of expression) {
    if (value.match(/\+|\*|-|\/|\(|\)|&&|<=>|\|\||==|=>|<=|!=|!|~|>|<|\^/g)) {
      const firstOperand = expressionStack.pop();
      const secondOperand = expressionStack.pop();
      const operator = value;
      const result = postfix
        ? `(${secondOperand}${operator}${firstOperand})`
        : `(${firstOperand}${operator}${secondOperand})`;
      history.push(result);
      expressionStack.push(result);
    } else {
      expressionStack.push(value);
    }
  }

  return returnHistory ? history : expressionStack.pop();
}
