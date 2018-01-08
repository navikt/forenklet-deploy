import * as React from 'react';
import { getUrlForIssue } from '../../promote/promote-utils';

interface JiraIssue {
    id: string;
    title: string;
    status: string;
    assignedTo: string;
}

const issues: JiraIssue[] = [
    { id: 'PUS-11', title: 'Etablere metrikker for ytelse (også frontend)', status: 'Åpen', assignedTo: 'ole brumm'},
    { id: 'PUS-12', title: 'Etablere frontendlogger', status: 'Akseptansetest', assignedTo: 'ole brumm'},
    { id: 'PUS-27', title: 'Automatisert test av UU og brukskvalitet', status: 'Fagfellevurdering', assignedTo: 'ole brumm'},
    { id: 'FO-123', title: 'Identifisere ikke digitale brukere', status: 'Akseptansetest', assignedTo: 'ole brumm'}
];

interface JiraIssueRowProps {
    issue: JiraIssue;
}

function JiraIssueRow({ issue }: JiraIssueRowProps) {
    return (
        <tr>
            <td className="issue">
                <a href={getUrlForIssue(issue.id)}>{issue.id}</a>
            </td>
            <td className="status">{issue.status}</td>
            <td className="assigned">{issue.assignedTo}</td>
            <td className="title">{issue.title}</td>
        </tr>
    );
}

export class IssuesTable extends React.Component<{}> {
    render() {
        return (
            <table className="issues-table">
                <thead>
                    <tr>
                        <th className="issue">Issue</th>
                        <th className="status">Status</th>
                        <th className="assigned">Tildelt</th>
                        <th className="title">Tittel</th>
                    </tr>
                </thead>
                <tbody>
                    { issues.map((issue) => <JiraIssueRow issue={issue} key={issue.id} />) }
                </tbody>
            </table>
        );
    }
}

export default IssuesTable;
