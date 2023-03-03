import api from './axiosConfig';

export const getPortfolio = async () => {
    return api.get('/api/portfolio');
};
