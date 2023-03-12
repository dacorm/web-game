import { FC, useCallback, useEffect } from 'react';
import { board } from '../../../../../models/Board/Board';
import JailCard from '../../../../../models/Cards/JailCard';
import ActionContent from '../../ActionContent';
import { PrisonActionProps } from './PrisonAction.types';

export const PrisonAction: FC<PrisonActionProps> = ({ cell, player }) => {
    const cellPrison = board.getCell(10);
    const cardPrison = cellPrison?.card as JailCard;

    const handleTryToEscape = useCallback(() => {
        cardPrison.tryToEscape(player);
    }, [cardPrison]);
    const handleBuyFreedom = useCallback(() => {
        JailCard.buyFreedom(player);
    }, [cardPrison]);

    useEffect(() => {
        if (cell === cellPrison) {
            cardPrison.sendPlayerToJail(player);
        }
    }, []);

    return (
        <ActionContent
            text="Вы находитесь в тюрьме"
            acceptInfoBtn={{
                text: 'Попытаться сбежать',
                onClick: handleTryToEscape,
            }}
            cancelInfoBtn={{
                text: 'Заплатить 50 $',
                onClick: handleBuyFreedom,
            }}
        />
    );
};
