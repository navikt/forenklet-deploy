import * as React from 'react';
import * as moment from 'moment';
import 'moment/locale/nb';

moment.locale('nb');

interface AlderProps {
    alder: number;
}

export function getAlder(age: number): string {
    return moment(age).fromNow(true);
}

function Alder({alder}: AlderProps) {
    return <span>{getAlder(alder)}</span>;
}

export default Alder;
