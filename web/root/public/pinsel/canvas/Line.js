class Line {
  constructor() {
    this.dots = []
    this.color = 'red'
  }
  addDot(x, y, size) {
    let dot = new Dot(x, y, size)
    this.dots.push(dot)
    return dot
  }
  draw(ctx) {
    ctx.strokeStyle = this.color
    for (var dot of this.dots) {
      dot.draw(ctx)
    }
  }
  collisionWithPoint(x, y) {
    let id = false
    for (let dotIndex in this.dots) {
      let dot = this.dots[dotIndex]
      let dotCollision = dot.collisionWithPoint(x, y)
      if (dotCollision) {
        id = dotIndex
      }
    }
    return id
  }
}
