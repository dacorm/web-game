import type { Request, Response } from 'express';
import { themeService } from '../index';

export class ThemeController {
    // eslint-disable-next-line class-methods-use-this
    async getAll(_req: Request, res: Response) {
        try {
            console.log('Пришел запрос');
            const data = await themeService.findAll();
            res.send(data);
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getOne(req: Request, res: Response) {
        try {
            console.log('Пришел запрос');
            const { themeId } = req.query;
            const data = await themeService.findOne(Number(themeId));
            res.send(data);
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getCountThemes(_req: Request, res: Response) {
        try {
            const data = await themeService.getCountThemes();
            res.json({ count: data });
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async create(req: Request, res: Response) {
        try {
            const { theme, ownerId } = req.body;
            await themeService.createTheme(theme, ownerId);
            res.status(200).json({ message: 'OK' });
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

export const themeController = new ThemeController();
