import { Team } from '../models/team';

export const teams: Team[] = [
    {
        id: 'fo',
        displayName: 'Forenklet Oppfølging',
        jenkinsFolder: 'forenklet_oppfolging',
        provideVersion: false,
        jenkinsUrl: 'http://bekkci.devillo.no'
    },
    {
        id: 'rocket',
        displayName: 'Team Rocket',
        jenkinsFolder: 'team_rocket',
        provideVersion: false,
        jenkinsUrl: 'http://bekkci.devillo.no'
    }
];
