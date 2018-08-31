import * as React from 'react';
import { AppState } from '../../redux/reducer';
import { connect } from 'react-redux';
import Deployment from './deployment';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import { selectIsLoadingDeploys } from '../../redux/deploy-duck';
import { selectApplicationsWithChanges } from '../../redux/selectors/application-selectors';
import { ApplicationWithChanges } from '../../models/application';
import { Environment } from '../../models/environment';
import { selectMiljoerForValgtTeam } from '../../redux/team-velger-duck';
import { filterFunction, selectFilter } from '../../redux/application-filter-duck';

interface ApplicationRowProps {
    application: ApplicationWithChanges;
    environments: Environment[];
}

function ApplicationRow({application, environments}: ApplicationRowProps) {
    return (
        <section className="dashboard--applicationrow blokk-m">
            <Undertittel className="blokk-xxs">{application.name}</Undertittel>

            <div className="dashboard--deployments">
                {environments.map((env: Environment) => (
                        <Deployment
                            key={`${application.name}-${env.name}`}
                            application={application.name}
                            environment={env}
                        />
                    )
                )}
            </div>
        </section>
    );
}

interface StateProps {
    isLoadingData: boolean;
    applications: ApplicationWithChanges[];
    showAll: boolean;
    environments: Environment[];
    filter: string;
}

interface DispatchProps {
    getDeploys: (teamId: string) => void;
}

type DashboardProps = StateProps & DispatchProps;

function Dashboard({isLoadingData, applications, showAll, environments, filter}: DashboardProps) {
    if (isLoadingData) {
        return <NavFrontendSpinner type="L"/>;
    }

    const applicationsToDisplay = applications
        .filter((application) => application.hasChanges || showAll)
        .filter((application) => filterFunction(application.name, filter));

    return (
        <div className="dashboard__wrapper">
            {applicationsToDisplay.map((app) => (
                <ApplicationRow
                    environments={environments}
                    key={app.name}
                    application={app}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoadingData: selectIsLoadingDeploys(state),
    applications: selectApplicationsWithChanges(state),
    environments: selectMiljoerForValgtTeam(state),
    showAll: state.view.showAll,
    filter: selectFilter(state),
});

export default connect(mapStateToProps)(Dashboard);
