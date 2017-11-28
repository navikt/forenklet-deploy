import Application from "./application";
import AppState from "../redux/app-state";
import {selectEvents} from "../app-event/app-event-selector";

export function selectApplications(state: AppState): Application[] {
    const applicationNames = new Set(selectEvents(state).map(e => e.application));
    return Array.from(applicationNames).map(applicationName => ({
        name: applicationName
    }));
}