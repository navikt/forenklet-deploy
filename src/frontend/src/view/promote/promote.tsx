import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import ConmmitsForRelease from './commits-for-release';
import { NavLink } from 'react-router-dom';
import Commit from '../../dev/commit';
import AppState from '../../redux/app-state';
import { getCommitsForRelease, selectCommits, selectIsLoadingCommits } from '../../redux/commit-duck';
import { selectReleaseForApplication, Release } from '../../deployment/deployment-selector';
import { selectIsLoadingInitialData } from '../../app-event/app-event-selector';
import { Action } from '../../redux/actions';

interface PromoteRouteProps {
    app: string;
    env: string;
}

interface PromoteStateProps {
    isLoadingInitialData: boolean;
    isLoadingCommits: boolean;
    release: Release;
    commits: Commit[];
}

interface PromoteDispatchProps {
    getCommits: (app: string, fromVersion: string, toVersion: string) => void;
}

type PromoteProps = RouteComponentProps<PromoteRouteProps> & PromoteStateProps & PromoteDispatchProps;

class Promote extends React.PureComponent<PromoteProps> {
    componentDidMount() {
        if (!this.props.isLoadingInitialData) {
            const app = this.props.match.params.app;
            this.props.getCommits(app, this.props.release.fromVersion, this.props.release.toVersion);
        }
    }

    componentWillReceiveProps(nextProps: PromoteProps) {
        if (nextProps.isLoadingInitialData !== this.props.isLoadingInitialData) {
            const app = this.props.match.params.app;
            this.props.getCommits(app, this.props.release.fromVersion, this.props.release.toVersion);            
        }
    }

    render() {
        const props = this.props;
        if (props.isLoadingInitialData || props.isLoadingCommits) {
            return (
                <div>
                    <NavFrontendSpinner />
                </div>
            );
        }

        return (
            <section>
                <Innholdstittel className="blokk-m">Promoter {props.match.params.app} til {props.release.toEnvironment}</Innholdstittel>
                <Undertittel className="blokk-xs">Endringer fra {props.release.fromVersion} til {props.release.toVersion}</Undertittel>
                <ConmmitsForRelease className="blokk-m" commits={props.commits} />
                <div className="knapperad-promoter">
                    <NavLink className="knapp knapp--hoved" to={``}>
                        Promoter
                    </NavLink>
                    <NavLink className="knapp" to="/">
                        Avbryt
                    </NavLink>
                </div>
            </section>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): PromoteDispatchProps {
    return {
        getCommits: (app: string, fromVersion: string, toVersion: string) => dispatch(getCommitsForRelease(app, fromVersion, toVersion))
    };
}

function mapStateToProps(state: AppState, ownProps: RouteComponentProps<PromoteRouteProps>): PromoteStateProps {
    return {
        isLoadingCommits: selectIsLoadingCommits(state),
        isLoadingInitialData: selectIsLoadingInitialData(state),
        release: selectReleaseForApplication(state, ownProps.match.params.app, ownProps.match.params.env),
        commits: selectCommits(state)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Promote));
