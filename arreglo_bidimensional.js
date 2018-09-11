class Matrix {
  constructor(rows = 1, cols = 1) {
    if (this.isNumber(rows, cols)) {
      throw new Error('Error en los argumentos');
    }

    this.rows = rows;
    this.cols = cols;
    this.matrix = Array.from({ length: rows }, () => Array.from({ length: cols }));
  }

  insert(row = 0, col = 0) {}

  delete(row = 0, col = 0) {}

  modify(row = 0, col = 0) {}

  isNumber() {}
}
