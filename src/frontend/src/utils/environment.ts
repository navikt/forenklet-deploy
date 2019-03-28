import { DeployType, Environment } from '../models/environment';
import { logError } from './log';

const environments: Environment[] = [
    {
        name: 't10',
        deployType: DeployType.PROMOTE,
        promotesTo: 'q10'
    },
    {
        name: 't4',
        deployType: DeployType.PROMOTE,
        promotesTo: 'q1'
    },
    {
        name: 't6',
        deployType: DeployType.PROMOTE,
        promotesTo: 'q6'
    },
    {
        name: 'q10',
        deployType: DeployType.PROMOTE,
        promotesTo: 'q0'
    },
    {
        name: 'q6',
        deployType: DeployType.PROMOTE,
        promotesTo: 'q0'
    },
    {
        name: 'q0',
        deployType: DeployType.RELEASE,
        promotesTo: 'p'
    },
    {
        name: 'q1',
        deployType: DeployType.NONE,
    },
    {
        name: 'q7',
        deployType: DeployType.NONE,
    },
    {
        name: 'p',
        deployType: DeployType.NONE
    }
];

const environmentMap = {};
environments.forEach((e) => {
    environmentMap[e.name] = e;
});

export function getEnvironments(): Environment[] {
    return environments;
}

export function getEnvironmentByName(enviromentName: string): Environment {
    const env = environmentMap[enviromentName];
    if (!env) {
        logError(`Environment ${enviromentName} not supported! Returning unsupported environment!`);
        return {
            name: enviromentName,
            deployType: DeployType.NONE
        };
    }
    return env;

}
