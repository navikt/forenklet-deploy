import { combineReducers } from 'redux';
import eventReducer from '../app-event/app-event-duck';
import errorReducer from '../redux/error-duck';
import AppState from './app-state';
import commitReducer from './commit-duck';

export default combineReducers<AppState>({
    events: eventReducer,
    commits: commitReducer,
    error: errorReducer
});
