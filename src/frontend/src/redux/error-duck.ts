import { Action, ActionType } from './actions';
import AppState from './app-state';

export interface ErrorState {
    error?: string;
}

const initialState = {};

export default function reducer(state: ErrorState = initialState,
                                action: Action): ErrorState {
    switch (action.type) {
        case ActionType.ERROR:
            return {
                ...state,
                error: action.data
            };
        default:
            return state;
    }
}

export function selectError(state: AppState) {
    return state.error.error;
}
