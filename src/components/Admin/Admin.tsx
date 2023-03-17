import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink, Outlet } from 'react-router-dom';

import './admin.scss';

const Admin: React.FC = () => {
    return (
        <div className='admin'>
            <Menu pointing secondary vertical>
                <Menu.Item as={NavLink} to='user' content='Profile Details' />
            </Menu>

            <div className='admin__container'>
                <Outlet />

                <div className='admin__column'>
                    <div className='admin__column__content'>
                        here is some content
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
