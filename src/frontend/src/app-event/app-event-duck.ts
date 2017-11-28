import { ActionType, Action, RequestEventsAction } from '../redux/actions';
import AppEvent from './app-event';

export interface AppEventState {
    data: AppEvent[];
    eventsLoaded: boolean;
    statusLoaded: boolean;
}

const initialState = {
    data: [],
    eventsLoaded: false,
    statusLoaded: false
};

export default function reducer(state: AppEventState = initialState,
                                action: Action): AppEventState {
    const stateData = state.data;
    switch (action.type) {
        case ActionType.EVENT:
            const actionData = action.data;
            return {
                ...state,
                data: [...stateData, actionData]
            };
        case ActionType.EVENTS_PROVIDED:
            return {
                ...state,
                eventsLoaded: true
            };
        case ActionType.STATUS_PROVIDED:
            return {
                ...state,
                statusLoaded: true
            };
        default:
            return state;
    }
}

export function requestEvents(): RequestEventsAction {
    return {
        type: ActionType.REQUEST_EVENTS
    };
}