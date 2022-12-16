// 예제 1
function setDimension(name, value) {
  if (name === 'height') {
    this._height = value;
    return;
  }
  if (name === 'width') {
    this._width = value;
    return;
  }
}
// 위에 상황을 만들지 말자.!!!!!

function setHeight(value) {
  this._height = value;
}

function setWidth(value) {
  this._width = value;
}


// 예제 2
class Concert {
  regularBook(customer) {
    this.#book(customer, false);
  }
  premiumBook(customer) {
    this.#book(customer, true);
  }

  #book(customer, isPremium) {}
  // 꼭 토글이 필요할 때는 Private 필드를 사용하자.
}

// 예제 3
function setSwitch(on); // 좋지 않다. 
function switchOn()
function switchOff()