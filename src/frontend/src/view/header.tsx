import * as React from 'react';
import { Action } from 'redux';
import { Undertittel } from 'nav-frontend-typografi';
import TeamVelger from './team-velger';
import ApplicationFilter from './application-filter';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../redux/reducer';
import { selectErrors } from '../redux/error-duck';
import { changeShowAll } from '../redux/view-duck';
import { Checkbox } from 'nav-frontend-skjema';
import { TeamAwareAnchor } from './team-aware-link';

interface HeaderStateProps {
    errors: string[];
    showAll: boolean;
}

interface HeaderDispatchProps {
    doChangeShowAll: (showAll: boolean) => void;
}

function Header({errors, showAll, doChangeShowAll}: HeaderStateProps & HeaderDispatchProps) {
    const errorElements = errors.map((e) => <div key={e}>{e}</div>);
    return (
        <div className="header">
            <div className="container">
                <div>
                    <Undertittel className="logo"><TeamAwareAnchor href="/">Forenklet
                        Deploy</TeamAwareAnchor></Undertittel>
                    <Checkbox onChange={() => doChangeShowAll(!showAll)} label="Vis alle" checked={showAll}/>
                    {errorElements.length > 0 && <div className="header__error">{errorElements}</div>}
                </div>
                <div className="right-side">
                    <ApplicationFilter/>
                    <TeamVelger/>
                </div>
            </div>
            <ul className="navigasjonslinje">
                <li><TeamAwareAnchor href="/promote">Promotering</TeamAwareAnchor></li>
                <li><TeamAwareAnchor href="/dashboard">Dashboard</TeamAwareAnchor></li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state: AppState): HeaderStateProps => ({
    errors: selectErrors(state),
    showAll: state.view.showAll
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): HeaderDispatchProps => ({
    doChangeShowAll: (showAll: boolean) => dispatch(changeShowAll(showAll))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
