import { BoardStage } from '../../core/BoardStage/BoardStage';
import { BoardProvider } from '../../core/BoardStage/BoardProvider';
import { Grid, Row, Col } from '../../shared/ui/Grid';
import style from './Game.module.css';

export default function Game() {
    return (
        <BoardProvider>
            <Grid className={style.grid}>
                <Row className={style.row} middle="xs">
                    <Col xs={3}>
                        Users data
                    </Col>
                    <Col xs={9} className={style.col}>
                        <BoardStage />
                    </Col>
                </Row>
            </Grid>
        </BoardProvider>
    );
}
