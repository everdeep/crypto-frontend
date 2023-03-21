import React from 'react';

import { ICurrencyPairConfig } from '@src/interfaces';

interface IBotItemProps {
    bot: ICurrencyPairConfig;
}

export const BotItem: React.FC<IBotItemProps> = ({bot}) => {

    const calculateTotalProfit = () => {
        let totalProfit = 0;
        bot.orders.forEach((order) => {
            totalProfit += 0;
        });
        return totalProfit;
    };

    return (
        <li className='row item'>
            <div className='col'>{bot.bot_name}</div>
            <div className='col'>{bot.currency_pair}</div>
            <div className='col'>{bot.strategy}</div>
            <div className='col'>{bot.is_active ? 'Yes' : 'No'}</div>
            <div className='col'>{bot.orders.length}</div>
            <div className='col'>{calculateTotalProfit()}</div>
        </li>
    );
};