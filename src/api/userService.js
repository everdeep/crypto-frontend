import api from './axiosConfig';

export const postUpdateUserDetails = async (user_details) => {
    return api.post(
        '/api/user/details',
        { ...user_details }
    );
};

export const postUpdateUserPassword = async (password) => {
    return api.post(
        '/api/user/password',
        { password: password }
    );
}