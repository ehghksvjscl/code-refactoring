class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get type() {
    return 'Employee'
  }

  toString() {
    return `${this.#name}`;
  }

  // 펙토리 함수를 사용해서 만들어도 된다(type을 무조건 받아야 하는 경우)
  // static createEngineer(name, type) {
  //   return new Engineer(name, type);
  // }
}

class Engineer extends Employee {
  get type() {
    return 'Engineer';
  }
}
class Manager extends Employee {
  get type() {
    return 'Manager';
  }
}
class Salesperson extends Employee {
  get type() {
    return 'Salesperson';
  }
}

const ellie = new Engineer('엘리');
const bob = new Manager('밥');
