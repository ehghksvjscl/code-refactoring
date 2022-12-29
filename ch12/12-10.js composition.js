//컴포지션(위임)
class Printer {
  #printerHeader
  constructor(printerHeader) {
    this.#printerHeader = printerHeader;
  }
  print() {
    this.#printerHeader 
    ? this.#printerHeader.print()
    : console.log('기본 프린터')
  }
}

class RedPrinter {
  print() {
    console.log('빨간색 프린터')
  }
}

class BlackPrinter {
  print() {
    console.log('검정색 프린터')
  }
}

const printers = [
  new Printer(), 
  new Printer(new RedPrinter()),
  new Printer(new BlackPrinter())
]
printers.forEach(printer => printer.print());