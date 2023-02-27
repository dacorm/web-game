import type { Request, Response } from 'express';
import { messageServise } from '../index';

class MessageController {
    // eslint-disable-next-line class-methods-use-this
    async getAll(req: Request, res: Response) {
        try {
            console.log('Пришел запрос');
            const { themeId } = req.query;
            const data = await messageServise.findAll(Number(themeId));
            res.send(data);
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async create(req: Request, res: Response) {
        console.log(req.body);
        try {
            const { themeId, text, authorId } = req.body;
            await messageServise.create(themeId, text, authorId);
            res.status(200).json({ message: 'OK' });
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

export const messageController = new MessageController();
