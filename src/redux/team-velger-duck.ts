import { AppState } from './reducer';
import { Team } from '../models/team';
import { Environment } from '../models/environment';
import { getEnvironments } from '../utils/environment';

export interface ValgtTeamState {
    teamId?: string;
}

export interface VelgTeam {
    type: actionNames.TEAM_VALGT;
    teamId?: string;
}

const initialState: ValgtTeamState = {
    teamId: ''
};

enum actionNames {
    TEAM_VALGT = 'valgt_team/SET_VALGT_TEAM',
}

type TeamVelgerActions =
    | VelgTeam
    ;

export function velgTeam(teamId: string): VelgTeam {
    return { type: actionNames.TEAM_VALGT, teamId };
}

export function selectValgtTeamId(state: AppState): string {
    return state.valgtTeam.teamId as string;
}

export function selectValgtTeam(state: AppState): Team | undefined {
    return state.team.teams.find((team) => team.id === selectValgtTeamId(state));
}

export function selectMiljoerForValgtTeam(state: AppState): Environment[] {
    const valgtTeam = selectValgtTeam(state);
    if (valgtTeam != null) {
        return getEnvironments().filter((env) => valgtTeam.environments.includes(env.name));
    }
    return [];
}

export default function valgtTeamReducer(state: ValgtTeamState = initialState, action: TeamVelgerActions): ValgtTeamState {
    switch (action.type) {
        case actionNames.TEAM_VALGT:
            return {...state, teamId: action.teamId};
        default:
            return state;
    }
}
