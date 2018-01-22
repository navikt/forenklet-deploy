import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { Sidetittel, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import IssuesTable from './issues-table';
import ApplicationReleases from './application-release';
import { Release } from '../../../models/release';
import '../release-note.less';
import { AppState } from '../../../redux/reducer';
import { selectReleases } from '../../../redux/releasenote-duck';

interface KvitteringProps {
    applications: string[];
    releases: Release[];
}

export class Kvittering extends React.Component<KvitteringProps> {
    render() {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Utrullingsoversikt Forenklet Oppfølging</Sidetittel>
                    <Normaltekst>Team Kartlegging, registrering og oppfølging | Dato: {(new Date()).toLocaleDateString('nb-NO', dateOptions)}</Normaltekst>
                </div>

                <section className="release-note--issues blokk-l">
                    <Innholdstittel className="blokk-s">Brukerhistorier i leveransen</Innholdstittel>
                    <IssuesTable applications={this.props.applications} />
                </section>
                <section className="release-note--applications">
                    <Innholdstittel className="blokk-s">Applikasjoner i leveransen</Innholdstittel>
                    <ApplicationReleases releases={this.props.releases} />
                </section>
            </article>
        );
    }
}

function mapStateToProps(state: AppState): KvitteringProps {
    const query = queryString.parse(window.location.search, { arrayFormat: 'bracket' });
    const apps =  query.app? query.app : [];

    return {
        applications: apps,
        releases: selectReleases(state, apps)
    };
}

export default connect(mapStateToProps)(Kvittering);
