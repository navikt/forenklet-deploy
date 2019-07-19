import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Environment, DeployType } from '../../models/environment';
import { TeamAwareLink } from '../team-aware-link';

interface PromoteButtonProps {
    application: string;
    environment: Environment;
    disabled: boolean;
}

function PromoteButton({application, environment, disabled}: PromoteButtonProps) {
    const deployType = environment.deployType;
    const erManuellDeploy = deployType === DeployType.PROMOTE || deployType === DeployType.RELEASE;

    if (environment.promotesTo == null || !erManuellDeploy) {
        return null;
    }

    if (disabled) {
        return <Knapp type='standard' disabled>Ingen endringer</Knapp>;
    }

    return (
        <TeamAwareLink
            className="knapp"
            to={`/promote/${application}/${environment.name}`}
        >
            Vis endring til {environment.promotesTo}
        </TeamAwareLink >
    );
}

export default PromoteButton;
