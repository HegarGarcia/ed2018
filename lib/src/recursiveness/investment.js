function investment(amount = 0.0, duration = 0, rate = 0) {
  return duration === 0
    ? amount
    : (rate + 1) * investment(amount, duration - 1, rate);
}

module.exports = investment;
