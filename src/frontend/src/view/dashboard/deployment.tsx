import * as React from 'react';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Etikett from 'nav-frontend-etiketter';
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
    deploy?: Deploy;
    deployNextEnv?: Deploy | null;
}

function Deployment(props: OwnProps & StateProps) {
    const hasChanges = props.deploy && props.environment.promotesTo && (props.deployNextEnv == null || props.deploy.version !== props.deployNextEnv.version);

    return (
        <Etikett type={ props.deploy ? 'suksess' : 'info' } className="deployment">
            <Element className="blokk-xxs">{props.environment.name.toUpperCase()}</Element>
            <Normaltekst className="blokk-xxs">{ props.deploy ? props.deploy.version : 'Ikke deployet' }</Normaltekst>
            { props.deploy && <Normaltekst className="blokk-xs">Deployet for <Alder alder={props.deploy.timestamp}/> siden</Normaltekst> }

            { props.environment.promotesTo && props.deploy &&
                <PromoteButton
                    application={props.application}
                    environment={props.deploy.environment}
                    disabled={!hasChanges}
                />
            }
        </Etikett>
    );
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        deploy: selectDeploy(state, ownProps.application, ownProps.environment.name)!,
        deployNextEnv: ownProps.environment.promotesTo ? selectDeploy(state, ownProps.application, ownProps.environment.promotesTo) : null
    };
}

export default connect(mapStateToProps)(Deployment);
