import { JiraIssue } from '../models/jira-issue';
import { AppState } from './reducer';
import { Dispatch } from 'redux';
import { Action } from 'redux';
import * as api from '../api/jira-api';
import { onlyUnique } from '../utils/utils';

export interface JiraIssueState {
    loading: boolean;
    issues: JiraIssue[];
    error: string | null;
}

const initialState: JiraIssueState = {
    loading: true,
    issues: [],
    error: null
};

export enum actionNames {
    LOADING = 'jira/SET_PENDING',
    FETCH_SUCCESS = 'jira/FETCH_SUCCESS',
    FETCH_ERROR = 'jira/FETCH_ERROR'
}

export interface Loading {
    type: actionNames.LOADING;
}

export interface FetchSuccess {
    type: actionNames.FETCH_SUCCESS;
    issues: JiraIssue[];
}

export interface FetchError {
    type: actionNames.FETCH_ERROR;
    error: string;
}

type JiraActions =
    | Loading
    | FetchSuccess
    | FetchError
    ;

export function onlyUniqueIssues(issues: JiraIssue[]): JiraIssue[] {
    return onlyUnique(issues.map((issue) => issue.key))
        .map((issuekey) => issues.find((issue) => issue.key === issuekey)!);
}

export default function jiraIssueReducer(state: JiraIssueState = initialState, action: JiraActions): JiraIssueState {
    switch (action.type) {
        case actionNames.LOADING:
            return {...state, loading: true};
        case actionNames.FETCH_SUCCESS:
            return {...state, loading: false, error: null, issues: onlyUniqueIssues(state.issues.concat(action.issues))};
        case actionNames.FETCH_ERROR:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
}

export function selectIsLoadingIssues(state: AppState): boolean {
    return state.jira.loading;
}

export function selectIssue(state: AppState, issue: string): JiraIssue | undefined {
    return state.jira.issues.find((jiraissue) => jiraissue.key === issue);
}

export function getIssues(issueIds: string[]) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.LOADING });
        const issuePromises = onlyUnique(issueIds).map(api.getJiraIssue);

        Promise.all(issuePromises)
            .then((issues: JiraIssue[]) => dispatch({ type: actionNames.FETCH_SUCCESS, issues }));
    };
}
