import api from './axiosConfig';

export const postUpdateUserDetails = async (user_details) => {
    return api.post(
        '/api/user/details',
        { ...user_details }
    );
};