class Person {
  #name;
  #genderCode;
  constructor(name, genderCode) {
    this.#name = name;
    this.#genderCode = genderCode
  }

  get name() {
    return this.#name;
  }

  get genderCode() {
    return this.genderCode;
  }

  get isMals() {
    return this.#genderCode === 'M';
  }

  static create(record) {
    switch (record) {
      case "M":
        return new Person(record.name, 'M');
      case "F":
        return new Person(record.name, 'F');
      default:
        return new Person(record.name, 'X');
    }
  }
}

function loadFromInput(data) {
  const result = [];
  data.forEach((record) => {
    let person;
    person = Person.create(record.gender);
    result.push(person);
  });
  return result;
}

const people = loadFromInput([
  { name: '엘리', gender: 'F' },
  { name: '철수', gender: 'M' },
  { name: '밥', gender: 'M' },
]);
const numberOfMales = people.filter((p) => p.isMals).length;
console.log(numberOfMales);
