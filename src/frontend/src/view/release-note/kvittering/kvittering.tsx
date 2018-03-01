import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as queryString from 'query-string';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import IssuesTable from './issues-table';
import ApplicationReleases from './application-release';
import { ReleaseNote, ReleaseWithCommitsAndIssues } from '../../../models/release';
import { Team } from '../../../models/team';
import '../release-note.less';
import { AppState } from '../../../redux/reducer';
import { selectReleasesWithCommitsAndIssues } from '../../../redux/releasenote-duck';
import { selectValgtTeam } from '../../../redux/team-velger-duck';
import Utrullingskandidater from './utrullingskandidater';
import { Hovedknapp } from 'nav-frontend-knapper';
import { lagreKvittering, apneKvittering } from '../../../redux/kvittering-duck';

interface StateProps {
    applications: string[];
    releases: ReleaseWithCommitsAndIssues[];
    team?: Team;
    lagrerKvittering: boolean;
    lagreKvitteringError?: string;
}

interface DispatchProps {
    doLagreKvittering: (releases: ReleaseWithCommitsAndIssues[]) => Promise<ReleaseNote>;
    doApneKvittering: (releases: ReleaseNote) => void;
}

type KvitteringProps  = StateProps & DispatchProps;

export class Kvittering extends React.Component<KvitteringProps> {

    lagreKvittering() {
        const {doLagreKvittering, doApneKvittering, releases} = this.props;
        doLagreKvittering(releases)
            .then((releaseNote) => doApneKvittering(releaseNote));
    }

    render() {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const teamNavn = this.props.team ? this.props.team.displayName : 'Ukjent team';
        const lagrerKvittering = this.props.lagrerKvittering;

        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Utrullingsoversikt {teamNavn}</Sidetittel>
                    <Normaltekst>Dato: {(new Date()).toLocaleDateString('nb-NO', dateOptions)}</Normaltekst>
                </div>

                <Utrullingskandidater releases={this.props.releases} />
                <div className="panel blokk-m">
                    <IssuesTable applications={this.props.applications} />
                    <ApplicationReleases releases={this.props.releases} />
                </div>

                <Hovedknapp
                    spinner={lagrerKvittering}
                    disabled={lagrerKvittering}
                    onClick={() => this.lagreKvittering()}
                >Lagre kvittering i Confluence</Hovedknapp>

                <div className="error">
                    {this.props.lagreKvitteringError}
                </div>
            </article>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    const query = queryString.parse(window.location.search, { arrayFormat: 'bracket' });
    const apps =  query.app? query.app : [];

    return {
        applications: apps,
        releases: selectReleasesWithCommitsAndIssues(state, apps),
        team: selectValgtTeam(state),
        lagrerKvittering: state.kvittering.loading,
        lagreKvitteringError: state.kvittering.error
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        doLagreKvittering: (releases: ReleaseWithCommitsAndIssues[]) => dispatch(lagreKvittering(releases)),
        doApneKvittering: (releaseNote: ReleaseNote) => dispatch(apneKvittering(releaseNote)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Kvittering);
