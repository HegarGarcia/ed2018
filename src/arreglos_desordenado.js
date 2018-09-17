class Arreglo {
  constructor({ length = 1, type = "number" }) {
    this.length = length;
    this.type = type;
    this.array = [];
  }

  agregar(value = "") {
    if (this.array.length < this.length && typeof value === this.type) {
      this.array.push(value);
    } else {
      console.log("El elemento 'Y' no puede insertarse");
    }

    return this;
  }

  eliminar(value = "") {
    let length = this.array.length;

    if (length < 1) {
      console.log("El arreglo está vacio");
      return this;
    }

    let i = 0;
    let flag = false;

    while (i <= length && flag === false) {
      if (this.array[i] === value) {
        flag = true;
        length--;

        for (let k = i; k < length; k++) {
          this.array[k] = this.array[k + 1];
        }

        this.array.length--;
      } else {
        i++;
      }
    }

    if (flag === false) {
      console.log("El elemento 'X' no está en el arreglo");
    }

    return this;
  }

  modificar(oldValue = "", value = "") {
    let length = this.array.length;

    if (length < 1) {
      console.log("El arreglo está vacio");
      return this;
    }

    let i = 0;
    let flag = false;

    while (i <= length && flag === false) {
      if (this.array[i] === oldValue) {
        flag = true;
        this.array[i] = value;
      } else {
        i++;
      }
    }

    if (flag === false) {
      console.log("El elemento 'X' no está en el arreglo");
    }

    return this;
  }
}
