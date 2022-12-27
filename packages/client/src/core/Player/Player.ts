import { Canvas } from '../Canvas/helpers/Canvas'
import { Circle } from '../Shapes/Circle'
import { Util } from '../Util'

export interface Player {
  x: number
  y: number
  radius: number
  fill: string
  canvas: Canvas
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
    this.x = width / 2
    this.y = height / 2
    this.radius = 50
    this.fill = Util.randomColor()

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

  move(squares: number) {
    let velocity = { x: 10, y: 0 }
    // параметры элемента который располагается по углам доски
    const cornerItem = Util.getCornerItemSize(this.canvas)

    if (this.x >= this.canvas.width - cornerItem.width / 2) {
      velocity = { x: 0, y: 10 }
    }

    this.draw(velocity)
  }
}
