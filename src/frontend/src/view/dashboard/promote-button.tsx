import * as React from 'react';
import Application from '../../application/application';
import Environment, { DeployType } from '../../environment/environment';
import { NavLink } from 'react-router-dom';

interface PromoteButtonProps {
    application: Application;
    environment: Environment;
}

function PromoteButton({application, environment}: PromoteButtonProps) {
    const deployType = environment.deployType;
    const erManuellDeploy = deployType === DeployType.PROMOTE || deployType === DeployType.RELEASE;

    if (environment.promotesTo == null || !erManuellDeploy) {
        return null;
    }

    return (
        <NavLink
            className="knapp"
            to={`/promote/${application.name}/${environment.name}`}
        >
            Promoter til {environment.promotesTo}
        </NavLink>
    );
}

export default PromoteButton;
