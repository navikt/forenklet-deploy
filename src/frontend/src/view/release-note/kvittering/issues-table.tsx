import * as React from 'react';
import { connect } from 'react-redux';
import { getUrlForIssue } from '../../promote/promote-utils';
import { JiraIssue } from '../../../models/jira-issue';
import { AppState } from '../../../redux/reducer';
import { selectIssuesForApplication } from '../../../redux/releasenote-duck';

interface OwnProps {
    application?: string;
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

export class IssuesTable extends React.Component<OwnProps & StateProps> {
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
                    { this.props.issues.map((issue) => <JiraIssueRow issue={issue} key={issue.id} />) }
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        issues: ownProps.application ? selectIssuesForApplication(state, ownProps.application) : state.jira.issues
    };
}

export default connect(mapStateToProps)(IssuesTable);
