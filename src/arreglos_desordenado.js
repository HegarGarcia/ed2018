class Arreglo {
  constructor({ length = 1, type = "number" }) {
    this.length = length;
    this.type = type;
    this.array = [];
  }

  agregar(value = "") {
    // eslint-disable-next-line valid-typeof
    if (this.array.length < this.length && typeof value === this.type) {
      this.array.push(value);
    } else {
      throw new Error("El elemento 'Y' no puede insertarse");
    }

    return this;
  }

  eliminar(value = "") {
    let { length } = this.array;

    if (length < 1) {
      throw new Error("El arreglo está vacio");
    }

    let i = 0;
    let flag = false;

    while (i <= length && flag === false) {
      if (this.array[i] === value) {
        flag = true;
        length -= 1;

        for (let k = i; k < length; k += 1) {
          this.array[k] = this.array[k + 1];
        }

        this.array.length -= 1;
      } else {
        i += 1;
      }
    }

    if (flag === false) {
      throw new Error("El elemento 'X' no está en el arreglo");
    }

    return this;
  }

  modificar(oldValue = "", value = "") {
    const { length } = this.array;

    if (length < 1) {
      throw new Error("El arreglo está vacio");
    }

    let i = 0;
    let flag = false;

    while (i <= length && flag === false) {
      if (this.array[i] === oldValue) {
        flag = true;
        this.array[i] = value;
      } else {
        i += 1;
      }
    }

    if (flag === false) {
      throw new Error("El elemento 'X' no está en el arreglo");
    }

    return this;
  }
}

module.exports = Arreglo;
