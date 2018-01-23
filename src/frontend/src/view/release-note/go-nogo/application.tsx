import * as React from 'react';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import { UndertekstBold } from 'nav-frontend-typografi';
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
                    <UndertekstBold className="blokk-xs">{fromVersion} (P) til {this.props.release.toVersion} (Q6)</UndertekstBold>
                    <IssuesTable applications={[this.props.release.application]} />
                    <CommitsForRelease commits={this.props.release.commits} />
                </div>

                <Hovedknapp onClick={() => this.props.onSelectGo()}>GO!</Hovedknapp>
                <Fareknapp onClick={() => this.props.onSelectNogo()}>No go!</Fareknapp>
            </section>
        );
    }
}

export default GoNogoApplication;
