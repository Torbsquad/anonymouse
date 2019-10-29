function main() {
  leinwand = new Leinwand('leinwand')

  var l = new Line()
  let i = 10
  l.addDot(10 + i, 10 + i, 10)
  leinwand.addLine(l)

  leinwand.draw()
}
