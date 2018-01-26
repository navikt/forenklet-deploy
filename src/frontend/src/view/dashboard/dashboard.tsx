import * as React from 'react';
import { AppState } from '../../redux/reducer';
import { connect } from 'react-redux';
import Deployment from './deployment';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import { selectIsLoadingDeploys, selectDeploys } from '../../redux/deploy-duck';
import { selectApplicationsWithChanges } from '../../redux/selectors/application-selectors';
import { ApplicationWithChanges } from '../../models/application';
import { Deploy } from '../../models/deploy';
import { getEnvironments } from '../../utils/environment';
import { Environment } from '../../models/environment';

interface ApplicationRowProps {
    application: ApplicationWithChanges;
    deploysForApp: Deploy[];
}

function ApplicationRow({ application, deploysForApp }: ApplicationRowProps) {
    return (
        <section className="dashboard--applicationrow blokk-m">
            <Undertittel className="blokk-xxs">{application.name}</Undertittel>

            <div className="dashboard--deployments">
                {getEnvironments().map((env: Environment) => (
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
    deploys: Deploy[];
}

interface DispatchProps {
    getDeploys: (teamId: string) => void;
}

type DashboardProps = StateProps & DispatchProps;

function Dashboard({ isLoadingData, deploys, applications, showAll }: DashboardProps) {
    if (isLoadingData) {
        return <NavFrontendSpinner />;
    }

    const getDeploysForApp = (app: string): Deploy[] => deploys.filter((deploy) => deploy.application === app);
    const applicationsToDisplay = applications.filter((application) => application.hasChanges || showAll);

    return (
        <div className="dashboard__wrapper">
            {applicationsToDisplay.map((app) => (
                <ApplicationRow
                    key={app.name}
                    application={app}
                    deploysForApp={getDeploysForApp(app.name)}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoadingData: selectIsLoadingDeploys(state),
    applications: selectApplicationsWithChanges(state),
    deploys: selectDeploys(state),
    showAll: state.view.showAll
});

export default connect(mapStateToProps)(Dashboard);
