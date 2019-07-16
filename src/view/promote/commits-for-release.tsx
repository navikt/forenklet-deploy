import * as React from 'react';
import ReactTable from 'react-table';
import { Commit } from '../../models/commit';
import Alder from '../alder';
import CommitMessage from './commit-message';
import { Undertittel } from 'nav-frontend-typografi';
import { ReleaseWithCommits } from '../../models/release';

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
        accessor: (commit: Commit) => commit.message,
        Cell: (props: CellPropTypes) => <CommitMessage message={props.value}/>
    }, {
        Header: 'Utvikler',
        id: 'utvikler',
        width: 230,
        accessor: (commit: Commit) => commit.author,
    }, {
        Header: 'Tidspunkt',
        id: 'tidspunkt',
        width: 230,
        sortMethod: (a: number, b: number) => {
            if (a === b ) {
                return 0;
            }
            return b > a ? 1 : -1;
        },
        accessor: (commit: Commit) => commit.timestamp,
        Cell: (props: CellPropTypes) => (<span><Alder alder={props.original.timestamp}/> siden</span>)
    }];

    const pageSize = 20;
    const defaultPageSize = commits.length < pageSize ? commits.length : pageSize;
    const showPagination = commits.length > pageSize;

    return (<ReactTable
        columns={columns}
        data={commits}
        defaultPageSize={defaultPageSize}
        showPagination={showPagination}
        defaultSorted={[{ id: 'tidspunkt' }]}
        previousText={'Forrige'}
        nextText={'Neste'}
        pageText={'Side'}
        ofText={'av'}
        rowsText={'rader'}
    />);
};

interface CommitsForReleaseProps {
    className?: string;
    release: ReleaseWithCommits;
}

function getAnchor(text: string, url: string | null) {
    if (url) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
        );
    }
    return <span>{text}</span>;
}

function getCVSUrl(release: ReleaseWithCommits): string | null {
    if (release.commits && release.commits.length > 0) {
        const cvsUrlBase = release.commits[0].url.match('.*projects/.*/repos/[a-z]*/');
        if (cvsUrlBase) {
            return `${cvsUrlBase}compare/diff?targetBranch=refs%2Ftags%2F${release.fromVersion}&sourceBranch=refs%2Ftags%2F${release.toVersion}`;
        }
    }
    return null;
}

function CommitsForRelease(props: CommitsForReleaseProps) {
    const filterMergeCommits = (commit: Commit) => !commit.mergecommit;
    const filterJenkinsCommits = (commit: Commit) => commit.author !== 'jenkins';

    const filteredCommits = props.release.commits
        .filter(filterMergeCommits)
        .filter(filterJenkinsCommits);

    const hentetAlleEndringer = props.release.commits.length < 1000;
    const cvsUrl = getCVSUrl(props.release);

    return (
        <div className="blokk-m">
            <Undertittel className="blokk-xxs">Endringer
                 ({getAnchor(hentetAlleEndringer ? filteredCommits.length.toString() : '1000+', cvsUrl)}):
            </Undertittel>
            <CommitTable commits={filteredCommits}/>
        </div>
    );
}

export default CommitsForRelease;
