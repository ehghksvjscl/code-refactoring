// 사용자 입장에서는 typeCode라는 것에 뭐가 들어가야 하는지 잘 모른다
// 그래서 팩토리 함수를 생성해서 자동으로 생성 되게 하는 것이 좋다.
// 단 이따 생성자는 있으면 안된다

export class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: 'Engineer', M: 'Manager', S: 'Salesman' };
  }

  static createEngineer(name) {
    return new Employee(name, 'E')
  }

  static createSineerEngineer(name) {
    return new Employee(name, 'SE')
  }

  static createMaketer(name) {
    return new Employee(name, 'M')
  }
}

// 외부에서 호출 할 때
Employee.createEngineer("우노")