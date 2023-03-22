import {
    FC, useCallback,
} from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ModalCard.module.css';
import PropertyCard from '../../../models/Cards/PropertyCard';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
    getCellForModalCard,
    getCurrentPlayer,
    getStageModalCard,
} from '../../../redux/reducers/gameReducer/gameSelector';
import { closeModalCard } from '../../../redux/actionCreators/game';
import { BoardCellType } from '../../../core/types';
import { PropertyModalContent } from './components/PropertyModalContent/PropertyModalContent';
import { StationModalContent } from './components/StationModalContent/StationModalContent';

export const ModalCard: FC<{}> = () => {
    const dispatch = useDispatch();
    const isShow = useTypedSelector(getStageModalCard);
    const cell = useSelector(getCellForModalCard);
    const card = cell?.card as PropertyCard;
    const player = useSelector(getCurrentPlayer);

    const closeModal = useCallback(() => {
        dispatch(closeModalCard());
    }, []);

    const stopPropagation = useCallback((e: React.MouseEvent): void => {
        e.stopPropagation();
    }, []);

    if (!card) {
        return <div />;
    }
    return (
        <div
            className={cn(styles.modal, {
                [styles.modalShow]: isShow,
            })}
            onClick={closeModal}
        >
            <div className={styles.modalContent} onClick={stopPropagation}>
                <div className={styles.title}>
                    <div className={styles.titleClose} onClick={closeModal}>
                        &#10006;
                    </div>
                </div>
                <div className={styles.formWrapper}>
                    {cell?.type === BoardCellType.property && (
                        <PropertyModalContent
                            cell={cell}
                            player={player}
                            closeModal={closeModal}
                        />
                    )}
                    {cell?.type === BoardCellType.station && (
                        <StationModalContent
                            cell={cell}
                            player={player}
                            closeModal={closeModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
