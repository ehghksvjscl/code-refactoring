class Booking {
  #show;
  #date;
  constructor(show, date, extras) {
    this.#show = show;
    this.#date = date;
  }

  get hasTalkback() {
    return this.#premiumDelegate
    ? this.#premiumDelegate.hasTalkback
    : this.#show.hasOwnProperty('talkback') && !this.isPeakDay;
  }

  get basePrice() {
    let result = this.#show.price;

    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }

    return this.#premiumDelegate
    ? this.#premiumDelegate.extendBasePrice(result)
    : result;
  }

  get hasDinner() {
    return this.#premiumDelegate
    ? this.#premiumDelegate.hasDinner
    : undefined;
  }

  #bePremium(extras) {
    this.#premiumDelegate = new PremiumBookingDelegate(this, extras);
  }

  createBooking(show, date) {
    return new Booking(show, date);
  }

  createPremiumBooking(show, date, extras) {
    const result = new PremiumBooking(show, date, extras);
    result.#bePremium(extras);
    return result;
  }
}

class PremiumBookingDelegate {
  #host;
  #extras;
  constructor(host, extras) {
    this.#host = host;
    this.extras = extras;
  }

  get hasTalkback() {
    return this.#host.#show.hasOwnProperty('talkback');
  }

  get basePrice() {
    return Math.round(super.basePrice + this.#extras.PremiumFee);
  }

  get hasDinner() {
    return this.#extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }

  extendBasePrice(base) {
    return base + this.#extras.premiumFee;
  }
}

const booking = Booking.createBooking(show, date);
const premiumBooking = Booking.createPremiumBooking(show, date, extras);
