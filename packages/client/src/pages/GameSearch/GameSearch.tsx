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
import { setWs } from '../../redux/actionCreators/websocket';

import { Game } from '../../models/Game/Game';
import { createGame } from '../../redux/actionCreators/createGame';

const GameSearch: FC = () => {
    const dispatch = useDispatch();
    const [createGameModal, setCreateGameModal] = useState(false);
    const openCreateGameModal = useCallback(() => {
        setCreateGameModal(true);
    }, []);
    const user = useTypedSelector((state) => state.user);
    const socketRedux = useTypedSelector((state) => state.webSocket.ws);
    const closeCreateGameModal = useCallback(() => {
        setCreateGameModal(false);
    }, []);

    useEffect(() => {
        console.log('UseEffect');
        console.log('user', user);
        const socket = new WebSocket('ws://localhost:3001');
        dispatch(setWs(socket));
        if (user.id !== null) {
            if (socket) {
                console.log('socket!!!!!', socket);
                socket.onopen = () => {
                    console.log('client ooOpen');
                    socket.send(JSON.stringify({
                        method: 'connection',
                        message: `Пользователь ${user.userName} подключился!!!!!`,
                        id: user.id,
                        username: user.userName,
                    }));
                };
                socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    switch (message.method) {
                    case 'connection': {
                        console.log('user connect', message);
                        break;
                    }
                    case 'addGame': {
                        console.log('GAME', message.game);
                        // @ts-ignore
                        const game = new Game({
                            id: message.game.id,
                            countPlayers: message.game.countPlayers,
                            userCreater: message.game.userCreater,
                            name: message.game.name,
                        });
                        console.log('GAME', game);
                        dispatch(createGame(game));
                        break;
                    }
                    default: break;
                    }
                };
            }
        }
    }, [user]);

    const sendHandler = (e:React.MouseEvent) => {
        e.preventDefault();
        socketRedux.send(JSON.stringify({
            method: 'add',
            message: 'dfghdfgh',
        }));
    };

    return (
        <div className="search-game">
            <MenuHeader
                text="Ожидают игры"
                buttonText="Создать игру"
                onClick={openCreateGameModal}
            />
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={sendHandler}>   Send</button>
            <GameSearchBlock />
            <Modal
                title="Создание игры"
                isShow={createGameModal}
                onClose={closeCreateGameModal}
            >
                <CreateGameForm socket={socketRedux} />
            </Modal>
        </div>
    );
};

export default GameSearch;
