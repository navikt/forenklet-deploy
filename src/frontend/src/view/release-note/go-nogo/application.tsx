import * as React from 'react';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import { UndertekstBold, Undertittel } from 'nav-frontend-typografi';
import { getMockCommitsForApp } from '../../../mock/commit-for-release-mock';
import CommitsForRelease from '../../promote/commits-for-release';
import IssuesTable from '../kvittering/issues-table';

interface GoNogoApplicationProps {
    application: string;
    onSelectGo: () => void;
    onSelectNogo: () => void;
}

export class GoNogoApplication extends React.Component<GoNogoApplicationProps> {
    render() {
        return (
            <section>
                <div className="blokk-s">
                    <UndertekstBold className="blokk-xs">103.20180101.1010 til 107.20180103.1242</UndertekstBold>
                    <div className="blokk-m">
                        <Undertittel className="blokk-xxs">Brukerhistorier</Undertittel>
                        <IssuesTable />
                    </div>

                    <Undertittel className="blokk-xs">Endringer i applikasjonen</Undertittel>
                    <CommitsForRelease commits={getMockCommitsForApp(this.props.application)} />
                </div>

                <Hovedknapp onClick={() => this.props.onSelectGo()}>GO!</Hovedknapp>
                <Fareknapp onClick={() => this.props.onSelectNogo()}>No go!</Fareknapp>
            </section>
        );
    }
}

export default GoNogoApplication;
