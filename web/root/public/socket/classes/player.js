class Player extends GameObject {
  constructor() {
    super()
    this.x = 10
    this.y = 10
    this.width = 20
    this.height = 40
    this.movingSince = 0

    this.moving = false

    this.hitboxX = 0
    this.hitboxY = 20
    this.hitboxWidth = 20
    this.hitboxHeight = 20

    this.speed = 4
  }

  logic() {
    this.moving = false
    this.moveX(this.speed*(!(inputs['ArrowLeft']||inputs['a'])-!(inputs['ArrowRight']||inputs['d'])))
    this.moveY(this.speed*(!(inputs['ArrowUp']||inputs['w'])-!(inputs['ArrowDown']||inputs['s'])))

    if (this.moving == false) {
      this.movingSince = 0
    } else if (this.movingSince == 0) {
      this.movingSince = new Date()
    }
  }

  toData() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      animFrame: this.movingSince != 0 ? Math.round((new Date() - this.movingSince) / 200) + 1 : 0,
    }
  }

  moveX(value) {
    if(value != 0) {
      this.x += value
      if(value>0)while(this.inGridCollision())this.x--
      if(value<0)while(this.inGridCollision())this.x++
    }
  }

  moveY(value) {
    if(value != 0) {
      this.y += value
      if(value>0)while(this.inGridCollision())this.y--
      if(value<0)while(this.inGridCollision())this.y++
    }
  }

  inGridCollision() {
    let hbx = this.x + this.hitboxX
    let hby = this.y + this.hitboxY
    
    let left = Math.floor(hbx/32)
    let top = Math.floor(hby/32)
    let right = Math.ceil((hbx+this.hitboxWidth)/32)
    let down = Math.ceil((hby+this.hitboxHeight)/32)

    return left < 0 || top < 0 || down > 16 || right > 16
  }

}
