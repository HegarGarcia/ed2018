const { random } = require('faker');

function mockArray(length, { max = 10, min = 1 }) {
  return Array.from({ length }, () => random.number({ max, min }));
}

module.exports = { mockArray };
