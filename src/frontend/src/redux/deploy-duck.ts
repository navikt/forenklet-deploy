import { Dispatch, Action } from 'redux';
import { Deploy } from '../models/deploy';
import { AppState } from './reducer';
import * as api from '../api/deploy-api';

export interface DeployState {
    loading: boolean;
    deploys: Deploy[];
    error: string | null;
}

const initialState: DeployState = {
    loading: true,
    deploys: [],
    error: null
};

enum actionNames {
    LOADING = 'deploy/SET_PENDING',
    FETCH_SUCCESS = 'deploy/FETCH_SUCCESS',
    FETCH_ERROR = 'deploy/FETCH_ERROR'
}

export interface Loading {
    type: actionNames.LOADING;
}

export interface FetchSuccess {
    type: actionNames.FETCH_SUCCESS;
    deploys: Deploy[];
}

export interface FetchError {
    type: actionNames.FETCH_ERROR;
    error: string;
}

type ReleaseActions =
    | Loading
    | FetchSuccess
    | FetchError
    ;

export default function deployReducer(state: DeployState = initialState, action: ReleaseActions) {
    switch (action.type) {
        case actionNames.LOADING:
            return {...state, loading: true};
        case actionNames.FETCH_SUCCESS:
            return {...state, loading: false, error: null, deploys: action.deploys};
        case actionNames.FETCH_ERROR:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
}

export function getAllDeploys() {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.LOADING });
        api.getAllDeploys()
            .then((deploys) => dispatch({ type: actionNames.FETCH_SUCCESS, deploys }));
    };
}

export function selectDeploys(state: AppState): Deploy[] {
    return state.deploy.deploys;
}

export function selectDeploy(state: AppState, application: string, environment?: string): Deploy | undefined {
    if (!environment) {
        return undefined;
    }
    return state.deploy.deploys.find((deploy) => deploy.application === application && deploy.environment.name === environment);
}

export function selectIsLoadingDeploys(state: AppState): boolean {
    return state.deploy.loading;
}
