import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { Select } from 'nav-frontend-skjema';
import { selectTeams } from '../redux/team-duck';
import { Team } from '../models/team';
import { velgTeam } from '../redux/team-velger-duck';
import { getAllDeploys } from '../redux/deploy-duck';

interface StateProps {
    teams: Team[];
}

interface TeamVelgerDispatchProps {
    doChangeValgtTeam: (team: string) => void;
}

type TeamVelgerProps = StateProps;

function TeamVelger({ teams, doChangeValgtTeam}: TeamVelgerProps & TeamVelgerDispatchProps) {
    function handleChange(event: any) {
        doChangeValgtTeam(event.target.value);
    }

    const options = teams.map((team) => <option value={team.id} key={team.id}>{team.displayName}</option>);
    return (
        <Select label="Team" onChange={handleChange}>
            {options}
        </Select>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    teams: selectTeams(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): TeamVelgerDispatchProps => ({
    doChangeValgtTeam: (team: string) => {
        dispatch(velgTeam(team));
        dispatch(getAllDeploys(team));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamVelger);
