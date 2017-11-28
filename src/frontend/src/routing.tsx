import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {Route, RouteComponentProps, RouteProps, Switch} from 'react-router';
import DeploymentDetails, {OwnProps as DeploymentDetailsProps } from './view/deployment-details';
import Dashboard from './view/dashboard';
import {connect} from "react-redux";
import AppState from "./redux/app-state";
import {selectEnvironment} from "./environment/environment-selector";
import {selectApplication} from './application/application-selector';

interface RoutedDeploymentDetailsProps {
    application: string;
    environment: string;
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<RoutedDeploymentDetailsProps>): DeploymentDetailsProps => {
    const params = ownProps.match.params;
    return {
        environment: selectEnvironment(params.environment),
        application: selectApplication(state, params.application),
    }
};

const RoutedDeploymentDetails = connect(mapStateToProps)(DeploymentDetails);


function Routing({location}: RouteProps) {
    return (
        <Switch location={location}>
            <Route path="/:application/:environment" component={RoutedDeploymentDetails}/>
            <Route component={Dashboard}/>
        </Switch>
    );
}

export default withRouter(Routing);
