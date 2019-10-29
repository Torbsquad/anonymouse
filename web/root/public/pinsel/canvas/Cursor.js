class Cursor {
  constructor(leinwand) {
    this.mode = 'select'
    this.leinwand = leinwand
    this.canvas = leinwand.canvas
    this.canvas.addEventListener('click', () => this.onclick(this))
  }
  onclick(el) {
    let mouseX = event.offsetX
    let mouseY = event.offsetY
    if (el.mode == 'select') {
      console.log(leinwand.collisionWithPoint(mouseX, mouseY))
    }
  }
}
