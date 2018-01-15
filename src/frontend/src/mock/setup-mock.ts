import * as fetchMock from 'fetch-mock';
import { respondWith, delayed } from './utils';
import { veraDeploys } from './deploys';
import { apiBaseUri } from '../utils/config';
import { getMockCommits } from './commit-for-release-mock';

export function setupMock() {
    /* tslint:disable-next-line */
    console.log('### MOCK ENABLED! ###');
    (fetchMock as any)._mock();

    fetchMock.get(apiBaseUri + '/deploy', respondWith(delayed(500, veraDeploys)));
    fetchMock.get('begin:' + apiBaseUri + '/commit', respondWith(delayed(500, (uri: string) => {
        const re = /\/commit\/([a-zA-Z]*)\?/;
        const result = re.exec(uri);
        const applicationName = result ? result[1] : 'mock-app';
        return getMockCommits(applicationName);
    })));
}
