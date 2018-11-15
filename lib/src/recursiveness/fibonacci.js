function fibonacci(n = 0) {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Valor no válido');
  }

  return n === 0 || n === 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

module.exports = fibonacci;
