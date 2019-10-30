function main() {
  leinwand = new Leinwand('leinwand')

  var l = new Line()
  l.color = 'green'
  leinwand.addLine(l)
  let size = 0.1
  for (let i = 0; i < 400; i += 2) {
    if (i < 50) {
      size += (10 - size) * 0.05
    }
    if (i > 350) {
      size += (0 - size) * 0.06
    }
    l.addDot(50 + i, 50 + Math.sqrt(i) * 5 + Math.sin(i / 10) * 10, size)
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
    l.addDot(50 + i * i * 4, 50 + i * 25, size)
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
    l.addDot(50 + i * i * 4, 50 + i * 40, size)
  }

  leinwand.draw()
}
