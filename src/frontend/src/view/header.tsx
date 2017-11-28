import * as React from 'react';
import {Undertittel} from 'nav-frontend-typografi';
import ModeToggle from './mode-toggle';
import {connect} from "react-redux";
import AppState from "../redux/app-state";
import {selectError} from "./view-selector";

interface HeaderProps{
    error?: string
}

function Header({error}: HeaderProps) {
    return (
        <div className="header">
            <ModeToggle className="header__mode-toggle" />
            <Undertittel>Forenklet Deploy</Undertittel>
            {error}
        </div>
    );
}


const mapStateToProps = (state: AppState): HeaderProps => ({
    error: selectError(state)
});

export default connect(mapStateToProps)(Header);


