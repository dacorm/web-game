import { useRef, useState, useEffect } from 'react';
import { BoardStage } from '../../core/BoardStage/BoardStage';
import { BoardProvider } from '../../core/BoardStage/BoardProvider';
import { Grid, Row, Col } from '../../shared/ui/Grid';
import style from './Game.module.css';
import { TPlayer } from './Game.types';

export default function Game() {
    const [players, setPlayers] = useState<TPlayer[] | null>(null);

    const playersFetch = useRef<TPlayer[]>([ // типа ответ с бэка
        { displayName: 'Player_1', userId: 1 },
        { displayName: 'Player_2', userId: 2 },
    ]);

    // устанавливаем игроков
    useEffect(() => {
        setPlayers(playersFetch.current);
    }, []);

    return (
        <BoardProvider>
            <Grid className={style.grid}>
                <Row className={style.row} middle="xs">
                    <Col xs={3}>
                        Users data
                    </Col>
                    <Col xs={9} className={style.col}>
                        <BoardStage players={players} />
                    </Col>
                </Row>
            </Grid>
        </BoardProvider>
    );
}
