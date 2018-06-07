import * as React from 'react';
import { connect } from 'react-redux';
import { Team } from '../../models/team';
import { AppState } from '../../redux/reducer';
import { selectValgtTeam } from '../../redux/team-velger-duck';

interface OwnProps {
    application: string;
    env: string;
    version: string;
}

interface StateProps {
    valgtTeam?: Team;
}

function PromoteJenkinsAnchor(props: OwnProps & StateProps) {
    const buildName = props.env === 'p' ? '-release-' : `-promotering-${props.env}-`;
    const jenkinsFolder = props.valgtTeam ? props.valgtTeam.jenkinsFolder : '';
    const jenkinsUrl = props.valgtTeam ? props.valgtTeam.jenkinsUrl : 'http://bekkci.devillo.no';
    let linkUrl = `${jenkinsUrl}/job/${jenkinsFolder}/job/${props.application}/job/${buildName}/`;
    const version = props.version;
    const provideVersion = props.valgtTeam != null ? props.valgtTeam.provideVersion : false;

    if (provideVersion) {
        linkUrl += `parambuild?versjon=${version}`;
    }
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
