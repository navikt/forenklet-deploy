import * as React from 'react';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import { UndertekstBold, Undertittel } from 'nav-frontend-typografi';
import CommitsForRelease from '../../promote/commits-for-release';
import IssuesTable from '../kvittering/issues-table';
import { ReleaseWithCommits } from '../../../models/release';

interface GoNogoApplicationProps {
    release: ReleaseWithCommits;
    onSelectGo: () => void;
    onSelectNogo: () => void;
}

export class GoNogoApplication extends React.Component<GoNogoApplicationProps> {
    render() {
        const fromVersion = this.props.release.fromVersion ? this.props.release.fromVersion : '0.0.0';
        return (
            <section>
                <div className="blokk-s">
                    <UndertekstBold className="blokk-xs">{fromVersion} til {this.props.release.toVersion}</UndertekstBold>
                    <div className="blokk-m">
                        <Undertittel className="blokk-xxs">Brukerhistorier</Undertittel>
                        <IssuesTable applications={[this.props.release.application]} />
                    </div>

                    <Undertittel className="blokk-xs">Endringer i applikasjonen</Undertittel>
                    <CommitsForRelease commits={this.props.release.commits} />
                </div>

                <Hovedknapp onClick={() => this.props.onSelectGo()}>GO!</Hovedknapp>
                <Fareknapp onClick={() => this.props.onSelectNogo()}>No go!</Fareknapp>
            </section>
        );
    }
}

export default GoNogoApplication;
