export class Order {
  constructor(quantity, itemPrice) {
    this.quantity = quantity;
    this.itemPrice = itemPrice;
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }

  get discountLevel() {
    return this.quantity > 100 
      ? discountLevel = 2
      : discountLevel = 1;
  }

  get finalPrice() {
    return this.discountedPrice();
  }

  discountedPrice() {
    switch (discountLevel) {
      case 1:
        return basePrice * 0.95;
      case 2:
        return basePrice * 0.9;
    }
  }
}
