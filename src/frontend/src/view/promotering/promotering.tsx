import * as React from 'react';
import { connect } from 'react-redux';
import { Sidetittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AppState } from '../../redux/reducer';
import { ReleaseWithCommits } from '../../models/release';
import { setEnvironments, getInformationForPromotion, openApplication, selectFromEnvironment, selectToEnvironment } from '../../redux/promote-duck';
import Miljovelger from './miljovelger';
import { selectAllReleasesWithCommitsForEnvironments } from '../../redux/releasenote-duck';
import PromoteReleases from './promote-releases';
import { AsyncDispatch } from '../../redux/redux-utils';
import { hideErrors } from '../../redux/error-duck';

interface StateProps {
    valgtFromEnv: string;
    valgtToEnv: string;
    releases: ReleaseWithCommits[];
    isLoading: boolean;
    noErrors: boolean;
    openApplication: string;
    showAll: boolean;
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

    shouldDisplayRelease(release: ReleaseWithCommits): boolean {
        if (this.props.showAll) {
            return true;
        }
        const fromMajor = release.fromVersion.split('.')[0];
        const toMajor = release.toVersion.split('.')[0];
        return fromMajor !== toMajor;
    }

    render() {
        const releasesToDisplay = this.props.releases.filter((r1: ReleaseWithCommits) => this.shouldDisplayRelease(r1));
        return (
            <article>
                <Sidetittel className="blokk-s">Promotering og oversikt</Sidetittel>
                <Miljovelger onChange={this.handleChangeMiljo} fromEnv={this.props.valgtFromEnv} toEnv={this.props.valgtToEnv} />
                { this.props.isLoading
                    ? <NavFrontendSpinner type="L" />
                    : <PromoteReleases releases={releasesToDisplay} openApplication={this.props.openApplication} doOpenApplication={this.handleOpenApplication} />
                }
                { this.props.noErrors || <div className="warning_data">Advarsel: klarte ikke å hente alle data, listen kan være ufullstendig</div> }
            </article>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    const fromEnv = selectFromEnvironment(state);
    const toEnv = selectToEnvironment(state);
    const releases = selectAllReleasesWithCommitsForEnvironments(state, fromEnv, toEnv);

    return {
        valgtFromEnv: fromEnv,
        valgtToEnv: toEnv,
        isLoading: state.commit.loading || state.deploy.loading || state.jira.loading,
        noErrors: !state.commit.error,
        releases,
        openApplication: state.promotering.openApplication,
        showAll: state.view.showAll
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        doHentInfoForPromotering: () => {
            dispatch(hideErrors());
            dispatch(getInformationForPromotion());
        },
        doEndreValgtMiljo: (fromEnv: string, toEnv: string) => dispatch(setEnvironments(fromEnv, toEnv)),
        doOpenApplication: (app: string) => dispatch(openApplication(app))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotering);
