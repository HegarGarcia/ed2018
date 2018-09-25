const { mockArray } = require('../utils');
const months = new Map([
  [0, 'enero'],
  [1, 'febrero'],
  [2, 'marzo'],
  [3, 'abril'],
  [4, 'mayo'],
  [5, 'junio'],
  [6, 'julio'],
  [7, 'agosto'],
  [8, 'septiembre'],
  [9, 'octubre'],
  [10, 'noviembre'],
  [11, 'diciembres']
]);

class Cosecha {
  constructor(data = mockArray(12)) {
    if (!Array.isArray(data)) {
      throw new Error('Argumento no es arreglo');
    }

    if (data.length > 12 || data.length < 12) {
      throw new Error('Cantidad de datos no válida');
    }

    this.data = data;
  }

  average() {
    return (
      this.data.reduce((total, month) => total + month, 0) / this.data.length
    );
  }

  find(callback) {
    const value = this.data.reduce(callback);
    const index = this.data.findIndex(month => month === value);
    const month = months.get(index);

    return { month, value };
  }

  max() {
    return this.find(
      (pastMonth, month) => (pastMonth > month ? pastMonth : month)
    );
  }

  min() {
    return this.find(
      (pastMonth, month) => (pastMonth < month ? pastMonth : month)
    );
  }

  getStadistics() {
    const average = this.average();
    const emptyStadistics = {
      overAverage: new Map(),
      underAverage: new Map(),
      onPoint: new Map(),
      average
    };
    const stadistics = this.data.reduce((results, month, index) => {
      const key = months.get(index);
      if (month === results.average) {
        results.onPoint.set(key, month);
      } else if (month > results.average) {
        results.overAverage.set(key, month);
      } else {
        results.underAverage.set(key, month);
      }
      return results;
    }, emptyStadistics);

    return stadistics;
  }
}

module.exports = Cosecha;
