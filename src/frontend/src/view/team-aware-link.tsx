import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { AppState } from '../redux/reducer';
import { selectValgtTeamId } from '../redux/team-velger-duck';

interface LinkStateProps {
    valgtTeamId: string;
}

type TeamAwareLinkProps = LinkStateProps & NavLinkProps & DispatchProp<string>;

function TeamAwareLink(props: TeamAwareLinkProps) {
    const {children, valgtTeamId, to, dispatch, ...linkProps} = props;
    const toWithTeam = `${to}?team=${valgtTeamId}`;
    return (
        <NavLink to={toWithTeam} {...linkProps}>{children}</NavLink>
    );
}

type TeamAwareAnchorProps = LinkStateProps & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & DispatchProp<string>;

function TeamAwareAnchor(props: TeamAwareAnchorProps) {
    const {children, valgtTeamId, dispatch, href, ...anchorProps} = props;
    const hrefWithTeam = `${href}?team=${valgtTeamId}`;
    return (
        <a href={hrefWithTeam} {...anchorProps}>{children}</a>
    );
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
    valgtTeamId: selectValgtTeamId(state),
});

const connectedTeamAwareAnchor = connect(mapStateToProps)(TeamAwareAnchor);
const connectedTeamAwareLink = connect(mapStateToProps)(TeamAwareLink);

export { connectedTeamAwareAnchor as TeamAwareAnchor, connectedTeamAwareLink as TeamAwareLink};
