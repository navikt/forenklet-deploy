import AppState from "../redux/app-state";
import AppEvent from "./app-event";

export function selectEvents(state: AppState): AppEvent[] {
    return state.events.data;
}

export function selectIsLoadingEvents(state: AppState): boolean {
    return !state.events.eventsLoaded;
}