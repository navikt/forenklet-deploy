import {ActionType, RequestStatusAction} from '../redux/actions';

export function requestStatus(): RequestStatusAction {
    return {
        type: ActionType.REQUEST_STATUS
    };
}