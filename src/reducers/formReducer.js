import { type } from '../actions/types';

const formReducer = (state = {}, action) => {
    switch (action.type) {
        case type.FORM_UPDATE:
            return { ...state, [action.payload.name]: action.payload.value };
        case type.FORM_CLEAR:
            return {};
        default:
            return state;
    }
};

export default formReducer;
