import { Commit } from '../models/commit';
import { seedRandom, randRange, getSeedFromString, randomMessage, randomIssue, randomAuthor } from './utils';

function generateHash(): string {
    const validSymbols = '0123456789abcdef';
    const hashList = [];
    for(let i=0; i<16; i++) {
        hashList.push(validSymbols[randRange(0, validSymbols.length)]);
    }
    return hashList.join('');
}

export function getMockCommits(application: string): Commit[] {
    seedRandom(getSeedFromString(application));

    const numberOfCommits = randRange(1, 25);
    const commitMessages: string[] = [];
    for(let i=0; i<numberOfCommits; i++) {
        commitMessages.push(randomMessage());
    }

    const uniqueCommitsMessages = Array.from(new Set(commitMessages));
    return uniqueCommitsMessages.map((commitMessage: string) => {
        const hash = generateHash();
        const url = `http://stash.devillo.no/projects/dial/repos/${application}/commits/${hash}`;
        // const url = `https://github.com/navikt/jenkins-dsl-scripts/commit/52277652301f747dc14918457c481973d0d2823f`;
        return {
            hash,
            application,
            url,
            timestamp: Date.now() - (randRange(4, 1000) * 1000),
            message: `${randomIssue()} ${commitMessage}`,
            author: randomAuthor(),
            mergecommit: false
        };
    });
}
