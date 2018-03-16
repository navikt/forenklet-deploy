import { apiBaseUri } from '../utils/config';
import { ReleaseNote, ReleaseWithCommitsAndIssues } from '../models/release';

export function lagreKvittering(releases: ReleaseWithCommitsAndIssues[]): Promise<ReleaseNote> {
    const options = {
        method: 'POST',
        body: JSON.stringify(releases)
    };
    return fetch(`${apiBaseUri}/kvittering`, options)
        .then((response) => {
            const status = response.status;
            if (status === 200) {
                return response.json();
            } else {
                return response.json().then((json) => {
                    return Promise.reject(json.detaljer.feilMelding);
                });
            }
        });
}
