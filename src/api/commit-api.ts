import { apiBaseUri } from '../utils/config';
import { Commit } from '../models/commit';
import { fetchToJson } from './utils';

export function getCommitsForApplication(application: string, fromVersion?: string, toVersion?: string): Promise<Commit[]> {
    const versionOrNull = (version?: string) => version ? version : 'null';

    return fetchToJson(`${apiBaseUri}/commit/${application}?fromVersion=${versionOrNull(fromVersion)}&toVersion=${versionOrNull(toVersion)}`);
}
