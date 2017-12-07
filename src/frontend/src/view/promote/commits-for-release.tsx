import * as React from 'react';
import Commit from '../../dev/commit';

const CommitRow = (commit: Commit) => (
    <tr>
        <td>{commit.hash.slice(0,6)}</td>
        <td>{commit.message}</td>
        <td>{commit.author}</td>
        <td>{(new Date(commit.timestamp)).toISOString()}</td>
    </tr>
);

interface CommitsForReleaseProps {
    className?: string;
    commits: Commit[];
}

function CommitsForRelease(props: CommitsForReleaseProps) {
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
                { props.commits.filter((commit) => !commit.mergecommit).map(CommitRow) }
            </tbody>
        </table>
    );
}

export default CommitsForRelease;
