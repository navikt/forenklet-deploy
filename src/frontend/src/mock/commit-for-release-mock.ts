import { Commit } from '../models/commit';
import { seedRandom, randRange, getSeedFromString } from './utils';

function generateHash(): string {
    const validSymbols = '0123456789abcdef';
    const hashList = [];
    for(let i=0; i<16; i++) {
        hashList.push(validSymbols[randRange(0, validSymbols.length)]);
    }
    return hashList.join('');
}

function randomIssue(): string {
    const validPrefixes = ['FO', 'PUS'];
    const prefix = validPrefixes[randRange(0, validPrefixes.length)];
    return `${prefix}-${randRange(1, 200)}`;
}

function randomCommitMessage(): string {
    const commitMessages = [
        'Fix tslint issues',
        'Ikke vis listevisning på veiledersiden',
        'Reduserer antall søyler i diagrammet',
        'Bruk slice i stede for splice',
        'Bytter sorteringsfelt til aapunntakukerigjen',
        'Sender med filter ved lasting av portefølje',
        'Fikser sonarfeil',
        'Bruker uker igjen i visningen av aap unntak',
        'Legg til listevisning på min oversikt',
        'Setter private=true i package.json',
        'Adding UU-definition file',
        'Må støtte at brukere kommer inn med ugyldig enhet i urlen',
        'Oppdaterer lockfile',
        'Legg til nyc',
        'Fjerner camel-casing da solr-feltene er lowercase',
        'Renaming - konsistent naming av aapUnntakDagerIgjen',
        'Viser feilmodal når bytte av enhet feiler pga kontekstholder',
        'Bugfiks der alertstripe er angitt med feil navn',
        'Fjerner ubrukt import',
        'Skriver litt flere tester',
        'Fikser bug i utledning av status på arbeidserfaring',
        'Må bruker Tom og ikke Fom for arbeidsperiode',
        'Fikser diverse feil'
    ];
    return commitMessages[randRange(0, commitMessages.length)];
}

function randomAuthor(): string {
    const authors = [
        'Dummy the cat',
        'Ole Brumm',
        'Pusur',
        'Donald Duck',
        'Mikke Mus'
    ];
    return authors[randRange(0, authors.length)];
}

export function getMockCommits(application: string): Commit[] {
    seedRandom(getSeedFromString(application));

    const numberOfCommits = randRange(3, 10);
    const commitMessages: string[] = [];
    for(let i=0; i<numberOfCommits; i++) {
        commitMessages.push(randomCommitMessage());
    }

    const uniqueCommitsMessages = Array.from(new Set(commitMessages));
    return uniqueCommitsMessages.map((commitMessage: string) => ({
        hash: generateHash(),
        application,
        url: '#',
        timestamp: Date.now(),
        message: `${randomIssue()} ${commitMessage}`,
        author: randomAuthor(),
        mergecommit: false
    }));
}
