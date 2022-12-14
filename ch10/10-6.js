import {strict as assert } from 'assert';

class Customer {
  constructor() {
    this.discountRate = 0;
  }
  applyDiscount(number) {
    // 정말 number가 0 밑으로 떨어지면 안되는 값일 경우
    assert(number >= 0);
    return this.discountRate ? number - this.discountRate * number : number;
  }
}

const customer = new Customer();
customer.applyDiscount(1)
