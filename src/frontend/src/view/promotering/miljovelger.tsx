import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import { getEnvironments } from '../../utils/environment';

interface MiljovelgerProps {
    onChange: (fromEnv: string, toEnv: string) => void;
    fromEnv: string;
    toEnv: string;
}

export default function Miljovelger(props: MiljovelgerProps) {
    const envs = getEnvironments();

    return (
        <div className="miljovelger blokk-m">
            <Select label="Fra miljø:" bredde="s" value={props.fromEnv} onChange={(e) => props.onChange(e.currentTarget.value, props.toEnv)}>
                { envs.map((env) => <option key={`fra-${env.name}`}>{env.name}</option>) }
            </Select>

            <Select label="Til miljø:" bredde="s" value={props.toEnv} onChange={(e) => props.onChange(props.fromEnv, e.currentTarget.value)}>
                { envs.map((env) => <option key={`til-${env.name}`}>{env.name}</option>) }
            </Select>
        </div>
    );
}
