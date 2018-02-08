import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import { selectValgtTeamId } from '../redux/team-velger-duck';

interface HeaderStateProps {
    valgtTeamId: string;
}

interface AnchorProps {
    href: string;
    valgtTeamId: string;
    className?: string;
    target?: string;
    rel?: string ;
    children?: any;
}

interface LinkProps {
    to: string;
    className: string;
    children: any;
    valgtTeamId: string;
}

function TeamAwareLink({to, className, children, valgtTeamId}: LinkProps) {
    return (
        <NavLink to={`${to}?team=${valgtTeamId}`} className={className}>{children}</NavLink>
    );
}

function TeamAwareAnchor({href, valgtTeamId, children, className, target, rel}: AnchorProps) {
    return (
        <a href={`${href}?team=${valgtTeamId}`} className={className} target={target} rel={rel}>{children}</a>
    );
}

const mapStateToProps = (state: AppState): HeaderStateProps => ({
    valgtTeamId: selectValgtTeamId(state),
});

const connectedTeamAwareAnchor = connect(mapStateToProps)(TeamAwareAnchor);
const connectedTeamAwareLink = connect(mapStateToProps)(TeamAwareLink);

export { connectedTeamAwareAnchor as TeamAwareAnchor, connectedTeamAwareLink as TeamAwareLink};
