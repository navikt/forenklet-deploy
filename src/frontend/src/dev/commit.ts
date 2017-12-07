export default interface Commit {
    hash: string;
    application: string;
    message: string;
    timestamp: number;
    author: string;
    mergecommit: boolean;
}
