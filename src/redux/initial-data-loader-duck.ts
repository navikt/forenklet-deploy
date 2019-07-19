import * as queryString from 'query-string';
import { Team } from '../models/team';

function getTeamFromUrl(): string {
    const valgtTeamIUrl = queryString.parse(window.location.search).team;
    return valgtTeamIUrl ? valgtTeamIUrl as string : '';
}

function erGyldigTeam(teamFromUrl: string, teams: Team[]): boolean {
    return teams.find((team) => team.id === teamFromUrl) !== undefined;
}

export function getInitialValgtTeam(teams: Team[]) {
    const teamFromUrl = getTeamFromUrl();
    if (erGyldigTeam(teamFromUrl, teams)) {
        return teamFromUrl;
    }
    return teams[0].id;
}
