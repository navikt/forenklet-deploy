import {combineReducers} from 'redux';
import errorReducer, {ErrorState} from './error-duck';
import viewReducer, {ViewState} from './view-duck';
import goNogoViewReducer, {GoNogoViewState} from './gonogo-view-duck';
import commitReducer, {CommitState} from './commit-duck';
import jiraIssueReducer, {JiraIssueState} from './jira-issue-duck';
import teamReducer, {TeamState} from './team-duck';
import valgTeamReducer, {ValgtTeamState} from './team-velger-duck';
import promoteringReducer, {PromoteState} from './promote-duck';
import kvitteringReducer, {KvitteringState} from './kvittering-duck';
import applicationFilterReducer, {ApplicationFilterState} from './application-filter-duck';
import deployReducer, {DeployState} from "./deploy-duck";

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

export default combineReducers<AppState>({
    error: errorReducer,
    view: viewReducer,
    deploy: deployReducer,
    commit: commitReducer,
    gonogoview: goNogoViewReducer,
    jira: jiraIssueReducer,
    team: teamReducer,
    valgtTeam: valgTeamReducer,
    promotering: promoteringReducer,
    kvittering: kvitteringReducer,
    applicationFilter: applicationFilterReducer
});
