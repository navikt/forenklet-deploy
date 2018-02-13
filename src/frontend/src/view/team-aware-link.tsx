import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { AppState } from '../redux/reducer';
import { selectValgtTeamId } from '../redux/team-velger-duck';

interface HeaderStateProps {
    valgtTeamId: string;
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

interface TeamAwareAnchorProps {
    valgtTeamId: string;
}

type Props = TeamAwareAnchorProps & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & DispatchProp<string>;

function TeamAwareAnchor(props: Props) {
    const {children, valgtTeamId, dispatch, href, ...anchorProps} = props;
    const hrefWithTeam = `${href}?team=${valgtTeamId}`;
    return (
        <a href={hrefWithTeam} {...anchorProps}>{children}</a>
    );
}

const mapStateToProps = (state: AppState): HeaderStateProps => ({
    valgtTeamId: selectValgtTeamId(state),
});

const connectedTeamAwareAnchor = connect(mapStateToProps)(TeamAwareAnchor);
const connectedTeamAwareLink = connect(mapStateToProps)(TeamAwareLink);

export { connectedTeamAwareAnchor as TeamAwareAnchor, connectedTeamAwareLink as TeamAwareLink};
