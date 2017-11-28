import * as React from 'react';
import AppState from '../redux/app-state';
import {connect} from 'react-redux';
import {Undertittel} from "nav-frontend-typografi";
import NavFrontendSpinner from "nav-frontend-spinner";
import {selectIsLoadingEvents} from '../app-event/app-event-selector';


interface HeaderProps {
    isLoadingData: boolean;
}

function Header({
                    isLoadingData,
                }: HeaderProps) {
    return (
        <div className="header">
            {isLoadingData && <NavFrontendSpinner className="header__spinner"/>}
            <Undertittel>Forenklet Deploy</Undertittel>
        </div>
    );
}

const mapStateToProps = (state: AppState): HeaderProps => ({
    isLoadingData: selectIsLoadingEvents(state)
});

export default connect(mapStateToProps)(Header);
