import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Select } from 'nav-frontend-skjema';
import { selectIsLoadingTeams, selectTeams } from '../redux/team-duck';
import { Team } from '../models/team';
import { velgTeam } from '../redux/team-velger-duck';
import { getAllDeploys } from '../redux/deploy-duck';

interface StateProps {
    isLoadingData: boolean;
    teams: Team[];
}

interface TeamVelgerDispatchProps {
    doChangeValgtTeam: (team: string) => void;
}

type TeamVelgerProps = StateProps;

function TeamVelger({ isLoadingData, teams, doChangeValgtTeam}: TeamVelgerProps & TeamVelgerDispatchProps) {

    function handleChange(event: any) {
        doChangeValgtTeam(event.target.value);
    }

    if (isLoadingData) {
        return <NavFrontendSpinner />;
    }

    const options = teams.map((team) => <option value={team.id} key={team.id}>{team.displayName}</option>);
    return (
        <Select label="Team" onChange={handleChange}>
            {options}
        </Select>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoadingData: selectIsLoadingTeams(state),
    teams: selectTeams(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): TeamVelgerDispatchProps => ({
    doChangeValgtTeam: (team: string) => {
        dispatch(velgTeam(team));
        dispatch(getAllDeploys(team));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamVelger);
