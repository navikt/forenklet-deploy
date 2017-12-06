import { AppEventState } from '../app-event/app-event-duck';
import { DevState } from '../dev/dev-duck';

export default interface AppState {
    events: AppEventState;
    dev: DevState;
}
