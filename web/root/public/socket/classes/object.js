class GameObject {
  constructor(x, y, width, height) {
    objects.push(this)

    this.x = x || Math.floor(Math.random()*100)
    this.y = y || Math.floor(Math.random()*100)
    this.width = width || Math.floor(Math.random()*100)
    this.height = height || Math.floor(Math.random()*100)
  }

  static draw_(ctx, obj = this, canvas, camera) {
    ctx.fillRect(obj.x + canvas.width/2 - camera.x, obj.y + canvas.height/2 - camera.y, obj.width, obj.height)
  }
}
