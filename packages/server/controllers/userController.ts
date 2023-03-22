import type { Request, Response } from 'express';
import { themeService, userService } from '../index';

export class UserController {
    // eslint-disable-next-line class-methods-use-this
    async getAll(_req: Request, res: Response) {
        try {
            // console.log('Пришел запрос');
            const data = await userService.findAll();
            res.send(data);
        } catch (e) {
            res.status(500).json({ message: `Ошибка сервера ${e}` });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getOne(req: Request, res: Response) {
        try {
            // console.log('Пришел запрос');
            const { id } = req.query;
            const data = await userService.findOne(Number(id));
            res.send(data);
        } catch (e) {
            res.status(500).json({ message: `Ошибка сервера ${e}` });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async create(req: Request, res: Response) {
        try {
            // console.log(req.body);
            const {
                id, first_name, second_name, display_name, login, avatar, email, phone,
            } = req.body;
            // console.log(first_name, second_name, display_name, login, avatar, email);
            const user = await userService.findByLogin(login);
            // console.log('user', user);

            if (user === null) {
                await userService.createUser(id, first_name, second_name, display_name, login, avatar, email, phone);
                res.status(200).json({ message: 'OK' });
            } else {
                res.status(500).json({ message: 'такой пользователь уже существует' });
            }
        } catch (e) {
            res.status(500).json({ message: `Ошибка сервера ${e}` });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async createCssTheme(req: Request, res: Response) {
        try {
            // console.log(req.body);
            const {
                themeName, login,
            } = req.body;
            if (!login) {
                res.status(500).json({ message: `Для смены темы не передан логин ${login}` });
            }
            const user = await userService.findByLogin(login);
            if (user !== null) {
                const themeRec = await themeService.findOneByOwnerId(user.id);
                if (themeRec !== null) {
                    await themeService.updateOne(themeName, themeRec.id);
                    console.log(`theme updated for ${themeName}`);
                    res.status(200).json({ message: 'OK' });
                } else {
                    await themeService.createTheme(themeName, user.id);
                    console.log(`theme created for ${themeName}`);
                    res.status(200).json({ message: 'OK' });
                }
            } else {
                res.status(500).json({ message: `Для смены темы отсутствует пользователь с таким логином ${login}` });
            }
        } catch (e) {
            res.status(500).json({ message: `Ошибка сервера ${e}` });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getCssTheme(req: Request, res: Response) {
        try {
            // console.log(req.body);
            const {
                login,
            } = req.body;
            if (!login) {
                res.status(500).json({ message: `Для получения темы не передан логин ${login}` });
            }
            const user = await userService.findByLogin(login);
            if (user !== null) {
                const themeRec = await themeService.findOneByOwnerId(user.id);
                // @ts-ignore
                const themeVal = themeRec?.theme;
                console.log('getCssTheme themeVal:', themeVal);
                res.status(200).json({ theme: themeVal });
            } else {
                res.status(500).json({ message: `Для получения темы отсутствует пользователь с таким логином ${login}` });
            }
        } catch
        (e) {
            res.status(500).json({ message: `Ошибка сервера ${e}` });
        }
    }
}

export const
    userController = new UserController();
