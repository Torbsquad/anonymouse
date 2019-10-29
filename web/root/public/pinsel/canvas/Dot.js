class Dot {
  constructor(x, y, size = 10) {
    this.x = x
    this.y = y
    this.size = size
  }
  collisionWithPoint(x, y) {
    return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2) <= this.size/2
  }
}
