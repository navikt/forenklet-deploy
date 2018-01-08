import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import Kvittering from './kvittering/kvittering';
import GoNogo from './go-nogo/go-nogo';

function ReleaseNote(props: RouteComponentProps<{}>) {
    return (
        <Switch location={props.location}>
            <Route path={props.match.path + '/go-nogo'} component={GoNogo}/>
            <Route path={props.match.path + '/kvittering'} component={Kvittering}/>
            <Route path={props.match.path} component={GoNogo}/>
        </Switch>
    );
}

export default withRouter(ReleaseNote);
