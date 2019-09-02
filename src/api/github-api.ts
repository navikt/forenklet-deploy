import {fetchToJson} from "./utils";
import YAML from 'yamljs';

export async function fetchNaisConfig(appname: string, version: string): Promise<string> {
    const response = await fetchToJson(`https://api.github.com/repos/navikt/${appname}/contents/nais.yaml`);
    const naisYaml = atob(response.contents);
    const versionRegex = /{{\w*version\w*}}/gi;
    naisYaml.replace(versionRegex, version);
    return YAML.parse(naisYaml);
}


export async function createGithubDeploy(naisConfig: any): Promise<any> {
    const body = {
        ref: 'master',
        description: `Deploy av version ${naisConfig.version} fra forenklet deploy`,
        environment: naisConfig.metadata.cluster,
        required_contexts: [],
        payload: {
            version: [1, 0, 0],
            team: naisConfig.metadata.labels.team,
            kubernetes: {
                resources: [naisConfig]
            }
        }
    };

    return fetchToJson(`https://api.github.com/repos/navikt/${naisConfig.metadata.name}/deployments`, {
        method: 'POST',
        body: JSON.stringify(body)
    })
}