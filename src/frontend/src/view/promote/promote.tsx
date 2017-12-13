import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import ConmmitsForRelease from './commits-for-release';
import { NavLink } from 'react-router-dom';
import Commit from '../../dev/commit';
import AppState from '../../redux/app-state';
import { getCommitsForRelease, selectCommits, selectIsLoadingCommits } from '../../redux/commit-duck';
import { connect, Dispatch } from 'react-redux';
import { Action } from '../../redux/actions';

interface PromoteRouteProps {
    app: string;
    env: string;
}

interface PromoteStateProps {
    isLoading: boolean;
    commits: Commit[];
}

interface PromoteDispatchProps {
    getCommits: (app: string, fromVersion: string, toVersion: string) => void;
}

class Promote extends React.PureComponent<RouteComponentProps<PromoteRouteProps> & PromoteStateProps & PromoteDispatchProps> {
    componentDidMount() {
        const app = this.props.match.params.app;

        this.props.getCommits(app, 'test', 'test');
    }

    render() {
        const props = this.props;
        return (
            <section>
                <Innholdstittel className="blokk-m">Promoter {props.match.params.app} til {props.match.params.env}</Innholdstittel>
                <Undertittel className="blokk-xs">Endringer fra 124.20170205.1213 til 127.20170207.1457</Undertittel>
                <ConmmitsForRelease className="blokk-m" isLoading={props.isLoading} commits={props.commits} />
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

function mapStateToProps(state: AppState): PromoteStateProps {
    return {
        isLoading: selectIsLoadingCommits(state),
        commits: selectCommits(state)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Promote));
