import { apiBaseUri } from '../utils/config';
import { JiraIssue } from '../models/jira-issue';

export function getJiraIssue(issueId: string): Promise<JiraIssue> {
    return fetch(`${apiBaseUri}/jira/${issueId}`)
        .then((response) => response.json());
}
