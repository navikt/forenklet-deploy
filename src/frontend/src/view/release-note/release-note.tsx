import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Route, RouteComponentProps, Switch } from 'react-router';
import Kvittering from './kvittering/kvittering';
import GoNogo from './go-nogo/go-nogo';
import { getInfoForReleaseNote } from '../../redux/releasenote-duck';
import { AppState } from '../../redux/reducer';

interface StateProps {
    isLoading: boolean;
}

interface DispatchProps {
    doGetInfoForReleaseNote: () => void;
}

type ReleaseNoteProps = RouteComponentProps<{}> & DispatchProps & StateProps;

class ReleaseNote extends React.Component<ReleaseNoteProps> {
    componentWillMount() {
        this.props.doGetInfoForReleaseNote();
    }

    render() {
        if(this.props.isLoading) {
            return <NavFrontendSpinner type="L" />;
        }

        return (
            <Switch location={this.props.location}>
                <Route path={this.props.match.path + '/go-nogo'} component={GoNogo}/>
                <Route path={this.props.match.path + '/kvittering'} component={Kvittering}/>
                <Route path={this.props.match.path} component={GoNogo}/>
            </Switch>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        isLoading: state.jira.loading || state.commit.loading || state.deploy.loading,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        doGetInfoForReleaseNote: () => dispatch(getInfoForReleaseNote())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReleaseNote));
