import { apiBaseUri } from '../utils/config';
import { JiraIssue } from '../models/jira-issue';

export function getJiraIssue(issueId: string): Promise<JiraIssue> {
    return fetch(`${apiBaseUri}/jira/${issueId}`)
        .then((response) => response.json());
}

export function getJiraIssues(issues: string[]): Promise<JiraIssue[]> {
    const uri = `${apiBaseUri}/jira?issue=${issues.join('&issue=')}`;
    return fetch(uri).then((response) => response.json());
}
