const fibonacci = require('./fibonacci');

function fibonacciSeries(n = 0) {
  const arr = [];

  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Valor no válido');
  }

  for (let i = 0; i <= n - 1; i++) {
    arr.push(fibonacci(i));
  }

  return arr;
}

module.exports = fibonacciSeries;
