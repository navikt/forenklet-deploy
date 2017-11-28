import {Action, ActionType, ChangeModeAction} from '../redux/actions';
import DashboardMode from './dashboard-mode';

export interface ViewState {
    mode: DashboardMode;
    error?: string;
}

const initialState = {
    mode: DashboardMode.USER_STORY
};

export default function reducer(state: ViewState = initialState,
                                action: Action): ViewState {
    switch (action.type) {
        case ActionType.CHANGE_MODE:
            return {
                ...state,
                mode: action.newMode
            };
        case ActionType.ERROR:
            return {
                ...state,
                error: action.data
            };
        default:
            return state;
    }
}


export function changeMode(mode: DashboardMode): ChangeModeAction {
    return {
        type: ActionType.CHANGE_MODE,
        newMode: mode
    };
}