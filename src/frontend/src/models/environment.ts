export enum DeployType {
    AUTOMATIC,
    PROMOTE,
    RELEASE,
    NONE
}

export interface Environment {
    name: string;
    promotesTo?: string;
    deployType: DeployType;
}
