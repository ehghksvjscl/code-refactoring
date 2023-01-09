// 1. 소스코드를 이해 하자
// 2. 이해한 소스코드를 기능별로 나누어 보자
// 3. OOP로 리팩토링 하자

// 단어 정리 (영어)
// statement: 명세서
// invoice: 청구서
// play: 연극
// performance: 공연
// audience: 관객 수
// volumeCredits: 포인트

function format(data) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(data);
}

class Play {
  #type;
  #audience
  constructor(type, audience) {
    this.#type = type
    this.#audience = audience
  }

  get type() {
    return this.#type
  }

  get audience() {
    return this.#audience
  }

  get totalAmount() {
    throw new Error(`알 수 없는 장르: ${this.#type}`);
  }

  get totalVolumeCredits() {
      return Math.max(this.#audience - 30, 0);
  }
}

class Tragedy extends Play {
  constructor(type, audience) {
    super(type, audience)
  }

  get totalAmount() {
    let result = 40000;
    return this.audience > 30 
    ? result += 1000 * (this.audience - 30)
    : result;
  }
}

class Comedy extends Play {
  constructor(type, audience) {
    super(type, audience)
  }

  get totalAmount() {
    let result = 30000;
    result += this.audience > 20 
      ? 10000 + 500 * (this.audience - 20)
      : result;

    return result +(300 * this.audience);
  }

  get totalVolumeCredits() {
    let result = super.totalVolumeCredits
    result += Math.floor(this.audience / 5)
    return result
  }
}

class Statement {
  constructor(invoice, plays) {
    this._invoice = invoice;
    this._plays = plays;
    this._totalAmount = 0;
    this._volumeCredits = 0;
    this._result = "";
  }

  calculateAmount(audience, type) {
    switch (type) {
      case 'tragedy': // 비극
        return new Tragedy(type, audience).totalAmount

      case 'comedy': // 희극
        return new Comedy(type, audience).totalAmount

      default:
        return new Play(type, audience).totalAmount;
    }
  }

  calculateVolumeCredits(audience, type) {
    switch (type) {
      case 'comedy':
        return new Comedy(type, audience).totalVolumeCredits
      default:
        return new Play(type, audience).totalVolumeCredits
    }
  }

  findPlay(playId) {
    return this._plays[playId]
  }

  get consoleDeploy() {
    this._result = `청구 내역 (고객명: ${this._invoice.customer})\n`;
    for (let perf of this._invoice.performances) {
      const play = this.findPlay(perf.playID);
      let thisAmount = this.calculateAmount(perf.audience, play.type);
      this._volumeCredits += this.calculateVolumeCredits(perf.audience, play.type);
      
      this._result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
      this._totalAmount += thisAmount;
    }
    this._result += `총액: ${format(this._totalAmount / 100)}\n`;
    this._result += `적립 포인트: ${this._volumeCredits}점\n`;
    return this._result;
  }

  get htmlDeploy() {
    this.result = `<h1>청구 내역 (고객명: ${this._invoice.customer})</h1>\n`;
    this.result += "<table>\n";
    this.result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
    for (let perf of this._invoice.performances) {
      const play = this.findPlay(perf.playID);
      let thisAmount = this.calculateAmount(perf.audience, play.type);
      this._volumeCredits += this.calculateVolumeCredits(perf.audience, play.type);
      
      this._result += `  <tr><td>${play.name}</td><td>(${perf.audience}석)</td>`;
      this._result += `<td>${format(thisAmount / 100)}</td></tr>\n`;
      this._totalAmount += thisAmount;
    }
    this._result += "</table>\n";
    this._result += `<p>총액: <em>${format(this._totalAmount / 100)}</em></p>\n`;
    this._result += `<p>적립 포인트: <em>${this._volumeCredits}</em>점</p>\n`;
    return this._result;
  }
}

// 사용예:
const playsJSON = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoicesJSON = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

const result = new Statement(invoicesJSON[0], playsJSON).consoleDeploy;
const expected =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';
console.log(result);
console.log(result === expected);