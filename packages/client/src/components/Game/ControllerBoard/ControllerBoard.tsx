import { FC } from 'react';
import Action from '../Action';
import Cube from '../Cube';

import styles from './ControllerBoard.module.css';
import { ControllerBoardProps } from './ControllerBoard.types';

const ControllerBoard:FC<ControllerBoardProps> = ({
    actionStarting, completeTheMove, turnComleted, isGameStarting, startGameHandle,
}) => (
    <div className={styles.controllerBoard}>
        <div className={styles.inner}>
            {actionStarting
                ? <Action />
                : (
                    <Cube
                        completeTheMove={completeTheMove}
                        turnComleted={turnComleted}
                        isGameStarting={isGameStarting}
                        startGameHandle={startGameHandle}
                    />
                )}
        </div>
    </div>
);

export default ControllerBoard;
