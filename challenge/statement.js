// 1. 소스코드를 이해 하자
// 2. 이해한 소스코드를 기능별로 나누어 보자
// 3. OOP로 리팩토링 하자

// 단어 정리 (영어)
// statement: 명세서
// invoice: 청구서
// play: 연극
// performance: 공연
// audience: 관객
// volumeCredits: 포인트

function format(data) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(data);
}

class Statement {
  constructor(invoice, plays) {
    this._invoice = invoice;
    this._plays = plays;
    this._totalAmount = 0;
    this._volumeCredits = 0;
    this._result = `청구 내역 (고객명: ${invoice.customer})\n`;
  }

  calculateAmount(perf, play) {
    let result = 0
    switch (play.type) {
      case 'tragedy': // 비극
        result = 40000;
        return perf.audience > 30 
          ? result += 1000 * (perf.audience - 30)
          : result;

      case 'comedy': // 희극
        result = 30000;
        result += perf.audience > 20 
          ? 10000 + 500 * (perf.audience - 20)
          : result;

        return result +(300 * perf.audience);
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
  }

  calculateVolumeCredits(perf, play) {
      let result = 0      
      result += Math.max(perf.audience - 30, 0);
      return 'comedy' === play.type 
        ? result += Math.floor(perf.audience / 5)
        : result;
  
  }

  execute() {
    for (let perf of this._invoice.performances) {
      const play = this._plays[perf.playID];
      let thisAmount = 0;
      thisAmount += this.calculateAmount(perf, play);
      this._volumeCredits += this.calculateVolumeCredits(perf, play);
      
      this._result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
      this._totalAmount += thisAmount;
    }
    this._result += `총액: ${format(this._totalAmount / 100)}\n`;
    this._result += `적립 포인트: ${this._volumeCredits}점\n`;
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

const result = new Statement(invoicesJSON[0], playsJSON).execute();
const expected =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';
console.log(result);
console.log(result === expected);