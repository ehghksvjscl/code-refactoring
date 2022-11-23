class Reading {
  #customer
  #quantity
  #month
  #year
  constructor(data) {
    this.#customer = data.customer;
    this.#quantity = data.quantity;
    this.#month = data.month;
    this.#year = data.year;
  }

  get baseRate() {
    if (this.#year === 2017 && this.#month === 5) return 0.1;
    return 0.2;
  }

  get baseCharge() {
    return this.baseRate * this.#quantity;
  }
}

const reading = new Reading({ customer: 'ivan', quantity: 10, month: 5, year: 2017 });

export function acquireReading() {
  return reading;
}


