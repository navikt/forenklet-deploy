import * as React from 'react';
import AppState from '../../redux/app-state';
import { connect } from 'react-redux';
import Application from '../../application/application';
import { selectApplications } from '../../application/application-selector';
import { selectEnvironments } from '../../environment/environment-selector';
import Environment from '../../environment/environment';
import Deployment from './deployment';
import { selectIsLoadingInitialData } from '../../app-event/app-event-selector';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';

interface ApplicationRowProps {
    application: Application;
    environments: Environment[];
}

function ApplicationRow({ application, environments }: ApplicationRowProps) {
    return (
        <section className="dashboard--applicationrow blokk-l">
            <Undertittel className="blokk-xs">{application.name}</Undertittel>

            <div className="dashboard--deployments">
                {environments.map((environment) => (
                    <Deployment
                        key={environment.name}
                        application={application}
                        environment={environment}
                    />
                    )
                )}
            </div>
        </section>
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

function Dashboard({ applications, environments, isLoadingData}: DashboardProps) {
    return (
        <div className="dashboard__wrapper">
            {isLoadingData && <NavFrontendSpinner/> }

            {applications.map((a) => (
                <ApplicationRow
                    key={a.name}
                    application={a}
                    environments={environments}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoadingData: selectIsLoadingInitialData(state),
    applications: selectApplications(state),
    environments: selectEnvironments(state)
});

export default connect(mapStateToProps)(Dashboard);
