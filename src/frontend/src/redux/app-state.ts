import { AppEventState } from '../app-event/app-event-duck';
import { ErrorState } from './error-duck';

export default interface AppState {
    events: AppEventState;
    error: ErrorState;
}
