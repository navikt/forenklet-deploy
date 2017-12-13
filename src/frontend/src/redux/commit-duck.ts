import { Action, ActionType, RequestCommitsAction } from './actions';
import Commit from '../dev/commit';
import AppState from './app-state';

export interface CommitState {
    loading: boolean;
    commits: Commit[];
}

const initialState: CommitState = {
    loading: true,
    commits: []
};

export default function commitReducer(state: CommitState = initialState, action: Action) {
    switch (action.type) {
        case ActionType.REQUEST_COMMITS:
            return initialState;
        case ActionType.COMMITS_PROVIDED:
            return {...state, loading: false};
        case ActionType.COMMIT:
            return {...state, commits: state.commits.concat(action.data)};
        default:
            return state;
    }
}

export function selectIsLoadingCommits(state: AppState): boolean {
    return state.commits.loading;
}

export function selectCommits(state: AppState): Commit[] {
    return state.commits.commits;
}

export function getCommitsForRelease(app: string, fromVersion: string, toVersion: string): RequestCommitsAction {
    return {
        type: ActionType.REQUEST_COMMITS,
        data: {
            application: app,
            fromTag: fromVersion,
            toTag: toVersion
        }
    };
}
