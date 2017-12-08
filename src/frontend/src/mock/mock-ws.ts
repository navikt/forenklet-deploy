import { Server } from 'mock-socket';
import { Action, ActionType } from '../redux/actions';
import { mockEvents } from './event-mock';

export function setupMockWS() {
    const mockServer = new Server('ws://localhost:8800/ws');

    mockServer.on('message', (message: any) => {
        const event: Action = JSON.parse(message);
        switch(event.type) {
            case ActionType.REQUEST_EVENTS:
                mockEvents.forEach((mockEvent) => mockServer.send(JSON.stringify(mockEvent)));
                break;
            default:
                // NOOP
        }
    });
}
