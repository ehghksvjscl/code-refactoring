class Hotel {
  constructor() {
    this.rooms = []
  }

  addRoom(roomNumber) {
    this.rooms.push(new Room(roomNumber))
  }

  emptyRoom(roomNumber) {
    this.rooms[roomNumber] = new EmptyRoom(roomNumber)
  }


  cleanRooms() {
    console.log("모든 방을 청소합니다!")
    this.rooms.forEach(room => room.clean())
  }
}

class Room {
  constructor(roomNumber) {
    this.roomNumber = roomNumber
  }

  clean() {
    console.log(`${this.roomNumber} 방을 청소 합니다!`)
  }
}

class EmptyRoom extends Room {
  constructor(roomNumber) {
    super(roomNumber)
  }

  clean() {
    console.log(`${this.roomNumber} 방은 비어있습니다!`)
  }
}

const hotel = new Hotel()
hotel.addRoom(0)
hotel.addRoom(1)
hotel.cleanRooms()
hotel.emptyRoom(1)
hotel.cleanRooms()



export class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }
}

export class Customer {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    //
  }

  set billingPlan(arg) {
    //
  }

  get paymentHistory() {
    //
  }
}

export class UnknownCustomer extends Customer {
  constructor() {
    super('occupant');
  }
}

// 사용하는 부분
export function customerName(site) {
  const aCustomer = site.customer;
  // 더 많은 코드가 여기에 있음
  if (aCustomer === 'unknown') {
    return new UnknownCustomer().name;
  }  

  return aCustomer.name;
}
