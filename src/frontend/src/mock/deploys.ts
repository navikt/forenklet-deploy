import { VeraDeploy } from '../api/deploy-api';
import { seedRandom, getSeedFromString, randRange, shuffleList } from './utils';
import { getEnvironments } from '../utils/environment';

function getDeploysForApp(app: string): VeraDeploy[] {
    const numberOfDeploys = randRange(0, 10) > 2 ? 4 : 2;
    const environments = getEnvironments();
    let deployTime = Date.now();
    let majorVersion = randRange(300, 5000);
    const deploys: VeraDeploy[] = [];

    for(let x=0; x<numberOfDeploys; x++) {
        deployTime -= randRange(5, 60) * 1000 * 60;
        majorVersion -= randRange(1, 8);

        deploys.push({
            id: randRange(1000, 5000000).toString(),
            application: app,
            deployed_timestamp: (new Date(deployTime)).toISOString(),
            version: `${majorVersion}.${randRange(20170000, 20180700)}.${randRange(0, 2359)}`,
            environment: environments[x].name
        });
    }

    return deploys;
}

export function getDeploysForTeam(team: string) {
    seedRandom(getSeedFromString(team));
    const numberOfApps = randRange(3, appNames.length);

    const appsForTeam = shuffleList(appNames).slice(0, numberOfApps);
    return appsForTeam
        .map(getDeploysForApp)
        .reduce((agg, current) => agg.concat(current), []);
}

const appNames = [
    'veilarbveileder',
    'veilarbaktivitet',
    'veilarboppfolgingproxy',
    'jobbsokerkompetanse',
    'veilarbportefoljeflatefs',
    'veilarbportefolje',
    'veilarbportefoljeindeks',
    'veilarboppfolging',
    'veilarbaktivitetsplanfs',
    'aktivitetsplan',
    'aktivitetsplan-felles',
    'feature',
    'veilarbdemo',
    'veilarbpersonflatefs',
    'veilarbperson',
    'modiacontextholder',
    'veilarbaktivitetproxy',
    'veilarbjobbskproxy',
    'veilarboppgave',
    'modiabrukerdialog',
    'veilarbdialog',
    'veilarblogin',
    'modiaeventdistribution',
    'internarbeidsflatedecorator',
    'frontendlogger',
    'veilarbdialogproxy',
    'veilarbpersonfs',
    'mia',
    'miasolr'
];
