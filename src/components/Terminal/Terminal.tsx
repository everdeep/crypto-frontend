import React from 'react';

import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

import './Terminal.scss';

const Terminal: React.FC = () => {

    const [watchlist, setWatchlist] = React.useState<string[]>([]);

    return (
        <div className='terminal'>
            <div className="item item-a">a</div>
            <div className="item item-b">
                <AdvancedRealTimeChart
                    theme="dark"
                    autosize
                    watchlist={watchlist}
                    ></AdvancedRealTimeChart>
            </div>
        </div>
    );
}

export default Terminal;