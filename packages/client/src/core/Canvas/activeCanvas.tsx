import { useEffect, useRef } from 'react'
import { Canvas } from './helpers/Canvas'
import { Player } from '../Player/Player'

type Props = { width: number; height: number; squares?: number }

// Активный канвас. На нем будет рисоваться вся графика при взаимодействии с пользователем
export const activeCanvas = ({ width, height, squares }: Props) => {
  // todo: добавить объект в стор
  const ref = useRef<Canvas>(new Canvas({ width, height }))
  const frame = useRef<number>(0)
  const player = useRef<Player>(new Player(ref.current))

  const context = ref.current.getContext()

  const stop = () => cancelAnimationFrame(frame.current)
  const animate = () => {
    frame.current = requestAnimationFrame(animate)
    context.clearRect(0, 0, ref.current.width, ref.current.height)
    const playerCoords = player.current.move()
  }

  useEffect(() => {
    ref.current.setSize(width, height)
    player.current.init()
  }, [width, height])

  useEffect(() => {
    if (squares) {
      animate()
    }
    return stop
  }, [squares])

  return ref.current
}
