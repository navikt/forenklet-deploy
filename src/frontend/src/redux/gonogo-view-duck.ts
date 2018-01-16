export interface GoNogoViewState {
    openApplication: string;
    goApplications: string[];
    nogoApplications: string[];
}

const initialState: GoNogoViewState = {
    openApplication: '',
    goApplications: [],
    nogoApplications: []
};

enum actionNames {
    OPEN_APPLICATION = 'gonogo_view/OPEN_APPLICATION',
    ADD_GO_APPLICATION = 'gonogo_view/GO_APPLICATION',
    ADD_NOGO_APPLICATION = 'gonogo_view/NOGO_APPLICATION',
    RESET = 'gonogo_view/RESET'
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

export default function reducer(state: GoNogoViewState = initialState, action: ViewActions): GoNogoViewState {
    switch (action.type) {
        case actionNames.OPEN_APPLICATION:
            return {...state, openApplication: action.application};
        case actionNames.ADD_GO_APPLICATION:
            return {
                ...state,
                goApplications: state.goApplications.concat(action.application),
                nogoApplications: state.nogoApplications.filter((application) => application !== action.application)
            };
        case actionNames.ADD_NOGO_APPLICATION:
            return {
                ...state, 
                nogoApplications: state.nogoApplications.concat(action.application),
                goApplications: state.goApplications.filter((application) => application !== action.application)
            };
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
