import React, {
    FC, useCallback, useState,
} from 'react';
import CreateGameForm from '../../components/GameSearch/CreateGameForm';
import GameSearchBlock from '../../components/GameSearch/GameSearchBlock';
import MenuHeader from '../../components/MenuHeader';
import Modal from '../../shared/ui/Modal';
import './GameSearch.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';

// import {
//     sendMessage,
//     startAddGameListening,
//     stopAddGameListening,
// } from '../../redux/actionCreators/createGame';
// import { Dispatcher } from '../../redux/store';

const GameSearch: FC = () => {
    // const dispatch = useDispatch<Dispatcher>();
    // const user = useTypedSelector((state) => state.user);
    const [createGameModal, setCreateGameModal] = useState(false);
    const wsStatus = useTypedSelector((state) => state.games.statusWS);
    const openCreateGameModal = useCallback(() => {
        setCreateGameModal(true);
    }, []);

    const closeCreateGameModal = useCallback(() => {
        setCreateGameModal(false);
    }, []);

    // Подключение веб-сокетов - пока закомментил
    // useEffect(() => {
    //     if (user.id !== null) {
    //         dispatch(startAddGameListening());
    //     }
    //
    //     // при уходе от компоненты нужно убрать всех подписчиков
    //     return () => {
    //         dispatch(stopAddGameListening());
    //     };
    // }, [user]);

    // получение игр с сервера - пока отключенно
    const GetAllGamesHandler = (e:React.MouseEvent) => {
        e.preventDefault();
        // if (wsStatus === 'ready') {
        //     // @ts-ignore
        //     dispatch(sendMessage(JSON.stringify({
        //         method: 'addAllGames',
        //     })));
        // }
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
