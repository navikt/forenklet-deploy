import { AppState } from './reducer';

export interface ValgtTeamState {
    teamId: string;
}

export interface VelgTeam {
    type: actionNames.TEAM_VALGT;
    teamId: string;
}

const initialState: ValgtTeamState = {
    teamId: ''
};

enum actionNames {
    TEAM_VALGT = 'valgt_team/SET_VALGT_TEAM',
}

type ReleaseActions =
    | VelgTeam
    ;

export function velgTeam(teamId: string): VelgTeam {
    return { type: actionNames.TEAM_VALGT, teamId };
}

export function getValgtTeam(state: AppState): string {
    return state.valgtTeam.teamId;
}

export default function valgtTeamReducer(state: ValgtTeamState = initialState, action: ReleaseActions) {
    switch (action.type) {
        case actionNames.TEAM_VALGT:
            return {...state, teamId: action.teamId};
        default:
            return state;
    }
}
