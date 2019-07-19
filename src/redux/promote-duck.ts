import { clearCommits, getCommitsForApplication } from './commit-duck';
import { commitToIssues, getInfoForReleaseNote } from './releasenote-duck';
import { Commit } from '../models/commit';
import { getIssues } from './jira-issue-duck';
import { AppState } from './reducer';
import { AsyncDispatch } from './redux-utils';
import { selectMiljoerForValgtTeam } from './team-velger-duck';
import { Environment } from '../models/environment';

export type PromoteState = {
    fromEnvironment: string;
    toEnvironment: string;
    openApplication: string;
} | undefined;

const initialState: PromoteState = {
    fromEnvironment: '',
    toEnvironment: '',
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

export type ViewActions =
    | SetEnvironments
    | OpenApplication
    ;

export default function PromoteReducer(state: PromoteState = initialState, action: ViewActions): PromoteState {
    switch(action.type) {
        case actionNames.SET_ENVIRONMENTS:
            return { ...state, fromEnvironment: action.fromEnvironment, toEnvironment: action.toEnvironment } as PromoteState;
        case actionNames.OPEN_APPLICATION:
            return { ...state, openApplication: action.application } as PromoteState;
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
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const state = getState();
        const fromEnv = selectFromEnvironment(state);
        const toEnv = selectToEnvironment(state);

        dispatch(getInfoForReleaseNote(fromEnv, toEnv));
    };
}

export function getInfoForPromote(app: string, fromVersion: string, toVersion: string) {
    return (dispatch: AsyncDispatch) => {
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

function isValidEnvironment(environments: Environment[], environmentName: string): boolean {
    return environments.some((environment) => environment.name === environmentName);
}

export function selectFromEnvironment(state: AppState): string {
    const environments = selectMiljoerForValgtTeam(state);
    if (state.promotering && isValidEnvironment(environments, state.promotering.fromEnvironment)) {
        return state.promotering.fromEnvironment;
    } else {
        return environments[0].name;
    }
}

export function selectToEnvironment(state: AppState): string {
    const environments = selectMiljoerForValgtTeam(state);
    if (state.promotering && isValidEnvironment(environments, state.promotering.toEnvironment)) {
        return state.promotering.toEnvironment;
    } else {
        return environments[environments.length - 1].name;
    }
}
