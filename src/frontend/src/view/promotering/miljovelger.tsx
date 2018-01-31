import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import { getEnvironments } from '../../utils/environment';

interface MiljovelgerProps {
    onChange: (fromEnv: string, toEnv: string) => void;
    fromEnv: string;
    toEnv: string;
}

export default function Miljovelger(props: MiljovelgerProps) {
    return (
        <div className="miljovelger">
            <Select label="Fra miljø:" bredde="s" value={props.fromEnv}>
                { getEnvironments().map((env) => <option key={`fra-${env.name}`}>{env.name}</option>) }
            </Select>

            <Select label="Til miljø:" bredde="s" value={props.toEnv}>
                { getEnvironments().map((env) => <option key={`til-${env.name}`}>{env.name}</option>) }
            </Select>
        </div>
    );
}
