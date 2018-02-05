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
}

interface StateProps {
    issues: JiraIssue[];
}

interface CellPropTypes {
    value: JiraIssue;
}

function sortByStatus(issueA: JiraIssue, issueB: JiraIssue): number {
    return issueA.fields.status.name.localeCompare(issueB.fields.status.name);
}

export class IssuesTable extends React.Component<OwnProps & StateProps> {
    render() {
        const sortedIssues = onlyUniqueIssues(this.props.issues).sort(sortByStatus);
        const columns = [{
            Header: 'Issue',
            width: 150,
            id: 'issue',
            accessor: (props: CellPropTypes): CellPropTypes => props,
            Cell: (props: CellPropTypes) => <a href={getUrlForIssue(props.value.key)}>{props.value.key}</a>
        }, {
            Header: 'Status',
            id: 'status',
            accessor: (props: CellPropTypes): CellPropTypes =>  props,
            Cell: (props: CellPropTypes) => props.value.fields.status.name,
            width: 200
        }, {
            Header: 'Tildelt',
            id: 'tildelt',
            accessor: (props: CellPropTypes): CellPropTypes => props,
            Cell: (props: CellPropTypes) => props.value.fields.assignee ? props.value.fields.assignee.displayName : 'Ikke tildelt',
            width: 250
        }, {
            Header: 'Tittel',
            id: 'tittel',
            accessor: (props: CellPropTypes): CellPropTypes =>  props,
            Cell: (props: CellPropTypes) => props.value.fields.summary,
        }];

        const defaultPageSize = sortedIssues.length < 20 ? sortedIssues.length : 20;
        const showPagination = sortedIssues.length > 20;

        return (
            <section className="blokk-m">
                <Undertittel className="blokk-xxs">Brukerhistorier ({this.props.issues.length}):</Undertittel>
                <ReactTable
                    columns={columns}
                    data={sortedIssues}
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
