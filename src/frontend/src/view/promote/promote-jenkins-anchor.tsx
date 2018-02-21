import * as React from 'react';
import { connect } from 'react-redux';
import { Team } from '../../models/team';
import { AppState } from '../../redux/reducer';
import { selectValgtTeam } from '../../redux/team-velger-duck';

interface OwnProps {
    application: string;
    env: string;
}

interface StateProps {
    valgtTeam?: Team;
}

function PromoteJenkinsAnchor(props: OwnProps & StateProps) {
    const buildName = props.env === 'p' ? '-release-' : `-promotering-${props.env}-`;
    const jenkinsFolder = props.valgtTeam ? props.valgtTeam.jenkinsFolder : '';
    const linkUrl = `http://bekkci.devillo.no/job/${jenkinsFolder}/job/${props.application}/job/${buildName}/`;

    return (
        <a className="knapp knapp--hoved" href={linkUrl} target="_blank" rel="noopener noreferrer">
            Promoter
        </a>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTeam: selectValgtTeam(state)
    };
}

export default connect(mapStateToProps)(PromoteJenkinsAnchor);
