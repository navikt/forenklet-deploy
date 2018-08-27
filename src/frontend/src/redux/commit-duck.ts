import { Commit } from '../models/commit';
import { AppState } from './reducer';
import { Dispatch } from 'redux';
import { Action } from 'redux';
import * as api from '../api/commit-api';
import { errorActionNames } from './error-duck';

export interface CommitState {
    loading: boolean;
    commits: Commit[];
}

const initialState: CommitState = {
    loading: true,
    commits: [],
};

export enum actionNames {
    LOADING = 'commit/SET_PENDING',
    FETCH_SUCCESS = 'commit/FETCH_SUCCESS',
    CLEAR = 'commit/CLEAR'
}

export interface Loading {
    type: actionNames.LOADING;
}

export interface FetchSuccess {
    type: actionNames.FETCH_SUCCESS;
    commits: Commit[];
}

export interface Clear {
    type: actionNames.CLEAR;
}

type ReleaseActions =
    | Loading
    | FetchSuccess
    | Clear
    ;

export default function commitReducer(state: CommitState = initialState, action: ReleaseActions): CommitState {
    switch (action.type) {
        case actionNames.LOADING:
            return {...state, loading: true};
        case actionNames.FETCH_SUCCESS:
            return {...state, loading: false, commits: state.commits.concat(action.commits)};
        case actionNames.CLEAR:
            return {...state, commits: []};
        default:
            return state;
    }
}

export function selectIsLoadingDeploys(state: AppState): boolean {
    return state.commit.loading;
}

export function clearCommits(): Clear {
    return { type: actionNames.CLEAR };
}

export function getCommitsForApplication(application: string, fromVersion: string, toVersion: string) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: errorActionNames.HIDE_ERROR });
        dispatch({ type: actionNames.LOADING });
        return api.getCommitsForApplication(application, fromVersion, toVersion)
            .then((commits: Commit[]) => {
                dispatch({ type: actionNames.FETCH_SUCCESS, commits });
                return commits;
            })
            .catch(() => {
                dispatch({ type: errorActionNames.DISPLAY_ERROR, error: 'Det var problemer med å hente commits for enkelte applikasjoner.' });
                return [];
            });
    };
}
