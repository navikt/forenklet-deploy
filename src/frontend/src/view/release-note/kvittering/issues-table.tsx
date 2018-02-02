import * as React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { JiraIssue } from '../../../models/jira-issue';
import { AppState } from '../../../redux/reducer';
import { selectIssuesForApplication } from '../../../redux/releasenote-duck';
import { onlyUniqueIssues } from '../../../redux/jira-issue-duck';
import { Undertittel } from 'nav-frontend-typografi';

interface OwnProps {
    applications: string[];
}

interface StateProps {
    issues: JiraIssue[];
}

function formatIssue(issue: JiraIssue ) {
    return {
        issue: issue.key,
        status: issue.fields.status.name,
        tildelt: issue.fields.assignee ? issue.fields.assignee.displayName : 'Ikke tildelt',
        tittel: issue.fields.summary
    };
}

function sortByStatus(issueA: JiraIssue, issueB: JiraIssue): number {
    return issueA.fields.status.name.localeCompare(issueB.fields.status.name);
}

export class IssuesTable extends React.Component<OwnProps & StateProps> {
    render() {
        const sortedIssues = onlyUniqueIssues(this.props.issues).sort(sortByStatus);
        const data = sortedIssues.map((issue) => formatIssue(issue));
        const columns = [{
            Header: 'Issue',
            accessor: 'issue',
            width: 150
        }, {
            Header: 'Status',
            accessor: 'status',
            width: 200
        }, {
            Header: 'Tildelt',
            accessor: 'tildelt',
            width: 250
        }, {
            Header: 'Tittel',
            accessor: 'tittel'
        }];

        return (
            <section className="blokk-m">
                <Undertittel className="blokk-xxs">Brukerhistorier ({this.props.issues.length}):</Undertittel>
                <ReactTable columns={columns} data={data}/>
            </section>
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
