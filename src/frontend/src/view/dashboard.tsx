import * as React from 'react';
import AppState from '../redux/app-state';
import { connect } from 'react-redux';
import Application from '../application/application';
import { selectApplications } from '../application/application-selector';
import { selectEnvironments } from '../environment/environment-selector';
import Environment from '../environment/environment';
import Deployment from './deployment';
import UserStoryDeployment from './user-story-deployment';
import PromoteButton from './promote-button';
import UserStory from '../user-story/user-story';
import { selectUserStories } from '../user-story/user-story-selector';
import DashboardMode from './dashboard-mode';
import { selectDashboardMode } from './view-selector';
import { selectIsLoadingInitialData } from '../app-event/app-event-selector';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface ApplicationRowProps {
    application: Application;
    environments: Environment[];
}

function ApplicationRow({
                            application,
                            environments
                        }: ApplicationRowProps) {
    return (
        <tr>
            <td className="left">{application.name}</td>
            {environments.map((environment) =>
                [
                    <td key={`${environment.name}-promote`}>
                        <PromoteButton application={application} environment={environment}/>
                    </td>,
                    <td key={environment.name}>
                        <Deployment
                            application={application}
                            environment={environment}
                        />
                    </td>
                ]
            )}
        </tr>
    );
}

interface UserStoryRowProps {
    userStory: UserStory;
    environments: Environment[];
}

function UserStoryRow({
                          userStory,
                          environments
                      }: UserStoryRowProps) {

    const key = userStory.key;
    const url = `https://jira.adeo.no/browse/${key}`;
    const assignee = userStory.assignee;
    return (
        <tr>
            <td className="left">
                <a href={url} target="_blank">{userStory.summary}</a>
            </td>
            <td>
                <a href={url} target="_blank">{key}</a>
            </td>
            <td>{assignee && assignee.displayName}</td>
            <td>{userStory.status.name}</td>
            {environments.map((environment) =>
                [
                    <td key={environment.name}>
                        <UserStoryDeployment
                            userStory={userStory}
                            environment={environment}
                        />
                    </td>,
                ]
            )}
        </tr>
    );
}

interface StateProps {
    isLoadingData: boolean;
    applications: Application[];
    userStories: UserStory[];
    environments: Environment[];
    mode: DashboardMode;
}

interface DispatchProps {
    requestDashboardData: () => void;
}

type DashboardProps = StateProps & DispatchProps;

function environmentHeaders(environment: Environment, mode: DashboardMode) {
    const name = environment.name;
    return [
        mode === DashboardMode.APPLICATION && <th key={`${name}-deploy`}/>,
        <th key={name}>{name}</th>
    ];
}

function Dashboard({
                       applications,
                       userStories,
                       environments,
                       isLoadingData,
                       mode
                   }: DashboardProps) {

    let rader;
    const userStoryMode = mode === DashboardMode.USER_STORY;
    if (userStoryMode) {
        rader = userStories.map((a) => (
            <UserStoryRow
                key={a.key}
                userStory={a}
                environments={environments}
            />
        ));
    } else {
        rader = applications.map((a) => (
            <ApplicationRow
                key={a.name}
                application={a}
                environments={environments}
            />
        ));
    }

    return (
        <div className="dashboard__wrapper">
            <table className="dashboard__table">
                <thead>
                <tr>
                    <th>Navn</th>
                    {userStoryMode && <th>ID</th>}
                    {userStoryMode && <th>Ansvarlig</th>}
                    {userStoryMode && <th>Status</th>}
                    {environments.map((e) => environmentHeaders(e, mode))}
                </tr>
                </thead>
                <tbody>
                {isLoadingData && (
                    <tr>
                        <td colSpan={8}><NavFrontendSpinner/></td>
                    </tr>
                )}
                {rader}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    isLoadingData: selectIsLoadingInitialData(state),
    applications: selectApplications(state),
    userStories: selectUserStories(state),
    environments: selectEnvironments(state),
    mode: selectDashboardMode(state)
});

export default connect(mapStateToProps)(Dashboard);
