class Cosecha {
  constructor(data = []) {
    if (!Array.isArray(data)) {
      throw new Error('Argumento no es arreglo');
    }

    if (data.length > 12 || data.length < 12) {
      throw new Error('Cantidad de datos no válida');
    }

    this.data = data;
  }

  average() {}

  max() {}

  min() {}
}

module.exports = Cosecha;
