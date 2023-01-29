import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { getCellFromBoard } from '../helpers/getCellFromBoard';
import { actionStop, addNewGameChatMessage, turnStop } from '../../../redux/actionCreators/game';
import { Cell } from '../../../models/Cell/Cell';
import { BoardCellType } from '../../../core/types';

import { getCurrentPlayer } from '../../../redux/reducers/gameReducer/gameSelector';
import PropertyFreeAction from './components/Property/PropertyFreeAction';
import PropertyBoughtAction from './components/Property/PropertyBoughtAction';
import { StateCard } from '../../../models/Cards/Card/Card.types';
import StationBoughtAction from './components/Station/StationBoughtAction';
import StationFreeAction from './components/Station/StationFreeAction';

const Action = () => {
    // ячейка на которой стоит\перешёл игрок
    const [cell, setCell] = useState<Cell | undefined>(undefined);

    const dispatch = useDispatch<Dispatch>();
    const player = useSelector(getCurrentPlayer);

    const ACTION_TEXT = {
        StationFree: 'Вы попали на жд станцию, желаете купить?',
        StationBought: `Вам необходимо заплатить ренту игроку ${cell?.card?.owner?.displayName}`,
        PropertyBought: `Вам необходимо заплатить ренту игроку ${cell?.card?.owner?.displayName}`,
        PropertyFree: `Вы попали на ${cell?.card?.name}. Желаете приобрести?`,
    };

    // завершение экшена карточки
    const handleCompleteAction = useCallback(() => {
        const { card } = cell as Cell;
        if (card) {
            card.complete();
        }
    }, [cell]);

    const handleBuy = useCallback(() => {
        const { card } = cell as Cell;
        if (card) {
            card.buy(player);
        }
    }, [cell]);
    const handleRefuseToBuy = useCallback(() => {
        const { card } = cell as Cell;
        if (card) {
            card.refuseToBuy();
        }
    }, [cell]);

    const handleRentPayment = useCallback(() => {
        const { card } = cell as Cell;
        if (card) {
            card.rentPayment(player);
        }
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
        // если недвижка ни кем не куплена
        if (cell.card.stateCard === StateCard.FREE) {
            return (
                <PropertyFreeAction
                    cell={cell}
                    text={ACTION_TEXT.PropertyFree}
                    handleBuy={handleBuy}
                    handleRefuseToBuy={handleRefuseToBuy}
                />
            );
        }

        // если недвижка кем то куплена
        if (cell.card.stateCard === StateCard.BOUGHT) {
            return (
                <PropertyBoughtAction
                    cell={cell}
                    player={player}
                    text={ACTION_TEXT.PropertyBought}
                    handleRentPayment={handleRentPayment}
                    handleCompleteAction={handleCompleteAction}
                />
            );
        }
    }
    // если ячейка типа станции
    if (cell.type === BoardCellType.station) {
        // если станция свободна
        if (cell.card.stateCard === StateCard.FREE) {
            return (
                <StationFreeAction
                    cell={cell}
                    text={ACTION_TEXT.StationFree}
                    handleBuy={handleBuy}
                    handleRefuseToBuy={handleRefuseToBuy}
                />
            );
        }
        // если станция куплена
        if (cell.card.stateCard === StateCard.BOUGHT) {
            return (
                <StationBoughtAction
                    cell={cell}
                    player={player}
                    text={ACTION_TEXT.StationBought}
                    handleCompleteAction={handleCompleteAction}
                    handleRentPayment={handleRentPayment}
                />
            );
        }
    }

    return <div />;
};

export default Action;
