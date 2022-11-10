const createStatementData = require('./createStatementData.js');

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `청구 내역 (고객명 : ${data.customer})\n`;

    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.sumAmount)}\n`;
    result += `적립 포인트: ${data.sumVolumeCredits}점\n`;
    return result;
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
    let result = `<h1>청구 내역 (고객명 : ${data.customer})</h1>\n`;
    result += `<table>\n`;
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
    for (let perf of data.performances) {
        result += ` <tr><th>${perf.play.name}</th><th>(${perf.audience}석)</th>`;
        result += `<th>${usd(perf.amount)}</th></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.sumAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.sumVolumeCredits}</em>점</p>\n`;
    return result;
}

function usd(aNumber) {
    return format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber / 100);
}

module.exports = statement;