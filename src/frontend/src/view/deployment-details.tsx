import * as React from 'react';
import AppState from '../redux/app-state';
import {connect} from 'react-redux';
import Deployment from "../deployment/deployment";
import Application from "../application/application";
import Environment from '../environment/environment';
import {selectDeployment} from "../deployment/deployment-selector";

interface OwnProps {
    application: Application;
    environment: Environment;
}

interface DeploymentProps {
    deployment: (Deployment | undefined);
}

function DeploymentDetails({
                        deployment
                    }: DeploymentProps) {
    const version = deployment && deployment.version;
    return (
        <div>
            <h1>asdfasdf</h1>
            <h2>{version}</h2>
        </div>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): DeploymentProps => {
    return ({
        deployment: selectDeployment(state,ownProps.application,ownProps.environment)
    });
};

export default connect(mapStateToProps)(DeploymentDetails);
