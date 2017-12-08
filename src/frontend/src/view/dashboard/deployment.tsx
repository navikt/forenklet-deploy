import * as React from 'react';
import { connect } from 'react-redux';
import AppState from '../../redux/app-state';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { EtikettSuksess } from 'nav-frontend-etiketter';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Applikasjon from '../../application/application';
import { selectApplicationEnvironmentDeployment } from '../../deployment/deployment-selector';
import Deployment from '../../deployment/deployment';
import Environment from '../../environment/environment';
import { selectIsLoadingInitialData } from '../../app-event/app-event-selector';
import Alder from '../alder';
import PromoteButton from './promote-button';

interface OwnProps {
    application: Applikasjon;
    environment: Environment;
}

interface DeploymentProps {
    deployment: (Deployment | undefined);
    isLoadingData: boolean;
}

function Deployment(props: DeploymentProps & OwnProps) {
    if (props.isLoadingData) {
        return <NavFrontendSpinner/>;
    }
    if (!props.deployment) {
        return null;
    }

    return (
        <EtikettSuksess className="deployment">
            <Element className="blokk-s">{props.environment.name.toUpperCase()}</Element>
            <Normaltekst className="blokk-xxs">{props.deployment.version}</Normaltekst>
            <Normaltekst className="blokk-s"><Alder alder={props.deployment.timestamp}/></Normaltekst>
            { props.environment.promotesTo && <PromoteButton application={props.application} environment={props.environment }/>}
        </EtikettSuksess>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): DeploymentProps => {
    return ({
        isLoadingData: selectIsLoadingInitialData(state),
        deployment: selectApplicationEnvironmentDeployment(state, ownProps.application, ownProps.environment)
    });
};

export default connect(mapStateToProps)(Deployment);
