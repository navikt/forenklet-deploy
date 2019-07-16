import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import Dashboard from './view/dashboard/dashboard';
import Promote from './view/promote/promote';
import Promotering from './view/promotering/promotering';

function Routing(props: RouteComponentProps<{}>) {
    return (
        <Switch location={props.location}>
            <Route exact={true} path="/promote" component={Promotering}/>
            <Route path="/promote/:app/:env" component={Promote}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route component={Promotering}/>
        </Switch>
    );
}

export default withRouter(Routing);
