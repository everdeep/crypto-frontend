import api from './axiosConfig';

export const getPortfolio = () => {
    return api.get('/api/portfolio');
};
