const ex1_statement = require('./ex1.js');
const ex2_statement = require('./ex2-function-extraction.js');
const ex3_statement = require('./ex3-play-variable-remove.js');
const ex4_statement = require('./ex4-volumeCredits-extraction.js');
const ex5_statement = require('./ex5-format-variable-remove.js');
const ex6_statement = require('./ex6-volumeCredits-variable-remove.js');
const ex7_statement = require('./ex7-totalAmount-variable-remove.js');

const INVOICE = require("../invoices.json");
const PLAYS = require("../plays.json");

payload = "청구 내역 (고객명 : BigCo)\n Hamlet: $650.00 (55석)\n As You Like It: $580.00 (35석)\n Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점\n";

test('ex1.js', () => {
    expect(ex1_statement(INVOICE[0], PLAYS)).toEqual(payload);
});

test('ex2-function-extraction.js', () => {
    expect(ex2_statement(INVOICE[0], PLAYS)).toEqual(payload);
});

test('ex3-play-variable-remove.js', () => {
    expect(ex3_statement(INVOICE[0], PLAYS)).toEqual(payload);
});

test('ex4-volumeCredits-extraction.js', () => {
    expect(ex4_statement(INVOICE[0], PLAYS)).toEqual(payload);
});

test('ex5-format-variable-remove.js', () => {
    expect(ex5_statement(INVOICE[0], PLAYS)).toEqual(payload);
});

test('ex6-volumeCredits-variable-remove.js', () => {
    expect(ex6_statement(INVOICE[0], PLAYS)).toEqual(payload);
});

test('ex7-totalAmount-variable-remove.js', () => {
    expect(ex7_statement(INVOICE[0], PLAYS)).toEqual(payload);
});