const { random } = require('faker');

function createMockData() {
  return Array.from({ length: 12 }, () => random.number({ min: 0, max: 100 }));
}

function isValidArray(array) {
  if (!Array.isArray(array)) {
    return false;
  }

  return array.length === 12 && array.every(value => !Number.isNaN(+value));
}

const months = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

class Costs {
  constructor({
    dulces = createMockData(),
    bebidas = createMockData(),
    conservas = createMockData(),
  } = {}) {
    const valid = [dulces, bebidas, conservas].every(isValidArray);

    if (!valid) {
      throw new Error('Valores no válidos');
    }

    this.data = { dulces, bebidas, conservas };
  }

  maxProduction(category = 'dulces') {
    if (!this.existCategory(category)) {
      throw new Error('La categoría no existe');
    }

    const production = this.data[category];
    const max = Math.max(...production);
    const maxIndex = production.findIndex(val => val === max);

    return { production: max, month: months[maxIndex] };
  }

  minProduction(category = 'dulces') {
    if (!this.existCategory(category)) {
      throw new Error('La categoría no existe');
    }

    const production = this.data[category];
    const max = Math.min(...production);
    const maxIndex = production.findIndex(val => val === max);

    return { production: max, month: months[maxIndex] };
  }

  average(category = 'dulces') {
    if (!this.existCategory(category)) {
      throw new Error('La categoría no existe');
    }

    const production = this.data[category];
    const { length } = this.data[category];
    const total = production.reduce((acc, val) => acc + val, 0);
    return total / length;
  }

  leastExpensive(month = 'enero') {
    if (!months.includes(month)) {
      throw new Error('El mes no existe');
    }
    const index = months.findIndex(m => m === month);

    const keys = this.getCategories();
    const values = keys.map(key => [key, this.data[key][index]]);
    const [category, amount] = values.reduce((min, curr) => (min[1] > curr[1] ? curr : min));
    return { category, amount, month };
  }

  existCategory(category = '') {
    return category in this.data;
  }

  getCategories() {
    return Object.keys(this.data);
  }
}

module.exports = Costs;
