class Cursor {
  constructor(leinwand) {
    this.mode = 'select'
    this.leinwand = leinwand
    this.canvas = leinwand.canvas
    this.canvas.addEventListener('click', () => this.onclick(this))
  }
  onclick(el) {
    if (el.mode == 'select') {
      console.log(5)
    }
    console.log(1 + 1)
  }
}
