import React, {
    ChangeEventHandler,
    FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import CountPlayersList from '../CountPlayersList';

import styles from './CreateGameForm.module.css';
import Input from '../../../shared/ui/Input';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { sendMessage } from '../../../redux/actionCreators/createGame';
import { GameTypes } from '../../../redux/types/gameReducer.types';
import {
    cleanGameData, setGameId, setGameType, setPlayers,
} from '../../../redux/actionCreators/game';
import { CreateGameProps } from './CreateGameForm.types';

const CreateGameForm: FC<CreateGameProps> = ({ network }:CreateGameProps) => {
    const dispatch = useDispatch();
    const [nameGame, setNameGame] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const navigate = useNavigate();
    const countPlayersAll = useRef<number[]>([2, 3, 4, 5]);
    const [countPlayers, setCountPlayers] = useState<number | null>(null);
    const user = useTypedSelector((state) => state.user);

    const handleClickCounters = useCallback((e: React.MouseEvent) => {
        setCountPlayers(Number(e.currentTarget?.textContent));
    }, []);

    const changeHandler:ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target as HTMLInputElement;
        setNameGame(value);
    };

    const selectChangeHandle:ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSelectValue(e.target.value);
    };

    useEffect(() => {
        if (selectValue === GameTypes.LOCAL) {
            setNameGame('Локальная игра');
        }
        if (selectValue === GameTypes.NETWORK) {
            setNameGame('');
        }
    }, [selectValue]);

    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault();
        const gameID = Math.floor(Math.random() * Date.now());
        const userGame = {
            displayName: user.userName,
            avatar: user.avatar,
            userId: user.id,
        };
        if (countPlayers) {
            // @ts-ignore
            if (selectValue === GameTypes.NETWORK) {
                const gameString = JSON.stringify({
                    method: 'addGame',
                    games: [{
                        id: gameID,
                        countPlayers,
                        userCreater: userGame,
                        name: nameGame,
                        players: [userGame],
                    }],
                });

                // @ts-ignore
                dispatch(sendMessage(gameString));
            }
            if (selectValue === GameTypes.LOCAL) {
                const players = [];
                for (let i = 0; i < countPlayers; i++) {
                    if (i === 0) {
                        players[i] = userGame;
                    } else {
                        players[i] = { displayName: `Player_${i}`, userId: i + 1 };
                    }
                }
                dispatch(cleanGameData());
                dispatch(setGameType(GameTypes.LOCAL));
                dispatch(setGameId(gameID));
                dispatch(setPlayers(players));
                navigate(`/game/${gameID}`);
            }
        }
    };

    return (
        <form className={styles.form}>

            <div className={styles.formInner}>
                <div className={styles.selectTypeGame}>
                    <label>
                        Выберите тип игры:
                        <select value={selectValue} onChange={selectChangeHandle}>
                            <option value=""> </option>
                            {network && <option value={GameTypes.NETWORK}>{GameTypes.NETWORK}</option>}
                            <option value={GameTypes.LOCAL}>{GameTypes.LOCAL}</option>
                        </select>
                    </label>
                </div>
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
