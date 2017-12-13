import { Server } from 'mock-socket';
import { Action, ActionType } from '../redux/actions';
import { mockEvents } from './event-mock';
import { commitToEvent, getMockCommitsForApp } from './commit-for-release-mock';

export function setupMockWS() {
    const mockServer = new Server('ws://localhost:8800/ws');

    mockServer.on('message', (message: any) => {
        const event: Action = JSON.parse(message);
        switch(event.type) {
            case ActionType.REQUEST_EVENTS:
                mockEvents.forEach((mockEvent) => mockServer.send(JSON.stringify(mockEvent)));
                break;
            case ActionType.REQUEST_COMMITS:
                getMockCommitsForApp(event.data.application)
                    .map(commitToEvent)
                    .forEach((mockCommit) => mockServer.send(JSON.stringify(mockCommit)));
                setTimeout(() => mockServer.send(JSON.stringify({type: ActionType.COMMITS_PROVIDED})), 700);
                break;
            default:
                // NOOP
        }
    });
}
