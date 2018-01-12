import { Commit } from '../models/commit';
import { AppState } from './reducer';

export interface CommitState {
    loading: boolean;
    commits: Commit[];
    error: string | null;
}

const initialState: CommitState = {
    loading: true,
    commits: [],
    error: null
};

enum actionNames {
    LOADING = 'commit/SET_PENDING',
    FETCH_SUCCESS = 'commit/FETCH_SUCCESS',
    FETCH_ERROR = 'commit/FETCH_ERROR',
    CLEAR = 'commit/CLEAR'
}

export interface Loading {
    type: actionNames.LOADING;
}

export interface FetchSuccess {
    type: actionNames.FETCH_SUCCESS;
    commits: Commit[];
}

export interface FetchError {
    type: actionNames.FETCH_ERROR;
    error: string;
}

export interface Clear {
    type: actionNames.CLEAR;
}

type ReleaseActions =
    | Loading
    | FetchSuccess
    | FetchError
    | Clear
    ;

export default function deployReducer(state: CommitState = initialState, action: ReleaseActions): CommitState {
    switch (action.type) {
        case actionNames.LOADING:
            return {...state, loading: true};
        case actionNames.FETCH_SUCCESS:
            return {...state, loading: false, error: null, commits: state.commits.concat(action.commits)};
        case actionNames.FETCH_ERROR:
            return {...state, loading: false, error: action.error};
        case actionNames.CLEAR:
            return {...state, commits: []};
        default:
            return state;
    }
}

export function selectIsLoadingDeploys(state: AppState): boolean {
    return state.commit.loading;
}
