import {ActionType, Action} from '../redux/actions';
import UserStory from './user-story';

export interface UserStoryState {
    [id: string]: UserStory;
}

const initialState = {};

export default function reducer(state: UserStoryState = initialState,
                                action: Action): UserStoryState {
    // const stateData = state.data;
    switch (action.type) {
        case ActionType.USER_STORY:
            const userStory = action.data.data;
            return {
                ...state,
                [userStory.key] : userStory
            };
        default:
            return state;
    }
}
