import { combineReducers } from 'redux';
import eventReducer from '../app-event/app-event-duck';
import userStoryReducer from '../user-story/user-story-duck';
import viewReducer from '../view/view-duck';
import devReducer from '../dev/dev-duck';
import AppState from './app-state';

export default combineReducers<AppState>({
    events: eventReducer,
    userStory: userStoryReducer,
    view: viewReducer,
    dev: devReducer,
});