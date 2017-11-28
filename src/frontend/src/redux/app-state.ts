import {AppEventState} from '../app-event/app-event-duck';

export default interface AppState {
    events: AppEventState;
}