import * as React from 'react';
import AppState from '../redux/app-state';
import { connect } from 'react-redux';
import Applikasjon from '../application/application';
import { selectApplicationEnvironmentDeployment } from '../deployment/deployment-selector';
import Deployment from '../deployment/deployment';
import { EtikettFokus, EtikettSuksess } from 'nav-frontend-etiketter';
import Environment from '../environment/environment';
import { Link } from 'react-router-dom';
import { selectIsLoadingInitialData } from '../app-event/app-event-selector';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Alder from './alder';

interface OwnProps {
    application: Applikasjon;
    environment: Environment;
}

interface DeploymentProps {
    deployment: (Deployment | undefined);
    isLoadingData: boolean;
}

function Deployment({
                        deployment,
                        isLoadingData
                    }: DeploymentProps) {
    if (isLoadingData) {
        return <NavFrontendSpinner/>;
    }
    if (!deployment) {
        return null;
    }

    const Etikett = true ? EtikettSuksess : EtikettFokus;
    return (
        <Link to={`/${deployment.application}/${deployment.environment}`}>
            <Etikett className="deployment">
                <p>{deployment.version}</p>
                <p><Alder alder={deployment.timestamp}/></p>
            </Etikett>
        </Link>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): DeploymentProps => {
    return ({
        isLoadingData: selectIsLoadingInitialData(state),
        deployment: selectApplicationEnvironmentDeployment(state, ownProps.application, ownProps.environment)
    });
};

export default connect(mapStateToProps)(Deployment);
