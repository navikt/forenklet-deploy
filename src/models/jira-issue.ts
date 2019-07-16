export interface JiraIssue {
    id: string;
    key: string;
    fields: {
        assignee?: {
            displayName: string
        },
        status: {
            name: string;
        },
        summary: string;
    };
}
