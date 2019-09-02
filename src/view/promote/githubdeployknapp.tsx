import React, {useEffect, useState} from "react";
import {Knapp} from "nav-frontend-knapper";
import {createGithubDeploy, fetchNaisConfig} from "../../api/github-api";

interface ProdsettknappProps {
    version: string,
    app: string
}

enum DeployStatus {
    NOT_STARTED,
    PENDING,
    OK,
    ERROR
}

export const GithubDeployKnapp = (props: ProdsettknappProps) => {

    const [deployState, setDeployState] = useState(DeployStatus.NOT_STARTED);


    async function deploy(app: string, version: string): Promise<string> {

        const naisConfig = await fetchNaisConfig(app, version);
        const deploy = await createGithubDeploy(naisConfig);
        const response = await deploy.json();
        return response.statuses_url;
    }

    async function pollGithubDeployStatus(statusUrl: string) {

        const statusResponse = await fetch(statusUrl);
        const statusResponseBody = await statusResponse.json();
        const state = statusResponseBody[0].state;

        if (state === 'success') {
            setDeployState(DeployStatus.OK);
        } else if (state === 'error') {
            setDeployState(DeployStatus.ERROR);
        }
    }


    useEffect(() => {

            if (DeployStatus.NOT_STARTED) {

                deploy(props.app, props.version)
                    .then(
                        statusUrl => {

                            const intervalId = setInterval(() => {
                                pollGithubDeployStatus(statusUrl);
                            });

                            setTimeout(() => {
                                clearInterval(intervalId);
                                setDeployState(DeployStatus.ERROR);
                            }, 120000);
                            setDeployState(DeployStatus.PENDING);
                        }
                    );
            }
        },
        [deployState]
    );

    return (<Knapp
            type='hoved'
            disabled={deployState === DeployStatus.PENDING}
            spinner={deployState === DeployStatus.PENDING}
            onClick={() => setDeployState(DeployStatus.PENDING)}
        >
            Prodsett
        </Knapp>
    )
};