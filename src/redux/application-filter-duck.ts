import { AppState } from './reducer';
import { Action, Dispatch } from 'redux';

export interface ApplicationFilterState {
    filter?: string;
}

const initialState: ApplicationFilterState = {
    filter: '',
};

enum actionNames {
    CHANGE = 'application_filter/OK',
}

export interface ChangeFilter {
    type: actionNames.CHANGE;
    filter?: string;
}

type ApplicationFilterActions =
    ChangeFilter;

export function changefilter(filter: string) {
    return (dispatch: Dispatch<Action>) => {
        return dispatch({type: actionNames.CHANGE, filter});
    };
}

export function selectFilter(state: AppState): string {
    return state.applicationFilter.filter as string;
}

export function filterFunction(name: string, filter: string) {
    // eslint-disable-next-line
    const searchString = filter.replace(/[\-\[\]\/{}()+.\\^$|]/g, '\\$&')
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.')
        .replace(/\s/g, '')
        .split(',').join('|');
    return new RegExp(searchString, 'i').test(name);
}

export default function applicationFilterReducer(state: ApplicationFilterState = initialState, action: ApplicationFilterActions) {
    switch (action.type) {
        case actionNames.CHANGE:
            return {...state, filter: action.filter};
        default:
            return state;
    }
}
