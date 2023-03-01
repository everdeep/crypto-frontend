import { type } from '../actions/types';

const INITAL_STATE = {
    activePage: type.PAGE_HOME,
};

const pageReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case type.PAGE_HOME:
        case type.PAGE_PROFILE:
        case type.PAGE_PROJECTS:
        case type.PAGE_LOGIN:
        case type.PAGE_LOGOUT:
            return { ...state, activePage: action.type };
        default:
            return state;
    }
};

export default pageReducer;
