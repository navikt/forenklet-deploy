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
    value: string;
    original: Commit;
}

const CommitTable = ({commits}: CommitTablePropTypes) => {
    const columns = [{
        Header: 'Id',
        id: 'id',
        width: 160,
        accessor: (commit: Commit) => commit.hash,
        Cell: (props: CellPropTypes) => <a href={props.original.url}>{props.value.slice(0, 8)}</a>
    }, {
        Header: 'Melding',
        id: 'melding',
        width: 700,
        accessor: (commit: Commit) => commit.message,
        Cell: (props: CellPropTypes) => <CommitMessage message={props.value}/>
    }, {
        Header: 'Utvikler',
        id: 'utvikler',
        accessor: (commit: Commit) => commit.author,
    }, {
        Header: 'Tidspunkt',
        id: 'tidspunkt',
        accessor: (commit: Commit) => commit.timestamp,
        Cell: (props: CellPropTypes) => (<span><Alder alder={props.original.timestamp}/> siden</span>)
    }];

    const defaultPageSize = commits.length < 10 ? commits.length : 10;
    const showPagination = commits.length > 10;

    return (<ReactTable
        columns={columns}
        data={commits}
        defaultPageSize={defaultPageSize}
        showPagination={showPagination}
        defaultSorted={[{ id: 'tidspunkt', desc: true }]}
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
    const filterJenkinsCommits = (commit: Commit) => commit.author !== 'jenkins';

    const filteredCommits = props.commits
        .filter(filterMergeCommits)
        .filter(filterJenkinsCommits);

    const hentetAlleEndringer = props.commits.length < 1000;

    return (
        <div className="blokk-m">
            <Undertittel className="blokk-xxs">Endringer ({ hentetAlleEndringer ? filteredCommits.length : `1000+` }):</Undertittel>
            <CommitTable commits={filteredCommits}/>
        </div>
    );
}

export default CommitsForRelease;
