import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import { getCellFromBoard } from '../helpers/getCellFromBoard';
import defaultAvatar from '../../../assets/img/defaultUserAvatar.png';
import styles from './Action.module.css';
import { actionStop, turnStop } from '../../../redux/actionCreators/game';
import { Cell } from '../../../models/Cell/Cell';

const Action = () => {
    // ячейка на которой стоит\перешёл игрок
    const [cell, setCell] = useState<Cell | undefined>(undefined);

    const dispatch = useDispatch<Dispatch>();

    const handleBuy = useCallback(() => {
        const card = cell?.card;
        if (card) {
            card.buy();
        }
    }, [cell]);
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

    if (!cell || !cell.card) {
        return (
            <Button onClick={temporaryFunc} size={ButtonSize.M} theme={ButtonTheme.GREEN}>
                todo: обработать данный тип карты
            </Button>
        );
    }

    switch (cell?.card.typeCard) {
    case 'property': {
        return (
            <div className={styles.actionProperty}>
                <div className={styles.actionInner}>
                    <div className={styles.card}>
                        <img src={defaultAvatar} className={styles.img} alt="avatar" />
                        <div className={styles.info}>
                            <div className={styles.name}>{cell.card.nameCard}</div>
                            <div className={styles.price}>
                                {cell.card.price}
                                {' '}
                                руб
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            className={styles.buttonBuy}
                            theme={ButtonTheme.GREEN}
                            size={ButtonSize.M}
                            onClick={handleBuy}
                        >
                            Купить

                        </Button>
                        <Button
                            className={styles.buttonSell}
                            theme={ButtonTheme.RED}
                            size={ButtonSize.M}
                            onClick={handleCompleteAction}
                        >
                            Отмена

                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    default: {
        return <div />;
    }
    }
};

export default Action;
