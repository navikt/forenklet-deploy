import { AppEventState } from '../app-event/app-event-duck';
import { UserStoryState } from '../user-story/user-story-duck';
import { ViewState } from '../view/view-duck';
import { DevState } from '../dev/dev-duck';

export default interface AppState {
    events: AppEventState;
    userStory: UserStoryState;
    dev: DevState;
    view: ViewState;
}
