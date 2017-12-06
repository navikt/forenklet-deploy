import { combineReducers } from 'redux';
import eventReducer from '../app-event/app-event-duck';
import devReducer from '../dev/dev-duck';
import AppState from './app-state';

export default combineReducers<AppState>({
    events: eventReducer,
    dev: devReducer,
});
