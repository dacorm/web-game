import {
    FC, useEffect, useState, useRef,
} from 'react';
import BoxCard from '../../../../../models/Cards/BonusCard/BoxCard/BoxCard';
import { TBoxCardCase } from '../../../../../models/Cards/BonusCard/BoxCard/BoxCard.types';
import ActionContent from '../../ActionContent';
import { BoxActionProps } from './BoxAction.types';

const BoxAction:FC<BoxActionProps> = ({ cell, player }) => {
    const card = cell.card as BoxCard;
    const isRendered = useRef(false); // костыль для StrictMode

    const [boxCase, setBoxCase] = useState<TBoxCardCase | null>(null);

    useEffect(() => {
        if (isRendered.current === false) {
            isRendered.current = true;
            setBoxCase(card.getCase());
        }
    }, []);

    if (!boxCase) {
        return <div />;
    }

    return (
        <ActionContent
            text={boxCase.text}
            acceptInfoBtn={card.getActionInfoBtn(boxCase, player)}
        />
    );
};

export default BoxAction;
