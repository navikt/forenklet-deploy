import * as React from 'react';
import { UndertekstBold } from 'nav-frontend-typografi';
import CommitsForRelease from '../promote/commits-for-release';
import IssuesTable from '../release-note/kvittering/issues-table';
import { ReleaseWithCommits } from '../../models/release';

interface PromoteApplicationProps {
    release: ReleaseWithCommits;
}

export class PromoteApplication extends React.Component<PromoteApplicationProps> {
    render() {
        const fromVersion = this.props.release.fromVersion ? this.props.release.fromVersion : '0.0.0';

        return (
            <section>
                <div className="blokk-s">
                    <UndertekstBold className="blokk-xs">{fromVersion} til {this.props.release.toVersion}</UndertekstBold>
                    <IssuesTable applications={[this.props.release.application]} />
                    <CommitsForRelease commits={this.props.release.commits} />
                </div>
            </section>
        );
    }
}

export default PromoteApplication;
