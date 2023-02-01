import { actionStop, turnStop } from '../../../redux/actionCreators/game';
import store from '../../../redux/store';
import { ICard, CardProps } from './Card.types';

/** базовый класс карточки, свойства которого
имеет каждая карточка(любой класс карточки должен наследоваться от этого класса) */
export class Card implements ICard {
    name;

    type;

    group;

    constructor({ name, type, group }: CardProps) {
        this.name = name;
        this.type = type;
        this.group = group;
    }

    /** завершить экшен */
    /* eslint-disable-next-line */
    complete() {
        store.dispatch(actionStop());
        store.dispatch(turnStop());
        console.log('экшен карточки завершен');
    }
}
