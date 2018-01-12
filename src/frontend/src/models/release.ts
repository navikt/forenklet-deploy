import { Commit } from './commit';
import { Environment } from './environment';

export interface Release {
    application: string;
    fromVersion: string;
    toVersion: string;
    environment: Environment;
}

export interface ReleaseWithCommits extends Release {
    commits: Commit[];
}
