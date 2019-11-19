function main() {
  leinwand = new Leinwand('leinwand')
  let size

  var l = new Line()
  l.color = 'green'
  leinwand.addLine(l)
  size = 0.1
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
  size = 0.1
  for (let i = 0; i < 400; i += 2) {
    if (i < 50) {
      size += (10 - size) * 0.05
    }
    if (i > 350) {
      size += (0 - size) * 0.06
    }
    l.addDot(50 + i, 50 + Math.sqrt(i) * 5 * Math.sin(i / 2) + i, size)
  }

  var l = new Line()
  l.color = 'blue'
  leinwand.addLine(l)
  size = 0.1
  for (let i = 0; i < 400; i += 2) {
    if (i < 50) {
      size += (10 - size) * 0.05
    }
    if (i > 350) {
      size += (0 - size) * 0.06
    }
    l.addDot(50 + i, 50 + Math.sqrt(i) * 20, size * Math.sin(i / 10) * 1 + size * 1.5)
  }

  leinwand.toolbar.addTool('select')
  leinwand.toolbar.addTool('draw')

  leinwand.draw()
}
