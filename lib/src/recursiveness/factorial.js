function factorial(n = 0) {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Valor debe ser positivo');
  }

  return n === 0 ? 1 : n * factorial(n - 1);
}

module.exports = factorial;
