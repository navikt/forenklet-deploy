import { createSelector } from 'reselect';
import AppState from '../redux/app-state';
import { commitBelongToUserStory, comparator } from './user-story-util';
import UserStory, { UserStoryDeploymentInfo } from './user-story';
import { hasDeployment, isDeploymentComplete, selectCommits } from '../dev/dev-selector';
import Environment from '../environment/environment';
import { selectApplicationEnvironmentDeployment } from '../deployment/deployment-selector';
import Application from '../application/application';

function getUserStories(state: AppState) {
    return state.userStory;
}

export const selectUserStories = createSelector(getUserStories, (userStories) => {
    return Object.values(userStories).sort(comparator);
});

export function getState(state: AppState) {
    return state;
}

export function userStoryParameter(state: AppState, userStory: UserStory) {
    return userStory;
}

export function environmentParameter(state: AppState, userStory: UserStory, environment: Environment) {
    return environment;
}

export function applicationParameter(state: AppState, userStory: UserStory, environment: Environment, application: Application) {
    return application;
}

export const selectDeploymentInfoForUserStory = createSelector(
    getState,
    selectCommits,
    userStoryParameter,
    environmentParameter,
    applicationParameter,
    (appState, commits, userStory, environment, application): UserStoryDeploymentInfo => {

        const basicDeploymentInfo = {
            environment,
            userStory,
            application,
            applicationHasDeployment: hasDeployment(appState, userStory, application),
            complete: false
        };

        const userStoryApplicationCommits = commits.filter((c) => c.application === application.name).filter((c) => commitBelongToUserStory(c, userStory));
        if (userStoryApplicationCommits.length) {
            const deployment = selectApplicationEnvironmentDeployment(appState, application, environment);
            if (deployment) {
                return {
                    ...basicDeploymentInfo,
                    complete: isDeploymentComplete(appState, deployment),
                    deployment
                };
            }
        }

        return basicDeploymentInfo;
    });
