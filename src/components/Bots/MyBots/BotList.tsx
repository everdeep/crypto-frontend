import React, { useState } from 'react';
import { BotItem } from './BotItem';

import { ICurrencyPairConfig } from '@src/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getBots } from '@src/api/dataService';

export const BotList: React.FC = () => {
    const [rowData, setRowData] = useState<ICurrencyPairConfig[]>([]);

    const onSuccess = (res: any) => {
        // Failed to get orders
        if (res.data.status) {
            return;
        }

        setRowData(res.data);
    };

    const onError = (error: any) => {};

    const { isLoading, refetch } = useQuery({
        queryKey: ['bots'],
        queryFn: () => getBots(),
        onSuccess,
        onError,
        enabled: true,
    });

    const renderBotItems = () => {
        const list: any = [];
        rowData.forEach((bot: ICurrencyPairConfig) => {
            list.push(<BotItem bot={bot} />);
        });
        return list;
    };

    return (
        <div className='mybots__content'>
            <div className='row header'>
                <div className='col'>
                    <span>Name</span>
                </div>
                <div className='col'>
                    <span>Target</span>
                </div>
                <div className='col'>
                    <span>Strategy</span>
                </div>
                <div className='col'>
                    <span>Active</span>
                </div>
                <div className='col'>
                    <span>Total Trades</span>
                </div>
                <div className='col'>
                    <span>Total Profit</span>
                </div>
            </div>
            <ul className='mybots__list'>{renderBotItems()}</ul>
        </div>
    );
};
