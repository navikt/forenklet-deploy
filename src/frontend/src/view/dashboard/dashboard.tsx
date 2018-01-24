import * as React from 'react';
import { AppState } from '../../redux/reducer';
import { connect, Dispatch } from 'react-redux';
import Deployment from './deployment';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import { selectIsLoadingDeploys, selectDeploys, getAllDeploys } from '../../redux/deploy-duck';
import { selectApplicationsWithChanges } from '../../redux/selectors/application-selectors';
import { ApplicationWithChanges } from '../../models/application';
import { Deploy } from '../../models/deploy';
import { getEnvironments } from '../../utils/environment';
import { Environment } from '../../models/environment';
import { Action } from 'redux';
import { getValgtTeam } from '../../redux/team-velger-duck';

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
    valgtTeam: string;
}

interface DispatchProps {
    getDeploys: (teamId: string) => void;
}

type DashboardProps = StateProps & DispatchProps;

class Dashboard extends React.PureComponent<DashboardProps> {
    componentDidMount() {
        this.props.getDeploys(this.props.valgtTeam);

    }

    componentWillReceiveProps(nextProps: StateProps) {
        if (this.props.valgtTeam !== nextProps.valgtTeam) {
            this.props.getDeploys(nextProps.valgtTeam);
        }
    }

    render() {
        const props = this.props;
        if (props.isLoadingData) {
            return <NavFrontendSpinner />;
        }

        const getDeploysForApp = (app: string): Deploy[] => props.deploys.filter((deploy) => deploy.application === app);
        const applicationsToDisplay = props.applications.filter((application) => application.hasChanges || props.showAll);

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
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoadingData: selectIsLoadingDeploys(state),
    applications: selectApplicationsWithChanges(state),
    deploys: selectDeploys(state),
    valgtTeam: getValgtTeam(state),
    showAll: state.view.showAll
});

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        getDeploys: (teamId) => {
            dispatch(getAllDeploys(teamId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
