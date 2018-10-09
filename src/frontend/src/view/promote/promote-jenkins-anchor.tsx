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
    const environment = props.env;
    const valgtTeam = props.valgtTeam;
    const application = props.application;

    const buildName = environment === 'p' ? '-release-' : `-promotering-${environment}-`;
    const jenkinsFolder = valgtTeam ? valgtTeam.jenkinsFolder : '';
    const jenkinsUrl = valgtTeam ? valgtTeam.jenkinsUrl : 'http://bekkci.devillo.no';
    let linkUrl = `${jenkinsUrl}/job/${jenkinsFolder}/job/${application}/job/${buildName}/`;
    const version = props.version;
    const provideVersion = valgtTeam != null ? valgtTeam.provideVersion : false;

    if (provideVersion) {
        linkUrl += `parambuild?versjon=${version}`;
    }

    // litt quick-n-dirty løsning her for å passe med jobb-strukturen til foreldrepenger sin byggserver
    if(valgtTeam && ('teamforeldrepenger' === valgtTeam.id)) {
        linkUrl = `http://a34apvl063.devillo.no:8080/jenkins/job/${application}-BUILD/job/master/parambuild/?miljo=${environment}`;
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
