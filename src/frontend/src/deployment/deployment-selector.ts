import Application from "../application/application";
import AppState from "../redux/app-state";
import Deployment from "./deployment";
import {selectEvents} from "../app-event/app-event-selector";
import Environment from "../environment/environment";

export function selectDeployment(state: AppState, application: Application, environment: Environment): (Deployment | undefined) {
    return selectEvents(state).find(e => e.application === application.name && e.environment === environment.name && !!e.version);
}