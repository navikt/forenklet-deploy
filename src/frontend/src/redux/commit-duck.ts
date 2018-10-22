import { Commit } from '../models/commit';
import { Dispatch } from 'redux';
import { Action } from 'redux';
import * as api from '../api/commit-api';
import { errorActionNames } from './error-duck';

export interface CommitState {
    loading: boolean;
    error: boolean;
    commits: Commit[];
}

const initialState: CommitState = {
    loading: false,
    error: false,
    commits: [],
};

export enum actionNames {
    LOADING = 'commit/SET_PENDING',
    FETCH_SUCCESS = 'commit/FETCH_SUCCESS',
    FETCH_FAILED = 'commit/FETCH_FAILED',
    FETCH_COMPLETE = 'commit/FETCH_COMPLETE',
    CLEAR = 'commit/CLEAR'
}

export interface Loading {
    type: actionNames.LOADING;
}

export interface FetchSuccess {
    type: actionNames.FETCH_SUCCESS;
    commits: Commit[];
}

export interface FetchFailed {
    type: actionNames.FETCH_FAILED;
}

export interface FetchComplete {
    type: actionNames.FETCH_COMPLETE;
}

export interface Clear {
    type: actionNames.CLEAR;
}

type ReleaseActions =
    | Loading
    | FetchSuccess
    | FetchFailed
    | FetchComplete
    | Clear
    ;

export default function commitReducer(state: CommitState = initialState, action: ReleaseActions): CommitState {
    switch (action.type) {
        case actionNames.LOADING:
            return {...state, loading: true, error: false};
        case actionNames.FETCH_SUCCESS:
            return {...state, commits: state.commits.concat(action.commits)};
        case actionNames.FETCH_FAILED:
            return {...state, error: true};
        case actionNames.FETCH_COMPLETE:
            return {...state, loading: false};
        case actionNames.CLEAR:
            return {...state, commits: []};
        default:
            return state;
    }
}

export function clearCommits(): Clear {
    return { type: actionNames.CLEAR };
}

export function getCommitsForApplication(application: string, fromVersion: string, toVersion: string) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.LOADING });
        return api.getCommitsForApplication(application, fromVersion, toVersion)
            .then((commits: Commit[]) => {
                dispatch({ type: actionNames.FETCH_SUCCESS, commits });
                dispatch({ type: actionNames.FETCH_COMPLETE });
                return commits;
            })
            .catch(() => {
                dispatch({ type: actionNames.FETCH_COMPLETE });
                dispatch({ type: errorActionNames.DISPLAY_ERROR, error: 'Det var problemer med å hente commits for enkelte applikasjoner.' });
                return [];
            });
    };
}
