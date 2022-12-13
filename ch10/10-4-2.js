export function rating(voyage, history) {
  if (voyage.zone === 'china' && hasChinaHistory) {
    return new ExperiencedChinaRating(voyage, history).value;
  }

  return new Rating(voyage, history).value;
}

function hasChinaHistory(history) {
    return history.some((v) => 'china' === v.zone);
}

class Rating {
  #voyage;
  #history;
  constructor(voyage, history) {
    this.#voyage = voyage;
    this.#history = history;
  }

  get voyage() {
    return this.#voyage;
  }

  get history() {
    return this.#history;
  }

  get value() {
    return this.voyageProfitFactor * 3 > this.voyageRisk + this.captainHistoryRisk * 2 ? 'A' : 'B';
  }

  get voyageRisk() {
    let result = 1;
    if (this.#voyage.length > 4) result += 2;
    if (this.#voyage.length > 8) result += this.#voyage.length - 8;
    if (['china', 'east-indies'].includes(this.#voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    let result = 1;
    if (this.#history.length < 5) result += 4;
    result += this.#history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.#voyage.zone === 'china') result += 1;
    if (this.#voyage.zone === 'east-indies') result += 1;
    result += this.voyageHistoryAndLenghtFactor
    return result;
  }

  get voyageHistoryAndLenghtFactor() {
    let result = 0
    if (this.#history.length > 8) result += 1;
    if (this.#voyage.length > 14) result -= 1;
    return result;
  }
}

class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    let result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get voyageHistoryAndLenghtFactor() {
    let result = 3
    if (this.history.length > 10) result += 1;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }
}

const voyage = { zone: 'west-indies', length: 10 };
const history = [
  { zone: 'east-indies', profit: 5 },
  { zone: 'west-indies', profit: 15 },
  { zone: 'china', profit: -2 },
  { zone: 'west-africa', profit: 7 },
];

const rate = rating(voyage, history);
console.log(rate);
