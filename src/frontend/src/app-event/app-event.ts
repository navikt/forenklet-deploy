
export default interface AppEvent {
    id: string;
    eventType: string;
    timestamp: number;
    application: string;
    environment: string;
    version: string;
    description: string;
}
