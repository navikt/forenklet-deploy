export interface Team {
    id: string;
    displayName: string;
    jenkinsFolder: string;
    jenkinsUrl: string;
    provideVersion: boolean;
    environments: string[];
}
