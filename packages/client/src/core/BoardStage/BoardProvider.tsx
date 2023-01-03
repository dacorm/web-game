import React, {
    useContext, useState, FC, useMemo,
} from 'react';
import { OnlyChildren } from '../../types/global.types';

// Временно, пока не появится стор
type BoardType = {
  random?: [number, number]
  setRandom?: (random: [number, number]) => void
}
const BoardContext = React.createContext<BoardType>({});
export const useBoard = () => useContext(BoardContext) as Required<BoardType>;

export const BoardProvider: FC<OnlyChildren> = ({ children }) => {
    const [random, setRandom] = useState<[number, number]>([0, 0]);
    const value = useMemo(() => ({ random, setRandom }), [random]);

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
};
