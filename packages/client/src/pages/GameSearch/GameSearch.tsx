import { FC } from 'react';
import GameSearchBlock from '../../components/GameSearch/GameSearchBlock';
import MenuHeader from '../../components/MenuHeader';
import './GameSearch.css';

const GameSearch: FC = () => (
    <div className="search-game">
        <MenuHeader text="Ожидают игры" buttonText="Создать игру" />
        <GameSearchBlock />
    </div>
);

export default GameSearch;
