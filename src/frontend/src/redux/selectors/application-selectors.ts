import { AppState } from '../reducer';
import { ApplicationWithChanges } from '../../models/application';
import { getEnvironments } from '../../utils/environment';
import { Environment } from '../../models/environment';
import { selectMiljoerForValgtTeam } from '../team-velger-duck';

export function selectApplications(state: AppState): string[] {
    const applications = state.deploy.deploys.map((deploy) => deploy.application);
    return Array.from(new Set(applications));
}

export function selectApplicationHasChangesForEnvironments(state: AppState, application: string, envs: Environment[]): boolean {
    if(Array.from(new Set(envs)).length <= 1) {
        return false;
    }

    const deploysForApp = state.deploy.deploys.filter((deploy) => deploy.application === application && envs.includes(deploy.environment));
    const versionsDeployed = Array.from(new Set(deploysForApp.map((deploy) => deploy.version)));
    const envsDeployedTo = Array.from(new Set(deploysForApp.map((deploy) => deploy.environment.name)));

    return versionsDeployed.length > 1 || envsDeployedTo.length === 1;
}

export function selectApplicationHasChanges(state: AppState, application: string): boolean {
    return selectApplicationHasChangesForEnvironments(state, application, getEnvironments());
}

export function selectApplicationsWithChangesForEnvironments(state: AppState, envs: Environment[]): ApplicationWithChanges[] {
    const applications = selectApplications(state);
    return applications
        .map((application) => ({
            name: application,
            hasChanges: selectApplicationHasChangesForEnvironments(state, application, envs)
        }));
}

export function selectApplicationsWithChanges(state: AppState): ApplicationWithChanges[] {
    const validEnvironments = selectMiljoerForValgtTeam(state);
    return selectApplicationsWithChangesForEnvironments(state, validEnvironments);
}
