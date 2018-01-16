import { JiraIssue } from '../models/jira-issue';
import { seedRandom, getSeedFromString, randRange, randomAuthor, randomMessage } from './utils';

function randomStatus(): string {
    const statuser = ['Ferdig', 'Klar til utvikling', 'Produktkø', 'TEST 1', 'TEST 2'];
    return statuser[randRange(0, statuser.length)];
}

export function getMockIssue(issueId: string): JiraIssue {
    seedRandom(getSeedFromString(issueId));
    return {
        key: issueId,
        id: randRange(100, 5000).toString(),
        fields: {
            assignee: { displayName: randomAuthor() },
            status: { name: randomStatus() },
            summary: randomMessage()
        }
    };
}
