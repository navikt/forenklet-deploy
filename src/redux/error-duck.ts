import { AppState } from './reducer';
import { AsyncDispatch } from './redux-utils';

export interface ErrorState {
    errors: string[];
}

const initialState: ErrorState = {
    errors: []
};

export enum errorActionNames {
    DISPLAY_ERROR = 'error/DISPLAY',
    HIDE_ERROR = 'error/HIDE'
}

export interface DisplayErrorAction {
    type: errorActionNames.DISPLAY_ERROR;
    error: string;
}

export interface HideErrorAction {
    type: errorActionNames.HIDE_ERROR;
}

export type ErrorAction =
    | DisplayErrorAction
    | HideErrorAction;

export default function reducer(state: ErrorState = initialState, action: ErrorAction): ErrorState {
    switch (action.type) {
        case errorActionNames.DISPLAY_ERROR:
            return { ...state, errors: [...state.errors, action.error] };
        case errorActionNames.HIDE_ERROR:
            return { ...state, errors: [] };
        default:
            return state;
    }
}

export function selectErrors(state: AppState) {
    return state.error.errors;
}

export function hideErrors() {
    return (dispatch: AsyncDispatch) => dispatch({ type: errorActionNames.HIDE_ERROR});
}
