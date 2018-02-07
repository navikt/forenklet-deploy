import * as React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { JiraIssue } from '../../../models/jira-issue';
import { AppState } from '../../../redux/reducer';
import { selectIssuesForApplication } from '../../../redux/releasenote-duck';
import { onlyUniqueIssues } from '../../../redux/jira-issue-duck';
import { Undertittel } from 'nav-frontend-typografi';
import { getUrlForIssue } from '../../promote/promote-utils';

interface OwnProps {
    applications: string[];
    className?: string;
}

interface StateProps {
    issues: JiraIssue[];
}

interface CellPropTypes {
    value: string;
    original: JiraIssue;
}

export class IssuesTable extends React.Component<OwnProps & StateProps> {
    render() {
        const uniqueIssues = onlyUniqueIssues(this.props.issues);
        const columns = [{
            Header: 'Issue',
            width: 150,
            id: 'issue',
            accessor: (issue: JiraIssue) => issue.key,
            Cell: (props: CellPropTypes) => <a href={getUrlForIssue(props.value)}>{props.value}</a>
        }, {
            Header: 'Status',
            id: 'status',
            accessor: (issue: JiraIssue) =>  issue.fields.status.name,
            width: 200
        }, {
            Header: 'Tildelt',
            id: 'tildelt',
            accessor: (issue: JiraIssue) =>  issue.fields.assignee ? issue.fields.assignee.displayName : 'Ikke tildelt',
            width: 250
        }, {
            Header: 'Tittel',
            id: 'tittel',
            accessor: (issue: JiraIssue) => issue.fields.summary
        }];

        const defaultPageSize = uniqueIssues.length < 20 ? uniqueIssues.length : 20;
        const showPagination = uniqueIssues.length > 20;

        return (
            <section className={`${this.props.className} blokk-m`}>
                <Undertittel className="blokk-xxs">Brukerhistorier ({this.props.issues.length}):</Undertittel>
                <ReactTable
                    columns={columns}
                    data={uniqueIssues}
                    defaultSorted={[{ id: 'status' }, { id: 'tildelt' }]}
                    defaultPageSize={defaultPageSize}
                    showPagination={showPagination}
                    previousText={'Forrige'}
                    nextText={'Neste'}
                    pageText={'Side'}
                    ofText={'av'}
                    rowsText={'rader'}
                />
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
