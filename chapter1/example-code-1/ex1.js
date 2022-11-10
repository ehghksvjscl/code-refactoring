function statement(invoice, plays) {
    const statementData = {}
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances;

    return renderPlainText(statementData, plays);

    function renderPlainText(data, plays) {
        let result = `청구 내역 (고객명 : ${data.customer})\n`;

        for (let perf of data.performances) {
            result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
        }

        result += `총액: ${usd(sumAmount())}\n`;
        result += `적립 포인트: ${sumVolumeCredits()}점\n`;
        return result;
    }

    function volumeCreditsFor(aPerformance) {
        volumeCredits = 0
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);

        return volumeCredits
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0

        switch (playFor(aPerformance).type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }

        return result
    }

    function usd(aNumber) {
        return format = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
    }

    function sumVolumeCredits() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += volumeCreditsFor(perf)
        }
        return result;
    }

    function sumAmount() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += amountFor(perf)
        }
        return result
    }
}

module.exports = statement;