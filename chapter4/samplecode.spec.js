const {Province, sampleProvinceData} = require('./samplecode.js');

let asia
beforeEach(() => {
    asia = new Province(sampleProvinceData());
});

test('province -> shortfall', () => {
    expect(asia.shortfall).toEqual(5);
});

test('province -> profit', () => {
    expect(asia.profit).toEqual(230);
});

test('province -> change production', () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).toEqual(-6);
    expect(asia.profit).toEqual(292);
});