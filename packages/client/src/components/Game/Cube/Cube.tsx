import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Util } from '../../../core/Util';
import Button from '../../../shared/ui/Button';
import { useBoard } from '../../../core/BoardStage/BoardProvider';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import { rollTheDiceFalse, setRandoms, startCellMoving } from '../../../redux/actionCreators/game';
import { getCanRollTheDice } from '../../../redux/reducers/gameReducer/gameSelector';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const Cube = () => {
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
        <>
            <pre>
                {randomsfromStore[0]}
                {' '}
                {randomsfromStore[1]}
                {' '}
                =
                {randomsfromStore.reduce((a, i) => a + i, 0)}
            </pre>
            {canRollTheDice && <Button theme={ButtonTheme.GREEN} size={ButtonSize.M} onClick={handleClick}>Кинуть кубики</Button>}
        </>
    );
};

export default memo(Cube);
