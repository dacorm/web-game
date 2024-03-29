import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import type { ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';
import { Sequelize } from 'sequelize-typescript';
import expressWs = require('express-ws')
import { getSequelizeOptions } from './config/db.config';
import { dbConnect } from './postgres';
import { forumModel } from './models/forum';

import { ForumServices } from './services/forumServices';
import forumRouter from './routes/forumRoute';
import userRouter from './routes/userRoute';
import themeRouter from './routes/themeRoute';
import { webSocket } from './webSocket/WS';
import { messageModel } from './models/message';
import { MessageService } from './services/messageService';
import { userModel } from './models/user';
import { themeModel } from './models/theme';
import { UserService } from './services/userService';
import { ThemeService } from './services/themeService';
import { InitialForumsData, InitialMessagesData, InitialUsersData } from './models/InitialData';
import {
    defaultHostName, defaultPgDb, defaultPgOutPort, defaultPgPwd, defaultPgUser, defaultPort,
} from './config/constants';
// import { InitialUsersData } from './models/InitialData';

dotenv.config();

// import { association } from './models/association'

const app = express();

// ------------------Postgress------------------
// Создаем инстанс Sequelize

const host = process.env.HOST_NAME || defaultHostName;
const pgOutPort = Number(process.env.POSTGRES_OUT_PORT) || defaultPgOutPort;
const pgUser = process.env.POSTGRES_USER || defaultPgUser;
const pgPwd = process.env.POSTGRES_PASSWORD || defaultPgPwd;
const pgDb = process.env.DB_NAME || defaultPgDb;

const sqOptions = getSequelizeOptions(host, pgOutPort, pgUser, pgPwd, pgDb);

export const sequelize = new Sequelize(sqOptions);

// Инициализируем модели
export const Forum = sequelize.define('forum', forumModel, {});
export const Message = sequelize.define('forum-mes', messageModel, {});
export const User = sequelize.define('user_game', userModel, {
    indexes: [
        {
            unique: true,
            fields: ['login'],
        },
    ],
});
export const Theme = sequelize.define('theme', themeModel, {
    indexes: [
        {
            unique: true,
            fields: ['ownerId'],
        },
    ],
});

User.hasOne(Theme, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'ownerId',
        allowNull: false,
    },
});
Theme.belongsTo(User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'ownerId',
        allowNull: false,
    },
});

// Инициализируем Сервисы
export const forumServise = new ForumServices(Forum);
export const messageServise = new MessageService(Message);
export const userService = new UserService(User);
export const themeService = new ThemeService(Theme);

dbConnect().then(() => {
    InitialUsersData();
    InitialForumsData();
    InitialMessagesData();
});
//
// инициализация связей в моделях
// association()

// ------------------WebSocket------------------

const WSserver = expressWs(app);
export const aWss = WSserver.getWss();
// @ts-ignore
app.ws('/', webSocket);

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));
const port = Number(process.env.SERVER_PORT) || defaultPort;

// -------------ServiceWorkers------------------
app.get('/ServiceWorkers.js', (req, res) => {
    console.log(req);
    res.sendFile(path.resolve(__dirname, '../client/dist/ServiceWorkers.js'));
});

// -------------SSR------------------

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
    const app = express();
    app.use(cors());

    let vite: ViteDevServer;

    // чтобы это работало нужно создать ссылку на папку client с помощью yarn link
    // и потом server в node_modules добавить ссылку на эту папку
    // но чтобы проблем не было возни в разработке пока закоменчу

    // const distPath = path.resolve(__dirname, 'node_modules/client/dist/index.html')
    // const distPath = path.resolve(__dirname, 'node_modules/client/dist/');
    // const srcPath = path.resolve(__dirname, 'node_modules/client');
    // const ssrClientPath = path.resolve(__dirname, 'node_modules/client/ssr-dist/client.cjs');

    console.log('__dirname:', __dirname);
    // const distPath = path.resolve(__dirname, '../client/dist/');
    // console.log('distPath:', distPath);
    // const srcPath = path.resolve(__dirname, '../client');
    // console.log('srcPath:', srcPath);
    // const ssrClientPath = path.resolve(__dirname, '../client/ssr-dist/client.cjs');
    // console.log('ssrClientPath:', ssrClientPath);

    let distPath: string;
    let srcPath: string;
    let ssrClientPath: string;
    if (isDev()) {
        distPath = path.resolve(__dirname, '../client/dist/');
        srcPath = path.resolve(__dirname, '../client');
        ssrClientPath = path.resolve(__dirname, '../client/ssr-dist/client.cjs');
    } else {
        distPath = path.resolve(__dirname, './client/dist/');
        srcPath = path.resolve(__dirname, './client');
        ssrClientPath = path.resolve(__dirname, './client/ssr-dist/client.cjs');
    }
    console.log('distPath:', distPath);
    console.log('srcPath:', srcPath);
    console.log('ssrClientPath:', ssrClientPath);

    if (isDev()) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });

        app.use(vite.middlewares);
    }

    app.use(express.json());
    // ____________Postgres-------------------------
    app.use('/api', forumRouter);
    app.use('/api', themeRouter);
    app.use('/api', userRouter);

    console.log('process.env.NODE_ENV', process.env.NODE_ENV);

    if (!isDev()) {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    }

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;

        try {
            let template: string;
            let configureStore: (
        preloadedState: Record<string, unknown> | undefined
      ) => any;

            if (!isDev()) {
                template = fs.readFileSync(
                    path.resolve(distPath, 'index.html'),
                    'utf-8',
                );
            } else {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');

                template = await vite.transformIndexHtml(url, template);
            }

            let render: (req: string) => Promise<string>;

            if (!isDev()) {
                render = (await import(ssrClientPath)).render;
                configureStore = (await import(ssrClientPath)).configureStore;
            } else {
                render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
                    .render;
                configureStore = (
                    await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
                ).configureStore;
            }

            const store = configureStore(undefined);
            const state = store.getState();

            const appHtml = await render(req.originalUrl);

            const stateHtml = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
                state,
            ).replace(/</g, '\\u003c')}</script>`;

            const html = template.replace('<!--ssr-outlet-->', appHtml + stateHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            if (isDev()) {
                vite.ssrFixStacktrace(e as Error);
            }
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();

// -------------END SSR------------------

export enum MethodsMessages {
  addGame = 'addGame',
  addAllGames = 'addAllGames',
  connection = 'connection',
  addUser = 'addUser',
}

export type MethodsMessagesType =
  | MethodsMessages.addGame
  | MethodsMessages.addAllGames
  | MethodsMessages.connection
