import Environment, {DeployType} from './environment';
import AppState from '../redux/app-state';

const environments = [
    {
        name: "t6",
        deployType: DeployType.AUTOMATIC
    },
    {
        name: "q6",
        deployType: DeployType.PROMOTE
    },
    {
        name: "q0",
        deployType: DeployType.PROMOTE
    },
    {
        name: "p",
        deployType: DeployType.RELEASE
    }
];

const environmentMap = {};
environments.forEach(e => {
    environmentMap[e.name] = e;
});

export function selectEnvironments(state: AppState): Environment[] {
    return environments
}

export function selectEnvironment(enviromentName: string): Environment {
    return environmentMap[enviromentName]
}

