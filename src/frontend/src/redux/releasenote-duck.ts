import { Dispatch } from 'redux';
import { Action } from 'redux';
import { AppState } from './reducer';
import { ReleaseWithCommits } from '../models/release';
import { Commit } from '../models/commit';
import { getEnvironmentByName } from '../utils/environment';
import * as commitApi from '../api/commit-api';
import { clearCommits, actionNames as commitAN } from './commit-duck';
import { selectReleaseWithCommits, selectRelease } from './selectors/release-selectors';
import { selectApplicationsWithChangesForEnvironments } from './selectors/application-selectors';


export function selectIsLoadingReleaseNote(state: AppState): boolean {
    return state.deploy.loading || state.commit.loading;
}

function getApplicationsWithChanges(state: AppState): string[] {
    return selectApplicationsWithChangesForEnvironments(state, [getEnvironmentByName('q6'), getEnvironmentByName('p')])
        .filter((application) => application.hasChanges)
        .map((application) => application.name);
}

export function selectAllReleasesWithCommits(state: AppState): ReleaseWithCommits[] {
    return getApplicationsWithChanges(state)
        .map((application) => selectReleaseWithCommits(state, application, 'q6', 'p'));
}

export function getInfoForReleaseNote() {
    return (dispatch: Dispatch<Action>, getState: () => AppState) => {
        const state = getState();
        dispatch(clearCommits());
        dispatch({ type: commitAN.LOADING });
        
        const commitPromises = getApplicationsWithChanges(state)
            .map((application) => selectRelease(state, application, 'q6', 'p'))
            .map((release) => commitApi.getCommitsForApplication(release.application, release.fromVersion, release.toVersion));

        Promise.all(commitPromises)
            .then((values: Commit[][]) => values.reduce((agg, current) => agg.concat(current), []))
            .then((commits: Commit[]) => {
                dispatch({ type: commitAN.FETCH_SUCCESS, commits });
                return commits;
            });
    };
}
