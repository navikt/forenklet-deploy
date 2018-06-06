import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Select } from 'nav-frontend-skjema';
import { selectTeams } from '../redux/team-duck';
import { Team } from '../models/team';
import { selectValgtTeamId, velgTeam } from '../redux/team-velger-duck';
import { getAllDeploys } from '../redux/deploy-duck';
import { AsyncDispatch } from '../redux/redux-utils';

interface StateProps {
    teams: Team[];
    valgtTeamId: string;
}

interface TeamVelgerDispatchProps {
    doChangeValgtTeam: (team: string) => void;
}

type TeamVelgerProps = StateProps;

function TeamVelger({ teams, doChangeValgtTeam, valgtTeamId}: TeamVelgerProps & TeamVelgerDispatchProps) {
    function handleChange(event: any) {
        doChangeValgtTeam(event.target.value);
    }

    const options = teams.map((team) => <option value={team.id} key={team.id}>{team.displayName}</option>);
    return (
        <Select label="Team" onChange={handleChange} value={valgtTeamId}>
            {options}
        </Select>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    teams: selectTeams(state),
    valgtTeamId: selectValgtTeamId(state)
});

const mapDispatchToProps = (dispatch: AsyncDispatch): TeamVelgerDispatchProps => ({
    doChangeValgtTeam: (team: string) => {
        location.search = `team=${team}`;
        dispatch(velgTeam(team));
        dispatch(getAllDeploys(team));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamVelger);
