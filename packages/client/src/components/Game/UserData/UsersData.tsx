import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { board } from '../../../models/Board/Board';
import { Player } from '../../../models/Player/Player';
import {
    actionStop, addNewGameChatMessage, deleteActivePlayer, rollTheDiceTrue, setAllPlayers, setCurrentPlayer, turnStart, turnStop,
} from '../../../redux/actionCreators/game';
import { getAllPlayers, getCurrentPlayer } from '../../../redux/reducers/gameReducer/gameSelector';
import store from '../../../redux/store';
import { User } from './components/User/User';
import styles from './UsersData.module.css';

export const UsersData = () => {
    const players = useTypedSelector(getAllPlayers);

    const currentPlayer = useTypedSelector(getCurrentPlayer);
    const dispatch = useDispatch();

    const handleDeleteActivePlayer = useCallback((idPlayer: number) => {
        const leavePlayer = board.getPlayerById(idPlayer);

        leavePlayer?.property?.map((card) => card.resetCard());
        leavePlayer?.stations?.map((card) => card.resetCard());

        dispatch(deleteActivePlayer(idPlayer));
        dispatch(actionStop());
        dispatch(turnStop());

        dispatch(rollTheDiceTrue());
        dispatch(turnStart());
        setTimeout(() => {
            dispatch(setAllPlayers());
            dispatch(setCurrentPlayer());
        }, 0);
        dispatch(
            addNewGameChatMessage({
                playerName: currentPlayer.displayName,
                message: 'объявляется банкротом',
            }),
        );

        const player = store.getState().game.currentPlayer;
        if (player.canBuyHouse === false) {
            player.setCanBuyHouse(true);
        }
    }, []);
    if (!players.length || !currentPlayer) return <div />;
    return (
        <div className={styles.usersData}>
            {players.map((player: Player) => (
                <User
                    key={player.userId}
                    player={player}
                    currentPlayer={currentPlayer}
                    handleDeleteActivePlayer={handleDeleteActivePlayer}
                />
            ))}
        </div>
    );
};
