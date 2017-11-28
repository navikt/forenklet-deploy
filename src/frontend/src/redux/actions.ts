import AppEvent from '../app-event/app-event';

export enum ActionType {
    REQUEST_EVENTS,
    EVENT,
    EVENTS_PROVIDED
}

export interface RequestEventsAction {
    type: ActionType.REQUEST_EVENTS
}

export interface EventAction {
    type: ActionType.EVENT;
    data: AppEvent
}

export interface EventsProvidedAction {
    type: ActionType.EVENTS_PROVIDED
}

export type Action =
    RequestEventsAction
    | EventAction
    | EventsProvidedAction
    ;