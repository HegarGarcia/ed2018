const BaseMatrix = require('./matrix');

class Matrix extends BaseMatrix {
  constructor(rows, cols) {
    super(rows, cols);
  }

  add(matrix) {
    if (!(matrix instanceof BaseMatrix || matrix instanceof Matrix)) {
      throw new Error('Argumento no es una matriz');
    }

    if (matrix.cols !== this.cols && matrix.rows !== this.rows) {
      throw new Error('Medidas no compatibles');
    }

    const rows = this.rows;
    const cols = this.cols;
    const newMatrix = new Matrix(rows, cols);

    newMatrix.matrix = this.matrix.map((row, i) => {
      const otherRow = matrix.matrix[i];
      return row.map((col, j) => col + otherRow[j]);
    });

    return newMatrix;
  }
}

module.exports = Matrix;
