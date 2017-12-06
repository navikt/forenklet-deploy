import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteProps, Switch } from 'react-router';
import Dashboard from './view/dashboard';

function Routing({location}: RouteProps) {
    return (
        <Switch location={location}>
            <Route component={Dashboard}/>
        </Switch>
    );
}

export default withRouter(Routing);
