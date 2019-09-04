class Player extends GameObject {
  constructor() {
    super()
    this.x = 10
    this.y = 10
    this.width = 20
    this.height = 40
    this.movingSince = 0

    this.speed = 4
  }

  logic() {
    let moving = false
    if (inputs['ArrowUp'] || inputs['w']) {
      this.y -= this.speed
      moving = true
    }
    if (inputs['ArrowDown'] || inputs['s']) {
      this.y += this.speed
      moving = true
    }
    if (inputs['ArrowLeft'] || inputs['a']) {
      this.x -= this.speed
      moving = true
    }
    if (inputs['ArrowRight'] || inputs['d']) {
      this.x += this.speed
      moving = true
    }

    if (moving == false) {
      this.movingSince = 0
    } else if (this.movingSince == 0) {
      this.movingSince = new Date()
    }
    // console.log(inputs)
  }

  toData() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      animFrame: this.movingSince != 0 ? Math.round((new Date() - this.movingSince) / 200) : 0,
    }
  }
}
