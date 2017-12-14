import * as React from 'react';
import { connect } from 'react-redux';
import AppState from '../../redux/app-state';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { EtikettSuksess } from 'nav-frontend-etiketter';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Applikasjon from '../../application/application';
import { selectApplicationEnvironmentDeployment, selectReleaseForApplication, Release } from '../../deployment/deployment-selector';
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
    release: Release;
    isLoadingData: boolean;
    deployment: Deployment;
}

function Deployment(props: DeploymentProps & OwnProps) {
    if (props.isLoadingData) {
        return <NavFrontendSpinner/>;
    }
    if (!props.deployment) {
        return null;
    }

    const harEndringer = props.release.toVersion !== props.release.fromVersion;
    return (
        <EtikettSuksess className="deployment">
            <Element className="blokk-xxs">{props.environment.name.toUpperCase()}</Element>
            <Normaltekst className="blokk-xxs">{props.deployment.version}</Normaltekst>
            <Normaltekst className="blokk-xs">Deployet for <Alder alder={props.deployment.timestamp}/> siden</Normaltekst>
            { props.environment.promotesTo && <PromoteButton application={props.application} environment={props.environment} disabled={!harEndringer}/>}
        </EtikettSuksess>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): DeploymentProps => {
    return ({
        isLoadingData: selectIsLoadingInitialData(state),
        release: selectReleaseForApplication(state, ownProps.application.name, ownProps.environment.name),
        deployment: selectApplicationEnvironmentDeployment(state, ownProps.application, ownProps.environment)
    });
};

export default connect(mapStateToProps)(Deployment);
