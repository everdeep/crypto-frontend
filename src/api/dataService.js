import axios from 'axios';

export const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const symbols = () => {
    return axios.get(
        '/api/data/symbols',
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const symbol = (symbol) => {
    return axios.get(
        `/api/data/symbol/${symbol}`,
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const currencyPairHistory = (currencyPair, interval, limit) => {
    return axios.get(
        `/api/data/symbol/${currencyPair}/history?interval=${interval}&limit=${limit}`,
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const currencyPairConfig = (currencyPair) => {
    return axios.get(
        `/api/data/${currencyPair}/config`,
        { headers: HEADERS },
        { withCredentials: true },
    );
};
