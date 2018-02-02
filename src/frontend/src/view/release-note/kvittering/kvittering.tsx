import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import IssuesTable from './issues-table';
import ApplicationReleases from './application-release';
import { ReleaseWithCommits } from '../../../models/release';
import { Team } from '../../../models/team';
import '../release-note.less';
import { AppState } from '../../../redux/reducer';
import { selectReleasesWithCommits } from '../../../redux/releasenote-duck';
import { selectValgtTeam } from '../../../redux/team-velger-duck';
import Utrullingskandidater from './utrullingskandidater';

interface KvitteringProps {
    applications: string[];
    releases: ReleaseWithCommits[];
    team?: Team;
}

export class Kvittering extends React.Component<KvitteringProps> {
    render() {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const teamNavn = this.props.team ? this.props.team.displayName : 'Ukjent team';
        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Utrullingsoversikt {teamNavn}</Sidetittel>
                    <Normaltekst>Dato: {(new Date()).toLocaleDateString('nb-NO', dateOptions)}</Normaltekst>
                </div>

                <Utrullingskandidater releases={this.props.releases} />
                <IssuesTable applications={this.props.applications} />
                <ApplicationReleases releases={this.props.releases} />
            </article>
        );
    }
}

function mapStateToProps(state: AppState): KvitteringProps {
    const query = queryString.parse(window.location.search, { arrayFormat: 'bracket' });
    const apps =  query.app? query.app : [];

    return {
        applications: apps,
        releases: selectReleasesWithCommits(state, apps),
        team: selectValgtTeam(state)
    };
}

export default connect(mapStateToProps)(Kvittering);
