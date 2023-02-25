import React, { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Util } from '../../../core/Util';
import Button from '../../../shared/ui/Button';
import { ButtonMode, ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import { rollTheDiceFalse, setRandoms, startCellMoving } from '../../../redux/actionCreators/game';
import { getCanRollTheDice } from '../../../redux/reducers/gameReducer/gameSelector';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import styles from './Cube.module.css';

export interface CubeProps {
    turnComleted: boolean
    completeTheMove: () => void
    isGameStarting: boolean
    startGameHandle:()=> void
}

const Cube :FC<CubeProps> = ({
    turnComleted, completeTheMove, isGameStarting, startGameHandle,
}) => {
    // const { random, setRandom } = useBoard();
    const dispatch = useDispatch<Dispatch>();
    const randomsfromStore = useTypedSelector((state) => state.game.random);
    const canRollTheDice = useSelector(getCanRollTheDice);

    const handleClick = useCallback(() => {
        const randoms = [Util.randomNumber(), Util.randomNumber()];
        // setRandom(randoms);
        dispatch(setRandoms(randoms));
        dispatch(startCellMoving());
        dispatch(rollTheDiceFalse());
    }, []);

    return (
        <div className={styles.cube}>
            <div className={styles.top}>
                <pre>
                    {randomsfromStore[0]}
                    {' '}
                    {randomsfromStore[1]}
                    {' '}
                    =
                    {randomsfromStore.reduce((a:number, i:number) => a + i, 0)}
                </pre>
            </div>
            {canRollTheDice && <Button theme={ButtonTheme.GREEN} size={ButtonSize.M} onClick={handleClick} className={styles.button}>Кинуть кубики</Button>}
            {turnComleted && (
                <Button
                    size={ButtonSize.M}
                    theme={ButtonTheme.RED}
                    mode={ButtonMode.FULL_SIZE}
                    onClick={completeTheMove}
                    className={styles.button}
                >
                    Завершить ход

                </Button>
            )}
            {!isGameStarting && (
                <Button
                    size={ButtonSize.M}
                    theme={ButtonTheme.GREEN}
                    onClick={startGameHandle}
                >
                    Старт игры

                </Button>
            )}
        </div>
    );
};

export default memo(Cube);
