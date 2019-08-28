import { AppState } from './reducer';
import { ReleaseWithCommits } from '../models/release';
import { Commit } from '../models/commit';
import { getEnvironmentByName } from '../utils/environment';
import * as commitApi from '../api/commit-api';
import { clearCommits, actionNames as commitAN } from './commit-duck';
import { selectReleaseWithCommits, selectRelease } from './selectors/release-selectors';
import { selectApplicationsWithChangesForEnvironments } from './selectors/application-selectors';
import { getIssuesFromMessage, Issue } from '../view/promote/promote-utils';
import { getIssues, selectIssue, onlyUniqueIssues } from './jira-issue-duck';
import { JiraIssue } from '../models/jira-issue';
import { AsyncDispatch } from './redux-utils';
import { errorActionNames } from './error-duck';
import { logError } from '../utils/log';

function getApplicationsWithChanges(state: AppState, fromEnv: string = 'q0', toEnv: string = 'p'): string[] {
    return selectApplicationsWithChangesForEnvironments(state, [getEnvironmentByName(fromEnv), getEnvironmentByName(toEnv)])
        .filter((application) => application.hasChanges)
        .map((application) => application.name);
}

export function selectAllReleasesWithCommitsForEnvironments(state: AppState, fromEnv: string, toEnv: string): ReleaseWithCommits[] {
    return getApplicationsWithChanges(state, fromEnv, toEnv)
        .map((application) => selectReleaseWithCommits(state, application, fromEnv, toEnv));
}

export function selectIssuesForApplication(state: AppState, application: string): JiraIssue[] {
    const commits = state.commit.commits.filter((commit) => commit.application === application);
    return onlyUniqueIssues(commits
        .map(commitToIssues)
        .reduce((agg, current) => agg.concat(current), [])
        .filter((issue) => selectIssue(state, issue.name) != null)
        .map((issue) => selectIssue(state, issue.name)!));
}

export function commitToIssues(commit: Commit): Issue[] {
    return getIssuesFromMessage(commit.message);
}

export function getInfoForReleaseNote(fromEnv: string = 'q0', toEnv: string = 'p') {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const state = getState();
        dispatch(clearCommits());
        dispatch({ type: commitAN.LOADING });

        const commitPromises = getApplicationsWithChanges(state, fromEnv, toEnv)
            .map((application) => selectRelease(state, application, fromEnv, toEnv))
            .map((release) => commitApi.getCommitsForApplication(release.application, release.fromVersion, release.toVersion));

        commitPromises.forEach(resolveCommitPromise(dispatch));

        Promise.all(commitPromises).then(doneLoading(dispatch)).catch(doneLoading(dispatch));
    };
}

function resolveCommitPromise(dispatch: AsyncDispatch) {
    return (promise: Promise<Commit[]>) => {
        promise
            .then((commits: Commit[]) => {
                dispatch({type: commitAN.FETCH_SUCCESS, commits});
                return commits;
            })
            .then((commits) => commits
                .map(commitToIssues)
                .reduce((agg, current) => agg.concat(current), [])
                .map((issue) => issue.name)
            )
            .then((issues: string[]) => dispatch(getIssues(issues)))
            .catch((error) => {
                logError(error);
                const errorMessage = error ? error.toString() : 'Det var problemer med å generere releasenote for enkelte applikasjoner.';
                dispatch({type: commitAN.FETCH_FAILED, error: errorMessage});
                dispatch({
                    type: errorActionNames.DISPLAY_ERROR,
                    error: errorMessage
                });
                return [];
            });
    };
}

function doneLoading(dispatch: AsyncDispatch) {
    return () => dispatch({type: commitAN.FETCH_COMPLETE});
}
