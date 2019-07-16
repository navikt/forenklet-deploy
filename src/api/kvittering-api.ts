import { apiBaseUri } from '../utils/config';
import { ReleaseNote, ReleaseWithCommitsAndIssues } from '../models/release';
import { fetchToJson } from './utils';

export function lagreKvittering(releases: ReleaseWithCommitsAndIssues[]): Promise<ReleaseNote> {
    const options = {
        method: 'POST',
        body: JSON.stringify(releases)
    };
    return fetchToJson(`${apiBaseUri}/kvittering`, options);
}
