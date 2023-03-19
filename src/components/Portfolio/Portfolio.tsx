import React from 'react';

import Bots from '../Bots';
import OrderHistory from '../OrderHistory';

import './Portfolio.scss';

const Portfolio: React.FC = () => {
    return (
        <div className='portfolio__container'>
            <div className='portfolio__content'>
                <div className='item-a'>
                    <h1>Info</h1>
                </div>
                <div className='item-b'>
                    <h1>Bot info</h1>
                    <Bots />
                </div>

                <div className='item-c'>
                    <h1>Order history</h1>
                    <OrderHistory />
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
