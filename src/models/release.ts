import { Commit } from './commit';
import { Environment } from './environment';
import { JiraIssue } from './jira-issue';

export interface Release {
    application: string;
    fromVersion: string;
    toVersion: string;
    environment: Environment;
}

export interface ReleaseWithCommits extends Release {
    commits: Commit[];
}

export interface ReleaseWithCommitsAndIssues extends ReleaseWithCommits {
    issues: JiraIssue[];
}

export interface ReleaseNote {
    url: string;
}
