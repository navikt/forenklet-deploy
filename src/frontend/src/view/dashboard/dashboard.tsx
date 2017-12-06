import * as React from 'react';
import AppState from '../../redux/app-state';
import { connect } from 'react-redux';
import Application from '../../application/application';
import { selectApplications } from '../../application/application-selector';
import { selectEnvironments } from '../../environment/environment-selector';
import Environment from '../../environment/environment';
import Deployment from './deployment';
import PromoteButton from './promote-button';
import { selectIsLoadingInitialData } from '../../app-event/app-event-selector';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface ApplicationRowProps {
    application: Application;
    environments: Environment[];
}

function ApplicationRow({ application, environments }: ApplicationRowProps) {
    return (
        <tr>
            <td className="left">{application.name}</td>
            {environments.map((environment) =>
                [
                    <td key={`${environment.name}-promote`}>
                        <PromoteButton application={application} environment={environment}/>
                    </td>,
                    <td key={environment.name}>
                        <Deployment
                            application={application}
                            environment={environment}
                        />
                    </td>
                ]
            )}
        </tr>
    );
}

interface StateProps {
    isLoadingData: boolean;
    applications: Application[];
    environments: Environment[];
}

interface DispatchProps {
    requestDashboardData: () => void;
}

type DashboardProps = StateProps & DispatchProps;

function environmentHeaders(environment: Environment) {
    const name = environment.name;
    return [
        <th key={`${name}-deploy`}/>,
        <th key={name}>{name}</th>
    ];
}

function Dashboard({ applications, environments, isLoadingData}: DashboardProps) {
    const rader = applications.map((a) => (
        <ApplicationRow
            key={a.name}
            application={a}
            environments={environments}
        />
    ));

    return (
        <div className="dashboard__wrapper">
            <table className="dashboard__table">
                <thead>
                <tr>
                    <th>Navn</th>
                    {environments.map((e) => environmentHeaders(e))}
                </tr>
                </thead>
                <tbody>
                {isLoadingData && (
                    <tr>
                        <td colSpan={8}><NavFrontendSpinner/></td>
                    </tr>
                )}
                {rader}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoadingData: selectIsLoadingInitialData(state),
    applications: selectApplications(state),
    environments: selectEnvironments(state)
});

export default connect(mapStateToProps)(Dashboard);
