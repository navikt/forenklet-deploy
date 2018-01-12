import { apiBaseUri } from '../utils/config';
import { Deploy } from '../models/deploy';
import { getEnvironmentByName } from '../utils/environment';

export interface VeraDeploy {
    id: string;
    application: string;
    version: string;
    deployed_timestamp: string;
    environment: string;
}

export function veraDeployToDeploy(veraDeploy: VeraDeploy): Deploy {
    const unixtime = (new Date(veraDeploy.deployed_timestamp)).getTime();
    const timestamp = isNaN(unixtime) ? (new Date()).getTime() : unixtime;

    return {
        id: veraDeploy.id,
        application: veraDeploy.application,
        timestamp,
        version: veraDeploy.version,
        environment: getEnvironmentByName(veraDeploy.environment)
    };
}

export function getAllDeploys(): Promise<Deploy[]> {
    const uri = `${apiBaseUri}/deploy`;
    return fetch(uri)
        .then((response) => response.json())
        .then((deploys: VeraDeploy[]) => Promise.resolve(deploys.map(veraDeployToDeploy)));
}
