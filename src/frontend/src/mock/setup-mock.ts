import * as fetchMock from 'fetch-mock';
import { respondWith, delayed } from './utils';
import { getDeploysForTeam } from './deploys';
import { apiBaseUri } from '../utils/config';
import { getMockIssue } from './jira-issue-mock';
import { getMockCommits } from './commit-for-release-mock';
import { teams } from './teams';
import { getMockToggle } from './unleash-mock';

export function setupMock() {
    /* tslint:disable-next-line */
    console.log('### MOCK ENABLED! ###');
    (fetchMock as any)._mock();

    fetchMock.get('begin:' + apiBaseUri + '/deploy', respondWith(delayed(500, (uri: string) => {
        const re = /\/deploy\?team=([a-zA-Z]*)/;
        const result = re.exec(uri);
        const teamName = result ? result[1] : 'mock-team';
        return getDeploysForTeam(teamName);
    })));

    fetchMock.get('begin:' + apiBaseUri + '/commit', respondWith(delayed(500, (uri: string) => {
        const re = /\/commit\/([a-zA-Z]*)\?/;
        const result = re.exec(uri);
        const applicationName = result ? result[1] : 'mock-app';
        return getMockCommits(applicationName);
    })));

    fetchMock.get('begin:' + apiBaseUri + '/jira', respondWith(delayed(500, (uri: string) => {
        const re = /\/jira\/([a-zA-Z]*\-\d*)/;
        const result = re.exec(uri);
        const issueId = result ? result[1] : 'UKJENT-01';
        return getMockIssue(issueId);
    })));

    fetchMock.get('begin:' + apiBaseUri + '/featuretoggles', respondWith(delayed(600, (uri: string) => {
        const re = /\/featuretoggles\/([a-zA-Z0-9._\-]*)/;
        const result = re.exec(uri);
        const toggleName = result ? result[1] : 'mock.toggle';
        return getMockToggle(toggleName, 50);
    })));

    fetchMock.get(apiBaseUri + '/teams', respondWith(delayed(500, teams)));
}
