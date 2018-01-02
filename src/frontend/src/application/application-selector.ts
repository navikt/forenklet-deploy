import Application from './application';
import { selectEvents } from '../app-event/app-event-selector';
import { createSelector } from 'reselect';
import { selectAllDeploymentEvents } from '../deployment/deployment-selector';
import AppEvent from '../app-event/app-event';
import AppState from '../redux/app-state';

interface ApplicationByName {
    [name: string]: Application;
}

function appHasChanges(applicationName: string, events: AppEvent[]): boolean {
    const environmentstack = ['t6' , 'q6', 'q0', 'p'];
    const deploysForApp = events.filter((event) => event.application === applicationName && environmentstack.includes(event.environment));
    return (new Set(deploysForApp.map((deploy) => deploy.version))).size > 1;
}

export const selectApplications = createSelector(selectEvents, selectAllDeploymentEvents, (events, deploys): Application[] => {
    const applicationNames = new Set(events.map((e) => e.application));

    return Array.from(applicationNames).map((applicationName) => ({
        name: applicationName,
        hasChanges: appHasChanges(applicationName, events)
    }));
});

export const selectApplicationMap = createSelector(selectApplications, (applications): ApplicationByName => {
    const memo: ApplicationByName = {};
    applications.forEach((application) => {
        memo[application.name] = application;
    });
    return memo;
});

function name(state: AppState, applicationName: string) {
    return applicationName;
}

export const selectApplication = createSelector(selectApplicationMap, name, (applications, applicationName): Application => {
    return applications[applicationName] || {
        name: applicationName
    };
});
