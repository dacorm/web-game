import React, { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Button from '../../../shared/ui/Button';
import { ButtonMode, ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import {
    rollTheDiceFalse,
    startCellMoving,
    rollTheDice,
} from '../../../redux/actionCreators/game';
import { getCanRollTheDice, getRollTheDice } from '../../../redux/reducers/gameReducer/gameSelector';

import styles from './Cube.module.css';

export interface CubeProps {
    turnComleted: boolean
    completeTheMove: () => void
}

const Cube:FC<CubeProps> = ({ turnComleted, completeTheMove }) => {
    const dispatch = useDispatch<Dispatch>();

    const canRollTheDice = useSelector(getCanRollTheDice);
    const random = useSelector(getRollTheDice);

    const handleClick = useCallback(() => {
        dispatch(rollTheDice());
        dispatch(startCellMoving());
        dispatch(rollTheDiceFalse());
    }, []);

    return (
        <div className={styles.cube}>
            <div className={styles.top}>
                {random && (
                    <pre className={styles.cubeValue}>
                        {random}
                        {' '}
                        =
                        {random.reduce((a, i) => a + i, 0)}
                    </pre>
                )}
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
