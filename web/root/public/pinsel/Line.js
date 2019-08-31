class Line {
  constructor() {
    this.dots = []
  }
  addDot(x, y, size) {
    this.dots.push([x, y, size])
  }
  drawInCanvas(canvas) {
    var context = canvas.getContext('2d')
    for (var dot of this.dots) {
      var x = dot[0]
      var y = dot[1]
      var size = dot[2]
      point(x, y, size, context)
    }
  }
}

function point(x, y, size, context) {
  context.lineCap = 'round'
  context.lineWidth = size
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x + 0.1, y + 0.1)
  context.stroke()
}
