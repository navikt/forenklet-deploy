import { apiBaseUri } from '../utils/config';
import { Commit } from '../models/commit';

export function getCommitsForApplication(application: string, fromVersion?: string, toVersion?: string): Promise<Commit[]> {
    const versionOrNull = (version?: string) => version ? version : 'null';

    return fetch(`${apiBaseUri}/commit/${application}?fromVersion=${versionOrNull(fromVersion)}&toVersion=${versionOrNull(toVersion)}`)
        .then((response) => response.json());
}
