import * as React from 'react';
import { UndertekstBold } from 'nav-frontend-typografi';
import CommitsForRelease from '../promote/commits-for-release';
import IssuesTable from '../release-note/kvittering/issues-table';
import { ReleaseWithCommits } from '../../models/release';
import PromoteJenkinsAnchor from '../promote/promote-jenkins-anchor';

interface PromoteApplicationProps {
    release: ReleaseWithCommits;
}

export class PromoteApplication extends React.Component<PromoteApplicationProps> {
    render() {
        const fromVersion = this.props.release.fromVersion ? this.props.release.fromVersion : '0.0.0';
        const app = this.props.release.application;
        const env = this.props.release.environment.promotesTo ? this.props.release.environment.promotesTo : '';

        return (
            <section>
                <div className="blokk-s">
                    <UndertekstBold className="blokk-xs">{fromVersion} til {this.props.release.toVersion}</UndertekstBold>
                    <IssuesTable applications={[this.props.release.application]} />
                    <CommitsForRelease release={this.props.release} />
                    <PromoteJenkinsAnchor application={app} env={env}/>
                </div>
            </section>
        );
    }
}

export default PromoteApplication;
