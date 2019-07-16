import * as api from '../api/team-api';

import { Action, Dispatch } from 'redux';
import { AppState } from './reducer';
import { Team } from '../models/team';

export interface TeamState {
    loading: boolean;
    teams: Team[];
    error: string | null;
}

const initialState: TeamState = {
    loading: true,
    teams: [],
    error: null
};

enum actionNames {
    LOADING = 'teams/SET_PENDING',
    FETCH_SUCCESS = 'teams/FETCH_SUCCESS',
    FETCH_ERROR = 'teams/FETCH_ERROR'
}

export interface Loading {
    type: actionNames.LOADING;
}

export interface FetchSuccess {
    type: actionNames.FETCH_SUCCESS;
    teams: Team[];
}

export interface FetchError {
    type: actionNames.FETCH_ERROR;
    error: string;
}

type TeamActions =
    | Loading
    | FetchSuccess
    | FetchError
    ;

export function getAllTeams() {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.LOADING });
        return api.getAllTeams()
            .then((teams) => {
                dispatch({ type: actionNames.FETCH_SUCCESS, teams});
                return teams;
            });
    };
}

export function selectIsLoadingTeams(state: AppState): boolean {
    return state.team.loading;
}

export function selectTeams(state: AppState): Team[] {
    return state.team.teams;
}

export default function teamReducer(state: TeamState = initialState, action: TeamActions) {
    switch (action.type) {
        case actionNames.LOADING:
            return {...state, loading: true};
        case actionNames.FETCH_SUCCESS:
            return {...state, loading: false, error: null, teams: action.teams};
        case actionNames.FETCH_ERROR:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
}
