import Application from '../application/application';
import AppState from '../redux/app-state';
import Commit from "./commit";
import Tag from "./tag";
import {createSelector} from "reselect";
import Deployment from "../deployment/deployment";
import {selectApplicationMap} from "../application/application-selector";
import UserStory from "../user-story/user-story";
import {commitBelongToUserStory} from '../user-story/user-story-util';

function commits(state: AppState) {
    return state.dev.commits;
}

export const selectCommits = createSelector(commits, (commits) => {
    return Object.values(commits);
});

export function selectCommitsForApplication(state: AppState,
                                            application: Application): Commit[] {
    return Object.values(state.dev.commits)
        .filter(c => c.application === application.name);
}

function tags(state: AppState) {
    return state.dev.tags;
}

export const tagsByDisplayId = createSelector(
    tags,
    (tagsById) => {
        return Object.values(tagsById).reduce((m, tag) => {
            m[tag.displayId] = tag;
            return m
        }, {});
    }
);

export const tagsByCommit = createSelector(
    tags,
    (tagsById) => {
        return Object.values(tagsById).reduce((m, tag) => {
            m[tag.latestCommit] = tag;
            return m
        }, {});
    }
);


export function selectTags(state: AppState,
                           application: Application): Tag[] {
    return Object.values(tags(state)).filter(c => c.application === application.name);

}

function stateParameter(appState: AppState) {
    return appState;
}

function deploymentParameter(appState: AppState, deployment: Deployment) {
    return deployment;
}

export const selectDeploymentCommits = createSelector(
    stateParameter,
    selectApplicationMap,
    selectCommits,
    tagsByDisplayId,
    deploymentParameter,
    (state, applicationMap, commits, tagsMap, d) => {
        const tag = tagsMap[d.version];
        const application = applicationMap[d.application];
        if (tag) {
            const applicationCommits = selectCommitsForApplication(state, application);
            const applicationCommitIds = applicationCommits.map(c => c.id);
            const deployCommitIndex = applicationCommitIds.indexOf(tag.latestCommit);
            console.log(deployCommitIndex);
            return applicationCommits.splice(deployCommitIndex);
        } else {
            return [];
        }
    });


export const isDeploymentComplete = createSelector(
    stateParameter,
    selectApplicationMap,
    tagsByDisplayId,
    deploymentParameter,
    (state, applicationMap, tagsMap, d) => {
        const tag = tagsMap[d.version];
        const application = applicationMap[d.application];
        if (tag) {
            const applicationCommits = selectCommitsForApplication(state, application);
            // TODO applicationCommits må muligens sorteres...
            const applicationCommitIds = applicationCommits.map(c => c.id);
            const deployCommitIndex = applicationCommitIds.indexOf(tag.latestCommit);
            return deployCommitIndex == 0;
        } else {
            return false;
        }
    });


function userStoryParameter(appState: AppState, userStory: UserStory) {
    return userStory;
}

function applicationParameter(appState: AppState, userStory: UserStory, application: Application) {
    return application;
}

export const hasDeployment = createSelector(
    stateParameter,
    selectCommits,
    selectApplicationMap,
    tagsByCommit,
    userStoryParameter,
    applicationParameter,
    (state, commits, applicationMap, tagsMap, userStory, application): boolean => {
        // TODO
        let b = !!commits.filter(c => c.application === application.name).filter(c => commitBelongToUserStory(c, userStory)).find(c => {
            let tagsMap2 = tagsMap[c.id];
            return tagsMap2;
        });
        return b;
    });