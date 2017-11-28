import * as React from 'react';
import AppState from '../redux/app-state';
import {connect} from 'react-redux';
import UserStory, {UserStoryDeploymentInfo} from "../user-story/user-story";
import Environment from "../environment/environment";
import {selectDeploymentInfoForUserStory,} from "../user-story/user-story-selector";
import {EtikettFokus, EtikettSuksess} from "nav-frontend-etiketter";
import Application from "../application/application";
import {selectApplications} from "../application/application-selector";

interface UserStoryApplicationDeploymentProps {
    userStory: UserStory;
    environment: Environment;
    application: Application;
}

let i = 0;

function UserStoryApplicationDeployment({
                                            applicationHasDeployment,
                                            application,
                                            deployment,
                                            complete
                                        }: UserStoryDeploymentInfo) {

    console.log(`render #${i++}`);
    if(!applicationHasDeployment){
        return null;
    }

    let content;
    if (deployment) {
        const Etikett = complete ? EtikettSuksess : EtikettFokus;
        content = (
            <Etikett className="user-story-deployment__etikett">
                {application.name}
            </Etikett>
        );
    }
    return <div className="user-story-deployment">{content}</div>
}


const mapStateToApplicationProps = (state: AppState, ownProps: UserStoryApplicationDeploymentProps): UserStoryDeploymentInfo => {
    return selectDeploymentInfoForUserStory(state, ownProps.userStory, ownProps.environment, ownProps.application)
};
const UserStoryApplicationDeploymentConnected = connect(mapStateToApplicationProps)(UserStoryApplicationDeployment);


interface OwnProps {
    userStory: UserStory;
    environment: Environment;
}

interface StateProps {
    applications: Application[];
}

type UserStoryDeploymentProps = OwnProps & StateProps;

function UserStoryDeployment({
                                 applications,
                                 userStory,
                                 environment
                             }: UserStoryDeploymentProps) {

    console.log(`render #${i++}`);

    return (
        <div>
            {
                applications.map(application => <UserStoryApplicationDeploymentConnected
                    key={application.name}
                    application={application}
                    userStory={userStory}
                    environment={environment}
                />)
            }
        </div>
    );
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    applications: selectApplications(state)
});

export default connect(mapStateToProps)(UserStoryDeployment);
