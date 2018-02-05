import * as React from 'react';
import ReactTable from 'react-table';
import { Commit } from '../../models/commit';
import Alder from '../alder';
import CommitMessage from './commit-message';
import { Undertittel } from 'nav-frontend-typografi';

interface CommitTablePropTypes {
    commits: Commit[];
}

interface CellPropTypes {
    value: Commit;
}

const CommitTable = ({commits}: CommitTablePropTypes) => {
    const columns = [{
        Header: 'Id',
        id: 'id',
        width: 160,
        accessor: (commit: Commit) => commit,
        Cell: (props: CellPropTypes) => <a href={props.value.url}>{props.value.hash.slice(0, 8)}</a>
    }, {
        Header: 'Melding',
        id: 'melding',
        width: 700,
        accessor: (commit: Commit) => commit,
        Cell: (props: CellPropTypes) => <CommitMessage message={props.value.message}/>
    }, {
        Header: 'Utvikler',
        accessor: 'author'
    }, {
        Header: 'Tidspunkt',
        id: 'tidspunkt',
        accessor: (commit: Commit) => commit,
        Cell: (props: CellPropTypes) => <Alder alder={props.value.timestamp}/>
    }];

    const defaultPageSize = commits.length < 20 ? commits.length : 20;
    const showPagination = commits.length > 20;

    return (<ReactTable
        columns={columns}
        data={commits}
        defaultPageSize={defaultPageSize}
        showPagination={showPagination}
        previousText={'Forrige'}
        nextText={'Neste'}
        pageText={'Side'}
        ofText={'av'}
        rowsText={'rader'}
    />);
};

interface CommitsForReleaseProps {
    className?: string;
    commits: Commit[];
}

function CommitsForRelease(props: CommitsForReleaseProps) {
    const filterMergeCommits = (commit: Commit) => !commit.mergecommit;
    const sortByTimestamp = (a: Commit, b: Commit) => b.timestamp - a.timestamp;
    const filterJenkinsCommits = (commit: Commit) => commit.author !== 'jenkins';

    const filteredCommits = props.commits
        .filter(filterMergeCommits)
        .filter(filterJenkinsCommits);
    const commitsToDisplay = filteredCommits
        .sort(sortByTimestamp);

    const hentetAlleEndringer = props.commits.length < 1000;

    return (
        <div className="blokk-m">
            <Undertittel className="blokk-xxs">Endringer ({ hentetAlleEndringer ? commitsToDisplay.length : `1000+` }):</Undertittel>
            <CommitTable commits={commitsToDisplay}/>
        </div>
    );
}

export default CommitsForRelease;
