import { combineReducers } from 'redux';
import errorReducer, { ErrorState } from './error-duck';
import viewReducer, { ViewState } from './view-duck';
import goNogoViewReducer, { GoNogoViewState } from './gonogo-view-duck';
import deployReducer, { DeployState } from './deploy-duck';
import commitReducer, { CommitState } from './commit-duck';

export interface AppState {
    error: ErrorState;
    view: ViewState;
    deploy: DeployState;
    commit: CommitState;
    gonogoview: GoNogoViewState;
}

export default combineReducers<AppState>({
    error: errorReducer,
    view: viewReducer,
    deploy: deployReducer,
    commit: commitReducer,
    gonogoView: goNogoViewReducer,
});
