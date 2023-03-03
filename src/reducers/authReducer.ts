import { type } from '../actions/types';

const INITAL_STATE: any = {
    isSignedIn: false,
    userId: null,
    authToken: null,
};

const authReducer = (state = INITAL_STATE, action: any) => {
    switch (action.type) {
        case type.SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                userId: action.payload.userId,
                authToken: action.payload.authToken,
            };
        case type.SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                userId: null,
                authToken: null,
            };
        default:
            return state;
    }
};

export default authReducer;
