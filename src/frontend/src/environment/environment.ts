export enum DeployType {
    AUTOMATIC,
    PROMOTE,
    RELEASE,
    NONE
}

export default interface Environment {
    name: string;
    promotesTo?: string;
    deployType: DeployType;
}
