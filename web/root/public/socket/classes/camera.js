class Camera {
  constructor(x=0, y=0) {
    this.x = x
    this.y = y
  }

  slideTowards(x, y, speed) {
    this.x += (x - this.x)/speed
    this.y += (y - this.y)/speed
  }
}
