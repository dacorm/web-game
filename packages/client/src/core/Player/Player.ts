import { Canvas } from '../Canvas/helpers/Canvas'
import { Circle } from '../Shapes/Circle'
import { Util } from '../Util'

export interface Player {
  x: number
  y: number
  radius: number
  fill: string
  canvas: Canvas
  trails: { x: number; y: number }[]
  trailCount: number
  init(): void
  draw(): void
  move(squares: number): void
}

export class Player {
  // todo: канвас везде надо забирать из стора
  constructor(canvas: Canvas) {
    this.canvas = canvas
  }

  init() {
    const { width, height } = Util.getCornerItemSize(this.canvas)
    this.x = Number((width / 2).toFixed())
    this.y = Number((height / 2).toFixed())
    this.radius = 50
    this.fill = Util.randomColor()
    this.trails = []
    this.trailCount = 10

    this.draw()
  }

  draw(velocity = { x: 0, y: 0 }) {
    this.x += velocity.x
    this.y += velocity.y

    const circle = new Circle({
      x: this.x,
      y: this.y,
      radius: this.radius,
      fill: this.fill,
    })
    circle.drawShape(this.canvas.getContext())
  }

  move() {
    this.trails.push({ x: this.x, y: this.y })
    if (this.trails.length > this.trailCount) {
      this.trails.shift()
    }

    const velocity = { x: 0, y: 0 }
    // параметры элемента который располагается по углам доски
    const cornerItem = Util.getCornerItemSize(this.canvas)
    const width = this.canvas.getWidth()
    const height = this.canvas.getHeight()

    // todo: условие жуткое, переписать!
    if (
      this.y <= cornerItem.height / 2 &&
      this.y >= 0 &&
      this.x <= width - cornerItem.width / 2
    ) {
      velocity.x = 10
    } else if (
      this.x >= width - cornerItem.width &&
      this.x <= width &&
      this.y <= height - cornerItem.height / 2
    ) {
      velocity.y = 10
    } else if (
      this.y >= height - cornerItem.height &&
      this.y <= height &&
      this.x >= cornerItem.width / 2
    ) {
      velocity.x = -10
    } else if (
      this.x <= cornerItem.width &&
      this.x >= 0 &&
      this.y >= cornerItem.height / 2
    ) {
      velocity.y = -10
    }

    this.draw(velocity)
    this.drawTrails()

    return { x: this.x, y: this.y }
  }

  drawTrails() {
    const context = this.canvas.getContext()
    this.trails.push({ x: this.x, y: this.y })
    if (this.trails.length > this.trailCount) {
      this.trails.shift()
    }
    this.trails.forEach((position, i) => {
      const ratio = (i + 1) / this.trails.length
      context.fillStyle = Util.hexToRGB(this.fill, ratio / 2)
      context.moveTo(position.x, position.y)
      context.beginPath()
      context.arc(position.x, position.y, this.radius, 0, 2 * Math.PI)
      context.fill()
    })
  }
}
