import { Canvas } from '../../core/Canvas/helpers/Canvas';

export interface PlayerProps {
    canvas: Canvas
    userId: number
    displayName: string
  color: string
  currentPos: number
}
