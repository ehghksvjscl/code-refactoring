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