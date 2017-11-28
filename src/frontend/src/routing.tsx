import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {Route, RouteComponentProps, RouteProps, Switch} from "react-router";
import DeploymentDetails from "./view/deployment-details";
import Dashboard from "./view/dashboard";


interface DeploymentDetailsProps {
    application: string;
    environment: string;
}

function deploymentDetails(props: RouteComponentProps<DeploymentDetailsProps>) {
    let params = props.match.params;
    let application = {name: params.application};
    let environment = {name: params.environment};
    return <DeploymentDetails
        application={application}
        environment={environment}
    />
}

function Routing({location}: RouteProps) {
    return (
        <Switch location={location}>
            <Route path='/:application/:environment' component={deploymentDetails}/>
            <Route component={Dashboard}/>
        </Switch>
    );
}

export default withRouter(Routing);

