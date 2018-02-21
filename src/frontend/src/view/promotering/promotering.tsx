import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Sidetittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AppState } from '../../redux/reducer';
import { ReleaseWithCommits } from '../../models/release';
import { setEnvironments, getInformationForPromotion, openApplication } from '../../redux/promote-duck';
import Miljovelger from './miljovelger';
import { selectAllReleasesWithCommitsForEnvironments } from '../../redux/releasenote-duck';
import PromoteReleases from './promote-releases';

interface StateProps {
    valgtFromEnv: string;
    valgtToEnv: string;
    releases: ReleaseWithCommits[];
    isLoading: boolean;
    openApplication: string;
}

interface DispatchProps {
    doHentInfoForPromotering: () => void;
    doEndreValgtMiljo: (fromEnv: string, toEnv: string) => void;
    doOpenApplication: (app: string) => void;
}

type PromoteringProps = DispatchProps & StateProps;

class Promotering extends React.Component<PromoteringProps> {
    constructor(props: PromoteringProps) {
        super(props);
        this.handleChangeMiljo = this.handleChangeMiljo.bind(this);
        this.handleOpenApplication = this.handleOpenApplication.bind(this);
    }

    componentWillMount() {
        this.props.doHentInfoForPromotering();
    }

    handleChangeMiljo(fromEnv: string, toEnv: string) {
        this.props.doEndreValgtMiljo(fromEnv, toEnv);
        this.props.doHentInfoForPromotering();
    }

    handleOpenApplication(app: string) {
        this.props.doOpenApplication(app);
    }

    render() {
        return (
            <article>
                <Sidetittel className="blokk-s">Promotering og oversikt</Sidetittel>
                <Miljovelger onChange={this.handleChangeMiljo} fromEnv={this.props.valgtFromEnv} toEnv={this.props.valgtToEnv} />
                { this.props.isLoading
                    ? <NavFrontendSpinner type="L" />
                    : <PromoteReleases releases={this.props.releases} openApplication={this.props.openApplication} doOpenApplication={this.handleOpenApplication} />
                }
            </article>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    const fromEnv = state.promotering.fromEnvironment;
    const toEnv = state.promotering.toEnvironment;

    return {
        valgtFromEnv: fromEnv,
        valgtToEnv: toEnv,
        isLoading: state.commit.loading || state.deploy.loading || state.jira.loading,
        releases: selectAllReleasesWithCommitsForEnvironments(state, fromEnv, toEnv),
        openApplication: state.promotering.openApplication
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        doHentInfoForPromotering: () => dispatch(getInformationForPromotion()),
        doEndreValgtMiljo: (fromEnv: string, toEnv: string) => dispatch(setEnvironments(fromEnv, toEnv)),
        doOpenApplication: (app: string) => dispatch(openApplication(app))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotering);
