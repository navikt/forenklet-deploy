import * as React from 'react';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import { Application } from './application';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';

const mockAppNames = [
    'veilarbdialog',
    'veilarboppfolging',
    'veilarbaktivitet',
    'veilarblogin'
];

export class Kvittering extends React.Component<{}, {apen: string}> {
    constructor() {
        super();
        this.state = {apen: 'veilarbdialog'};
    }

    openNextApplication(application: string) {
        const nextApplicationIndex = mockAppNames.indexOf(application) + 1;
        const nextApplicationName = nextApplicationIndex >= mockAppNames.length ? '' : mockAppNames[nextApplicationIndex];
        this.setState({ apen: nextApplicationName });
    }

    createApplicationRow(application: string) {

        return (
            <div className="release-note--application" key={application}>
                <EkspanderbartpanelPure tittel={application} apen={this.state.apen === application} onClick={() => this.setState({apen: application})}>
                    <Application 
                        application={application}
                        onSelectGo={() => this.openNextApplication(application)}
                        onSelectNogo={() => this.openNextApplication(application)}
                    />
                </EkspanderbartpanelPure>
            </div>
        )
    }

    render() {
        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Go-nogo Forenklet Oppfølging</Sidetittel>
                    <Normaltekst>Team Kartlegging, registrering og oppfølging | Dato: 4. Januar 2018</Normaltekst>
                </div>

                { mockAppNames.map((app) => this.createApplicationRow(app)) }
            </article>
        );
    }
}

export default Kvittering;
