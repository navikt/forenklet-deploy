import * as React from 'react';
import { Commit } from '../../models/commit';
import Alder from '../alder';
import CommitMessage from './commit-message';

interface CommitRowProps {
    commit: Commit;
}

const CommitRow = ({commit}: CommitRowProps) => (
    <tr>
        <td><a href={commit.url}>{commit.hash.slice(0,8)}</a></td>
        <td><CommitMessage message={commit.message}/></td>
        <td>{commit.author}</td>
        <td><Alder alder={commit.timestamp}/> siden</td>
    </tr>
);

interface CommitsForReleaseProps {
    className?: string;
    commits: Commit[];
}

function CommitsForRelease(props: CommitsForReleaseProps) {
    const filterMergeCommits = (commit: Commit) => !commit.mergecommit;
    const sortByTimestamp = (a: Commit, b: Commit) => b.timestamp - a.timestamp;

    return (
        <table className={`commits-table ${props.className}`}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Melding</th>
                    <th>Utvikler</th>
                    <th>Tidspunkt</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.commits
                        .sort(sortByTimestamp)
                        .filter(filterMergeCommits)
                        .map((commit) => <CommitRow key={commit.hash} commit={commit} />)
                }
            </tbody>
        </table>
    );
}

export default CommitsForRelease;
