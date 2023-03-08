import React, { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Util } from '../../../core/Util';
import Button from '../../../shared/ui/Button';
import { useBoard } from '../../../core/BoardStage/BoardProvider';
import { ButtonMode, ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import { rollTheDiceFalse, startCellMoving } from '../../../redux/actionCreators/game';
import { getCanRollTheDice } from '../../../redux/reducers/gameReducer/gameSelector';

import styles from './Cube.module.css';

export interface CubeProps {
    turnComleted: boolean
    completeTheMove: () => void
}

const Cube:FC<CubeProps> = ({ turnComleted, completeTheMove }) => {
    const { random, setRandom } = useBoard();
    const dispatch = useDispatch<Dispatch>();

    const canRollTheDice = useSelector(getCanRollTheDice);

    const handleClick = useCallback(() => {
        setRandom([Util.randomNumber(), Util.randomNumber()]);
        dispatch(startCellMoving());
        dispatch(rollTheDiceFalse());
    }, []);

    return (
        <div className={styles.cube}>
            <div className={styles.top}>
                <pre>
                    {random}
                    {' '}
                    =
                    {random.reduce((a, i) => a + i, 0)}
                </pre>
            </div>
            <div className={styles.bottom}>
                {canRollTheDice && (
                    <Button
                        theme={ButtonTheme.GREEN}
                        size={ButtonSize.M}
                        mode={ButtonMode.FULL_SIZE}
                        onClick={handleClick}
                        className={styles.button}
                    >
                        Кинуть кубики
                    </Button>
                )}
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
            </div>
        </div>
    );
};

export default memo(Cube);
