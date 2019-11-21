class Dot {
  constructor(x, y, size = 10) {
    this.x = x
    this.y = y
    this.size = size
  }
  collisionWithPoint(x, y) {
    return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2) <= this.size / 2
  }
  draw(ctx) {
    ctx.lineCap = 'round'
    ctx.lineWidth = this.size
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + 0.4, this.y + 0.4)
    ctx.stroke()
  }
}
