import { type } from './types';

export const signIn = (userId: string, authToken: string) => {
    return {
        type: type.SIGN_IN,
        payload: {
            userId: userId,
            authToken: authToken,
        },
    };
};

export const signOut = () => {
    return {
        type: type.SIGN_OUT,
    };
};

export const setPage = (page: string) => {
    return {
        type: page,
    };
};

export const formUpdate = (fieldName: string, fieldValue: any) => {
    return {
        type: type.FORM_UPDATE,
        payload: {
            name: fieldName,
            value: fieldValue,
        },
    };
};

export const formClear = () => {
    return {
        type: type.FORM_CLEAR,
    };
};

export const alertSet = (message: string, className: string) => {
    return {
        type: type.ALERT,
        payload: {
            message: message,
            className: className,
        },
    };
};

export const alertClear = () => {
    return {
        type: type.ALERT_CLEAR,
    };
};
