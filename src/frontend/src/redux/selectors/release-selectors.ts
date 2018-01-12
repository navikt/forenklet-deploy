import { AppState } from '../reducer';
import { ReleaseWithCommits } from '../../models/release';
import { getEnvironmentByName } from '../../utils/environment';

export function selectIsLoadingRelease(state: AppState): boolean {
    return state.deploy.loading || state.commit.loading;
}

export function selectReleaseWithCommits(state: AppState, application: string, env: string): ReleaseWithCommits {
    const environment = getEnvironmentByName(env);

    const deployFrom = state.deploy.deploys.find((deploy) => deploy.application === application && deploy.environment.name === env);
    const deployTo = state.deploy.deploys.find((deploy) => deploy.application === application && deploy.environment.name === environment.promotesTo);

    const commits = state.commit.commits.filter((commit) => commit.application === application);

    return {
        application,
        environment,
        fromVersion: deployFrom != null ? deployFrom.version : '',
        toVersion: deployTo != null ? deployTo.version : '',
        commits
    };
}
