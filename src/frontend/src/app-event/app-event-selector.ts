import AppState from '../redux/app-state';
import { createSelector } from 'reselect';
import Application from '../application/application';
import AppEvent from './app-event';
import Environment from '../environment/environment';

function getEvents(state: AppState) {
    return state.events.data;
}

export const selectEvents = createSelector(getEvents, (e) => e);

export function selectIsLoadingInitialData(state: AppState): boolean {
    const events = state.events;
    return !events.eventsLoaded || !events.statusLoaded;
}

export function selectApplicationEnvironmentEvents(state: AppState, application: Application, environment: Environment): AppEvent[] {
    return selectEvents(state).filter((e) =>
        e.application === application.name
        && e.environment === environment.name
    );
}
