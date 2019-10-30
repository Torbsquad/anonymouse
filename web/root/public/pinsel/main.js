function main() {
  leinwand = new Leinwand('leinwand')

  var l = new Line()
  l.color = 'green'
  leinwand.addLine(l)

  for (let i = 0; i < 10; i += 0.05) {
    let size = 10
    if (i < 2) {
      size = i * 5 + 0.1
    }
    if (i > 8) {
      size = (10 - i) * 5 + 0.1
    }
    l.addDot(100 + i * i * 3, 100 + i * 10, size)
  }

  var l = new Line()
  l.color = 'red'
  leinwand.addLine(l)
  for (let i = 0; i < 10; i += 0.05) {
    let size = 10
    if (i < 2) {
      size = i * 5 + 0.1
    }
    if (i > 8) {
      size = (10 - i) * 5 + 0.1
    }
    l.addDot(100 + i * i * 3, 100 + i * 20, size)
  }

  var l = new Line()
  l.color = 'blue'
  leinwand.addLine(l)
  for (let i = 0; i < 10; i += 0.05) {
    let size = 10
    if (i < 2) {
      size = i * 5 + 0.1
    }
    if (i > 8) {
      size = (10 - i) * 5 + 0.1
    }
    l.addDot(100 + i * i * 3, 100 + i * 35, size)
  }

  leinwand.draw()
}
