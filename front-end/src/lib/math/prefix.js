import Stack from '../stacks';
import { operators, getPriority, isPostfix, isPrefix } from './lib';
import toInfix from './infix';

/**
 * Converts Expression to Prefix Notations
 * @param {string} expression
 * @returns {string} Expression in prefix notation
 */
export default function toPrefix(expression = '', returnHistory = false) {
  expression = [...expression.replace(/\s/g, '')].reverse().join('');
  const validExpression =
    expression && typeof expression === 'string' && expression !== '';

  if (!validExpression) {
    throw new Error('Expression invalid');
  }

  const postfix = isPostfix(expression);
  const prefix = isPrefix(expression);

  if (prefix) {
    return expression;
  }

  expression = postfix ? toInfix(expression) : expression;

  const expressionLength = expression.length;
  const expressionStack = new Stack(expressionLength, 'string');
  const isAlpha = /^[a-z0-9]+$/i;

  const history = [];
  let result = '';

  for (const character of expression) {
    if (character === ')') {
      expressionStack.push(character);
    } else if (character === '(') {
      let current = expressionStack.pop();

      while (current !== ')') {
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
        ['<'].includes(priority)
      ) {
        operator = expressionStack.pop();
        topIndex = expressionStack.top - 1;
        result += operator;
      }
      expressionStack.push(character);
    } else {
      expressionStack.push(character);
    }

    history.push(result);
  }

  while (expressionStack.top > 0) {
    result += expressionStack.pop();
    history.push(result);
  }

  const reverseHistory = history.map(value => [...value].reverse().join(''));
  return returnHistory ? reverseHistory : [...result].reverse().join('');
}
