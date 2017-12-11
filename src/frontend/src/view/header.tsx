import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import AppState from '../redux/app-state';
import { selectError } from '../redux/error-duck';

interface HeaderProps {
    error?: string;
}

function Header({error}: HeaderProps) {
    return (
        <div className="header">
            <Undertittel>Forenklet Deploy</Undertittel>
            {error && <div className="header__error">{error}</div>}
        </div>
    );
}

const mapStateToProps = (state: AppState): HeaderProps => ({
    error: selectError(state)
});

export default connect(mapStateToProps)(Header);
