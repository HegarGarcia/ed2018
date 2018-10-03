const operators = ['+', '-', '/', '*', '^'];
const operatorsPriority = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3
};

function getPriority(base = '', operator = '') {
  const basePriority = operatorsPriority[base];
  const priority = operatorsPriority[operator];

  if (basePriority === -1 || priority === -1) {
    throw new Error("Operator(s) doesn't exist");
  }

  return priority > basePriority ? '>' : priority === basePriority ? '=' : '<';
}

const isPrefix = expression =>
  expression.replace(/\(/g, '').match(/^(\+|-|\*|\\)+?/);

const isPostfix = expression =>
  expression.replace(/\)/g, '').match(/(\+|-|\*|\\)+?$/);

export { operators, getPriority, isPostfix, isPrefix };
