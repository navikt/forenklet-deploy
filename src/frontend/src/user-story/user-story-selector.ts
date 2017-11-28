import {createSelector} from 'reselect';
import AppState from '../redux/app-state';
import {commitBelongToUserStory, comparator} from "./user-story-util";
import UserStory, {UserStoryDeploymentInfo} from "./user-story";
import {hasDeployment, isDeploymentComplete, selectCommits} from "../dev/dev-selector";
import Environment from "../environment/environment";
import {selectApplicationEnvironmentDeployment} from "../deployment/deployment-selector";
import Application from "../application/application";


function userStories(state: AppState) {
    return state.userStory;
}

export const selectUserStories = createSelector(userStories, (userStories) => {
    return Object.values(userStories).sort(comparator)
});

export function state(state: AppState) {
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
    state,
    selectCommits,
    userStoryParameter,
    environmentParameter,
    applicationParameter,
    (appState, commits, userStory, environment, application): UserStoryDeploymentInfo => {

        const basicDeploymentInfo = {
            environment: environment,
            userStory: userStory,
            application: application,
            applicationHasDeployment: hasDeployment(appState,userStory,application),
            complete: false
        };

        const userStoryApplicationCommits = commits.filter(c => c.application === application.name).filter(c => commitBelongToUserStory(c, userStory));
        if (userStoryApplicationCommits.length) {
            const deployment = selectApplicationEnvironmentDeployment(appState, application, environment);
            if (deployment) {
                return {
                    ...basicDeploymentInfo,
                    complete: isDeploymentComplete(appState, deployment),
                    deployment: deployment
                };
            }
        }

        return basicDeploymentInfo;
    });

// export const selectApplicationsWithUserStoryDeployment = createSelector(
//     state,
//     selectCommits,
//     selectApplications,
//     userStoryParameter,
//     (appState, commits, applications, userStory): Application[] => {
//         const userStoryCommits = commits.filter(c => commitBelongToUserStory(c, userStory));
//         return applications.filter(a => {
//             return userStoryCommits.filter(c => c.application == a.name).length > 0
//                 && selectApplicationDeployments(appState, a).length > 0
//         })
//     });
//
// //
//
// // TODO slette!
// export const selectHasDeployment = createSelector(
//     state,
//     selectCommits,
//     userStoryParameter,
//     environmentParameter,
//     applicationParameter,
//     (appState, commits, userStory): boolean => {
//         return commits.filter(c => commitBelongToUserStory(c, userStory)).length > 0;
//     });
//
//
