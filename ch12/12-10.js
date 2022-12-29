//상송
class Printer {
  print() {
    console.log('기본 프린터')
  }
}

class RedPrinter extends Printer {
  print() {
    console.log('빨간색 프린터')
  }
}

const printers = [new Printer(), new RedPrinter()]
printers.forEach(printer => printer.print());
