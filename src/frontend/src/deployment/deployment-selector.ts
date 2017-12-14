import Application from '../application/application';
import AppState from '../redux/app-state';
import { selectEvents } from '../app-event/app-event-selector';
import Environment from '../environment/environment';
import AppEvent from '../app-event/app-event';
import { createSelector } from 'reselect';
import { selectEnvironment } from '../environment/environment-selector';
import { selectApplication } from '../application/application-selector';

export function selectAllDeploymentEvents(state: AppState): AppEvent[] {
    return selectEvents(state).filter((e) => !!e.version);
}

function applicationParameter(state: AppState, application: Application) {
    return application;
}

function environmentParameter(state: AppState, application: Application, environment: Environment) {
    return environment;
}

export const selectApplicationDeployments = createSelector(selectAllDeploymentEvents, applicationParameter, (deployments, application) => {
    return deployments.filter((e) => e.application === application.name);
});

export const selectApplicationEnvironmentDeployment = createSelector(selectApplicationDeployments, environmentParameter, (deployments, environment) => {
    return deployments.filter((e) => e.environment === environment.name)[0];
});

export interface Release {
    application: string;
    fromEnvironment: string;
    fromVersion: string;
    toEnvironment: string;
    toVersion: string;
}

export function selectReleaseForApplication(state: AppState, application: string, fromEnvironment: string): Release {
    const toEnvironment = selectEnvironment(fromEnvironment).promotesTo!;
    const app = selectApplication(state, application);

    const toApp = selectApplicationEnvironmentDeployment(state, app, selectEnvironment(fromEnvironment));
    const fromApp = selectApplicationEnvironmentDeployment(state, app, selectEnvironment(toEnvironment));

    return {
        application,
        fromEnvironment,
        toEnvironment,
        fromVersion: fromApp ? fromApp.version : '',
        toVersion: toApp ? toApp.version : ''
    };
}
