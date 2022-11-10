class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance
        this.play = aPlay
    }

    get amount() {
        let result = 0

        switch (this.play.type) {
            case "tragedy":
                result = 40000;
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${this.performance.play.type}`);
        }

        return result
    }
}

function createStatementData(invoice, plays) {
    const result = {}
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.sumVolumeCredits = sumVolumeCredits(result);
    result.sumAmount = sumAmount(result);
    return result

    function sumAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function sumVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }

    function amountFor(aPerformance) {
        return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function volumeCreditsFor(aPerformance) {
        volumeCredits = 0
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === aPerformance.play.type) volumeCredits += Math.floor(aPerformance.audience / 5);

        return volumeCredits
    }

    function enrichPerformance(aPerformance) {
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = calculator.amount
        result.volumeCredits = volumeCreditsFor(result);
        return result
    }
}

module.exports = createStatementData;