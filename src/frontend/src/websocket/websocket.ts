import { Middleware } from 'redux';
import { ActionType, Action } from '../redux/actions';
import { Dispatch } from '../types';

const LOCAL_WEBSOCKET_PORT = 8800;

export enum WebsocketState {
    CLOSED,
    OPENING,
    OPEN
}

let websocketState: WebsocketState = WebsocketState.CLOSED;
let websocket: WebSocket;
let actionQueue: Action[] = [];

function send(action: Action) {
    websocket.send(JSON.stringify({
        ...action,
        type: ActionType[action.type]
    }));
}

function onOpen() {
    websocketState = WebsocketState.OPEN;
    actionQueue.forEach((a) => send(a));
    actionQueue = [];
}

function onClose() {
    websocketState = WebsocketState.CLOSED;
}

function onMessage(dispatch: Dispatch) {
    return (messageEvent: MessageEvent) => {
        const rawData = messageEvent.data;
        const data = JSON.parse(rawData);
        const type = data.type;
        const actionType = ActionType[type];
        if (!actionType) {
            /* tslint:disable-next-line */
            console && console.error && console.error('unknown action: ' + type);
            return;
        }
        const action = {
            ...data,
            type: actionType
        };

        setTimeout(() => {
            dispatch(action);
        });
    };
}

function websocketDispatch(action: Action, dispatch: Dispatch) {
    if (!(window as any).WebSocket) {
        return;
    }

    switch (websocketState) {
        case WebsocketState.CLOSED:
            actionQueue.push(action);
            const location = window.location;
            const hostname = location.hostname;
            const port = hostname === 'localhost' ? LOCAL_WEBSOCKET_PORT : location.port;
            websocket = new WebSocket(`ws://${hostname}:${port}/ws`);
            websocket.onopen = onOpen;
            websocket.onclose = onClose;
            websocket.onmessage = onMessage(dispatch);
            websocketState = WebsocketState.OPENING;
            break;
        case WebsocketState.OPENING:
            actionQueue.push(action);
            break;
        case WebsocketState.OPEN:
            send(action);
            break;
        default:
            throw new Error('unknown state');
    }
}

const websocketMiddleware: Middleware = (store) => (next) => <A extends Action>(action: A) => {
    const dispatch = store.dispatch;
    switch (action.type) {
        case ActionType.REQUEST_EVENTS:
        case ActionType.REQUEST_STATUS:
            websocketDispatch(action, dispatch);
            break;
        default:
            // noop
    }
    return next(action);
};

export default websocketMiddleware;
