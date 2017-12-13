import Environment, { DeployType } from './environment';
import AppState from '../redux/app-state';

const environments: Environment[] = [
    {
        name: 't6',
        deployType: DeployType.PROMOTE,
        promotesTo: 'q6'
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

export function selectEnvironments(state: AppState): Environment[] {
    return environments;
}

export function selectEnvironment(enviromentName: string): Environment {
    return environmentMap[enviromentName];
}
