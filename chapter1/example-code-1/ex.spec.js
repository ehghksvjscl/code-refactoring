const ex1_statement = require('./ex1.js');

const INVOICE = require("../invoices.json");
const PLAYS = require("../plays.json");

payload = "청구 내역 (고객명 : BigCo)\n Hamlet: $650.00 (55석)\n As You Like It: $580.00 (35석)\n Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점\n";

test('테스트 코드', () => {
    expect(ex1_statement(INVOICE[0], PLAYS)).toEqual(payload);
});