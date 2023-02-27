import type { Request } from 'express';
import { broadcastConnection, connectionHandler, getIdsofGamesfromState } from './utils';
import { aWss, MethodsMessages } from '../index';

let games: any[];
// @ts-ignore
export const webSocket = (ws, req: Request) => {
    console.log(req);
    ws.send(JSON.stringify({
        method: 'connection',
        message: 'success!!',
    }));
    ws.on('message', (msg: string) => {
        const message = JSON.parse(msg);
        // console.log("getted mes from client", msg)
        console.log('getted mes from client', message);
        switch (message.method) {
        case MethodsMessages.connection: {
            connectionHandler(aWss, ws, msg);
            break;
        }
        case MethodsMessages.addGame: {
            broadcastConnection(aWss, ws, msg);
            games = [...games, ...message.games];
            console.log('games on the server', games);
            break;
        }
        case MethodsMessages.addAllGames: {
            if (games.length > 0) {
                ws.send(JSON.stringify({
                    method: 'addAllGames',
                    games,
                }));
            }

            break;
        }
        case MethodsMessages.addUser: {
            let idsGames: number[] | [] = [];
            idsGames = getIdsofGamesfromState(games);
            if (idsGames.includes(Number(message.gameId))) {
                games.forEach((game) => {
                    if (game.id === Number(message.gameId)) {
                        game.players.push(message.user);
                    }
                });
            }
            broadcastConnection(aWss, ws, msg);
            break;
        }
        default:
            break;
        }
    });
};
