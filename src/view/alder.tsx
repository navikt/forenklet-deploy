import * as React from 'react';
import nb from 'date-fns/locale/nb';
import { formatDistance } from 'date-fns';

interface AlderProps {
    alder: number;
}

export function getAlder(age: number): string {
    return formatDistance(new Date(age), Date.now(), { locale: nb });
}

function Alder({alder}: AlderProps) {
    return <span>{getAlder(alder)}</span>;
}

export default Alder;
