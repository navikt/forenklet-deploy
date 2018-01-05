import * as React from 'react';
import { Sidetittel, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import IssuesTable from './issues-table';
import ApplicationRelease from './application-release';
import { getMockCommitsForApp } from '../../mock/commit-for-release-mock';
import { Release } from '../../deployment/deployment-selector';

export class ReleaseNote extends React.Component<{}> {
    render() {
        const releases: Release[] = [
            { application: 'veilarbdialog', fromEnvironment: 'q6', toEnvironment: 'p', fromVersion: '102.20180101.1025', toVersion: '105.20180303.1017'},
            { application: 'aktivitetsplan', fromEnvironment: 'q6', toEnvironment: 'p', fromVersion: '1024.20180101.1025', toVersion: '1035.20180303.1017'},
            { application: 'veilaroppfolging', fromEnvironment: 'q6', toEnvironment: 'p', fromVersion: '205.20180101.1025', toVersion: '207.20180303.1017'},
            { application: 'veilarbaktivitet', fromEnvironment: 'q6', toEnvironment: 'p', fromVersion: '312.20180101.1025', toVersion: '3.20180303.1017'},
        ];


        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Utrullingsoversikt Forenklet Oppfølging</Sidetittel>
                    <Normaltekst>Team Kartlegging, SiB og Oppfølging | Dato: 4. Januar 2018</Normaltekst>
                </div>

                <section className="release-note--issues blokk-l">
                    <Innholdstittel className="blokk-s">Brukerhistorier i leveransen</Innholdstittel>
                    <IssuesTable />
                    
                </section>
                <section className="release-note--applications">
                    <Innholdstittel className="blokk-s">Applikasjoner i leveransen</Innholdstittel>
                    { releases.map(release => <ApplicationRelease release={release} commits={getMockCommitsForApp(release.application)} />)}
                </section>
            </article>
        );
    }
}

export default ReleaseNote;
