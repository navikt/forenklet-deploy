import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import Dashboard from './view/dashboard/dashboard';
import Promote from './view/promote/promote';
import ReleaseNote from './view/release-note/release-note';

function Routing(props: RouteComponentProps<{}>) {
    return (
        <Switch location={props.location}>
            <Route path="/promote/:app/:env" component={Promote}/>
            <Route path="/releasenote" component={ReleaseNote} />
            <Route component={Dashboard}/>
        </Switch>
    );
}

export default withRouter<{}>(Routing);
