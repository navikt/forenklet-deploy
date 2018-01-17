import * as React from 'react';
import { connect } from 'react-redux';
import { Sidetittel, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import IssuesTable from './issues-table';
import ApplicationRelease from './application-release';
import { ReleaseWithCommits } from '../../../models/release';
import '../release-note.less';
import { AppState } from '../../../redux/reducer';
import { selectAllGoReleasesWithCommits } from '../../../redux/releasenote-duck';

interface KvitteringProps {
    releases: ReleaseWithCommits[];
}

export class Kvittering extends React.Component<KvitteringProps> {
    render() {
        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Utrullingsoversikt Forenklet Oppfølging</Sidetittel>
                    <Normaltekst>Team Kartlegging, registrering og oppfølging | Dato: 4. Januar 2018</Normaltekst>
                </div>

                <section className="release-note--issues blokk-l">
                    <Innholdstittel className="blokk-s">Brukerhistorier i leveransen</Innholdstittel>
                    <IssuesTable />

                </section>
                <section className="release-note--applications">
                    <Innholdstittel className="blokk-s">Applikasjoner i leveransen</Innholdstittel>
                    { this.props.releases.map((release) => (
                        <ApplicationRelease
                            release={release}
                            key={release.application}
                        />))
                    }
                </section>
            </article>
        );
    }
}

function mapStateToProps(state: AppState): KvitteringProps {
    return {
        releases: selectAllGoReleasesWithCommits(state)
    }
}

export default connect(mapStateToProps)(Kvittering);
