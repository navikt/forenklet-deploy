import * as React from 'react';
import AppState from '../redux/app-state';
import {connect} from 'react-redux';
import Deployment from '../deployment/deployment';
import Application from '../application/application';
import Environment from '../environment/environment';
import {selectApplicationEnvironmentDeployment} from '../deployment/deployment-selector';
import {selectCommitsForApplication, selectTags} from "../dev/dev-selector";
import Commit from "../dev/commit";
import AppEvent from "../app-event/app-event";
import Tag from '../dev/tag';
import Alder from "./alder";
import {selectApplicationEnvironmentEvents} from '../app-event/app-event-selector';

export interface OwnProps {
    application: Application;
    environment: Environment;
}

interface StateProps {
    deployment ?: Deployment;
    commits: Commit[];
    tags: Tag[];
    events: AppEvent[];
}

interface CommitProps {
    commit: Commit;
}

function CommitView({commit}: CommitProps) {
    return (
        <tr>
            <td>{commit.id}</td>
            <td>{commit.message}</td>
            <td><Alder alder={commit.committerTimestamp}/></td>
        </tr>
    )
}

interface TagProps {
    tag: Tag;
}

function TagView({tag}: TagProps) {
    return (
        <tr>
            <td>{tag.id}</td>
            <td>{tag.latestCommit}</td>
        </tr>
    )
}

interface EventProps {
    event: AppEvent;
}

function EventView({event}: EventProps) {
    return (
        <tr>
            <td>{event.id}</td>
            <td><Alder alder={event.timestamp}/></td>
            <td>{event.eventType}</td>
            <td>{event.environment}</td>
            <td>{event.description}</td>
        </tr>
    )
}

function DeploymentDetails({
                               deployment,
                               events,
                               tags,
                               commits
                           }: StateProps) {
    const version = deployment && deployment.version;
    const application = deployment && deployment.application;
    return (
        <div>
            <h1>{application}</h1>
            <h2>{version}</h2>
            <div>
                <h2>commits</h2>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>melding</th>
                        <th>alder</th>
                    </tr>
                    </thead>
                    <tbody>
                    {commits.map(c => <CommitView key={c.id} commit={c}/>)}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>events</h2>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>alder</th>
                        <th>type</th>
                        <th>miljø</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map(c => <EventView key={c.id} event={c}/>)}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>tags</h2>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tags.map(t => <TagView key={t.id} tag={t}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
    return ({
        deployment: selectApplicationEnvironmentDeployment(state, ownProps.application, ownProps.environment),
        events: selectApplicationEnvironmentEvents(state, ownProps.application, ownProps.environment),
        commits: selectCommitsForApplication(state, ownProps.application),
        tags: selectTags(state, ownProps.application)
    });
};

export default connect(mapStateToProps)(DeploymentDetails);
