class List {
  constructor() {
    this.list = new Map();
    this.head = null;
    this.tail = null;
    this.temp = null;
  }

  add(payload = {}) {
    const pointer = Symbol(payload.toString());
    const node = {
      payload,
      pointer: null
    };

    if (this.head === null) {
      this.head = pointer;
    } else {
      const tail = this.list.get(this.temp);
      tail.pointer = pointer;
      this.list.set(this.temp, tail);
    }
    this.list.set(pointer, node);
    this.tail = this.temp = pointer;
  }

  forEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    let currentNode = this.list.get(this.head);
    do {
      callback(currentNode.payload);
      currentNode = this.list.get(currentNode.pointer);
    } while (currentNode.pointer !== null);
    callback(currentNode.payload);
  }
}

module.exports = List;
