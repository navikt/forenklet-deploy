import { DeployType, Environment } from '../models/environment';

const environments: Environment[] = [
    {
        name: 't10',
        deployType: DeployType.PROMOTE,
        promotesTo: 'q10'
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
    return environmentMap[enviromentName] || {
        name: enviromentName,
        deployType: DeployType.NONE
    };
}
