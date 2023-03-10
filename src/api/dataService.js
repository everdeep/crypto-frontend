import api from './axiosConfig';

export const getSymbols = async () => {
    return api.get(
        '/api/data/symbols',
    );
};

export const getSymbol = async (symbol) => {
    return api.get(
        `/api/data/symbol/${symbol}`
    );
};

export const getCurrencyPairHistory = async (currencyPair, interval, limit) => {
    return api.get(
        `/api/data/symbol/${currencyPair}/history?interval=${interval}&limit=${limit}`
    );
};

export const getCurrencyPairConfig = async (currencyPair) => {
    return api.get(
        `/api/data/${currencyPair}/config`
    );
};

export const postCurrencyPairConfigUpdate = async (currencyPair, config) => {
    return api.post(
        `/api/data/${currencyPair}/config`,
        config
    );
};

export const getCoinList = async () => {
    return api.get(
        '/api/data/coin-list'
    );
};

export const getCoinMarkets = async (currency, ids) => {
    console.log('ids', ids);
    return api.get(
        `/api/data/coin-markets?currency=${currency}&ids=${ids}`
    );
};
