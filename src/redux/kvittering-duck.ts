import { Action, Dispatch } from 'redux';
import * as api from '../api/kvittering-api';
import { ReleaseNote, ReleaseWithCommitsAndIssues } from '../models/release';

export interface KvitteringState {
    loading: boolean;
    error?: string;
}

const initialState: KvitteringState = {
    loading: false
};

export enum actionNames {
    LOADING = 'kvittering/SET_PENDING',
    FETCH_SUCCESS = 'kvittering/FETCH_SUCCESS',
    FETCH_ERROR = 'kvittering/FETCH_ERROR'
}

export interface Loading {
    type: actionNames.LOADING;
}

export interface FetchSuccess {
    type: actionNames.FETCH_SUCCESS;
}

export interface FetchError {
    type: actionNames.FETCH_ERROR;
    error: string;
}

type KvitteringActions =
    | Loading
    | FetchSuccess
    | FetchError
    ;

export default function kvitteringReducer(state: KvitteringState = initialState, action: KvitteringActions): KvitteringState {
    switch (action.type) {
        case actionNames.LOADING:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case actionNames.FETCH_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actionNames.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function lagreKvittering(releases: ReleaseWithCommitsAndIssues[]) {
    return (dispatch: Dispatch<Action>): Promise<ReleaseNote> => {
        dispatch({type: actionNames.LOADING});

        function onSuccess(releaseNote: ReleaseNote) {
            dispatch({type: actionNames.FETCH_SUCCESS});
            return releaseNote;
        }

        function onError(error: Error) {
            dispatch({type: actionNames.FETCH_ERROR, error});
            return Promise.reject(error);
        }

        return api.lagreKvittering(releases).then(onSuccess, onError);
    };
}

export function apneKvittering(releaseNote: ReleaseNote) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({type: actionNames.LOADING});
        window.location.href = releaseNote.url;
    };
}
