import { apiBaseUri } from '../utils/config';
import { JiraIssue } from '../models/jira-issue';
import { fetchToJson } from './utils';

export function getJiraIssues(issues: string[]): Promise<JiraIssue[]> {
    return fetchToJson(`${apiBaseUri}/jira?issue=${issues.join('&issue=')}`);
}
