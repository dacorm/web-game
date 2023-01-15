import { actionStop, turnStop } from '../../../../redux/actionCreators/game';
import store from '../../../../redux/store';

class Property {
    price: number;

    nameCard:string;

    typeCard: string;

    constructor(price:number, nameCard:string) {
        this.price = price;
        this.nameCard = nameCard;
        this.typeCard = 'property';
    }

    /** Купить недвижимость */
    buy() {
        console.log(`${this.nameCard} куплен`);
        this.complete();
    }

    /** Заложить недвижимость */
    sell() {
        console.log(`${this.nameCard} продан`);
        this.complete();
    }

    // todo: в общий класс карты нужно вынести
    /** завершить экшен */
    /* eslint-disable-next-line */
    complete() {
        store.dispatch(actionStop());
        store.dispatch(turnStop());
        console.log('экшен карточки завершен');
    }
}

export default Property;
