import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import ConmmitsForRelease from './commits-for-release';
import { NavLink } from 'react-router-dom';
import { getMockCommitsForApp } from '../../mock/commit-for-release-mock';

interface PromoteRouteProps {
    app: string;
    env: string;
}

function Promote(props: RouteComponentProps<PromoteRouteProps>) {
    return (
        <section>
            <Innholdstittel className="blokk-m">Promoter {props.match.params.app} til {props.match.params.env}</Innholdstittel>
            <Undertittel className="blokk-xs">Endringer fra 124.20170205.1213 til 127.20170207.1457</Undertittel>
            <ConmmitsForRelease className="blokk-m" commits={getMockCommitsForApp(props.match.params.app)} />
            <div className="knapperad-promoter">
                <NavLink className="knapp knapp--hoved" to={``}>
                    Promoter
                </NavLink>
                <NavLink className="knapp" to="/">
                    Avbryt
                </NavLink>
            </div>
        </section>
    );
}

export default withRouter(Promote);
