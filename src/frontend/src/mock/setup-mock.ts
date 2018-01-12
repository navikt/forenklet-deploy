import * as fetchMock from 'fetch-mock';
import { respondWith, delayed } from './utils';
import { veraDeploys } from './deploys';
import { apiBaseUri } from '../utils/config';

export function setupMock() {
    /* tslint:disable-next-line */
    console.log('### MOCK ENABLED! ###');
    (fetchMock as any)._mock();

    fetchMock.get(apiBaseUri + '/deploy', respondWith(delayed(500, veraDeploys)));
}
