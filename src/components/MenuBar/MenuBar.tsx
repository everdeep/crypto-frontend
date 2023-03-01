import React, { useState } from 'react';
import { NavLink, redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions';
import { logout } from '../../api/authService';
import { Menu, Sidebar, Dropdown, Icon, Divider } from 'semantic-ui-react'

import { icons } from '../App/Icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { RxDashboard } from 'react-icons/rx';

import './MenuBar.scss';

interface MenuBarProps {
    signOut: () => void;
};

const MenuBar: React.FC<MenuBarProps> = ({ signOut }) => {

    const [activeItem, setActiveItem] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleItemClick = (e: any, { name }: any) => {
        setActiveItem(name);
        redirect('/');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout(); // Clear the session
        signOut(); // Clear the redux store
        return redirect('/');
    }

    return (
        <>
            <Menu inverted pointing secondary className='menubar'>
                <Menu.Item id='sidebarBtn' onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Icon name='bars' />
                </Menu.Item>

                <Menu.Item as={NavLink} to='/' content='Dashboard' className='menu-item' />
                <Menu.Item as={NavLink} to='/portfolio' content='Portfolio' className='menu-item' />
                <Menu.Item as={NavLink} to='/terminal' content='Terminal' className='menu-item' />
                <Menu.Item as={NavLink} to='/market' content='Market' className='menu-item' />
                <Menu.Item as={NavLink} to='/news' content='News' className='menu-item' />

                <Menu.Menu position='right'>
                    <Dropdown className='context-menu' item icon='setting'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <div>
                                    <img className='item-icon' src={icons.dashboard} /> <span>Change theme</span>
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='context-menu' item icon='user circle'>
                        <Dropdown.Menu>
                            <h3>User name</h3>
                            <p>user@gmail.com</p>
                            <div>Notice message</div>
                            <Dropdown.Divider />
                            <Dropdown.Item as={NavLink}
                                to='/settings/user'
                                content='Profile Details' />
                            <Dropdown.Item as={NavLink}
                                to='/settings/verification'
                                content='Verification' />
                            <Dropdown.Item as={NavLink}
                                to='/settings/preferences'
                                content='Preferences' />
                            <Dropdown.Item as={NavLink}
                                to='/settings/password'
                                content='Change Password' />
                            <Dropdown.Item as={NavLink}
                                to='/settings/security'
                                content='Security (2FA)' />
                            <Dropdown.Item as={NavLink}
                                to='/settings/accounts'
                                content='My Accounts' />
                            <Dropdown.Item>Deposit/Withdraw</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Support</Dropdown.Item>
                            <Dropdown.Item as={NavLink}
                                to='/settings/referrals'
                                content='Refer a Friend' />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>

            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                borderless
                inverted
                onHide={() => setSidebarOpen(false)}
                vertical
                visible={sidebarOpen}
                width='wide'
            >
                <Menu.Item as={NavLink} to='/' onClick={() => setSidebarOpen(false)} >
                    <div>
                        <img className='item-icon' src={icons.dashboard} /> <span>Dashboard</span>
                    </div>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/portfolio' onClick={() => setSidebarOpen(false)}>
                    <div>
                        <img className='item-icon' src={icons.portfolio} /> <span>Portfolio</span>
                    </div>
                </Menu.Item>

                <Menu.Item as={NavLink} to='/terminal' onClick={() => setSidebarOpen(false)}>
                    <div>
                        <img className='item-icon' src={icons.chart} /> <span>Terminal</span>
                    </div>
                </Menu.Item>
                
                <Menu.Item as={NavLink} to='/market' onClick={() => setSidebarOpen(false)}>
                    <div>
                        <img className='item-icon' src={icons.market} /> <span>Market</span>
                    </div>
                </Menu.Item>

                <Menu.Item as={NavLink} to='/news' onClick={() => setSidebarOpen(false)}>
                    <div>
                        <img className='item-icon' src={icons.newspaper} /> <span>News</span>
                    </div>
                </Menu.Item>

                {/* Bottom section */}
                <Divider />

                <Menu.Item as={NavLink} to='/settings' onClick={() => setSidebarOpen(false)}>
                    <div>
                        <img className='item-icon' src={icons.gear} /> <span>User Settings</span>
                    </div>
                </Menu.Item>
                <Menu.Item onClick={() => setSidebarOpen(false)}>
                    <div>
                        <img className='item-icon' src={icons.wrench} /> <span>Support</span>
                    </div>
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                    <div>
                        <img className='item-icon' src={icons.exit} /> <span>Logout</span>
                    </div>
                </Menu.Item>
            </Sidebar>
        </>
    );

};

const mapStateToProps = (state: any) => {
    return {}
}

export default connect(
    mapStateToProps,
    { signOut }
)(MenuBar);