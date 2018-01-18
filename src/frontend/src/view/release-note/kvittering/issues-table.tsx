import * as React from 'react';
import { connect } from 'react-redux';
import { getUrlForIssue } from '../../promote/promote-utils';
import { JiraIssue } from '../../../models/jira-issue';
import { AppState } from '../../../redux/reducer';
import { selectIssuesForApplication } from '../../../redux/releasenote-duck';
import { onlyUniqueIssues } from '../../../redux/jira-issue-duck';

interface OwnProps {
    applications: string[];
}

interface StateProps {
    issues: JiraIssue[];
}

interface JiraIssueRowProps {
    issue: JiraIssue;
}

function JiraIssueRow({ issue }: JiraIssueRowProps) {
    return (
        <tr>
            <td className="issue">
                <a href={getUrlForIssue(issue.key)}>{issue.key}</a>
            </td>
            <td className="status">{issue.fields.status.name}</td>
            <td className="assigned">{issue.fields.assignee ? issue.fields.assignee.displayName : 'Ikke tildelt'}</td>
            <td className="title">{issue.fields.summary}</td>
        </tr>
    );
}

function sortByStatus(issueA: JiraIssue, issueB: JiraIssue): number {
    return issueA.fields.status.name.localeCompare(issueB.fields.status.name);
}

export class IssuesTable extends React.Component<OwnProps & StateProps> {
    render() {
        const sortesIssues = onlyUniqueIssues(this.props.issues).sort(sortByStatus);

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
                    { sortesIssues.map((issue) => <JiraIssueRow issue={issue} key={issue.key} />) }
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        issues: ownProps.applications
            .map((application) => selectIssuesForApplication(state, application))
            .reduce((agg, current) => agg.concat(current), [])
    };
}

export default connect(mapStateToProps)(IssuesTable);
