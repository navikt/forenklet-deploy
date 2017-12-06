import * as React from 'react';
import * as moment from 'moment';
import 'moment/locale/nb';

moment.locale('nb');

interface AlderProps {
    alder: number;
}

function Alder({alder}: AlderProps) {
    return <span>{moment(alder).fromNow(true)}</span>;
}

export default Alder;
