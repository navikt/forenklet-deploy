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
        <section className="dashboard--applicationrow blokk-m">
            <Undertittel className="blokk-xxs">{application.name}</Undertittel>

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
    showAll: boolean;
}

interface DispatchProps {
    requestDashboardData: () => void;
}

type DashboardProps = StateProps & DispatchProps;

function sortApplication(a: Application, b: Application): number {
    if(a.hasChanges !== b.hasChanges) {
        return a.hasChanges ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
}

function Dashboard({ applications, environments, isLoadingData, showAll}: DashboardProps) {
    const applicationsToDisplay = applications
        .filter((app) => app.hasChanges || showAll)
        .sort(sortApplication);

    if (isLoadingData) {
        return <NavFrontendSpinner />;
    }

    return (
        <div className="dashboard__wrapper">
            {applicationsToDisplay.map((a) => (
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
    environments: selectEnvironments(state),
    showAll: state.view.showAll
});

export default connect(mapStateToProps)(Dashboard);
