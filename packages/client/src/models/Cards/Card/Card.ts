import { ICard, CardProps } from './Card.types';

// todo: пока что не используется, можно заюзать в CellType в boardStageData.ts
export class Card implements ICard {
    name: string;

    id: number;

    constructor({ name, id }: CardProps) {
        this.name = name;
        this.id = id;
    }
}
