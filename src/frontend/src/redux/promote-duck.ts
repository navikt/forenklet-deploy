import { Action, Dispatch } from 'redux';
import { clearCommits, getCommitsForApplication } from './commit-duck';
import { commitToIssues } from './releasenote-duck';
import { Commit } from '../models/commit';
import { getIssues } from './jira-issue-duck';

export function getInfoForPromote(app: string, fromVersion: string, toVersion: string) {

    return (dispatch: Dispatch<Action>) => {
        dispatch(clearCommits());
        dispatch(getCommitsForApplication(app, fromVersion, toVersion))
            .then((commits: Commit[]) => {
                const issues = commits.map(commitToIssues)
                    .reduce((agg, current) => agg.concat(current), [])
                    .map((issue) => issue.name);
                dispatch(getIssues(issues));
            });
    };
}
