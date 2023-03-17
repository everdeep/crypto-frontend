import React from 'react';

import './Portfolio.scss';

const Portfolio: React.FC = () => {

    return (
        <div className='portfolio__container'>
            <div className='portfolio__header'>
                <h1>Portfolio</h1>
            </div>
            <div className='portfolio__content'>

                <div className='item-a'>
                    <h1>Info</h1>
                </div>
                <div className='item-b'>
                    <h1>Bot info</h1>
                </div>

                <div className='item-c'>
                    <h1>Order history</h1>
                    <table cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th>
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    2021-01-01
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;