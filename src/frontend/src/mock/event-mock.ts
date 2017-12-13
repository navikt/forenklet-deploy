import { ActionType, EventAction } from '../redux/actions';
import { getRandomInt } from './mock-utils';

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

export const mockEvents = [
    createEvent('mockapp', 't6', '102.20170201.1224', timeNow()),
    createEvent('mockapp', 'q6', '98.20170128.1043', timeMinutesAgo(30, 50)),
    createEvent('mockapp', 'q0', '98.20170128.1043', timeMinutesAgo(3, 25)),
    createEvent('mockapp', 'p', '97.20170127.1134', timeHoursAgo()),

    createEvent('demoapp', 't6', '202.20170202.1356', timeNow()),
    createEvent('demoapp', 'q6', '202.20170202.1356', timeMinutesAgo(30, 50)),
    createEvent('demoapp', 'q0', '202.20170202.1356', timeMinutesAgo(3, 25)),
    createEvent('demoapp', 'p', '199.20170201.1206', timeHoursAgo()),

    { type: 'EVENTS_PROVIDED', data: null}
];
