function main() {
  leinwand = new Leinwand('leinwand')

  var l = new Line()
  let i = 10
  l.addDot(100 + i, 100 + i, 100)
  leinwand.addLine(l)

  leinwand.draw()
}
