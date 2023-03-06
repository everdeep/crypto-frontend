import React, { useEffect } from 'react';
import {
    useQuery,
} from '@tanstack/react-query'

import { getCoinMarkets } from '@src/api/dataService';
import { CurrencyFormatter, PercentageFormatter } from '@src/utils/formatter';
import Search from '@src/components/Search';

import { AppContextInterface, withAppContext } from '@src/components/App/AppContext';

import './Market.scss';

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

    useEffect(() => {
        appContext.setLoading(true);
    }, []);

    const onSuccess = (res: any) => {
        console.log('onSuccess', res);
        appContext.setLoading(false);
        if (res.data.status) {
            return;
        }

        setCoinData(res.data);
    }

    const onError = (error: any) => {
        console.log('onError', error);
        appContext.setLoading(false);
    }
    
    // Queries
    const { isLoading, isSuccess, isError, data, error, refetch } =
            useQuery({queryKey: ['coin-markets'], queryFn: getCoinMarkets, onSuccess, onError, enabled: true});
 
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
        <div className='market'>
            <div className='header'>
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
                    {isSuccess && coinData.map((item: CoinMarket) => (
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