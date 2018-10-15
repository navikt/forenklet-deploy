import { apiBaseUri } from '../utils/config';
import { Team } from '../models/team';
import { fetchToJson } from './utils';

export function getAllTeams(): Promise<Team[]> {
    return fetchToJson(`${apiBaseUri}/teams`);
}
