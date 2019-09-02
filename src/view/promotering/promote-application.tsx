import * as React from 'react';
import {UndertekstBold} from 'nav-frontend-typografi';
import CommitsForRelease from '../promote/commits-for-release';
import IssuesTable from '../promote/issues-table';
import {ReleaseWithCommits} from '../../models/release';
import PromoteJenkinsAnchor from '../promote/promote-jenkins-anchor';
import {GithubDeployKnapp} from "../promote/githubdeployknapp";

interface PromoteApplicationProps {
    release: ReleaseWithCommits;
}

interface DispatchProps {
    prodsett?: (version: string, cluster: string, appname: string) => void
}

export class PromoteApplication extends React.Component<PromoteApplicationProps & DispatchProps> {

    render() {
        const fromVersion = this.props.release.fromVersion ? this.props.release.fromVersion : '0.0.0';
        const app = this.props.release.application;
        const env = this.props.release.environment.promotesTo ? this.props.release.environment.promotesTo : '';

        let version = this.props.release.toVersion;

        const knapp = env === 'p' ? <GithubDeployKnapp version={version} app={app}/> : <PromoteJenkinsAnchor application={app} env={env} version={version}/>;


        return (
            <section>
                <div className="blokk-s">
                    <UndertekstBold
                        className="blokk-xs">{fromVersion} til {version}</UndertekstBold>
                    <IssuesTable applications={[this.props.release.application]}/>
                    <CommitsForRelease release={this.props.release}/>
                    {knapp}
                </div>
            </section>
        );
    }
}