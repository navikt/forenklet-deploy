import * as React from 'react';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { EtikettSuksess } from 'nav-frontend-etiketter';
import { Deploy } from '../../models/deploy';
import { AppState } from '../../redux/reducer';
import { Environment } from '../../models/environment';
import { selectDeploy } from '../../redux/deploy-duck';
import Alder from '../alder';
import PromoteButton from './promote-button';

interface OwnProps {
    application: string;
    environment: Environment;
}

interface StateProps {
    deploy: Deploy;
    deployNextEnv?: Deploy | null;
}

function Deployment(props: OwnProps & StateProps) {
    if (!props.deploy) {
        return null;
    }

    const hasChanges = props.deployNextEnv && props.deployNextEnv.version !== props.deploy.version;

    return (
        <EtikettSuksess className="deployment">
            <Element className="blokk-xxs">{props.deploy.environment.name.toUpperCase()}</Element>
            <Normaltekst className="blokk-xxs">{props.deploy.version}</Normaltekst>
            <Normaltekst className="blokk-xs">Deployet for <Alder alder={props.deploy.timestamp}/> siden</Normaltekst>

            { props.deployNextEnv &&
                <PromoteButton
                    application={props.application}
                    environment={props.deploy.environment}
                    disabled={!hasChanges}
                />
            }
        </EtikettSuksess>
    );
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        deploy: selectDeploy(state, ownProps.application, ownProps.environment.name)!,
        deployNextEnv: ownProps.environment.promotesTo ? selectDeploy(state, ownProps.application, ownProps.environment.promotesTo) : null
    };
}

export default connect(mapStateToProps)(Deployment);
