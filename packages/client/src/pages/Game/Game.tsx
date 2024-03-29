import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BoardStage } from '../../core/BoardStage/BoardStage';
import { BoardProvider } from '../../core/BoardStage/BoardProvider';
import style from './Game.module.css';
import { TPlayer } from './Game.types';
import { Col, Grid, Row } from '../../shared/ui/Grid';
import { getId, getUserAvatar, getUserName } from '../../redux/reducers/userReducer/userSelectors';

import defaultAvatar from '../../assets/img/defaultUserAvatar.png';
import { UsersData } from '../../components/Game/UserData/UsersData';
import { setAllActivePlayers } from '../../redux/actionCreators/game';

export default function Game() {
    const location = useLocation();
    const dispatch = useDispatch();

    const userName = useSelector(getUserName);
    const userAvatar = useSelector(getUserAvatar);
    const userId = useSelector(getId);

    // устанавливаем игроков
    useEffect(() => {
        const { countPlayers } = location.state;
        const playersArray = [] as TPlayer[];

        for (let i = 1; i <= countPlayers; i++) { // TODO: глупая функция, но это из за локальной игры
            if (i === 1) {
                const lastUrlSymbolsIsNull = userAvatar?.slice(-4) === 'null';

                const userPlayer = { displayName: userName, avatar: lastUrlSymbolsIsNull ? defaultAvatar : userAvatar, userId };
                playersArray.push(userPlayer);
            } else {
                const objectPlayer = {
                    displayName: `player_${i}`,
                    userId: i,
                    avatar: defaultAvatar,
                };
                playersArray.push(objectPlayer);
            }
        }

        dispatch(setAllActivePlayers(playersArray));
    }, []);

    return (
        <BoardProvider>
            <Grid className={style.grid}>
                <Row className={style.row} middle="xs">
                    <Col xs={3}>
                        <UsersData />
                    </Col>
                    <Col xs={9} className={style.col}>
                        <BoardStage />
                    </Col>
                </Row>
            </Grid>
        </BoardProvider>
    );
}
