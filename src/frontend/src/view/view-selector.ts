import DashboardMode from './dashboard-mode';
import AppState from '../redux/app-state';

export function selectDashboardMode(state: AppState): DashboardMode {
    return state.view.mode;
}

export function selectError(state: AppState) {
    return state.view.error;
}
