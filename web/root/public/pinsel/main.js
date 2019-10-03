function main() {
  leinwand = new Leinwand('leinwand')
  
  var l = new Line()
  l.addDot(10 + i, 10 + i, 10)
  for (var i = 0; i < 100; i++) {
    l.addDot(10 + i, 10 + i, 100 - i)
  }
  leinwand.addLine(l)

  leinwand.draw()
}
