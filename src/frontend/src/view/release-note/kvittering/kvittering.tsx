import * as React from 'react';
import { Sidetittel, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import IssuesTable from './issues-table';
import ApplicationRelease from './application-release';
import { getMockCommits } from '../../../mock/commit-for-release-mock';
import { Release } from '../../../models/release';
import { getEnvironmentByName } from '../../../utils/environment';
import '../release-note.less';

export class Kvittering extends React.Component<{}> {
    render() {
        const environment = getEnvironmentByName('q6');
        const releases: Release[] = [
            { application: 'veilarbdialog', environment, fromVersion: '102.20180101.1025', toVersion: '105.20180303.1017' },
            { application: 'aktivitetsplan', environment, fromVersion: '1024.20180101.1025', toVersion: '1035.20180303.1017' },
            { application: 'veilaroppfolging', environment, fromVersion: '205.20180101.1025', toVersion: '207.20180303.1017' },
            { application: 'veilarbaktivitet', environment, fromVersion: '312.20180101.1025', toVersion: '3.20180303.1017' }
        ];

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
                    { releases.map((release) => (
                        <ApplicationRelease
                            release={release}
                            key={release.application}
                            commits={getMockCommits('mock-app')}
                        />))
                    }
                </section>
            </article>
        );
    }
}

export default Kvittering;
