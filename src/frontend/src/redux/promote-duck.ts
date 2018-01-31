import { Action, Dispatch } from 'redux';
import { clearCommits, getCommitsForApplication } from './commit-duck';
import { commitToIssues, getInfoForReleaseNote } from './releasenote-duck';
import { Commit } from '../models/commit';
import { getIssues } from './jira-issue-duck';
import { AppState } from './reducer';

export interface PromoteState {
    fromEnvironment: string;
    toEnvironment: string;
    openApplication: string;
}

const initialState: PromoteState = {
    fromEnvironment: 't6',
    toEnvironment: 'q6',
    openApplication: ''
};

enum actionNames {
    SET_ENVIRONMENTS = 'promote/SET_ENVIRONMENTS',
    OPEN_APPLICATION = 'promote/OPEN_APPLICATION'
}

export interface SetEnvironments {
    type: actionNames.SET_ENVIRONMENTS;
    fromEnvironment: string;
    toEnvironment: string;
}

export interface OpenApplication {
    type: actionNames.OPEN_APPLICATION;
    application: string;
}

type ViewActions =
    | SetEnvironments
    | OpenApplication
    ;

export default function PromoteReducer(state: PromoteState = initialState, action: ViewActions): PromoteState {
    switch(action.type) {
        case actionNames.SET_ENVIRONMENTS:
            return { ...state, fromEnvironment: action.fromEnvironment, toEnvironment: action.toEnvironment };
        case actionNames.OPEN_APPLICATION:
            return { ...state, openApplication: action.application };
        default:
            return state;
    }
}

export function setEnvironments(fromEnvironment: string, toEnvironment: string): SetEnvironments {
    return { type: actionNames.SET_ENVIRONMENTS, fromEnvironment, toEnvironment };
}

export function openApplication(app: string): OpenApplication {
    return { type: actionNames.OPEN_APPLICATION, application: app };
}

export function getInformationForPromotion() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        const state = getState();
        const fromEnv = state.promotering.fromEnvironment;
        const toEnv = state.promotering.toEnvironment;

        dispatch(getInfoForReleaseNote(fromEnv, toEnv));
    };
}

export function getInfoForPromote(app: string, fromVersion: string, toVersion: string) {
    return (dispatch: Dispatch<Action>) => {
        dispatch(clearCommits());
        dispatch(getCommitsForApplication(app, fromVersion, toVersion))
            .then((commits: Commit[]) => {
                const issues = commits.map(commitToIssues)
                    .reduce((agg, current) => agg.concat(current), [])
                    .map((issue) => issue.name);
                dispatch(getIssues(issues));
            });
    };
}
