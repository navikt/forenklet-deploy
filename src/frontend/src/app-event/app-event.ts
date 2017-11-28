
export default interface AppEvent {
    id: string;
    eventType: number;
    timestamp: number;
    application: string;
    environment: string;
    version: string;
    description: string;
}
