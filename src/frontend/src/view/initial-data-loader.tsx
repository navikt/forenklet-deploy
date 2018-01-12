import * as React from 'react';
import { Action } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { getAllDeploys } from '../redux/deploy-duck';

interface DashboardProps {
    requestInitialData: () => void;
}

class Dashboard extends React.Component<DashboardProps> {
    componentDidMount() {
        this.props.requestInitialData();
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DashboardProps => ({
    requestInitialData: () => {
        dispatch(getAllDeploys());
    }
});

export default connect(null, mapDispatchToProps)(Dashboard);
