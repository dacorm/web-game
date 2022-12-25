import React, { useContext, useState, FC } from 'react'
import { OnlyChildren } from '../../types/global.types'

// Временно, пока не появится стор
type BoardType = {
  random?: [number, number]
  setRandom?: (random: [number, number]) => void
}
const BoardContext = React.createContext<BoardType>({})
export const useBoard = () => useContext(BoardContext) as Required<BoardType>

export const BoardProvider: FC<OnlyChildren> = ({ children }) => {
  const [random, setRandom] = useState<[number, number]>([0, 0])

  return (
    <BoardContext.Provider value={{ random, setRandom }}>
      {children}
    </BoardContext.Provider>
  )
}
