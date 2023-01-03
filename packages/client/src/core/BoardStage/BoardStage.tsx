import React, {
    FC, useEffect, useMemo, useRef,
} from 'react';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { staticCanvas } from '../Canvas/staticCanvas';
import { activeCanvas } from '../Canvas/activeCanvas';
import Cube from '../../components/Cube';
import styles from './BoardStage.module.scss';
import { useBoard } from './BoardProvider';

export const BoardStage: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const rect = useResizeObserver(ref);
    const { random } = useBoard();

    const containerSizes = useMemo(
        () => ({ width: rect?.width || 0, height: rect?.height || 0 }),
        [rect],
    );
    const staticLayer = staticCanvas(containerSizes);
    const activeLayer = activeCanvas({
        ...containerSizes,
        squares: random.reduce((a, i) => a + i, 0),
    });

    useEffect(() => {
        ref.current?.prepend(staticLayer.canvas, activeLayer.canvas);
    }, []);

    return (
        <div className={styles.wrapper} ref={ref}>
            <div className={styles.wrapper}>
                <Cube />
            </div>
        </div>
    );
};
