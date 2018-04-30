import * as React from 'react';
import { Action } from 'redux';
import { Undertittel } from 'nav-frontend-typografi';
import TeamVelger from './team-velger';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../redux/reducer';
import { selectError } from '../redux/error-duck';
import { changeShowAll } from '../redux/view-duck';
import { Checkbox } from 'nav-frontend-skjema';
import { TeamAwareAnchor } from './team-aware-link';
import { FeatureIsEnabled } from '../unleash-react/unleash-feature';

interface HeaderStateProps {
    error: string | null;
    showAll: boolean;
}

interface HeaderDispatchProps {
    doChangeShowAll: (showAll: boolean) => void;
}

function Header({error, showAll, doChangeShowAll}: HeaderStateProps & HeaderDispatchProps) {
    return (
        <div className="header">
            <div className="container">
                <div className="left-side">
                    <Undertittel className="logo"><TeamAwareAnchor href="/">Forenklet Deploy</TeamAwareAnchor></Undertittel>
                    <Checkbox onChange={() => doChangeShowAll(!showAll)} label="Vis alle applikasjoner" checked={showAll} />
                    {error && <div className="header__error">{error}</div>}
                </div>
                <TeamVelger />
            </div>
            <ul className="navigasjonslinje">
                <li><TeamAwareAnchor href="/promote">Promotering</TeamAwareAnchor></li>
                <FeatureIsEnabled name="forenkletdeploy.dashboard">
                    <li><TeamAwareAnchor href="/dashboard">Dashboard</TeamAwareAnchor></li>
                </FeatureIsEnabled>
            </ul>
        </div>
    );
}

const mapStateToProps = (state: AppState): HeaderStateProps => ({
    error: selectError(state),
    showAll: state.view.showAll
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): HeaderDispatchProps => ({
    doChangeShowAll: (showAll: boolean) => dispatch(changeShowAll(showAll))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
