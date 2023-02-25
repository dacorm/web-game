import {
    FC, useEffect, useState, useRef,
} from 'react';
import ChanceCard from '../../../../../models/Cards/BonusCard/ChanceCard';
import { TChanceCardCase } from '../../../../../models/Cards/BonusCard/ChanceCard/ChanceCard.types';
import ActionContent from '../../ActionContent';
import { ChanceActionProps } from './ChanceAction.types';

const ChanceAction:FC<ChanceActionProps> = ({ cell, player }) => {
    const card = cell.card as ChanceCard;
    const isRendered = useRef(false); // костыль для StrictMode

    const [chanceCase, setСhanceCase] = useState<TChanceCardCase | null>(null);

    useEffect(() => {
        if (isRendered.current === false) {
            isRendered.current = true;
            setСhanceCase(card.getCase());
        }
    }, []);

    if (!chanceCase) {
        return <div />;
    }

    return (
        <ActionContent
            text={chanceCase.text}
            acceptInfoBtn={card.getActionInfoBtn(chanceCase, player)}
        />
    );
};

export default ChanceAction;
