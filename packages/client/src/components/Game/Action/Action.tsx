import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { getCellFromBoard } from '../helpers/getCellFromBoard';
import { actionStop, addNewGameChatMessage, turnStop } from '../../../redux/actionCreators/game';
import { Cell } from '../../../models/Cell/Cell';
import { BoardCellType } from '../../../core/types';

import { getCurrentPlayer } from '../../../redux/reducers/gameReducer/gameSelector';
import { StateCard } from '../../../models/Cards/Card/Card.types';
import PropertyAction from './components/Property/PropertyAction';
import StationAction from './components/Station/StationAction';

const Action = () => {
    // ячейка на которой стоит\перешёл игрок
    const [cell, setCell] = useState<Cell | undefined>(undefined);

    const dispatch = useDispatch<Dispatch>();
    const player = useSelector(getCurrentPlayer);

    // завершение экшена карточки
    const handleCompleteAction = useCallback(() => {
        cell?.card.complete();
    }, [cell]);

    const handleBuy = useCallback(() => {
        cell?.card.buy(player);
    }, [cell]);
    const handleRefuseToBuy = useCallback(() => {
        cell?.card.refuseToBuy();
    }, [cell]);

    const handleRentPayment = useCallback(() => {
        cell?.card.rentPayment(player);
    }, [cell]);

    // если у карточки нету экшена - сразу завершаем его
    const skipAction = () => {
        dispatch(actionStop());
        dispatch(turnStop());
    };

    useEffect(() => {
        if (cell) {
            dispatch(addNewGameChatMessage(
                {
                    playerName: player.displayName,
                    message: `попадает на поле "${cell?.name}"`,
                },
            ));

            if (!cell.card) {
                skipAction();
            }
        }
    }, [cell]);

    useEffect(() => {
        setCell(getCellFromBoard());
    }, []);

    if (!cell || !cell.card) {
        return (
            <div>загрузка...</div>
        );
    }
    // если недвижка\станция заложена
    if (cell.card.stateCard === StateCard.MORTAGED) {
        handleCompleteAction();
    }

    // если ячейка типа недвижки
    if (cell.type === BoardCellType.property) {
        return (
            <PropertyAction
                cell={cell}
                player={player}
                handleBuy={handleBuy}
                handleCompleteAction={handleCompleteAction}
                handleRefuseToBuy={handleRefuseToBuy}
                handleRentPayment={handleRentPayment}
            />
        );
    }

    // если ячейка типа станции
    if (cell.type === BoardCellType.station) {
        return (
            <StationAction
                cell={cell}
                player={player}
                handleBuy={handleBuy}
                handleCompleteAction={handleCompleteAction}
                handleRefuseToBuy={handleRefuseToBuy}
                handleRentPayment={handleRentPayment}
            />
        );
    }

    return <div />;
};

export default Action;
