import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from '../types';
import {requestEvents} from '../app-event/app-event-duck';
import {requestStatus} from "../status/status-duck";


interface DashboardProps {
    requestDashboardData: Function;
}


class Dashboard extends React.Component<DashboardProps> {

    componentDidMount() {
        this.props.requestDashboardData();
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DashboardProps => ({
    requestDashboardData: () => {
        dispatch(requestEvents());
        dispatch(requestStatus());
    }
});

export default connect(null, mapDispatchToProps)(Dashboard);
