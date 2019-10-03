class Line {
  constructor() {
    this.dots = []
    this.color = 'red'
  }
  addDot(x, y, size) {
    let dot = new Dot(x, y, size)
    this.dots.push(dot)
  }
  draw(ctx) {
    ctx.strokeStyle = this.color
    for (var dot of this.dots) {
      ctx.lineCap = 'round'
      ctx.lineWidth = dot.size
      ctx.beginPath()
      ctx.moveTo(dot.x, dot.y)
      ctx.lineTo(dot.x + 0.4, dot.y + 0.4)
      ctx.stroke()
    }
  }
  collisionWithMouse(mouseX, mouseY) {

  }
}
