import { BoardStage } from '../../core/BoardStage/BoardStage';
import { BoardProvider } from '../../core/BoardStage/BoardProvider';
import { Grid, Row, Col } from '../../shared/ui/Grid';
import style from './Game.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UsersData } from '../../components/Game/UsersData/UsersData';

export default function Game() {
    const players = useTypedSelector((state) => state.game.players);

    return (
        <BoardProvider>
            <Grid className={style.grid}>
                <Row className={style.row} middle="xs">
                    <Col xs={3}>
                        <UsersData />
                    </Col>
                    <Col xs={9} className={style.col}>
                        <BoardStage players={players} />
                    </Col>
                </Row>
            </Grid>
        </BoardProvider>
    );
}
