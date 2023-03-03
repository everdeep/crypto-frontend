import api from './axiosConfig';

export const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const getSymbols = async () => {
    return api.get(
        '/api/data/symbols',
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const getSymbol = async (symbol) => {
    return api.get(
        `/api/data/symbol/${symbol}`,
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const getCurrencyPairHistory = async (currencyPair, interval, limit) => {
    return api.get(
        `/api/data/symbol/${currencyPair}/history?interval=${interval}&limit=${limit}`,
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const getCurrencyPairConfig = async (currencyPair) => {
    return api.get(
        `/api/data/${currencyPair}/config`,
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const postCurrencyPairConfigUpdate = async (currencyPair, config) => {
    return api.post(
        `/api/data/${currencyPair}/config`,
        config,
        { headers: HEADERS },
        { withCredentials: true },
    );
};

export const getCoinMarkets = async () => {
    return api.get(
        '/api/data/coin-markets',
        { headers: HEADERS },
        { withCredentials: true },
    );
};
