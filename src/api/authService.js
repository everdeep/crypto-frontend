import api from './axiosConfig';

export const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const login = async (username, password) => {
    return api.post(
        '/api/user/login',
        {
            username: username,
            password: password,
        },
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const logout = async () => {
    return api.get('/api/user/logout', { withCredentials: true });
};

export const register = async (username, password, email) => {
    return api.post(
        '/api/user/register',
        {
            username: username,
            password: password,
            email: email,
        },
        { headers: HEADERS },
    );
};
