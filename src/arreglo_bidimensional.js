class Matrix {
  constructor(rows = 1, cols = 1) {
    if (Number.isNaN(rows) || Number.isNaN(cols) || +rows < 0 || +cols < 0) {
      throw new Error('Argumentos no válidos');
    }

    this.rows = rows;
    this.cols = cols;
    this.matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
  }

  search(value = null) {
    const rowIndex = this.matrix.findIndex(row => row.includes(value));

    if (rowIndex === -1) {
      throw new Error('Valor no encontrado');
    }

    const colIndex = this.matrix[rowIndex].findIndex(col => col === value);

    return { row: rowIndex, col: colIndex };
  }

  insert({ row: rowIndex, col: colIndex, value = null } = {}) {
    if (!value && !(value === 0)) {
      throw new Error('No hay valor para insertar');
    }

    const validPosition = rowIndex > 0
      && colIndex > 0
      && this.isValidPosition({ row: rowIndex, col: colIndex });

    /* eslint-disable */
    rowIndex -= 1;
    colIndex -= 1;
    /* eslint-enable */

    if (validPosition) {
      if (this.matrix[rowIndex][colIndex]) {
        throw new Error('La celda contiene un valor');
      }

      this.matrix[rowIndex][colIndex] = value;
    } else if (!validPosition && !rowIndex && !colIndex) {
      const rowInsertionIndex = this.matrix.findIndex(row => row.some(val => !val));
      const colInsertionIndex = rowInsertionIndex !== -1
        && this.matrix[rowInsertionIndex].findIndex(col => !col);

      if (!colInsertionIndex && colInsertionIndex !== 0) {
        throw new Error('No hay espacio en la matriz');
      }

      this.matrix[rowInsertionIndex][colInsertionIndex] = value;
    } else {
      throw new Error('Parámetros no válidos');
    }

    return this;
  }

  delete({ row: rowIndex, col: colIndex, value } = {}) {
    const validPosition = rowIndex > 0
      && colIndex > 0
      && this.isValidPosition({ row: rowIndex, col: colIndex });

    /* eslint-disable */
    rowIndex -= 1;
    colIndex -= 1;
    /* eslint-enable */

    if (validPosition) {
      if (this.matrix[rowIndex][colIndex]) {
        this.matrix[rowIndex][colIndex] = null;
      } else {
        throw new Error('No hay valor en la celda');
      }
    } else if (value || value >= 0) {
      const { row: rowDeletionIndex, col: colDeletionIndex } = this.search(
        value,
      );

      this.matrix[rowDeletionIndex][colDeletionIndex] = null;
    } else {
      throw new Error('Parámetros no válidos');
    }

    return this;
  }

  modify({
    row = 0, col = 0, oldValue = null, newValue = null,
  }) {
    if (!newValue && !(newValue === 0)) {
      throw new Error('Argumentos no válidos');
    }

    const tempMatrix = Array.from(this.matrix);

    try {
      if (oldValue || oldValue === 0) {
        const searchResult = this.search(oldValue);
        this.delete({ value: oldValue });
        this.insert({
          row: searchResult.row + 1,
          col: searchResult.col + 1,
          value: newValue,
        });
      } else if (row > 0 && col > 0 && this.isValidPosition({ row, col })) {
        this.delete({ row, col });
        this.insert({ row, col, value: newValue });
      } else {
        throw new Error('Argumentos no válidos');
      }
    } catch (e) {
      this.matrix = tempMatrix;
      throw e;
    }

    return this;
  }

  isValidPosition({ row, col }) {
    const result = !(Number.isNaN(row) && Number.isNaN(col))
      && (this.rows > +row && +row > 0 && this.cols > +col && +col > 0);

    return result;
  }
}

module.exports = Matrix;
