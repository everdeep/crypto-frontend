import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink, Outlet } from 'react-router-dom';

import './Settings.scss';

const Settings: React.FC = () => {

    return (
        <div className='settings'>
            <Menu inverted pointing secondary vertical>
                <Menu.Item
                    as={NavLink}
                    to='user'
                    content='Profile Details'
                />
                <Menu.Item
                    as={NavLink}
                    to='verification'
                    content='Verification'
                />
                <Menu.Item
                    as={NavLink}
                    to='preferences'
                    content='Preferences'
                />
                <Menu.Item
                    as={NavLink}
                    to='password'
                    content='Change Password'
                />
                <Menu.Item
                    as={NavLink}
                    to='security'
                    content='Security'
                />
                <Menu.Item
                    as={NavLink}
                    to='accounts'
                    content='My Accounts'
                />
                <Menu.Item
                    as={NavLink}
                    to='referrals'
                    content='Refer a Friend'
                />
            </Menu>

            <Outlet />
        </div>
    );
}

export default Settings;