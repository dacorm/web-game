import { ICard, CardProps } from './Card.types';

export class Card implements ICard {
    name: string;

    id: number;

    constructor({ name, id }: CardProps) {
        this.name = name;
        this.id = id;
    }
}
