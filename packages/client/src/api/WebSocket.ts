import {
    Message, MethodsMessagesType, StatusesWS, StatusWS,
} from '../redux/types/createGameReducer.types';

type SubscriberforMessages = (msg: Message) => void
type SubscriberforStatusWS = (status: StatusesWS) => void

type Subscribers = SubscriberforMessages | SubscriberforStatusWS

type AllSubscribers= {
  forMessages: Subscribers[] | []
  forStatus: Subscribers[] | []
}

const subscribers:AllSubscribers = {
    forMessages: [],
    forStatus: [],
};

let ws: WebSocket| null = null;

const notifySubsAboutNewStatus = (status:StatusesWS) => {
    // @ts-ignore
    subscribers.forStatus.forEach((sub) => sub(status));
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
    console.log('client ooOpen');
    notifySubsAboutNewStatus(StatusWS.ready);
};

const errorHandler = () => {
    console.log('client error');
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
    ws = new WebSocket('ws://localhost:3001');
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
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers.filter((sub) => sub !== callback);
        };
    },
    unsubscribe(eventName:string, callback: Subscribers) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((sub) => sub !== callback);
    },

    sendMesseg(mes: Message) {
        // @ts-ignore
        ws?.send(mes);
    },
    stop() {
        subscribers.forMessages = [];
        subscribers.forStatus = [];
        cleanup();
        ws?.close();
    },

};
