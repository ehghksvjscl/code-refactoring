class Order {
  #product;
  #quantity;
  #shippingMethod;
  constructor(product, quantity, shippingMethod) {
    this.#product = product;
    this.#quantity = quantity;
    this.#shippingMethod = shippingMethod;
  }

  get basePrice() {
    return this.#quantity * this.#product.basePrice;
  }

  get discount() {
    return Math.max(this.#quantity - this.#product.discountThreshold, 0) * 
    this.#product.basePrice * 
    this.#product.discountRate;
  }

  get shippingPerCase() {
    return (this.basePrice > this.#shippingMethod.discountThreshold) ? 
    this.#shippingMethod.discountedFee : this.#shippingMethod.feePerCase;
  }

  get shippingCost() {
    return this.shippingPerCase * this.#quantity;
  }

  get  price() {
    return this.basePrice - this.discount + this.shippingCost;
  }

}

// 이렇게 해 놓고 파일을 쪼겠을 것이다.

class Product {
  #basePrice;
  #discountRate;
  #discountThreshold;
  constructor(data) {
    this.#basePrice = data.basePrice;
    this.#discountRate = data.discountRate;
    this.#discountThreshold = data.discountThreshold;
  }

  get basePrice() {
    return this.#basePrice;
  }

  get discountRate() {
    return this.#discountRate;
  }

  get discountThreshold() {
    return this.#discountThreshold;
  }
  
}

// 사용 예:
const product = new Product({
  basePrice: 10,
  discountRate: 0.1,
  discountThreshold: 10,
});

class ShippingMethod {
  #feePerCase;
  #discountedFee;
  #discountThreshold;
  constructor(data) {
    this.#feePerCase = data.feePerCase;
    this.#discountedFee = data.discountedFee;
    this.#discountThreshold = data.discountThreshold;
  }

  get feePerCase() {
    return this.#feePerCase;
  }

  get discountedFee() {
    return this.#discountedFee;
  }

  get discountThreshold() {
    return this.#discountThreshold;
  }
}

// 이렇게 해 놓고 파일을 쪼겠을 것이다.

const shippingMethod = new ShippingMethod({
  discountThreshold: 20,
  feePerCase: 5,
  discountedFee: 3,
});

const priceOrder = new Order(product, 5, shippingMethod);
console.log(priceOrder.price);
