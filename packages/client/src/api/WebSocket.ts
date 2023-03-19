import {
    Message, StatusesWS, StatusWS,
} from '../redux/types/createGameReducer.types';
import { hostName, serverPort } from '../constants';

type SubscriberforMessages = (msg: Message) => void
type SubscriberforStatusWS = (status: StatusesWS) => void

type Subscribers = SubscriberforMessages | SubscriberforStatusWS

type AllSubscribers= {
  forMessages: Subscribers[];
  forStatus: Subscribers[];
}

const subscribers: AllSubscribers = {
    forMessages: [],
    forStatus: [],
};

let ws: WebSocket| null = null;

const notifySubsAboutNewStatus = (status: StatusesWS) => {
    subscribers.forStatus.forEach((sub) => sub(status as Message & StatusesWS));
};

const messageHandler = (e: MessageEvent) => {
    // раcпарсиваю сообщение с сервера
    const newMessages = JSON.parse(e.data);
    console.log('subscribers', subscribers);
    subscribers.forMessages.forEach((sub) => {
        sub(newMessages);
    });
};

const openHandler = () => {
    notifySubsAboutNewStatus(StatusWS.ready);
};

const errorHandler = () => {
    notifySubsAboutNewStatus(StatusWS.error);
};
const closeHandler = () => {
    console.log('CLOSE WS');
    notifySubsAboutNewStatus(StatusWS.pending);
    // eslint-disable-next-line no-use-before-define
    setTimeout(createChannel, 3000);
};

function cleanup() {
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('error', errorHandler);
}

function createChannel() {
    cleanup();
    ws?.close();
    ws = new WebSocket(`ws://${hostName}:${serverPort}`);
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

export const GameAPI = {
    start() {
        createChannel();
    },
    subscribe(eventName:string, callback: Subscribers) {
        subscribers[eventName as keyof typeof subscribers].push(callback);
        return () => {
            subscribers[eventName as keyof typeof subscribers] = subscribers[eventName as keyof typeof subscribers].filter((sub) => sub !== callback);
        };
    },
    unsubscribe(eventName:string, callback: Subscribers) {
        subscribers[eventName as keyof typeof subscribers] = subscribers[eventName as keyof typeof subscribers].filter((sub) => sub !== callback);
    },

    sendMesseg(mes: Message) {
        ws?.send(mes as unknown as string);
    },
    stop() {
        subscribers.forMessages = [];
        subscribers.forStatus = [];
        cleanup();
        ws?.close();
    },

};
