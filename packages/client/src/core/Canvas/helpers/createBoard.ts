import { Rect } from '../../Shapes/Rect'
import { Canvas } from './Canvas'
import { boardSize, Util } from '../../Util'

const colors = new Array(100).fill(0).map(() => Util.randomColor())

export function createBoard(canvas: Canvas) {
  const context = canvas.getContext()
  const size = Util.getCornerItemSize(canvas)

  new Rect({ ...size, x: 0, y: 0 }).drawShape(context)
  new Rect({ ...size, x: 0 }).drawShape(context)
  new Rect({ ...size, y: 0 }).drawShape(context)
  new Rect({ ...size }).drawShape(context)

  // Делаем сетку, просто для примера
  for (let i = 0; i < 2; i++) {
    const top = i % 2 === 1

    for (let j = boardSize; j--; ) {
      new Rect({
        ...Util.getHorizontalItemSize(canvas),
        x: size.width + ((canvas.width - size.width * 2) / boardSize) * j,
        y: top ? 0 : canvas.height - size.height,
        fill: colors[j],
      }).drawShape(context)
    }
  }
  for (let i = 0; i < 2; i++) {
    const left = i % 2 === 1

    for (let j = boardSize; j--; ) {
      new Rect({
        ...Util.getVerticalItemSize(canvas),
        x: left ? 0 : canvas.width - size.width,
        y: size.height + ((canvas.height - size.height * 2) / boardSize) * j,
        fill: colors[j],
      }).drawShape(context)
    }
  }
}
