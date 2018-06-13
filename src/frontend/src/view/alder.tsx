import * as React from 'react';
import * as locale from 'date-fns/locale/nb';
import * as formatDistance from 'date-fns/formatDistance';

interface AlderProps {
    alder: number;
}

export function getAlder(age: number): string {
    return formatDistance(new Date(age), Date.now(), { locale });
}

function Alder({alder}: AlderProps) {
    return <span>{getAlder(alder)}</span>;
}

export default Alder;
