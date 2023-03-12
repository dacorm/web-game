import { FC } from 'react';
import Action from '../Action';
import Cube from '../Cube';
import TitleController from './components';

import styles from './ControllerBoard.module.css';
import { ControllerBoardProps } from './ControllerBoard.types';

const ControllerBoard: FC<ControllerBoardProps> = ({
    actionStarting,
    completeTheMove,
    turnComleted,
}) => (
    <div className={styles.controllerBoard}>
        <div className={styles.inner}>
            {actionStarting ? (
                <Action />
            ) : (
                <>
                    <TitleController />
                    <Cube completeTheMove={completeTheMove} turnComleted={turnComleted} />
                </>
            )}
        </div>
    </div>
);

export default ControllerBoard;
