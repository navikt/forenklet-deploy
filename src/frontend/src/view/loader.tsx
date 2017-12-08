import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { requestEvents } from '../app-event/app-event-duck';

interface DashboardProps {
    requestDashboardData: () => void;
}

class Dashboard extends React.Component<DashboardProps> {

    componentDidMount() {
        this.props.requestDashboardData();
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DashboardProps => ({
    requestDashboardData: () => {
        dispatch(requestEvents());
    }
});

export default connect(null, mapDispatchToProps)(Dashboard);
