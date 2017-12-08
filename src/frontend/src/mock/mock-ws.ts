import { Server } from 'mock-socket';
import { Action, ActionType, EventAction } from '../redux/actions';

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createId(): string {
    return getRandomInt(1, 100000).toString();
}

function timeNow(): number {
    return Date.now();
}

function timeMinutesAgo(min: number, max: number): number {
    const date = new Date();
    date.setUTCMinutes(date.getUTCMinutes() - getRandomInt(min, max));
    return date.getTime();
}

function timeHoursAgo(): number {
    const date = new Date();
    date.setUTCHours(date.getUTCHours() - getRandomInt(1, 35));
    return date.getTime();
}

function createEvent(application: string, environment: string, version: string, timestamp: number): EventAction {
    return {
        type: ActionType.EVENT,
        data: {
            id: createId(),
            eventType: 'mock',
            timestamp,
            application,
            environment,
            version,
            description: 'Her er det en liten beskrivelse'
        }
    };
}

function sendEvents(mockServer: any) {
    mockServer.send(JSON.stringify(createEvent('mockapp', 't6', '102.20170201.1224', timeNow())));
    mockServer.send(JSON.stringify(createEvent('mockapp', 'q6', '98.20170128.1043', timeMinutesAgo(30, 50))));
    mockServer.send(JSON.stringify(createEvent('mockapp', 'q0', '98.20170128.1043', timeMinutesAgo(3, 25))));
    mockServer.send(JSON.stringify(createEvent('mockapp', 'p', '97.20170127.1134', timeHoursAgo())));

    mockServer.send(JSON.stringify(createEvent('demoapp', 't6', '202.20170202.1356', timeNow())));
    mockServer.send(JSON.stringify(createEvent('demoapp', 'q6', '202.20170202.1356', timeMinutesAgo(30, 50))));
    mockServer.send(JSON.stringify(createEvent('demoapp', 'q0', '202.20170202.1356', timeMinutesAgo(3, 25))));
    mockServer.send(JSON.stringify(createEvent('demoapp', 'p', '199.20170201.1206', timeHoursAgo())));

    mockServer.send(JSON.stringify({ type: 'EVENTS_PROVIDED', data: null}));
}

export function setupMockWS() {
    const mockServer = new Server('ws://localhost:8800/ws');

    mockServer.on('message', (message: any) => {
        const event: Action = JSON.parse(message);
        switch(event.type) {
            case ActionType.REQUEST_EVENTS:
                sendEvents(mockServer);
                break;
            default:
                // NOOP
        }
    });
}
