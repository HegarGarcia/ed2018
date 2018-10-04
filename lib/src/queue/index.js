class Queue {
  constructor(size = 1) {
    this.queue = Array.from({ length: size }, () => null);
    this.max = size;
    this.final = 0;
    this.first = 0;
  }

  insert(value = '') {
    if (
      (this.final === this.max && this.first === 1) ||
      this.final + 1 === this.first
    ) {
      throw new Error('Overflow');
    }

    if (this.final === this.max) {
      this.final = 1;
    } else {
      this.final += 1;
    }

    this.queue[this.final - 1] = value;

    if (this.first === 0) {
      this.first = 1;
    }
  }

  delete() {
    if (this.first === 0) {
      throw new Error('Underflow');
    }

    const data = this.queue[this.first - 1];

    if (this.first === this.final) {
      this.final = 0;
      this.first = 0;
    } else {
      this.first += 1;
    }

    return data;
  }
}

module.exports = Queue;
