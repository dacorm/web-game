import React, {
    FC, useCallback, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import CountPlayersList from '../CountPlayersList';

import styles from './CreateGameForm.module.css';
import Input from '../../../shared/ui/Input';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Game, UserGame } from '../../../models/Game/Game';

const CreateGameForm: FC = ({ socket }) => {
    const dispatch = useDispatch();
    const [nameGame, setNameGame] = useState('');
    const countPlayersAll = useRef<number[]>([2, 3, 4, 5]);
    const [countPlayers, setCountPlayers] = useState<number | null>(null);
    const user = useTypedSelector((state) => state.user);

    const handleClickCounters = useCallback((e: React.MouseEvent) => {
        setCountPlayers(Number(e.currentTarget?.textContent));
    }, []);
    const navigate = useNavigate();

    const changeHandler = (e:React.MouseEvent) => {
        const { value } = e.target as HTMLInputElement;
        setNameGame(value);
    };

    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault();
        console.log('Paramametres:', nameGame, countPlayers);
        console.log('user', user);
        const userGame: UserGame = {
            userName: user.userName,
            avatar: user.avatar,
            id: user.id,
        };
        if (countPlayers) {
            // @ts-ignore
            const game = new Game({
                id: Math.floor(Math.random() * Date.now()),
                countPlayers,
                userCreater: userGame,
                name: nameGame,
            });
            console.log('GAME', game);
            socket.send(JSON.stringify({
                method: 'addGame',
                game: {
                    id: Math.floor(Math.random() * Date.now()),
                    countPlayers,
                    userCreater: userGame,
                    name: nameGame,
                },
            }));
            // dispatch(createGame(game));
        }
    };

    return (
        <form className={styles.form}>
            <div className={styles.formInner}>
                <input type="number" value={countPlayers || 0} hidden readOnly />
                <div>
                    <Input type="text" label="Название игры" onChange={changeHandler} value={nameGame} />
                </div>
                <div className={styles.item}>
                    <div className={styles.itemName}>Количество игроков:</div>
                    <div className={styles.itemInput}>
                        <CountPlayersList countPlayersAll={countPlayersAll.current} click={handleClickCounters} countPlayers={countPlayers} />
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button
                        theme={ButtonTheme.GREEN}
                        size={ButtonSize.X}
                        onClick={handleClick}
                        className={styles.button}
                    >
                        Создать игру
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CreateGameForm;
