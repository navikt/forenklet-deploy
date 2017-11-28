import * as React from 'react';
import AppState from '../redux/app-state';
import {connect} from 'react-redux';
import Applikasjon from "../application/application";
import {selectDeployment} from "../deployment/deployment-selector";
import Deployment from "../deployment/deployment";
import {EtikettSuksess} from "nav-frontend-etiketter";
import * as moment from "moment";
import 'moment/locale/nb';
import Environment from "../environment/environment";
import {Link} from 'react-router-dom';
moment.locale('nb');

interface OwnProps {
    application: Applikasjon;
    environment: Environment;
}

interface DeploymentProps {
    deployment: (Deployment | undefined);
}


function Deployment({
                        deployment
                    }: DeploymentProps) {
    if (!deployment) {
        return null;
    }

    return (
        <Link to={`/${deployment.application}/${deployment.environment}`}>
            <EtikettSuksess className="deployment">
                <p>{deployment.version}</p>
                <p>{moment(deployment.timestamp).fromNow(true)}</p>
            </EtikettSuksess>
        </Link>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): DeploymentProps => {
    return ({
        deployment: selectDeployment(state, ownProps.application, ownProps.environment)
    });
};

export default connect(mapStateToProps)(Deployment);
