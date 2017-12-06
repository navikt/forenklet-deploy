import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Innholdstittel } from 'nav-frontend-typografi';
import CommitTable from './commit-table';

interface PromoteRouteProps {
    app: string;
    env: string;
}

function Promote(props: RouteComponentProps<PromoteRouteProps>) {
    console.log("render promote");
    return (
        <section>
            <Innholdstittel>Promoter {props.match.params.app} til {props.match.params.env}</Innholdstittel>
            <CommitTable />
        </section>
    );
}

export default withRouter(Promote);
