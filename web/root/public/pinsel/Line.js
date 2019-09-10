class Line {
  constructor() {
    this.dots = []
    this.color = "red"
  }
  addDot(x, y, size) {
    let dot = new Dot(x,y,size)
    this.dots.push(dot)
  }
  drawInCanvas(canvas) {
    var context = canvas.getContext('2d')
    context.strokeStyle = this.color
    for (var dot of this.dots) {
      context.lineCap = 'round'
      context.lineWidth = size
      context.beginPath()
      context.moveTo(dot.x, dot.y)
      context.lineTo(dot.x + 0.4, dot.y + 0.4)
      context.stroke()
    }
  }
}

