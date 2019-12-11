class Cursor {
  constructor(leinwand) {
    this.leinwand = leinwand
    this.canvas = leinwand.canvas
    this.canvas.addEventListener('click', () => this.onclick(this))
    this.canvas.addEventListener('mousedown', () => this.mousedown(this))
    this.canvas.addEventListener('mousemove', () => this.mousemove(this))
    this.canvas.addEventListener('mouseup', () => this.mouseup(this))

    this.currentLine = false
  }
  onclick(el) {
    let mouseX = event.offsetX
    let mouseY = event.offsetY
    if (el.mode == 'select') {
      console.log(leinwand.collisionWithPoint(mouseX, mouseY))
    }
  }
  mousedown(el) {
    let mouseX = event.offsetX
    let mouseY = event.offsetY
    if (el.mode == 'draw') {
      this.currentLine = new Line()
      let dot = this.currentLine.addDot(mouseX, mouseY)

      let context = this.leinwand.canvas.getContext('2d')
      dot.draw(context)
    }
  }
  mousemove(el) {
    let mouseX = event.offsetX
    let mouseY = event.offsetY
    if (el.mode == 'draw' && this.currentLine) {
      let dot = this.currentLine.addDot(mouseX, mouseY)

      let context = this.leinwand.canvas.getContext('2d')
      dot.draw(context)
    }
  }
  mouseup(el) {
    if (el.mode == 'draw' && this.currentLine) {
      this.leinwand.addLine(this.currentLine)
      this.currentLine = false
    }
  }
  get mode() {
    return this.leinwand.mode
  }
}
