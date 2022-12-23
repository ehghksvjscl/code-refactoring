export class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }
  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }
  get charge() {
    return this.baseCharge + this._provider.connectionCharge;
  }
}

// 명령을 함수로 바꾸기
// 떄로는 클레스로 선언 하는것 보다 함수로 선언해서 단일성으로 만드는게 좋을 때가 있다.
// 클레스가 확장될 가능성이 있으면 클레스로 하는것이 좋고 단순한 계산 하나만 있고 한번만 쓰인다면 함수로 하는게 좋다.

function charge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}