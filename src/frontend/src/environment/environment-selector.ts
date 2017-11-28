import Environment from "./environment";
import AppState from "../redux/app-state";
import {selectEvents} from "../app-event/app-event-selector";
import {comparator} from "./environment-util";

export function selectEnvironments(state: AppState): Environment[] {
    const environmentNames = new Set(selectEvents(state).map(e => e.environment));
    return Array.from(environmentNames)
        .map(environmentName => ({
            name: environmentName
        }))
        .sort(comparator)
}