  targetTemperature(aPlan, thermostat.currentTemperature);
  // 필요시 밖에서 전달해 주는 형태

// 다른모듈에 있는 함수라고 가정
function targetTemperature(aPlan, currentTemperature) {
  currentTemperature = currentTemperature;
  // 커플링을 의심하자, 다른 모듈을 참조하면 그것을 매개 변수로 받는게 좋다.
}
