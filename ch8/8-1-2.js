export class Account {
  constructor(accountType, daysOverdrawn) {
    this.type = accountType;
    this._daysOverdrawn = daysOverdrawn;
  }

  // 은행 수수료
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  // 한도 수수료
  get overdraftCharge() {
    if (!this.isPremium) {return this._daysOverdrawn * 1.75}
    const baseCharge = 10;
    return (this._daysOverdrawn <= 7) ? baseCharge : baseCharge + (this._daysOverdrawn - 7) * 0.85;
  }
  
  //일별 인출 한도
  get daysOverdrawn() {
    return this._daysOverdrawn;
  }

  get isPremium() {
    return this.accountType.type === 'Premium';
  }
}

export class AccountType {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

}
