import * as React from 'react';
import Application from "../application/application";
import Environment from "../environment/environment";
import {Knapp} from "nav-frontend-knapper";


interface PromoteButtonProps {
    application: Application,
    environment: Environment
}

function PromoteButton({
                           application,
                           environment
                       }: PromoteButtonProps) {

    // TODO forbedre dette!
    function promote() {
        let environmentClass = environment.name[0];
        if (environmentClass === "t") {
            window.open(`http://bekkci.devillo.no/job/forenklet_oppfolging/job/${application.name}/job/-promotering-/`);
        } else if (environmentClass === "q") {
            window.open(`http://bekkci.devillo.no/job/forenklet_oppfolging/job/${application.name}/job/-release-/`);
        }
    }

    return (
        <Knapp type="standard" onClick={promote}>&gt;</Knapp>
    )
}

export default PromoteButton;
