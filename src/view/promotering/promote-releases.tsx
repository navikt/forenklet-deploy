import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import { ReleaseWithCommits } from '../../models/release';
import { Commit } from '../../models/commit';
import { getAlder } from '../alder';
import { PromoteApplication } from './promote-application';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { filterFunction, selectFilter } from '../../redux/application-filter-duck';

interface PromoteReleasesProps {
    doOpenApplication: (application: string) => void;
    openApplication: string;
    releases: ReleaseWithCommits[];
}

interface StateProps {
    filter: string;
}

type Props = StateProps & PromoteReleasesProps;

class PromoteReleases extends React.Component<Props> {

    openNextApplication(application: string) {
        const nextApplicationIndex = this.props.releases.findIndex((release) => release.application === application) + 1;
        const nextApplicationName = nextApplicationIndex >= this.props.releases.length ? '' : this.props.releases[nextApplicationIndex].application;
        this.props.doOpenApplication(nextApplicationName);
    }

    toggleOpen(application: string) {
        const applicationToOpen = this.props.openApplication === application ? '' : application;
        this.props.doOpenApplication(applicationToOpen);
    }

    isApplicationOpen(application: string) {
        return this.props.openApplication === application;
    }

    getAlderForCommit(commit?: Commit): string {
        if (commit) {
            return `(${getAlder(commit.timestamp)} gammel)`;
        }
        return '';
    }

    getReleasesFilteredAndSortedByAge(): ReleaseWithCommits[] {
        return this.props.releases
            .filter((release) => filterFunction(release.application, this.props.filter))
            .sort((r1, r2) => {
                const lastCommitR1 = r1.commits[r1.commits.length - 1];
                const lastCommitR2 = r2.commits[r2.commits.length - 1];

                const alderR1 = lastCommitR1 ? lastCommitR1.timestamp : Date.now();
                const alderR2 = lastCommitR2 ? lastCommitR2.timestamp : Date.now();
                return alderR1 - alderR2;
            });
    }

    createApplicationRow(release: ReleaseWithCommits) {
        const application = release.application;
        const lastCommit = release.commits[release.commits.length - 1];
        const title = `${application} ${this.getAlderForCommit(lastCommit)}`;

        return (
            <div className="release-note--application blokk-xs" key={application}>
                <EkspanderbartpanelPure tittel={title} apen={this.isApplicationOpen(application)} onClick={() => this.toggleOpen(application)}>
                    <PromoteApplication release={release} />
                </EkspanderbartpanelPure>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Undertittel className="blokk-xs">Applikasjoner ({this.props.releases.length}):</Undertittel>
                {this.getReleasesFilteredAndSortedByAge().map((release: ReleaseWithCommits) => this.createApplicationRow(release))}
            </div>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        filter: selectFilter(state)
    };
}

export default connect(mapStateToProps, null)(PromoteReleases);
