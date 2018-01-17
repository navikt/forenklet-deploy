import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import { connect, Dispatch } from 'react-redux';
import { GoNogoApplication } from './application';
import { reset, openApplication, addGoApplication, addNogoApplication } from '../../../redux/gonogo-view-duck';
import { AppState } from '../../../redux/reducer';
import { selectAllReleasesWithCommits, getInfoForReleaseNote } from '../../../redux/releasenote-duck';
import { ReleaseWithCommits } from '../../../models/release';

interface DispatchProps {
    doReset: () => void;
    doAddGoApplication: (app: string) => void;
    doAddNogoApplication: (app: string) => void;
    doOpenApplication: (app: string) => void;
    doGetInfoForReleaseNote: () => void;
}

interface StateProps {
    openApplication: string;
    goApplications: string[];
    nogoApplications: string[];
    releases: ReleaseWithCommits[];
    isLoading: boolean;
}

export class GoNogo extends React.Component<DispatchProps & StateProps> {
    componentDidMount() {
        this.props.doReset();
        this.props.doGetInfoForReleaseNote();
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

    createApplicationRow(release: ReleaseWithCommits) {
        const application = release.application;
        const check = this.props.goApplications.includes(release.application) ? '✔' : '';
        const cross = this.props.nogoApplications.includes(release.application) ? '❌' : '';
        const title = `${application} ${check}${cross}`;

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
        if (this.props.isLoading) {
            return <NavFrontendSpinner />;
        }

        const uriAppParam = this.props.goApplications.map((application) => `app[]=${application}`).join('&')
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };    

        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Go-nogo Forenklet Oppfølging</Sidetittel>
                    <Normaltekst>Team Kartlegging, registrering og oppfølging | Dato: {(new Date()).toLocaleDateString('nb-NO', dateOptions)}</Normaltekst>
                </div>

                { this.props.releases.map((release: ReleaseWithCommits) => this.createApplicationRow(release)) }
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
        doOpenApplication: (app: string) => dispatch(openApplication(app)),
        doGetInfoForReleaseNote: () => dispatch(getInfoForReleaseNote())
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        isLoading: false,
        openApplication: state.gonogoview.openApplication,
        goApplications: state.gonogoview.goApplications,
        nogoApplications: state.gonogoview.nogoApplications,
        releases: selectAllReleasesWithCommits(state)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoNogo);
