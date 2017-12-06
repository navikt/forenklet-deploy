export enum DeployType {
    AUTOMATIC,
    PROMOTE,
    RELEASE
}

export default interface Environment {
    name: string;
    deployType: DeployType;
}
