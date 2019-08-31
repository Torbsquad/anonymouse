function main() {
  console.log('Hi!')

  var c = document.getElementById('leinwand')

  var l = new Line()
  l.addDot(10 + i, 10 + i, 10)
  for (var i = 0; i < 100; i++) {
    l.addDot(10 + i, 10 + i, 100 - i)
  }
  l.drawInCanvas(c)
}
