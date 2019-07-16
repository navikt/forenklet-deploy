import { AppState } from '../reducer';
import { ReleaseWithCommits, Release } from '../../models/release';
import { getEnvironmentByName } from '../../utils/environment';

export function selectIsLoadingRelease(state: AppState): boolean {
    return state.deploy.loading || state.commit.loading;
}

export function selectRelease(state: AppState, application: string, envFrom: string, envTo?: string): Release {
    const environmentFrom = getEnvironmentByName(envFrom);
    const environmentTo = envTo ? getEnvironmentByName(envTo) : getEnvironmentByName(environmentFrom.promotesTo!);

    const deployTo = state.deploy.deploys.find((deploy) => deploy.application === application && deploy.environment.name === envFrom);
    const deployFrom = state.deploy.deploys.find((deploy) => deploy.application === application && deploy.environment.name === environmentTo.name);

    return {
        application,
        environment: environmentFrom,
        fromVersion: deployFrom != null ? deployFrom.version : '',
        toVersion: deployTo != null ? deployTo.version : '',
    };
}

export function selectReleaseWithCommits(state: AppState, application: string, envFrom: string, envTo?: string): ReleaseWithCommits {
    const release = selectRelease(state, application, envFrom, envTo);
    const commits = state.commit.commits.filter((commit) => commit.application === application);

    return { ...release, commits };
}
