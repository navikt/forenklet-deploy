import { Server } from 'mock-socket';
import { ActionType, EventAction } from '../redux/actions';

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createId(): string {
    return getRandomInt(1, 100000).toString();
}

function createEvent(application: string, environment: string, version: string): EventAction {
    return {
        type: ActionType.EVENT,
        data: {
            id: createId(),
            eventType: 'mock',
            timestamp: Date.now(),
            application,
            environment,
            version,
            description: 'Her er det en liten beskrivelse'
        }
    };
}

export function setupMockWS() {
    const mockServer = new Server('ws://localhost:8800/ws');

    mockServer.on('connection', (server: {}) => {
        mockServer.send(JSON.stringify(createEvent('mockapp', 't6', '102.20170201.1224')));
        mockServer.send(JSON.stringify(createEvent('mockapp', 'q6', '98.20170128.1043')));
        mockServer.send(JSON.stringify(createEvent('mockapp', 'p', '98.20170128.1043')));

        mockServer.send(JSON.stringify(createEvent('demoapp', 't6', '202.20170202.1356')));
        mockServer.send(JSON.stringify(createEvent('demoapp', 'q6', '202.20170202.1356')));
        mockServer.send(JSON.stringify(createEvent('demoapp', 'p', '202.20170202.1356')));

        mockServer.send(JSON.stringify({ type: 'EVENTS_PROVIDED', data: null}));
    });
}
