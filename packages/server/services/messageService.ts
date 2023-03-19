import type { Message } from '../index';
import { sequelize } from '../index';

export class MessageService {
    message: typeof Message;

    constructor(model: typeof Message) {
        // console.log('model', model);
        this.message = model;
    }

    async findAll(themeId: number) {
        return this.message.findAll({ where: { themeId } });
    }

    async findOne(text: string, authorId: number) {
        return this.message.findOne({
            where: {
                text, authorId,
            },
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getMesWithUserInfo(themeId: number) {
        const [results] = await sequelize.query(
            `SELECT * FROM public."forum-mes" as mes
                 Inner JOIN public."user_games" as u ON u.id = mes."authorId"
                  WHERE mes."themeId" = ${themeId}`,
        );
        return results;
    }

    async create(themeId: number, text: string, authorId: number) {
        await this.message.create({ themeId, text, authorId });
    }
}
