import toInfix from './infix';
import toPostfix from './postfix';
import toPrefix from './prefix';

const validMathExpression = /([a-zA-z]*[+-/*^]{1}[a-zA-z]+)+(\(([^()]|(([a-zA-z]*[+-/*^]{1}[a-zA-z]*)?))*\))?([a-zA-z]*[+-/*^]{1}[a-zA-z]*)?/g;

export default { toInfix, toPostfix, toPrefix, validMathExpression };
