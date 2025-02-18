import React, { useEffect } from 'react';
import {
    useQuery,
} from '@tanstack/react-query'

import { getCoinList, getCoinMarkets } from '@src/api/dataService';
import { CurrencyFormatter, PercentageFormatter } from '@src/utils/formatter';
import Search from '@src/components/Search';

import { AppContextInterface, withAppContext } from '@src/components/App/AppContext';
import { coinList } from '@assets/data/coinsList';

import './Market.scss';

interface CoinList {
    id: string;
    symbol: string;
    name: string;
}

interface CoinMarket {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
}

const Market: React.FC = ({appContext}: {appContext: AppContextInterface}) => {

    const [coinData, setCoinData] = React.useState<CoinMarket[]>([]);
    const [filter, setFilter] = React.useState<string>('');
    const [coinFilter, setCoinFilter] = React.useState<string>('');

    useEffect(() => {
        appContext.setLoading(true);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (filter.length < 3) {
                return;
            }

            onSearch(filter);
        }, 1000);

        return () => clearTimeout(delayDebounceFn)
    }, [filter]);

    const onSuccessCoinMarkets = (res: any) => {
        appContext.setLoading(false);
        console.log(res);
        if (res.data.status) {
            return;
        }

        setCoinData(res.data);
    }

    const onError = (error: any) => {
        appContext.setLoading(false);
    }

    const onSearch = (search: string) => {
        console.log(search);
        appContext.setLoading(true);
        const coins = coinList.filter((item: CoinList) => item.id.toLowerCase().includes(search.toLowerCase()));
        const coinIds = coins.map(coin => coin.id).join(',');
        setCoinFilter(coinIds);
        appContext.setLoading(false);
    }
    
    // Queries
    const { isLoading: isLoadingCoinMarkets, isSuccess: isSucessCoinMarkets, data: dataCoinMarkets, refetch: refetchCoinMarkets } =
            useQuery({queryKey: ['coin-markets', coinFilter], queryFn: () => getCoinMarkets('usd', coinFilter), onSuccess: onSuccessCoinMarkets, onError, enabled: true});
 

    // const  { isLoading: isLoadingCoinList, isSuccess: isSuccessCoinList, data: dataCoinList, refetch: refetchCoinList } =
    //         useQuery({queryKey: ['coin-list'], queryFn: getCoinList, onSuccess: onSuccessCoinList, onError, enabled: true});


    const priceChange = (price: number) => {
        if (price > 0) {
            return (
                <td className='green'>
                    +{PercentageFormatter.format(price / 100)}
                </td>
            )
        } else {
            return (
                <td className='red'>
                    {PercentageFormatter.format(price / 100)}
                </td>
            )
        }

    }

    return (
        <div className='market__container'>
            <div className='market__header'>
                <Search onChange={setFilter} />
            </div>
            <table cellSpacing={0}>
                <thead>
                    <tr>
                        <th>
                            Rank
                        </th>
                        <th>
                            Logo
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Market Cap (USD)
                        </th>
                        <th>
                            Circulating Supply
                        </th>
                        <th>
                            Volume (24h)
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Change (24h)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isSucessCoinMarkets && coinData.map((item: CoinMarket) => (
                        <tr key={item.id}>
                            <td>
                                {item.market_cap_rank}
                            </td>
                            <td>
                                <img src={item.image} alt={item.name} style={{width: 24, height: 24}}/>
                            </td>
                            <td>
                                {item.name} <br />
                                <span style={{fontSize: 12}}>
                                    {item.symbol.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                {/* ${(item.market_cap / 1000000000).toFixed(2)}b */}
                                {CurrencyFormatter.format(item.market_cap/1000000000)}b
                            </td>
                            <td>
                                {CurrencyFormatter.format(item.circulating_supply/1000000)}m
                                <span style={{fontSize: 12}}>
                                    &nbsp; {item.symbol.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                {CurrencyFormatter.format(item.total_volume/1000000000)}b 
                            </td>
                            <td>
                                {CurrencyFormatter.format(item.current_price)}
                            </td>
                            {priceChange(item.price_change_percentage_24h)}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default withAppContext(Market);