import Environment from '../environment/environment';
import Application from '../application/application';
import Deployment from '../deployment/deployment';

export interface UserStoryStatus {
    name: string;
}

interface Assignee {
    displayName: string;
}

export default interface UserStory {
    key: string;
    summary: string;
    rank: string;
    created: string;
    assignee?: Assignee;
    status: UserStoryStatus;
}

export interface UserStoryDeploymentInfo {
    userStory: UserStory;
    environment: Environment;
    application: Application;
    deployment?: Deployment;
    applicationHasDeployment: boolean;
    complete: boolean;
}
