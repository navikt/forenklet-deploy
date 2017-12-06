import Application from '../application/application';
import AppState from '../redux/app-state';
import { selectEvents } from '../app-event/app-event-selector';
import Environment from '../environment/environment';
import AppEvent from '../app-event/app-event';
import { createSelector } from 'reselect';

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
