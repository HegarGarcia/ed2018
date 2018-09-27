class ArregloOrdenado {
  constructor(length) {
    this.length = length;
    this.array = [];
  }

  search(value = null) {
    const { length } = this.array;
    const arr = this.array;
    let index = 0;

    while (index <= length && arr[index] < value) {
      index += 1;
    }

    const found = !(index >= length || arr[index] > value);

    return { index, found };
  }

  insert(value = null) {
    if (this.array.length >= this.length) {
      throw new Error('No hay espacio disponible');
    }

    const { index, found } = this.search(value);

    if (found) {
      throw new Error('El valor ya está en el arreglo');
    }

    for (let i = this.array.length; i > index; i -= 1) {
      this.array[i] = this.array[i - 1];
    }

    this.array[index] = value;

    return this;
  }

  delete(value = null) {
    if (this.array.length === 0) {
      throw new Error('El arreglo está vacio');
    }

    const { index, found } = this.search(value);

    if (!found) {
      throw new Error('El valor no está en el arreglo');
    }

    for (let i = index; i < this.array.length; i += 1) {
      this.array[i] = this.array[i + 1];
    }

    this.array.length -= 1;

    return this;
  }

  modify(oldValue = null, newValue = null) {
    const tempArray = [...this.array];

    try {
      this.delete(oldValue);
      this.insert(newValue);
    } catch (error) {
      this.array = tempArray;
      throw error;
    }

    return this;
  }
}

module.exports = ArregloOrdenado;
