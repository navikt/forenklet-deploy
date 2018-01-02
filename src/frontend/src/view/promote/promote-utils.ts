export interface JiraIssue {
    name: string;
    uri: string;
}

export const matchPattern = /\[?([a-zA-Z]{1,3}\d*\-\d+)[ :\-\]]?/g;

export function getUrlForIssue(issue: string): string {
    return `https://jira.adeo.no/browse/${issue}`;
}

function onlyUnique(value: string, index: number, self: string[]): boolean {
    return self.indexOf(value) === index;
}

export function getIssuesFromMessage(message: string): JiraIssue[] {
    const results: string[] = [];
    let match;
    do {
        match =  matchPattern.exec(message);
        if (match != null) {
            results.push(match[1]);
        }
    } while(match != null);

    return results
        .map((issue) => issue.toUpperCase())
        .map((issue) => issue.trim())
        .filter(onlyUnique)
        .map((issue) => ({
            name: issue,
            uri: getUrlForIssue(issue)
        }));
}
