import { apiBaseUri } from '../utils/config';
import { Commit } from '../models/commit';

export function getCommitsForApplication(application: string, fromVersion: string, toVersion: string): Promise<Commit[]> {
    return fetch(`${apiBaseUri}/commit/${application}?fromVersion=${fromVersion}&toVersion=${toVersion}`)
        .then((response) => response.json());
}
