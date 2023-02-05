import React, {
    FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import CreateGameForm from '../../components/GameSearch/CreateGameForm';
import GameSearchBlock from '../../components/GameSearch/GameSearchBlock';
import MenuHeader from '../../components/MenuHeader';
import Modal from '../../shared/ui/Modal';
import './GameSearch.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import {
    sendMessage,
    startAddGameListening,
    stopAddGameListening,
} from '../../redux/actionCreators/createGame';

const GameSearch: FC = () => {
    const dispatch = useDispatch();
    const [createGameModal, setCreateGameModal] = useState(false);
    const user = useTypedSelector((state) => state.user);
    const wsStatus = useTypedSelector((state) => state.games.statusWS);
    console.log('wsStatus', wsStatus);
    const openCreateGameModal = useCallback(() => {
        setCreateGameModal(true);
    }, []);

    const closeCreateGameModal = useCallback(() => {
        setCreateGameModal(false);
    }, []);

    useEffect(() => {
        if (user.id !== null) {
            // @ts-ignore
            dispatch(startAddGameListening());
        }

        // при уходе от компоненты нужно убрать всех подписчиков
        return () => {
            // @ts-ignore
            dispatch(stopAddGameListening());
        };
    }, [user]);

    const GetAllGamesHandler = (e:React.MouseEvent) => {
        e.preventDefault();
        if (wsStatus === 'ready') {
            // @ts-ignore
            dispatch(sendMessage(JSON.stringify({
                method: 'addAllGames',
            })));
        }
    };

    return (
        <div className="search-game">

            <MenuHeader
                text={(wsStatus === 'ready') ? 'Ожидают игру' : 'Подключение к серверу...'}
                buttonText="Создать игру"
                onClick={openCreateGameModal}
            />

            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={GetAllGamesHandler}>   Получить все игры с сервера</button>
            <GameSearchBlock />
            <Modal
                title="Создание игры"
                isShow={createGameModal}
                onClose={closeCreateGameModal}

            >
                <CreateGameForm network={(wsStatus === 'ready')} />
            </Modal>
        </div>
    );
};

export default GameSearch;
