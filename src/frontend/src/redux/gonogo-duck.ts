export interface GoNogoState {
    openApplication: string;
    goApplications: string[];
    nogoApplications: string[];
}

const initialState: GoNogoState = {
    openApplication: '',
    goApplications: [],
    nogoApplications: []
};

enum actionNames {
    OPEN_APPLICATION = 'gonogo/OPEN_APPLICATION',
    ADD_GO_APPLICATION = 'gonogo/GO_APPLICATION',
    ADD_NOGO_APPLICATION = 'gonogo/NOGO_APPLICATION',
    RESET = 'gonogo/RESET'
}

export interface OpenApplication {
    type: actionNames.OPEN_APPLICATION;
    application: string;
}

export interface GoNogoApplication {
    type: actionNames.ADD_GO_APPLICATION | actionNames.ADD_NOGO_APPLICATION;
    application: string;
}

export interface ResetGoNogo {
    type: actionNames.RESET;
}

type ViewActions =
    | OpenApplication
    | GoNogoApplication
    | ResetGoNogo
    ;

export default function reducer(state: GoNogoState = initialState, action: ViewActions): GoNogoState {
    switch (action.type) {
        case actionNames.OPEN_APPLICATION:
            return {...state, openApplication: action.application};
        case actionNames.ADD_GO_APPLICATION:
            return {...state, goApplications: state.goApplications.concat(action.application)};
        case actionNames.ADD_NOGO_APPLICATION:
            return {...state, nogoApplications: state.nogoApplications.concat(action.application)};
        case actionNames.RESET:
            return initialState;
        default:
            return state;
    }
}

export function openApplication(application: string): OpenApplication {
    return { type: actionNames.OPEN_APPLICATION, application };
}

export function reset(): ResetGoNogo {
    return { type: actionNames.RESET };
}

export function addGoApplication(application: string): GoNogoApplication {
    return { type: actionNames.ADD_GO_APPLICATION, application };
}

export function addNogoApplication(application: string): GoNogoApplication {
    return { type: actionNames.ADD_NOGO_APPLICATION, application };
}
