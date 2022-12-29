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

class Statement {
  constructor(invoice, plays) {
    this.invoice = invoice;
    this.plays = plays;
  }

  get result() {}
}

function format(data) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(data);
}

class Play {
  get totalAmount() {}
  get totalVolumeCredits() {}

  isAudience
}

class Tragedy extends Play {}

class Comedy extends Play {}

class UnknownPlayError extends Error {}


function createPlay(data) {
  switch (data.type) {
    case 'tragedy': // 비극
      return new c(data);
    case 'comedy': // 희극
      return new ComedyPlay(data);
    default:
      throw new Error(`알 수 없는 장르: ${data.type}`); // refeactoring
  }
}


export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy': // 비극
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy': // 희극
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `  ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
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

const result = statement(invoicesJSON[0], playsJSON);
const expected =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';
console.log(result);
console.log(result === expected);