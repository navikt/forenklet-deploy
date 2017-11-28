import * as React from 'react';
import AppState from '../redux/app-state';
import {connect} from 'react-redux';
import Application from "../application/application";
import {selectApplications} from "../application/application-selector";
import {selectEnvironments} from "../environment/environment-selector";
import Environment from "../environment/environment";
import Deployment from "./deployment";
import {Dispatch} from "../types";
import {requestEvents} from "../app-event/app-event-duck";
import {canPromote} from "../environment/environment-util";
import PromoteButton from "./promote-button";


interface ApplikasjonsRadProps {
    application: Application,
    environments: Environment[]
}

function ApplikasjonsRad({
                             application,
                             environments
                         }: ApplikasjonsRadProps) {
    return (
        <tr>
            <td className="left">{application.name}</td>
            {environments.map(environment =>
                [
                    <td key={environment.name}>
                        <Deployment
                            application={application}
                            environment={environment}
                        />
                    </td>,
                    <td key={`${environment.name}-promote`}>
                        {canPromote(environment) &&
                        <PromoteButton application={application} environment={environment}/>}
                    </td>
                ]
            )}
        </tr>
    )
}


interface StateProps {
    applications: Application[];
    environments: Environment[];
}

interface DispatchProps {
    requestDashboardData: Function;
}

type DashboardProps = StateProps & DispatchProps;

function environmentHeaders(environment: Environment) {
    let name = environment.name;
    return [
        <th key={name}>{name}</th>,
        canPromote(environment) && <th key={`${name}-deploy`}/>
    ];
}

class Dashboard extends React.Component<DashboardProps> {

    componentDidMount() {
        this.props.requestDashboardData();
    }

    render() {
        const {
            applications,
            environments
        } = this.props;
        return (
            <div>
                <table className="dashboard__table">
                    <thead>
                    <tr>
                        <th/>
                        {environments.map(environmentHeaders)}
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map(a => <ApplikasjonsRad
                        key={a.name}
                        application={a}
                        environments={environments}/>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    applications: selectApplications(state),
    environments: selectEnvironments(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    requestDashboardData: () => {
        dispatch(requestEvents());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
