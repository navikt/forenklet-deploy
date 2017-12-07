import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import ConmmitsForRelease from './commits-for-release';
import { NavLink } from 'react-router-dom';
import Commit from '../../dev/commit';

function createHash(text: string): string {
    return btoa(text).slice(0, 32);
}

function createCommit(app: string): Commit {
    return {
        hash: createHash(`hei${Math.random()}noetekst${Math.random()}`),
        application: app,
        timestamp: Date.now(),
        message: 'PUS-81 Lorem ipsum doler sit amet. Her er det litt lenger tekst som tar litt plass.',
        author: 'Dummy the Cat',
        mergecommit: false
    };
}

interface PromoteRouteProps {
    app: string;
    env: string;
}

function Promote(props: RouteComponentProps<PromoteRouteProps>) {
    const commits = [
        createCommit(props.match.params.app),
        createCommit(props.match.params.app),
        createCommit(props.match.params.app),
        createCommit(props.match.params.app),
        createCommit(props.match.params.app),
        createCommit(props.match.params.app),
        createCommit(props.match.params.app)
    ];

    return (
        <section>
            <Innholdstittel className="blokk-m">Promoter {props.match.params.app} til {props.match.params.env}</Innholdstittel>
            <Undertittel className="blokk-xs">Endringer fra 124.20170205.1213 til 127.20170207.1457</Undertittel>
            <ConmmitsForRelease className="blokk-m" commits={commits} />
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
