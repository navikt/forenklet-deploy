export default interface Commit {
    id: string;
    application: string;
    message: string;
    timestamp: number;
    committerTimestamp: number;
}
