import * as React from 'react';
import { Commit } from '../../../models/commit';
import { ReleaseWithCommits } from '../../../models/release';
import { Undertittel } from 'nav-frontend-typografi';

interface UtrullingskandidaterProps {
    releases: ReleaseWithCommits[];
}

function flatMap<T>(agg: T[], current: T[]): T[] {
    return agg.concat(current);
}

function getNumCommitsForAuthor(author: string, commits: Commit[]): number {
    return commits.filter((commit) => commit.author === author).length;
}

export default function Utrullingskandidater(props: UtrullingskandidaterProps) {
    const commits = props.releases
        .map((release) => release.commits)
        .reduce(flatMap)
        .filter((commit) => !commit.mergecommit);

    const authors = Array.from(new Set(commits.map((commit) => commit.author)));
    const authorsWithNumCommits = authors
        .map((author) => ({ name: author, numCommits: getNumCommitsForAuthor(author, commits)}))
        .sort((a, b) => b.numCommits - a.numCommits);

    return (
        <section className="blokk-m">
            <Undertittel className="blokk-xxs">Kandidater for utrullingsrollen:</Undertittel>
            <ol>
                { authorsWithNumCommits.slice(0, 3).map((candidate) => <li key={candidate.name}>{`${candidate.name} (${candidate.numCommits})`}</li>)}
            </ol>
        </section>
    );
}
