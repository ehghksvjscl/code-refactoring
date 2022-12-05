export class Shipment {
  #trackingNumber;
  #shippingCompany;
  constructor(trackingNumber, shippingCompany) {
    this.trackingNumber = trackingNumber;
    this.shippingCompany = shippingCompany;
  }

  get trackingNumber() {
    return this.#trackingNumber;
  }

  set trackingNumber(arg) {
    this.#trackingNumber = arg;
  }

  get shippingCompany() {
    return this.#shippingCompany;
  }

  set shippingCompany(arg) {
    this.#shippingCompany = arg;
  }

  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

const shipment = new Shipment (999, 'Maersk')
console.log(shipment.display);

shipment.shippingCompany = 'COSCO';
console.log(shipment.display);
