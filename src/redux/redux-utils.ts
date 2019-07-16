import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './reducer';
import { Action } from 'redux';

export type AsyncAction = ThunkAction<any, AppState, any, Action>;
export type AsyncDispatch = ThunkDispatch<AppState, any, Action>;
