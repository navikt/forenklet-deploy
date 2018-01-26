import * as React from 'react';
import { Action } from 'redux';
import { connect, Dispatch } from 'react-redux';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AppState } from '../redux/reducer';
import { getAllTeams } from '../redux/team-duck';
import { velgTeam } from '../redux/team-velger-duck';
import { Team } from '../models/team';
import { getAllDeploys } from '../redux/deploy-duck';

interface DispatchProps {
    requestInitialData: () => void;
}

interface StateProps {
    isLoading: boolean;
}

class Dashboard extends React.Component<DispatchProps & StateProps> {
    componentDidMount() {
        this.props.requestInitialData();
    }

    render() {
        if (this.props.isLoading) {
            return <NavFrontendSpinner />;
        }

        return (
            <div>{this.props.children}</div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
    requestInitialData: () => {
        dispatch(getAllTeams())
            .then((teams: Team[]) => {
                dispatch(velgTeam(teams[0].id));
                dispatch(getAllDeploys(teams[0].id));
            });
    }
});

const mapStateToProps = (state: AppState): StateProps => ({
    isLoading: state.team.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
