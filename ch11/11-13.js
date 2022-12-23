const values = [1,2];
function getValueForPeriod(periodNumber) {
  if (periodNumber < 0 || periodNumber >= values.length) {
    return null
  }

  return values[periodNumber];
}

console.log(getValueForPeriod(-10));
console.log(getValueForPeriod(1));

// 에러 반환을 너무 남용하지 않도록 주의해야 한다.
// 진짜 에러가 아니라면 에러를 반환하는 대신 null을 반환한다.