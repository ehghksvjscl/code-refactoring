// 예제 1
class Order {
  // 다른 코드 있다고 가정
  get discountedTotal() {
    return this.basePrice - this.discount;
  }
  set discount(value) {
    this._discount = value; // get 
  }
}

// 예제 2
class ProductionPlan {
  // 다른 코드 있다고 가정
  get totalProduction() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  set addAdjustments(args) {
    this._adjustments.push(args);
  }
  
  applyAdjustment(adjustment) {
    this.addAdjustments(adjustment);
  }
}
