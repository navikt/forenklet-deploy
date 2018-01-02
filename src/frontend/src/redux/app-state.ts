import { AppEventState } from '../app-event/app-event-duck';
import { ErrorState } from './error-duck';
import { CommitState } from './commit-duck';
import { ViewState } from './view-duck';

export default interface AppState {
    events: AppEventState;
    commits: CommitState;
    error: ErrorState;
    view: ViewState;
}
