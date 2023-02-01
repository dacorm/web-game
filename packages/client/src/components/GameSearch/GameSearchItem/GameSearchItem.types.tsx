import { Props } from '../../../types/global.types';
import { Game } from '../../../redux/types/createGameReducer.types';

export interface GameSearchItemProps extends Props {
  game: Game
}
