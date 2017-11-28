import { Dispatch as ReduxDispatch } from 'redux';
import AppState from './redux/app-state';

export interface Dispatch extends ReduxDispatch<AppState> {}