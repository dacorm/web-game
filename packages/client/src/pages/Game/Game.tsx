import { BoardStage } from '../../core/BoardStage/BoardStage';
import { BoardProvider } from '../../core/BoardStage/BoardProvider';

export default function Game() {
    return (
        <BoardProvider>
            <BoardStage />
        </BoardProvider>
    );
}
