import * as React from 'react';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import { Action } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { GoNogoApplication } from './application';
import { reset, openApplication, addGoApplication, addNogoApplication } from '../../../redux/gonogo-view-duck';
import { AppState } from '../../../redux/reducer';

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
    applications: string[];
    isLoading: boolean;
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
        const nextApplicationIndex = this.props.applications.findIndex((app) => app === application) + 1;
        const nextApplicationName = nextApplicationIndex >= this.props.applications.length ? '' : this.props.applications[nextApplicationIndex];
        this.props.doOpenApplication(nextApplicationName);
    }

    toggleOpen(application: string) {
        const applicationToOpen = this.props.openApplication === application ? '' : application;
        this.props.doOpenApplication(applicationToOpen);
    }

    isApplicationOpen(application: string) {
        return this.props.openApplication === application;
    }

    createApplicationRow(application: string) {
        return (
            <div className="release-note--application blokk-xs" key={application}>
                <EkspanderbartpanelPure tittel={application} apen={this.isApplicationOpen(application)} onClick={() => this.toggleOpen(application)}>
                    <GoNogoApplication
                        application={application}
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

        return (
            <article className="release-note">
                <div className="blokk-m">
                    <Sidetittel className="blokk-xxs">Go-nogo Forenklet Oppfølging</Sidetittel>
                    <Normaltekst>Team Kartlegging, registrering og oppfølging | Dato: 4. Januar 2018</Normaltekst>
                </div>

                { this.props.applications.map((app: string) => this.createApplicationRow(app)) }
            </article>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        doReset: () => dispatch(reset()),
        doAddGoApplication: (app: string) => dispatch(addGoApplication(app)),
        doAddNogoApplication: (app: string) => dispatch(addNogoApplication(app)),
        doOpenApplication: (app: string) => dispatch(openApplication(app))
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        isLoading: false,
        openApplication: state.gonogoview.openApplication,
        goApplications: state.gonogoview.goApplications,
        nogoApplications: state.gonogoview.nogoApplications,
        applications: []
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoNogo);
