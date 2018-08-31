import { Action, combineReducers } from 'redux';
import errorReducer, { ErrorState } from './error-duck';
import viewReducer, { ViewState } from './view-duck';
import goNogoViewReducer, { GoNogoViewState } from './gonogo-view-duck';
import deployReducer, { DeployState } from './deploy-duck';
import commitReducer, { CommitState } from './commit-duck';
import jiraIssueReducer, { JiraIssueState } from './jira-issue-duck';
import teamReducer, { TeamState } from './team-duck';
import valgTeamReducer, { ValgtTeamState } from './team-velger-duck';
import promoteringReducer, { PromoteState } from './promote-duck';
import kvitteringReducer, { KvitteringState } from './kvittering-duck';
import applicationFilterReducer, { ApplicationFilterState } from './application-filter-duck';

export interface AppState {
    error: ErrorState;
    view: ViewState;
    deploy: DeployState;
    commit: CommitState;
    gonogoview: GoNogoViewState;
    jira: JiraIssueState;
    team: TeamState;
    valgtTeam: ValgtTeamState;
    promotering: PromoteState;
    kvittering: KvitteringState;
    applicationFilter: ApplicationFilterState;
}

function getSavedState<T>(name: string): T {
    const savedState = window.localStorage ? localStorage.getItem(name) : null;
    return savedState == null ? undefined : JSON.parse(savedState);
}

function saveState<T>(name: string, state: T) {
    if (window.localStorage) {
        localStorage.setItem(name, JSON.stringify(state));
    }
}

function storedReducer<T>(name: string, reducer: (state: T, action: Action) => T): (state: T, action: Action) => T {
    return (state: T, action: Action): T => {
        const stateToUse = state == null ? getSavedState<T>(name) : state;
        const nextState = reducer(stateToUse, action);
        saveState(name, nextState);
        return nextState;
    };
}

export default combineReducers<AppState>({
    error: errorReducer,
    view: viewReducer,
    deploy: deployReducer,
    commit: commitReducer,
    gonogoview: goNogoViewReducer,
    jira: jiraIssueReducer,
    team: teamReducer,
    valgtTeam: valgTeamReducer,
    promotering: storedReducer<PromoteState>('promotering', promoteringReducer),
    kvittering: kvitteringReducer,
    applicationFilter: applicationFilterReducer
});
