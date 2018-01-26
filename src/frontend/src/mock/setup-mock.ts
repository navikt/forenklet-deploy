import * as fetchMock from 'fetch-mock';
import { respondWith, delayed } from './utils';
import { veraDeploys } from './deploys';
import { apiBaseUri } from '../utils/config';
import { getMockIssue } from './jira-issue-mock';
import { getMockCommits } from './commit-for-release-mock';
import { teams } from './teams';

export function setupMock() {
    /* tslint:disable-next-line */
    console.log('### MOCK ENABLED! ###');
    (fetchMock as any)._mock();

    fetchMock.get(apiBaseUri + `/deploy?team=${teams[0].id}`, respondWith(delayed(500, veraDeploys)));
    fetchMock.get(apiBaseUri + `/deploy?team=${teams[1].id}`, respondWith(delayed(500, veraDeploys)));

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

    fetchMock.get(apiBaseUri + '/teams', respondWith(delayed(500, teams)));
}
