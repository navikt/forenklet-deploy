import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Sidetittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import { connect, Dispatch } from 'react-redux';
import { GoNogoApplication } from './application';
import { reset, openApplication, addGoApplication, addNogoApplication } from '../../../redux/gonogo-view-duck';
import { AppState } from '../../../redux/reducer';
import { selectAllReleasesWithCommits } from '../../../redux/releasenote-duck';
import { ReleaseWithCommits } from '../../../models/release';
import { Commit } from '../../../models/commit';
import { getAlder } from '../../alder';
import { Team } from '../../../models/team';
import { selectValgtTeam } from '../../../redux/team-velger-duck';

interface DispatchProps {
    doReset: () => void;
    doAddGoApplication: (app: string) => void;
    doAddNogoApplication: (app: string) => void;
    doOpenApplication: (app: string) => void;
}

interface StateProps {
    openApplication: string;
    goApplications: string[];
    nogoApplications: string[];
    releases: ReleaseWithCommits[];
    valgtTeam?: Team;
}

export class GoNogo extends React.Component<DispatchProps & StateProps> {
    componentDidMount() {
        this.props.doReset();
    }

    selectGo(application: string) {
        this.props.doAddGoApplication(application);
        this.openNextApplication(application);
    }

    selectNogo(application: string) {
        this.props.doAddNogoApplication(application);
        this.openNextApplication(application);
    }

    openNextApplication(application: string) {
        const nextApplicationIndex = this.props.releases.findIndex((release) => release.application === application) + 1;
        const nextApplicationName = nextApplicationIndex >= this.props.releases.length ? '' : this.props.releases[nextApplicationIndex].application;
        this.props.doOpenApplication(nextApplicationName);
    }

    hasAssignedAllApplications(): boolean {
        return this.props.goApplications.length + this.props.nogoApplications.length === this.props.releases.length;
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

    getReleasesSortedByAge(): ReleaseWithCommits[] {
        return this.props.releases
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
        const check = this.props.goApplications.includes(release.application) ? '✔' : '';
        const cross = this.props.nogoApplications.includes(release.application) ? '❌' : '';
        const lastCommit = release.commits[release.commits.length - 1];
        const title = `${application} ${this.getAlderForCommit(lastCommit)} ${check}${cross}`;

        return (
            <div className="release-note--application blokk-xs" key={application}>
                <EkspanderbartpanelPure tittel={title} apen={this.isApplicationOpen(application)} onClick={() => this.toggleOpen(application)}>
                    <GoNogoApplication
                        release={release}
                        onSelectGo={() => this.selectGo(application)}
                        onSelectNogo={() => this.selectNogo(application)}
                    />
                </EkspanderbartpanelPure>
            </div>
        );
    }

    render() {
        const uriAppParam = this.props.goApplications.map((application) => `app[]=${application}`).join('&');
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const teamNavn = this.props.valgtTeam ? this.props.valgtTeam.displayName : 'Ukjent team';

        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Go-nogo {teamNavn}</Sidetittel>
                    <Normaltekst>Dato: {(new Date()).toLocaleDateString('nb-NO', dateOptions)}</Normaltekst>
                </div>

                <Undertittel className="blokk-xs">Applikasjoner ({this.props.releases.length}):</Undertittel>
                { this.getReleasesSortedByAge().map((release: ReleaseWithCommits) => this.createApplicationRow(release)) }

                { this.hasAssignedAllApplications() &&
                    <NavLink
                        className="knapp"
                        to={`/releasenote/kvittering?${uriAppParam}`}
                    >
                        Lag Kvittering
                    </NavLink>
                }
            </article>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        doReset: () => dispatch(reset()),
        doAddGoApplication: (app: string) => dispatch(addGoApplication(app)),
        doAddNogoApplication: (app: string) => dispatch(addNogoApplication(app)),
        doOpenApplication: (app: string) => dispatch(openApplication(app))
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        openApplication: state.gonogoview.openApplication,
        goApplications: state.gonogoview.goApplications,
        nogoApplications: state.gonogoview.nogoApplications,
        releases: selectAllReleasesWithCommits(state),
        valgtTeam: selectValgtTeam(state)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoNogo);
