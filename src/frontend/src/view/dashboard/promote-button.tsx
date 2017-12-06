import * as React from 'react';
import Application from '../../application/application';
import Environment, { DeployType } from '../../environment/environment';
import { selectApplicationEnvironmentDeployment } from '../../deployment/deployment-selector';
import AppState from '../../redux/app-state';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface OwnProps {
    application: Application;
    environment: Environment;
}

interface StateProps {
    harDeployment: boolean;
}

type PromoteButtonProps = OwnProps & StateProps;

function PromoteButton({harDeployment, application, environment}: PromoteButtonProps) {

    const deployType = environment.deployType;
    if (!harDeployment || deployType === DeployType.AUTOMATIC) {
        return null;
    }

    /* TODO: Trekk ut til deploysiden
    function promote() {
        if (deployType === DeployType.PROMOTE) {
            window.open(`http://bekkci.devillo.no/job/forenklet_oppfolging/job/${application.name}/job/-promotering-${environment.name}-/`);
        } else if (deployType === DeployType.RELEASE) {
            window.open(`http://bekkci.devillo.no/job/forenklet_oppfolging/job/${application.name}/job/-release-/`);
        }
    }
    */

    return (
        <NavLink
            className="knapp"
            to={`/promote/${application.name}/${environment.name}`}
        >
            &gt;
        </NavLink>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
    return ({
        harDeployment: !!selectApplicationEnvironmentDeployment(state, ownProps.application, ownProps.environment)
    });
};

export default connect(mapStateToProps)(PromoteButton);
