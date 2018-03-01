import { Dispatch } from 'redux';
import { Action } from 'redux';
import { AppState } from './reducer';
import { ReleaseWithCommits, Release, ReleaseWithCommitsAndIssues } from '../models/release';
import { Commit } from '../models/commit';
import { getEnvironmentByName } from '../utils/environment';
import * as commitApi from '../api/commit-api';
import { clearCommits, actionNames as commitAN } from './commit-duck';
import { selectReleaseWithCommits, selectRelease } from './selectors/release-selectors';
import { selectApplicationsWithChangesForEnvironments } from './selectors/application-selectors';
import { getIssuesFromMessage, Issue } from '../view/promote/promote-utils';
import { getIssues, selectIssue, onlyUniqueIssues } from './jira-issue-duck';
import { JiraIssue } from '../models/jira-issue';

export function selectIsLoadingReleaseNote(state: AppState): boolean {
    return state.deploy.loading || state.commit.loading || state.jira.loading;
}

function getApplicationsWithChanges(state: AppState, fromEnv: string = 'q6', toEnv: string = 'p'): string[] {
    return selectApplicationsWithChangesForEnvironments(state, [getEnvironmentByName(fromEnv), getEnvironmentByName(toEnv)])
        .filter((application) => application.hasChanges)
        .map((application) => application.name);
}

export function selectAllReleases(state: AppState): Release[] {
    return getApplicationsWithChanges(state)
        .map((application) => selectRelease(state, application, 'q6', 'p'));
}

export function selectAllReleasesWithCommits(state: AppState): ReleaseWithCommits[] {
    return getApplicationsWithChanges(state)
        .map((application) => selectReleaseWithCommits(state, application, 'q6', 'p'));
}

export function selectAllReleasesWithCommitsForEnvironments(state: AppState, fromEnv: string, toEnv: string): ReleaseWithCommits[] {
    return getApplicationsWithChanges(state, fromEnv, toEnv)
        .map((application) => selectReleaseWithCommits(state, application, fromEnv, toEnv));
}

export function selectReleases(state: AppState, applications: string[]): Release[] {
    return applications.map((application) => selectRelease(state, application, 'q6', 'p'));
}

export function selectReleasesWithCommits(state: AppState, applications: string[]): ReleaseWithCommits[] {
    return applications.map((application) => selectReleaseWithCommits(state, application, 'q6', 'p'));
}

export function selectReleasesWithCommitsAndIssues(state: AppState, applications: string[]): ReleaseWithCommitsAndIssues[] {
    return selectReleasesWithCommits(state, applications).map((a) => ({
        ...a,
        issues: selectIssuesForApplication(state, a.application)
    }));
}

export function selectIssuesForApplication(state: AppState, application: string): JiraIssue[] {
    const commits = state.commit.commits.filter((commit) => commit.application === application);
    return onlyUniqueIssues(commits
        .map(commitToIssues)
        .reduce((agg, current) => agg.concat(current), [])
        .filter((issue) => selectIssue(state, issue.name) != null)
        .map((issue) => selectIssue(state, issue.name)!));
}

function responseToCommits(response: Commit[][]): Commit[] {
    return response.reduce((agg, current) => agg.concat(current), []);
}

export function commitToIssues(commit: Commit): Issue[] {
    return getIssuesFromMessage(commit.message);
}

export function getInfoForReleaseNote(fromEnv: string = 'q6', toEnv: string = 'p') {
    return (dispatch: Dispatch<Action>, getState: () => AppState) => {
        const state = getState();
        dispatch(clearCommits());
        dispatch({ type: commitAN.LOADING });

        const commitPromises = getApplicationsWithChanges(state, fromEnv, toEnv)
            .map((application) => selectRelease(state, application, fromEnv, toEnv))
            .map((release) => commitApi.getCommitsForApplication(release.application, release.fromVersion, release.toVersion));

        Promise.all(commitPromises)
            .then(responseToCommits)
            .then((commits: Commit[]) => {
                dispatch({ type: commitAN.FETCH_SUCCESS, commits });
                return commits;
            })
            .then((commits) => commits
                .map(commitToIssues)
                .reduce((agg, current) => agg.concat(current), [])
                .map((issue) => issue.name)
            )
            .then((issues: string[]) => dispatch(getIssues(issues)));
    };
}
