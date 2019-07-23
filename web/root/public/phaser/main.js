var game
var logo

function main(event) {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  })
  window.addEventListener('resize', windowResize)
  windowResize()
}

function preload() {
  this.load.image('sky', 'assets/skies/space3.png')
  this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  this.load.image('red', 'assets/particles/red.png')
}

function create() {
  this.add.image(400, 300, 'sky')

  var particles = this.add.particles('red')

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD',
  })

  logo = this.add.sprite(400, 100, 'logo')
  logo.setCrop(10, 10, 200, 200)

  emitter.startFollow(logo)

  console.log(logo)
}

function update() {
  logo.toggleFlipX()
}

function windowResize(event) {
  var canvas = document.getElementsByTagName('canvas')[0]
  let windowScale = window.innerHeight / window.innerWidth
  let canvasScale = canvas.height / canvas.width

  if (windowScale < canvasScale) {
    canvas.style.width = 'auto'
    canvas.style.height = window.innerHeight + 'px'
  } else {
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = 'auto'
  }

  console.log(window)
}
