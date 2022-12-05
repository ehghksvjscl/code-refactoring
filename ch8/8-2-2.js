class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
    this._interestRate = interestRate;
  }

  get interestRate() {
    return this._interestRate;
  }

  get number() {
    return this._number;
  }

  get type() {
    return this._type;
  }
}