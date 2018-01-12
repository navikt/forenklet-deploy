import { AppState } from '../reducer';
import { ApplicationWithChanges } from '../../models/application';

export function selectApplications(state: AppState): string[] {
    const applications = state.deploy.deploys.map((deploy) => deploy.application);
    return Array.from(new Set(applications));
}

export function selectApplicationHasChanges(state: AppState, application: string): boolean {
    const deploysForApp = state.deploy.deploys.filter((deploy) => deploy.application === application);
    const versionsDeployed = Array.from(new Set(deploysForApp.map((deploy) => deploy.version)));
    return versionsDeployed.length > 1;
}

export function selectApplicationsWithChanges(state: AppState): ApplicationWithChanges[] {
    const applications = selectApplications(state);
    return applications
        .map((application) => ({
            name: application,
            hasChanges: selectApplicationHasChanges(state, application)
        }));
}
