import * as React from 'react';
import { Commit } from '../../models/commit';
import Alder from '../alder';
import CommitMessage from './commit-message';
import { Normaltekst } from 'nav-frontend-typografi';

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
    const filterJenkinsCommits = (commit: Commit) => commit.author !== 'jenkins';

    const filteredCommits = props.commits
        .filter(filterMergeCommits)
        .filter(filterJenkinsCommits);
    const commitsToDisplay = filteredCommits
        .sort(sortByTimestamp)
        .slice(0, 30);

    const harSkjultCommits = commitsToDisplay.length < filteredCommits.length;

    return (
        <div>
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
                    { commitsToDisplay.map((commit) => <CommitRow key={commit.hash} commit={commit} />) }
                </tbody>
            </table>
            { harSkjultCommits && <Normaltekst>Skjuler {filteredCommits.length - commitsToDisplay.length} endringer</Normaltekst> }
        </div>
    );
}

export default CommitsForRelease;
