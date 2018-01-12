import { Environment } from './environment';

export interface Deploy {
    id: string;
    application: string;
    version: string;
    timestamp: number;
    environment: Environment;
}
