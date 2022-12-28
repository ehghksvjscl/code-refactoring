class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

class Salesperson extends Employee {
  constructor() {
    super();
  }
}

class Engineer extends Employee {
  constructor() {
    super();
  }
}
