export class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  rotate (theta) {
    let nx = this.x
    let ny = this.y
    this.x = Math.cos(theta) * nx - Math.sign(theta) * ny
    this.y = Math.sin(theta) * nx + Math.cos(theta) * ny
    return this
  }
  mult (f) {
    this.x *= f
    this.y *= f
    return this
  }
  clones () {
    return new Vector(this.x, this.y)
  }
  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  subtract (v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }
  set (x, y) {
    this.x = x
    this.y = y
    return this
  }
}
export class Petal {
  constructor (stretchA, stretchB, startAngle, angle, growFactor, bloom) {
    this.startAngle = startAngle
    this.stretchA = stretchA
    this.stretchB = stretchB
    this.angle = angle
    this.growFactor = growFactor
    this.bloom = bloom
    this.r = 1
    this.isFinished = false
  }
  draw () {
    let ctx = this.bloom.garden.ctx
    let v1, v2, v3, v4
    v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle))
    v2 = new Vector(v1.x, v1.y).rotate(Garden.degrad(this.angle))
    v3 = new Vector(v1.x, v1.y).mult(this.stretchA)
    v4 = new Vector(v2.x, v2.y).mult(this.stretchB)
    ctx.strokeStyle = this.bloom.c
    ctx.beginPath()
    ctx.moveTo(v1.x, v1.y)
    ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y)
    ctx.stroke()
  }
  render () {
    if (this.r <= this.bloom.r) {
      this.r += this.growFactor
      this.draw()
    } else {
      this.isFinished = true
    }
  }
}
export class Bloom {
  constructor (p, r, c, pc, garden) {
    this.p = p
    this.r = r
    this.c = c
    this.pc = pc
    this.petals = []
    this.garden = garden
    this.init()
    this.garden.addBloom(this)
  }
  draw () {
    let p
    let isFinished = true
    this.garden.ctx.save()
    this.garden.ctx.translate(this.p.x, this.p.y)
    for (let i = 0; i < this.petals.length; i++) {
      p = this.petals[i]
      p.render()
      isFinished *= p.isFinished
    }
    this.garden.ctx.restore()
    if (isFinished === true) {
      this.garden.removeBloom(this)
    }
  }
  init () {
    let angle = 360 / this.pc
    let startAngle = Garden.randomInt(0, 90)
    for (let i = 0; i < this.pc; i++) {
      this.petals.push(
        new Petal(
          Garden.random(
            Garden.Options.petalStretch.min,
            Garden.Options.petalStretch.max
          ),
          Garden.random(
            Garden.Options.petalStretch.min,
            Garden.Options.petalStretch.max
          ),
          startAngle + i * angle,
          angle,
          Garden.random(
            Garden.Options.growFactor.min,
            Garden.Options.growFactor.max
          ),
          this
        )
      )
    }
  }
}
export class Garden {
  constructor (ctx, element) {
    this.blooms = []
    this.element = element
    this.ctx = ctx
  }
  render () {
    for (let i = 0; i < this.blooms.length; i++) {
      this.blooms[i].draw()
    }
  }
  addBloom (b) {
    this.blooms.push(b)
  }
  removeBloom (b) {
    let bloom
    for (let i = 0; i < this.blooms.length; i++) {
      bloom = this.blooms[i]
      if (bloom === b) {
        this.blooms.splice(i, 1)
        return this
      }
    }
  }
  createRandomBloom (x, y) {
    return this.createBloom(x, y,
      Garden.randomInt(
        Garden.Options.bloomRadius.min,
        Garden.Options.bloomRadius.max
      ),
      Garden.randomRgba(
        Garden.Options.color.rmin,
        Garden.Options.color.rmax,
        Garden.Options.color.gmin,
        Garden.Options.color.gmax,
        Garden.Options.color.bmin,
        Garden.Options.color.bmax,
        Garden.Options.color.opacity
      ),
      Garden.randomInt(
        Garden.Options.petalCount.min,
        Garden.Options.petalCount.max
      )
    )
  }
  createBloom (x, y, r, c, pc) {
    return new Bloom(new Vector(x, y), r, c, pc, this)
  }
  clear () {
    this.blooms = []
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
  }

  static random (min, max) {
    return Math.random() * (max - min) + min
  }
  static randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static degrad (angle) {
    return Garden.circle / 360 * angle
  }
  static raddeg (angle) {
    return angle / Garden.circle * 360
  }
  static rgba (r, g, b, a) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
  }
  static Options = {
    petalCount: {
      min: 8,
      max: 15
    },
    petalStretch: {
      min: 0.1,
      max: 3
    },
    growFactor: {
      min: 0.1,
      max: 1
    },
    bloomRadius: {
      min: 8,
      max: 10
    },
    density: 10,
    growSpeed: 1000 / 60,
    color: {
      rmin: 128,
      rmax: 255,
      gmin: 0,
      gmax: 128,
      bmin: 0,
      bmax: 128,
      opacity: 0.1
    },
    tanAngle: 60
  };
  static circle = 2 * Math.PI;
  static randomRgba (rmin, rmax, gmin, gmax, bmin, bmax, a) {
    let r = Math.round(Garden.random(rmin, rmax))
    let g = Math.round(Garden.random(gmin, gmax))
    let b = Math.round(Garden.random(bmin, bmax))
    let limit = 5
    if (
      Math.abs(r - g) <= limit &&
      Math.abs(g - b) <= limit &&
      Math.abs(b - r) <= limit
    ) {
      return Garden.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a)
    } else {
      return Garden.rgba(r, g, b, a)
    }
  }
}
