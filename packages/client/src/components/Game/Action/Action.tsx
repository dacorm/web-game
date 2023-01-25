import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import { getCellFromBoard } from '../helpers/getCellFromBoard';
import { actionStop, turnStop } from '../../../redux/actionCreators/game';
import { Cell } from '../../../models/Cell/Cell';
import { BoardCellType } from '../../../core/types';
import { StatePropertyCard } from '../../../models/Cards/Card/PropertyCard/PropertyCard.types';
import { getCurrentPlayer } from '../../../redux/reducers/gameReducer/gameSelector';
import PropertyFreeAction from './components/PropertyFreeAction';
import PropertyBoughtAction from './components/PropertyBoughtAction';

const Action = () => {
    // ячейка на которой стоит\перешёл игрок
    const [cell, setCell] = useState<Cell | undefined>(undefined);

    const dispatch = useDispatch<Dispatch>();
    const player = useSelector(getCurrentPlayer);

    // завершение экшена карточки
    const handleCompleteAction = useCallback(() => {
        const card = cell?.card;
        if (card) {
            card.complete();
        }
    }, [cell]);

    // временная функция для ячеек у которых не проработан экшен
    const temporaryFunc = () => {
        dispatch(actionStop());
        dispatch(turnStop());
    };

    useEffect(() => {
        setCell(getCellFromBoard());
    }, []);

    // временная проверка пока не всем ячейкам присвоили карточку
    if (!cell || !cell.card) {
        return (
            <Button onClick={temporaryFunc} size={ButtonSize.M} theme={ButtonTheme.GREEN}>
                todo: обработать данный тип карты
            </Button>
        );
    }

    // если ячейка типа недвижки
    if (cell.type === BoardCellType.property) {
        // если недвижка ни кем не куплена
        if (cell.card.stateCard === StatePropertyCard.FREE) {
            return (
                <PropertyFreeAction cell={cell} player={player} handleCompleteAction={handleCompleteAction} />
            );
        }

        // если недвижка кем то куплена
        if (cell.card.stateCard === StatePropertyCard.BOUGHT) {
            return (
                <PropertyBoughtAction cell={cell} player={player} handleCompleteAction={handleCompleteAction} />
            );
        }

        // если недвижка заложена
        if (cell.card.stateCard === StatePropertyCard.MORTAGED) {
            handleCompleteAction();
        }
    }

    return <div />;
};

export default Action;
