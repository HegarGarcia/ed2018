class Matrix {
  constructor(rows = 1, cols = 1) {
    if (!this.isNumber(rows, cols)) {
      throw new Error('Error en los argumentos');
    }

    this.rows = rows;
    this.cols = cols;
    this.matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
  }

  search(value = null) {
    const rowIndex = this.matrix.findIndex(row => row.includes(value));
    const colIndex = this.matrix[rowIndex].findIndex(col => col === value);

    return { row: rowIndex, col: colIndex };
  }

  insert({ row = 0, col = 0 } = {}, value = null) {
    if (!this.isNumber(row, col)) {
      throw new Error('Error en los argumentos');
    }

    if (this.rows < row || this.cols < col) {
      throw new Error('Valores fuera del rango');
    }

    if (this.matrix[row][col]) {
      throw new Error('La celda contiene un valor');
    }

    this.matrix[row][col] = value;

    return this;
  }

  delete({ row = 0, col = 0, value = null } = {}) {
    if (value !== null) {
      const { row: rowIndex, col: colIndex } = this.search(value);
      this.matrix[rowIndex][colIndex] = null;
    } else if (this.isNumber(row, col) && this.rows > row && this.cols > col) {
      this.matrix[row][col] = null;
    }

    return this;
  }

  modify({
    row = 0, col = 0, oldValue = null, newValue = null,
  }) {
    if (oldValue !== null) {
      const { row: rowIndex, col: colIndex } = this.search(oldValue);
      this.matrix[rowIndex][colIndex] = newValue;
    } else if (this.isNumber(row, col) && this.rows > row && this.cols > col) {
      this.matrix[row][col] = newValue;
    }

    return this;
  }

  isNumber(...values) {
    return Array.from(values).every(val => typeof val === 'number');
  }
}
