import AppEvent from '../app-event/app-event';
import Status from '../status/status';
import Tag from '../dev/tag';

export enum ActionType {
    ERROR = 'ERROR',

    REQUEST_EVENTS = 'REQUEST_EVENTS',
    EVENT = 'EVENT',
    EVENTS_PROVIDED = 'EVENTS_PROVIDED',

    REQUEST_STATUS = 'REQUEST_STATUS',
    STATUS = 'STATUS',
    COMMIT = 'COMMIT',
    TAG = 'TAG',
    STATUS_PROVIDED = 'STATUS_PROVIDED',
}

export interface RequestEventsAction {
    type: ActionType.REQUEST_EVENTS;
}

export interface EventAction {
    type: ActionType.EVENT;
    data: AppEvent;
}

export interface EventsProvidedAction {
    type: ActionType.EVENTS_PROVIDED;
}

export interface RequestStatusAction {
    type: ActionType.REQUEST_STATUS;
}

export interface StatusAction {
    type: ActionType.STATUS;
    data: AppEvent;
}

export interface StatusProvidedAction {
    type: ActionType.STATUS_PROVIDED;
}

export interface TagAction {
    type: ActionType.TAG;
    data: Status<Tag>;
}

export interface ErrorAction {
    type: ActionType.ERROR;
    data: string;
}

export type Action =
    RequestEventsAction
    | EventAction
    | EventsProvidedAction
    | RequestStatusAction
    | StatusAction
    | StatusProvidedAction
    | TagAction
    | ErrorAction
    ;
