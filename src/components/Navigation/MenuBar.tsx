import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, Radio } from 'semantic-ui-react'

import { icons } from '../App/Icons';

interface MenuBarProps {
    handleLogout: () => void;
    toggleSidebar: () => void;
    toggleTheme: () => void;
    isDarkTheme: boolean;
};

const MenuBar: React.FC<MenuBarProps> = ({ handleLogout, toggleSidebar, toggleTheme, isDarkTheme }) => {


    return (
        <>
            <Menu inverted pointing secondary className='menubar'>
                <Menu.Item id='sidebarBtn' onClick={toggleSidebar}>
                    <Icon name='bars' />
                </Menu.Item>

                <Menu.Item id='logo' className='menu-item'>
                    <img src={icons.logo} />
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
                                    <span>Change theme</span> <Radio toggle onChange={toggleTheme} />
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
                            <Dropdown.Item as={NavLink} to='/settings/user'>
                                <div>
                                    <img src={icons.user} /> <span>Profile Details</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/settings/verification'>
                                <div>
                                    <img src={icons.exclaim} /> <span>Verification</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/settings/preferences'>
                                <div>
                                    <img src={icons.preferences} /> <span>Preferences</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/settings/password' >
                                <div>
                                    <img src={icons.lock} /> <span>Password</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/settings/security' >
                                <div>
                                    <img src={icons.shield} /> <span>Security</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/settings/accounts' >
                                <div>
                                    <img src={icons.toolbox} /> <span>Accounts</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <div>
                                    <img src={icons.user} /> <span>Deposit/Withdraw</span>
                                </div>
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item>
                                <div>
                                    <img src={icons.wrench} /> <span>Support</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/settings/referrals'>
                                <div>
                                    <img src={icons.user} /> <span>Refer a friend!</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>
                                <div>
                                    <img src={icons.exit} /> <span>Logout</span>
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>

        </>
    );
};

export default MenuBar;