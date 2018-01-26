import { apiBaseUri } from '../utils/config';
import { Team } from '../models/team';

export function getAllTeams(): Promise<Team[]> {
    const uri = `${apiBaseUri}/teams`;
    return fetch(uri)
        .then((response) => response.json());
}
