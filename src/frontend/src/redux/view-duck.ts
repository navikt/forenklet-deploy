export interface ViewState {
    showAll: boolean;
}

const initialState: ViewState = {
    showAll: false
};

enum actionNames {
    CHANGE_SHOW_ALL = 'view/CHANGE_SHOW_ALL'
}

export interface ChangeShowAll {
    type: actionNames.CHANGE_SHOW_ALL,
    showAll: boolean;
}

type ViewActions = 
    | ChangeShowAll
    ;

export default function reducer(state: ViewState = initialState, action: ViewActions): ViewState {
    switch (action.type) {
        case actionNames.CHANGE_SHOW_ALL:
            return {...state, showAll: action.showAll};
        default:
            return state;
    }
}

export function changeShowAll(showAll: boolean): ChangeShowAll {
    return { type: actionNames.CHANGE_SHOW_ALL, showAll };
}



