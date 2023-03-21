import React from 'react';

import { Menu } from 'semantic-ui-react';
import { NavLink, Outlet } from 'react-router-dom';

import './Bots.scss';

const Bots: React.FC = () => {

    return (
        <div className='bots__container'>
            <div className='bots__info'>
                <Menu pointing secondary vertical>
                    <Menu.Item as={NavLink} to='my-bots' content='My bots' />
                    <Menu.Item
                        as={NavLink}
                        to='strategies'
                        content='Strategies'
                    />
                </Menu>
            </div>
            <div className='bots__content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Bots;