import { combineReducers } from 'redux';
import eventReducer from '../app-event/app-event-duck';
import AppState from "./app-state";

export default combineReducers<AppState>({
    events: eventReducer,
});