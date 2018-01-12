import { AppState } from './reducer';

export interface ErrorState {
    error: string | null;
}

const initialState: ErrorState = {
    error: null
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

type ErrorAction =
    | DisplayErrorAction
    | HideErrorAction;

export default function reducer(state: ErrorState = initialState, action: ErrorAction): ErrorState {
    switch (action.type) {
        case errorActionNames.DISPLAY_ERROR:
            return { ...state, error: action.error };
        case errorActionNames.HIDE_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
}

export function selectError(state: AppState) {
    return state.error.error;
}
