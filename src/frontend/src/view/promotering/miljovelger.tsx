import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { Environment } from '../../models/environment';
import { selectMiljoerForValgtTeam } from '../../redux/team-velger-duck';

interface MiljovelgerProps {
    onChange: (fromEnv: string, toEnv: string) => void;
    fromEnv: string;
    toEnv: string;
}

interface StateProps {
    environments: Environment[];
}

function Miljovelger(props: MiljovelgerProps & StateProps) {
    return (
        <div className="miljovelger blokk-m">
            <Select label="Fra miljø:" bredde="s" value={props.fromEnv} onChange={(e) => props.onChange(e.currentTarget.value, props.toEnv)}>
                { props.environments.map((env) => <option key={`fra-${env.name}`}>{env.name}</option>) }
            </Select>

            <Select label="Til miljø:" bredde="s" value={props.toEnv} onChange={(e) => props.onChange(props.fromEnv, e.currentTarget.value)}>
                { props.environments.map((env) => <option key={`til-${env.name}`}>{env.name}</option>) }
            </Select>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    environments: selectMiljoerForValgtTeam(state)
});

export default connect(mapStateToProps)(Miljovelger);
