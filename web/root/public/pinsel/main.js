function main() {
  leinwand = new Leinwand('leinwand')

  var l = new Line()
  for(let i = 0; i < 10; i+=.1){
    l.addDot(100 + i*i*2, 100 + i*2, i*i+10)
  }
  leinwand.addLine(l)

  leinwand.draw()
}
