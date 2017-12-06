import Application from './application';
import { selectEvents } from '../app-event/app-event-selector';
import { createSelector } from 'reselect';
import AppState from '../redux/app-state';

interface ApplicationByName {
    [name: string]: Application;
}

export const selectApplications = createSelector(selectEvents, (events): Application[] => {
    const applicationNames = new Set(events.map((e) => e.application));
    return Array.from(applicationNames).map((applicationName) => ({
        name: applicationName
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
