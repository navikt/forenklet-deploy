import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import { selectValgtTeamId } from '../redux/team-velger-duck';

interface LinkStateProps {
    valgtTeamId: string;
}

type TeamAwareLinkProps = LinkStateProps & NavLinkProps;

const TeamAwareLink: React.SFC<TeamAwareLinkProps> = ({children, valgtTeamId, to, ...linkProps}) => {
    const toWithTeam = `${to}?team=${valgtTeamId}`;
    return (
        <NavLink to={toWithTeam} {...linkProps}>{children}</NavLink>
    );
};

interface OwnProps {
    href: string;
}

type TeamAwareAnchorProps = LinkStateProps & OwnProps;

const TeamAwareAnchor: React.SFC<TeamAwareAnchorProps> = (props) => {
    const {children, valgtTeamId, href, ...anchorProps} = props;
    const hrefWithTeam = `${href}?team=${valgtTeamId}`;
    return (
        <a href={hrefWithTeam} {...anchorProps}>{children}</a>
    );
};

const mapStateToProps = (state: AppState): LinkStateProps => ({
    valgtTeamId: selectValgtTeamId(state),
});

const connectedTeamAwareAnchor = connect(mapStateToProps)(TeamAwareAnchor);
const connectedTeamAwareLink = connect(mapStateToProps)(TeamAwareLink);

export { connectedTeamAwareAnchor as TeamAwareAnchor, connectedTeamAwareLink as TeamAwareLink};
